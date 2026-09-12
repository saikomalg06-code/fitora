import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { ArrowRight, Scissors, Sparkles, CheckCircle2, Ruler, Shield, Layers, HelpCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page-view">
      {/* Hero Section */}
      <Hero />

      {/* Process Flow Section */}
      <section className="workflow-section">
        <div className="section-container">
          <div className="section-title-center">
            <span className="section-pill">HOW FITORA WORKS</span>
            <h2 className="section-heading">From Millimeter Sizing to Finished Garment</h2>
            <p className="section-lead">
              A frictionless 6-step flow bridging bespoke tailoring craftsmanship with digital pattern drafting.
            </p>
          </div>

          <div className="flow-steps-grid">
            <div className="flow-step-card">
              <span className="step-num">01</span>
              <h3 className="step-title">Select Garment</h3>
              <p className="step-desc">Pick your canvas archetype: Classic Shirt, Tailored T-Shirt, or Longline Kurta.</p>
            </div>
            <div className="flow-step-card">
              <span className="step-num">02</span>
              <h3 className="step-title">Calibrate Fit</h3>
              <p className="step-desc">Choose a standardized benchmark or enter exact custom centimeter measurements.</p>
            </div>
            <div className="flow-step-card">
              <span className="step-num">03</span>
              <h3 className="step-title">Curate Attributes</h3>
              <p className="step-desc">Select premium textile weave, collar profile, sleeve cut, pockets, and custom palette.</p>
            </div>
            <div className="flow-step-card">
              <span className="step-num">04</span>
              <h3 className="step-title">Smart Intelligence</h3>
              <p className="step-desc">Our rule-based engine recommends ideal fabrics and cuts for your occasion and climate.</p>
            </div>
            <div className="flow-step-card">
              <span className="step-num">05</span>
              <h3 className="step-title">Live Preview</h3>
              <p className="step-desc">Watch real-time SVG rendering update instantaneously with every parameter change.</p>
            </div>
            <div className="flow-step-card">
              <span className="step-num">06</span>
              <h3 className="step-title">Tech Pack Spec</h3>
              <p className="step-desc">Generate an industrial tech pack ready for direct garment factory laydown and cutting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Hackathon Thesis Quote Section */}
      <section className="thesis-banner-section">
        <div className="section-container">
          <div className="thesis-banner">
            <div className="thesis-quote-mark">“</div>
            <h2 className="thesis-quote">
              Instead of making customers fit into clothes, FITORA makes clothes fit the customer.
            </h2>
            <div className="thesis-author">
              <span className="author-name">FITORA PHILOSOPHY</span>
              <span className="author-tag">Solving Fixed Standard S/M/L Sizing</span>
            </div>
            <div className="thesis-cta">
              <Link to="/customize" className="btn-accent thesis-btn">
                <span>Experience Bespoke Customizer</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="section-container footer-content">
          <div className="footer-left">
            <div className="footer-brand">FITORA</div>
            <p className="footer-tagline">Your Fit. Your Style. Your Creation.</p>
            <p className="footer-desc">AI-Powered Personalized Clothing Customizer — Hackathon MVP.</p>
          </div>
          <div className="footer-right">
            <Link to="/customize" className="footer-link">Customizer</Link>
            <Link to="/specification" className="footer-link">Tech Packs</Link>
            <span className="footer-meta">MERN Stack • React + Express + MongoDB</span>
          </div>
        </div>
      </footer>

      <style>{`
        .home-page-view {
          display: flex;
          flex-direction: column;
        }

        .section-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .workflow-section {
          padding: 72px 0;
          background: #ffffff;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .section-title-center {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 52px auto;
        }

        .section-pill {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--accent-primary);
          text-transform: uppercase;
        }

        .section-heading {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 6px;
        }

        .section-lead {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .flow-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .flow-step-card {
          background: var(--bg-main);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          transition: all 0.2s ease;
        }

        .flow-step-card:hover {
          border-color: var(--accent-border);
          transform: translateY(-3px);
          box-shadow: var(--shadow-sm);
        }

        .step-num {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-border);
          line-height: 1;
        }

        .step-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .step-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .thesis-banner-section {
          padding: 72px 0;
          background: var(--bg-main);
        }

        .thesis-banner {
          background: #0f172a;
          color: #ffffff;
          border-radius: var(--radius-xl);
          padding: 60px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .thesis-quote-mark {
          font-family: serif;
          font-size: 6rem;
          line-height: 1;
          color: rgba(255, 255, 255, 0.1);
          margin-bottom: -30px;
        }

        .thesis-quote {
          font-size: 2rem;
          font-weight: 700;
          max-width: 800px;
          margin: 0 auto 24px auto;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        .thesis-author {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 32px;
        }

        .author-name {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #818cf8;
        }

        .author-tag {
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .thesis-btn {
          padding: 14px 32px;
          font-size: 1rem;
        }

        .home-footer {
          padding: 40px 0;
          background: #ffffff;
          border-top: 1px solid var(--border-subtle);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-brand {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .footer-tagline {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .footer-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer-link {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .footer-link:hover {
          color: var(--accent-primary);
        }

        .footer-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: var(--bg-card-subtle);
          padding: 4px 10px;
          border-radius: 9999px;
        }

        @media (max-width: 900px) {
          .flow-steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .thesis-banner {
            padding: 40px 24px;
          }
          .thesis-quote {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .flow-steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
