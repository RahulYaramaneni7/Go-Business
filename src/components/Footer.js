import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">Go Business</div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
        </nav>
        <div className="footer-copyright">© 2024 Go Business</div>
      </div>
    </footer>
  );
}

export default Footer;
