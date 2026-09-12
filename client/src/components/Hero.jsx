import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Ruler, Cpu, Eye, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Top Tag */}
        <div className="hero-badge-pill">
          <Sparkles size={15} className="hero-badge-sparkle" />
          <span>AI-POWERED BESPOKE FASHION PLATFORM</span>
        </div>

        {/* Main Hero Header */}
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-brand-sub">FITORA</span>
            <h1 className="hero-title">
              Your Fit.<br />
              Your Style.<br />
              <span className="hero-title-accent">Your Creation.</span>
            </h1>

            <p className="hero-tagline-desc">
              Design clothing around you, not around fixed sizes. We replace generic S/M/L racks with personal millimeter measurements and smart design recommendations.
            </p>

            <div className="hero-cta-group">
              <Link to="/customize" className="btn-accent hero-cta-btn">
                <span>Start Customizing</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/specification" className="btn-secondary">
                <span>View Tech Packs</span>
              </Link>
            </div>

            {/* Micro proof metrics */}
            <div className="hero-proof-bar">
              <div className="proof-item">
                <CheckCircle2 size={16} className="proof-icon" />
                <span>Zero Size Compromises</span>
              </div>
              <div className="proof-item">
                <CheckCircle2 size={16} className="proof-icon" />
                <span>Smart Style Rules</span>
              </div>
              <div className="proof-item">
                <ShieldCheck size={16} className="proof-icon" />
                <span>Factory-Ready Specs</span>
              </div>
            </div>
          </div>

          {/* Interactive Garment Showcase Card */}
          <div className="hero-visual-card">
            <div className="visual-card-inner">
              <div className="visual-header">
                <span className="spec-badge">PROTOTYPE PREVIEW</span>
                <span className="garment-type-badge">BESPOKE SHIRT</span>
              </div>

              {/* Garment Silhouette SVG Graphic */}
              <div className="garment-showcase-svg-wrap">
                <svg viewBox="0 0 280 300" className="showcase-svg">
                  <defs>
                    <linearGradient id="heroFabricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#312e81" />
                    </linearGradient>
                    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.12" />
                    </filter>
                  </defs>

                  {/* Shirt Body Silhouette */}
                  <path
                    d="M 85 45 L 60 55 L 35 110 L 65 125 L 75 90 L 75 250 L 205 250 L 205 90 L 215 125 L 245 110 L 220 55 L 195 45 Z"
                    fill="url(#heroFabricGrad)"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    filter="url(#cardShadow)"
                  />
                  {/* Collar */}
                  <polygon points="140,75 105,45 130,40 140,50" fill="#ffffff" opacity="0.95" />
                  <polygon points="140,75 175,45 150,40 140,50" fill="#ffffff" opacity="0.95" />
                  <polygon points="120,40 160,40 140,55" fill="#312e81" />
                  {/* Placket line and buttons */}
                  <line x1="140" y1="75" x2="140" y2="250" stroke="#ffffff" strokeWidth="2" strokeDasharray="1 3" />
                  <circle cx="140" cy="100" r="2.5" fill="#ffffff" />
                  <circle cx="140" cy="130" r="2.5" fill="#ffffff" />
                  <circle cx="140" cy="160" r="2.5" fill="#ffffff" />
                  <circle cx="140" cy="190" r="2.5" fill="#ffffff" />
                  <circle cx="140" cy="220" r="2.5" fill="#ffffff" />
                  {/* Chest Pocket */}
                  <rect x="90" y="105" width="28" height="34" rx="3" fill="#ffffff" opacity="0.25" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Measurement Callout Lines */}
                  <line x1="20" y1="130" x2="65" y2="130" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="20" cy="130" r="3" fill="#f59e0b" />
                  <text x="5" y="122" fill="#f59e0b" fontSize="10" fontWeight="700">Chest 40cm</text>
                  
                  <line x1="215" y1="210" x2="260" y2="210" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="260" cy="210" r="3" fill="#10b981" />
                  <text x="210" y="225" fill="#10b981" fontSize="10" fontWeight="700">Tailored Hem</text>
                </svg>
              </div>

              {/* Live Spec Teaser floating on card */}
              <div className="showcase-meta-box">
                <div>
                  <div className="meta-label">FIT PROFILE</div>
                  <div className="meta-val">Regular Combed Cotton</div>
                </div>
                <div className="meta-divider" />
                <div>
                  <div className="meta-label">LEAD TIME</div>
                  <div className="meta-val">5–7 Days</div>
                </div>
                <div className="meta-divider" />
                <div>
                  <div className="meta-label">PRICE</div>
                  <div className="meta-price">₹850</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Supporting Feature Cards as specified */}
        <div className="hero-features-grid">
          <div className="feature-card">
            <div className="feature-icon-box">
              <Ruler size={24} className="feat-icon" />
            </div>
            <h3 className="feature-title">Personalized Fit</h3>
            <p className="feature-desc">
              Customize garments using your measurements. Break free from rigid S/M/L sizing with precision chest, shoulder, waist, and sleeve inputs.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <Cpu size={24} className="feat-icon" />
            </div>
            <h3 className="feature-title">Smart Recommendations</h3>
            <p className="feature-desc">
              Get fabric, color and fit suggestions based on your preferences. Our recommendation engine aligns with your occasion, climate, and priority.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <Eye size={24} className="feat-icon" />
            </div>
            <h3 className="feature-title">Live Preview</h3>
            <p className="feature-desc">
              See your customized garment before ordering. Inspect changes in hue, collar, sleeve style, fabric texture, and pockets dynamically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <FileText size={24} className="feat-icon" />
            </div>
            <h3 className="feature-title">Production Ready</h3>
            <p className="feature-desc">
              Generate a detailed garment specification. Receive a professional manufacturer-ready tech pack complete with exact tailoring metrics.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 48px 24px 72px 24px;
          background: radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 90% 80%, rgba(217, 119, 6, 0.04) 0%, transparent 40%);
        }

        .hero-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        .hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
          margin-bottom: 24px;
        }

        .hero-badge-sparkle {
          color: var(--accent-primary);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 56px;
          margin-bottom: 64px;
        }

        .hero-brand-sub {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--text-secondary);
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }

        .hero-title {
          font-size: 3.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .hero-title-accent {
          color: var(--accent-primary);
          position: relative;
          display: inline-block;
        }

        .hero-tagline-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 32px;
          max-width: 520px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .hero-cta-btn {
          padding: 14px 32px;
          font-size: 1.05rem;
        }

        .hero-proof-bar {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }

        .proof-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .proof-icon {
          color: var(--emerald-accent);
        }

        .hero-visual-card {
          background: #ffffff;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-subtle);
          padding: 24px;
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
        }

        .visual-card-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .visual-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .spec-badge {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          background: var(--accent-light);
          padding: 4px 10px;
          border-radius: 9999px;
        }

        .garment-type-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .garment-showcase-svg-wrap {
          width: 100%;
          max-width: 280px;
          height: 290px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .showcase-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 12px 20px rgba(15, 23, 42, 0.08));
        }

        .showcase-meta-box {
          width: 100%;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
        }

        .meta-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .meta-val {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .meta-price {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--emerald-accent);
        }

        .meta-divider {
          width: 1px;
          height: 28px;
          background: var(--border-medium);
        }

        .hero-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-border);
        }

        .feature-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--accent-light);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .feature-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .feature-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 640px) {
          .hero-features-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
