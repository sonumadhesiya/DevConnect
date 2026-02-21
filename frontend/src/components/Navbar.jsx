import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, LogOut, User, Users, Compass } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <Code2 size={36} className="text-primary" />
          Dev<span>Connect</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/profiles" className={`nav-link ${location.pathname === '/profiles' ? 'active-link' : ''}`}>
              <Compass size={18} /> Discover
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active-link' : ''}`}>
                  <User size={18} /> Dashboard
                </Link>
              </li>
              <li style={{ marginLeft: '1rem' }}>
                <button onClick={logout} className="btn btn-secondary flex items-center gap-2" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active-link' : ''}`}>Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
