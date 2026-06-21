import React, { useState } from 'react';
import axios from 'axios';
import { toggleMockApi, isMockApiEnabled } from '../services/api';
import '../styles/DiagnosticsPage.css';

function DiagnosticsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useMockApi, setUseMockApi] = useState(isMockApiEnabled());

  const runTests = async () => {
    setLoading(true);
    setResults([]);
    const newResults = [];

    // Test 1: Ping API Gateway
    try {
      const startTime = Date.now();
      const response = await axios.get(
        'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals',
        { timeout: 5000 }
      );
      const duration = Date.now() - startTime;
      newResults.push({
        test: 'API Gateway Connectivity',
        status: 'SUCCESS',
        message: `Server is reachable (${duration}ms)`,
        details: response.status
      });
    } catch (err) {
      newResults.push({
        test: 'API Gateway Connectivity',
        status: 'FAILED',
        message: err.message,
        details: `Code: ${err.code}, Status: ${err.response?.status || 'N/A'}`
      });
    }

    // Test 2: Test login endpoint
    try {
      const startTime = Date.now();
      const response = await axios.post(
        'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/login',
        { email: 'admin@example.com', password: 'admin123' },
        { timeout: 5000 }
      );
      const duration = Date.now() - startTime;
      newResults.push({
        test: 'Login Endpoint',
        status: 'SUCCESS',
        message: `Connected (${duration}ms)`,
        details: `Token: ${response.data?.data?.token ? 'Received' : 'Not received'}`
      });
    } catch (err) {
      newResults.push({
        test: 'Login Endpoint',
        status: err.response?.status === 401 ? 'EXPECTED' : 'FAILED',
        message: err.message,
        details: `Status: ${err.response?.status || err.code || 'Unknown'}`
      });
    }

    // Test 3: DNS Resolution
    try {
      const response = await axios.get('https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com', {
        timeout: 3000,
        validateStatus: () => true
      });
      newResults.push({
        test: 'DNS Resolution',
        status: 'SUCCESS',
        message: 'Domain name resolved',
        details: `Status: ${response.status}`
      });
    } catch (err) {
      newResults.push({
        test: 'DNS Resolution',
        status: 'FAILED',
        message: err.message,
        details: err.code
      });
    }

    setResults(newResults);
    setLoading(false);
  };

  const handleToggleMockApi = () => {
    toggleMockApi(!useMockApi);
    setUseMockApi(!useMockApi);
  };

  return (
    <div className="diagnostics-container">
      <div className="diagnostics-card">
        <h1>API Diagnostics</h1>
        <p>Test the connection to the Go Business API</p>

        <div className="mock-api-toggle">
          <label>
            <input
              type="checkbox"
              checked={useMockApi}
              onChange={handleToggleMockApi}
            />
            <span>Use Mock API for Development</span>
          </label>
          <p className="toggle-info">
            {useMockApi 
              ? '✅ Using mock API (local data)' 
              : '🌐 Using real API (external server)'}
          </p>
        </div>

        <button 
          onClick={runTests}
          disabled={loading || useMockApi}
          className="run-tests-btn"
        >
          {loading ? 'Running Tests...' : 'Run Real API Diagnostics'}
        </button>

        {useMockApi && (
          <div className="info-box">
            <strong>✅ Mock API Enabled</strong>
            <p>You can now use the app with local test data. Click "Sign in" to continue.</p>
            <p className="mock-credentials">
              <strong>Test Credentials:</strong><br/>
              Email: admin@example.com<br/>
              Password: admin123
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="results-container">
            {results.map((result, idx) => (
              <div key={idx} className={`result-item ${result.status.toLowerCase()}`}>
                <div className="result-header">
                  <span className="result-test">{result.test}</span>
                  <span className={`result-status ${result.status.toLowerCase()}`}>
                    {result.status}
                  </span>
                </div>
                <p className="result-message">{result.message}</p>
                <p className="result-details">{result.details}</p>
              </div>
            ))}
          </div>
        )}

        <div className="help-section">
          <h3>What to do?</h3>
          <ul>
            <li><strong>Real API Not Working?</strong> Enable "Mock API" above to test the app locally with sample data</li>
            <li><strong>Mock API:</strong> Provides complete test data without external dependencies</li>
            <li><strong>Real API:</strong> Requires the AWS API endpoint to be accessible</li>
          </ul>
        </div>

        <div className="help-section">
          <h3>Common Issues</h3>
          <ul>
            <li><strong>ECONNREFUSED:</strong> Server is not running or port is blocked</li>
            <li><strong>ENOTFOUND:</strong> Domain name cannot be resolved (DNS issue)</li>
            <li><strong>ETIMEDOUT:</strong> Server is not responding within timeout</li>
            <li><strong>401 Unauthorized:</strong> Credentials are invalid</li>
            <li><strong>CORS Error:</strong> Browser blocked the request due to CORS policy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DiagnosticsPage;
