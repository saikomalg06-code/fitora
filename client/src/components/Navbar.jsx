import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, FolderHeart, ArrowRight, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <img
            src="https://i.postimg.cc/QtQ49sHR/Chat-GPT-Image-Sep-12-2026-10-38-18-PM.png"
            alt="FITORA"
            className="brand-logo-img"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="brand-text-group">
            <span className="brand-name">FITORA</span>
            <span className="brand-badge">AI CUSTOMIZER</span>
          </div>
        </Link>

        {/* Center Tagline */}
        <div className="nav-tagline-pill">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Your Fit. Your Style. Your Creation.</span>
        </div>

        {/* Right Navigation */}
        <nav className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/customize"
            className={`nav-link ${location.pathname === '/customize' ? 'active' : ''}`}
          >
            Customizer
          </Link>
          <Link
            to="/specification"
            className={`nav-link ${location.pathname === '/specification' ? 'active' : ''}`}
          >
            <FolderHeart size={16} />
            <span>Saved Specs</span>
          </Link>

          {/* User Authentication Menu */}
          {isAuthenticated ? (
            <div className="user-profile-menu">
              <div className="user-pill" title={`Signed in as ${user?.email}`}>
                <div className="user-avatar-initial">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="user-name-display">{user?.name?.split(' ')[0] || 'User'}</span>
              </div>
              <button
                type="button"
                className="btn-secondary btn-sm logout-btn"
                onClick={logout}
                title="Sign Out"
              >
                <LogOut size={14} />
                <span className="logout-text">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="auth-nav-group">
              <button
                type="button"
                className="nav-auth-link"
                onClick={() => openAuthModal('login')}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                className="btn-primary btn-sm auth-signup-btn"
                onClick={() => openAuthModal('register')}
              >
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {location.pathname !== '/customize' && (
            <Link to="/customize" className="btn-accent btn-sm nav-cta">
              <span>Start Customizing</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </nav>
      </div>

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 12px 24px;
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-logo-img {
          height: 44px;
          width: auto;
          max-width: 52px;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
          transition: transform 0.2s ease;
        }

        .brand-logo:hover .brand-logo-img {
          transform: scale(1.05);
        }

        .brand-text-group {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          line-height: 1;
        }

        .brand-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent-primary);
          text-transform: uppercase;
          margin-top: 3px;
        }

        .nav-tagline-pill {
          display: none;
          align-items: center;
          gap: 8px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .sparkle-icon {
          color: var(--accent-primary);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-card-subtle);
        }

        .nav-link.active {
          color: var(--accent-primary);
          background: var(--accent-light);
        }

        .nav-cta {
          padding: 8px 18px;
          font-size: 0.85rem;
        }

        .user-profile-menu {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-subtle);
          padding: 4px 12px 4px 4px;
          border-radius: 9999px;
        }

        .user-avatar-initial {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary) 0%, #6366f1 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
        }

        .user-name-display {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .logout-btn {
          padding: 6px 12px;
          font-size: 0.8rem;
          color: var(--rose-accent);
          border-color: #fecdd3;
        }

        .logout-btn:hover {
          background: #fff1f2;
          color: #be123c;
        }

        .auth-nav-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-auth-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-auth-link:hover {
          color: var(--text-primary);
          background: var(--bg-card-subtle);
        }

        .auth-signup-btn {
          padding: 7px 14px;
          font-size: 0.82rem;
        }

        @media (min-width: 900px) {
          .nav-tagline-pill {
            display: flex;
          }
        }

        @media (max-width: 680px) {
          .nav-tagline-pill {
            display: none;
          }
          .nav-link span {
            display: none;
          }
          .nav-cta span {
            display: none;
          }
          .logout-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
