import React from 'react';
import '../styles/ServiceSummarySection.css';

function ServiceSummarySection({ serviceSummary }) {
  if (!serviceSummary) {
    return null;
  }

  const { service, yourReferrals, activeReferrals, totalRefEarnings } = serviceSummary;

  return (
    <section className="service-summary-section" aria-label="Service summary">
      <h2>Service summary</h2>
      <div className="summary-table-wrapper">
        <table className="summary-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Your Referrals</th>
              <th>Active Referrals</th>
              <th>Total Ref. Earnings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{service}</td>
              <td>{yourReferrals}</td>
              <td>{activeReferrals}</td>
              <td>{totalRefEarnings}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ServiceSummarySection;
