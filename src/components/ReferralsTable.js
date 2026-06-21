import React from 'react';
import '../styles/ReferralsTable.css';

function ReferralsTable({
  referrals,
  totalReferrals,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
  onRowClick
}) {
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

  const startEntry = totalReferrals > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * itemsPerPage, totalReferrals);

  return (
    <section className="referrals-table-section">
      <h2>All referrals</h2>

      <div className="table-controls">
        <input
          type="text"
          placeholder="Name or service…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search referrals"
        />

        <div className="sort-control">
          <label htmlFor="sort-select">Sort by date</label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        {referrals.length > 0 ? (
          <table className="referrals-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral) => (
                <tr
                  key={referral.id}
                  className="table-row"
                  onClick={() => onRowClick(referral.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{referral.name}</td>
                  <td>{referral.serviceName}</td>
                  <td>{formatDate(referral.date)}</td>
                  <td>{formatProfit(referral.profit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">No matching entries</div>
        )}
      </div>

      {referrals.length > 0 && (
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {totalPages <= 5 ? (
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))
          ) : (
            <>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                if (currentPage <= 3) return i + 1;
                if (currentPage >= totalPages - 2) return totalPages - 4 + i;
                return currentPage - 2 + i;
              }).map((page) => (
                <button
                  key={page}
                  className={`pagination-page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </>
          )}

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <div className="pagination-info">
        Showing {startEntry}–{endEntry} of {totalReferrals} entries
      </div>
    </section>
  );
}

export default ReferralsTable;
