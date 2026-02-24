import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, LogOut, User, Compass, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-header">
          <Link to="/" className="nav-brand" onClick={() => setIsMenuOpen(false)}>
            <Code2 size={36} className="text-primary" />
            Dev<span>Connect</span>
          </Link>
          <button className="nav-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
          <li>
            <Link to="/profiles" className={`nav-link ${location.pathname === '/profiles' ? 'active-link' : ''}`}>
              <Compass size={18} /> Discover
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active-link' : ''}`} onClick={() => setIsMenuOpen(false)}>
                  <User size={18} /> Dashboard
                </Link>
              </li>
              <li className="nav-btn-wrapper">
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="btn btn-secondary flex items-center gap-2" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active-link' : ''}`} onClick={() => setIsMenuOpen(false)}>Login</Link>
              </li>
              <li className="nav-btn-wrapper">
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }} onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
