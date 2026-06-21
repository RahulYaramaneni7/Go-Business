import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { apiService, toggleMockApi, isMockApiEnabled } from '../services/api';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useMockApi, setUseMockApi] = useState(isMockApiEnabled());
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (Cookies.get('jwt_token') || localStorage.getItem('jwt_token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleToggleMockApi = () => {
    toggleMockApi(!useMockApi);
    setUseMockApi(!useMockApi);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiService.login(email, password);

      if (response.data && response.data.data && response.data.data.token) {
        const token = response.data.data.token;
        // Try both cookie and localStorage
        try {
          Cookies.set('jwt_token', token, { expires: 7 });
        } catch (cookieErr) {
          console.warn('Cookie setting failed, using localStorage only');
        }
        localStorage.setItem('jwt_token', token);
        navigate('/');
      } else {
        setError('Login failed. Invalid response from server.');
      }
    } catch (err) {
      console.error('Login error details:', {
        message: err.message,
        code: err.code,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        fullError: err
      });
      
      // Specific error handling
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.status === 400) {
        setError('Invalid request. Please check your email and password.');
      } else if (err.response?.status === 403) {
        setError('Access forbidden. Please try again.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout. The server is taking too long to respond. Please try again.');
      } else if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
        setError('Cannot reach the server. Please check if the API server is running.');
      } else if (!err.response && err.message === 'timeout of 15000ms exceeded') {
        setError('Connection timeout. The server is not responding. Please try again in a few moments.');
      } else if (!err.response) {
        setError('Network error. Please check your internet connection and ensure the API server is accessible.');
      } else {
        setError(`Error: ${err.response?.statusText || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-brand">Go Business</h1>
        <p className="login-tagline">Sign in to open your referral dashboard.</p>

        {useMockApi && (
          <div className="mock-api-banner">
            ✅ Using Mock API - Test data enabled
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="diagnostics-link-container">
          <button type="button" className="mock-api-toggle-btn" onClick={handleToggleMockApi}>
            {useMockApi ? '🌐 Use Real API' : '✅ Use Mock API'}
          </button>
          <Link to="/diagnostics" className="diagnostics-link">
            Having connection issues? Run diagnostics →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
