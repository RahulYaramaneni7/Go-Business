import React from 'react';
import '../styles/OverviewSection.css';

function OverviewSection({ metrics }) {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  return (
    <section className="overview-section" role="region" aria-label="Overview metrics">
      <h2>Overview</h2>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.id} className="metric-card">
            <div className="metric-icon">
              <div className="icon-circle"></div>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OverviewSection;
