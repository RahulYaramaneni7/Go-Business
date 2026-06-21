import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <p className="error-title">Page not found</p>
          <Link to="/" className="back-button">Back to dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
