import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" aria-label="Go to dashboard home">
          Go Business
        </Link>
        <div className="navbar-nav" role="navigation" aria-label="Primary">
          <Link to="/" className="nav-link">Home</Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
