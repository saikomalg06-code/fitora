import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    register
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (mode) => {
    setAuthModalMode(mode);
    setError('');
    setSuccessMsg('');
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={closeAuthModal} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-badge-pill">
            <Sparkles size={13} className="sparkle" />
            <span>FITORA ACCOUNT</span>
          </div>
          <h2 className="auth-title">
            {authModalMode === 'login' ? 'Welcome Back' : 'Create Your Fit Profile'}
          </h2>
          <p className="auth-subtitle">
            {authModalMode === 'login'
              ? 'Sign in to access your saved bespoke specs and manufacturing records.'
              : 'Register to archive custom measurements, track orders, and save designs.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${authModalMode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authModalMode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Create Account
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="auth-alert error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert success">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {authModalMode === 'register' && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">Full Name</label>
              <div className="input-with-icon">
                <User size={16} className="field-icon" />
                <input
                  id="auth-name"
                  type="text"
                  required
                  className="form-input with-left-icon"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} className="field-icon" />
              <input
                id="auth-email"
                type="email"
                required
                className="form-input with-left-icon"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">Password</label>
            <div className="input-with-icon">
              <Lock size={16} className="field-icon" />
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                className="form-input with-left-icon"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-accent auth-submit-btn" disabled={loading}>
            <span>{loading ? 'Authenticating...' : authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Switch Link */}
        <div className="auth-footer-switch">
          {authModalMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button type="button" className="link-btn" onClick={() => switchMode('register')}>
                Sign up free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button type="button" className="link-btn" onClick={() => switchMode('login')}>
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>

      <style>{`
        .auth-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        .auth-modal-card {
          background: #ffffff;
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 440px;
          padding: 32px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-subtle);
          position: relative;
          animation: scaleUp 0.25s ease;
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .auth-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-card-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .auth-close-btn:hover {
          background: #e2e8f0;
          color: var(--text-primary);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .auth-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--accent-primary);
          background: var(--accent-light);
          padding: 3px 10px;
          border-radius: 9999px;
          margin-bottom: 8px;
        }

        .auth-title {
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .auth-subtitle {
          font-size: 0.84rem;
          color: var(--text-secondary);
          margin-top: 4px;
          line-height: 1.45;
        }

        .auth-tabs {
          display: flex;
          background: var(--bg-card-subtle);
          padding: 4px;
          border-radius: var(--radius-md);
          gap: 4px;
          margin-bottom: 18px;
        }

        .auth-tab-btn {
          flex: 1;
          padding: 8px 12px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .auth-tab-btn.active {
          background: #ffffff;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .auth-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          margin-bottom: 14px;
        }

        .auth-alert.error {
          background: #fff1f2;
          color: #be123c;
          border: 1px solid #fecdd3;
        }

        .auth-alert.success {
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .form-input.with-left-icon {
          padding-left: 40px;
        }

        .auth-submit-btn {
          width: 100%;
          padding: 12px;
          margin-top: 4px;
          font-size: 0.95rem;
        }

        .auth-footer-switch {
          text-align: center;
          margin-top: 18px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .link-btn {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
