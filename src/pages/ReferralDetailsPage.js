import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { apiService } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ReferralDetailsPage.css';

function ReferralDetailsPage() {
  const { id } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReferralDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchReferralDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const token = Cookies.get('jwt_token') || localStorage.getItem('jwt_token');
      if (!token) {
        setError('Session expired. Please log in again.');
        return;
      }

      const response = await apiService.getReferral(id);

      if (response.data && response.data.success && response.data.data) {
        const data = response.data.data;
        const referralData = data.data || data.referrals?.[0] || data;
        
        if (referralData && referralData.id && referralData.id === parseInt(id)) {
          setReferral(referralData);
        } else {
          setError('Referral not found');
        }
      } else {
        setError('Referral not found');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please log in again.');
      } else {
        setError('Referral not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const formatProfit = (profit) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(profit);
  };

  return (
    <div className="details-wrapper">
      <Navbar />
      
      <main className="details-container">
        {loading && <div className="loading-message">Loading...</div>}

        {error && (
          <section className="not-found-section">
            <h1>Referral not found</h1>
            <Link to="/" className="back-link">← Back to dashboard</Link>
          </section>
        )}

        {!loading && referral && (
          <section className="details-section">
            <Link to="/" className="back-link">← Back to dashboard</Link>
            
            <h1>Referral Details</h1>
            
            <div className="details-card">
              <h2>{referral.name}</h2>
              
              <dl className="details-list">
                <div className="detail-row">
                  <dt>Referral ID</dt>
                  <dd>{referral.id}</dd>
                </div>
                <div className="detail-row">
                  <dt>Service Name</dt>
                  <dd>{referral.serviceName}</dd>
                </div>
                <div className="detail-row">
                  <dt>Date</dt>
                  <dd>{formatDate(referral.date)}</dd>
                </div>
                <div className="detail-row">
                  <dt>Profit</dt>
                  <dd>{formatProfit(referral.profit)}</dd>
                </div>
              </dl>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ReferralDetailsPage;
