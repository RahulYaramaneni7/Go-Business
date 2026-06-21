import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { apiService } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OverviewSection from '../components/OverviewSection';
import ServiceSummarySection from '../components/ServiceSummarySection';
import ShareReferralSection from '../components/ShareReferralSection';
import ReferralsTable from '../components/ReferralsTable';
import '../styles/DashboardPage.css';

function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    fetchReferrals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortOrder]);

  const fetchReferrals = async () => {
    setLoading(true);
    setError('');
    try {
      const token = Cookies.get('jwt_token') || localStorage.getItem('jwt_token');
      if (!token) {
        setError('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      const params = {};
      if (searchTerm) {
        params.search = searchTerm;
      }
      params.sort = sortOrder;

      const response = await apiService.getReferrals(params);

      if (response.data && response.data.success && response.data.data) {
        setData(response.data.data);
        setCurrentPage(1);
      } else {
        setError('Failed to load referrals data. Please refresh the page.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
      } else if (err.response?.status === 403) {
        setError('Access denied. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Failed to load referrals. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReferralClick = (id) => {
    navigate(`/referral/${id}`);
  };

  // Get paginated referrals
  const referrals = data?.referrals || [];
  const totalPages = Math.ceil(referrals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReferrals = referrals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      
      <main className="dashboard-container">
        <section className="dashboard-header">
          <h1>Referral Dashboard</h1>
          <p>Track your referrals, earnings, and partner activity in one place.</p>
        </section>

        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message" role="alert">{error}</div>}

        {!loading && data && (
          <>
            <OverviewSection metrics={data.metrics} />
            <ServiceSummarySection serviceSummary={data.serviceSummary} />
            <ShareReferralSection referral={data.referral} />
            <ReferralsTable
              referrals={paginatedReferrals}
              totalReferrals={referrals.length}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onRowClick={handleReferralClick}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default DashboardPage;
