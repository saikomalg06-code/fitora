import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Lightbulb, RefreshCw, AlertCircle } from 'lucide-react';

const OCCASIONS = ['Casual', 'College', 'Formal', 'Party'];
const WEATHERS = ['Hot', 'Moderate', 'Cold'];
const PRIORITIES = ['Comfort', 'Style', 'Formal', 'Casual'];

const RecommendationCard = ({
  garment,
  preferences,
  setPreferences,
  recommendation,
  setRecommendation,
  onApplyRecommendation
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const updatePreference = (key, value) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };

  const handleFetchRecommendation = async () => {
    setLoading(true);
    setErrorMsg('');
    setAppliedSuccess(false);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garment,
          occasion: preferences.occasion,
          weather: preferences.weather,
          priority: preferences.priority
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        setRecommendation(data.data);
      } else {
        throw new Error(data.message || 'Unable to compute recommendation');
      }
    } catch (err) {
      console.warn('Backend API request failed, applying algorithmic client-side recommendation engine:', err);
      // Seamless algorithmic fallback matching backend rules
      let recFabric = 'Cotton';
      let recColor = 'Blue';
      let recFit = 'Regular';
      let reasons = [];

      if (preferences.weather === 'Hot') {
        recFabric = preferences.occasion === 'Formal' || preferences.priority === 'Style' ? 'Linen' : 'Cotton';
        reasons.push(`${recFabric} provides superior breathability and heat dissipation in hot conditions.`);
      } else if (preferences.weather === 'Cold') {
        recFabric = 'Denim';
        reasons.push('Denim brings insulating weight and wind-shielding density in cooler weather.');
      } else {
        recFabric = preferences.occasion === 'Formal' ? 'Cotton' : preferences.occasion === 'Party' ? 'Linen' : 'Cotton';
        reasons.push(`${recFabric} balances tailored structure and versatile comfort.`);
      }

      if (preferences.occasion === 'Formal') {
        recFit = preferences.priority === 'Comfort' ? 'Regular' : 'Slim';
        recColor = preferences.weather === 'Hot' ? 'White' : 'Blue';
        reasons.push(`${recFit} fit with a classic tone creates a refined, professional presentation.`);
      } else if (preferences.occasion === 'Party') {
        recFit = 'Slim';
        recColor = preferences.priority === 'Style' ? 'Black' : 'Red';
        reasons.push('Slim fit sculpts modern lines suitable for evening outings.');
      } else {
        recFit = preferences.priority === 'Comfort' ? 'Loose' : 'Regular';
        recColor = preferences.weather === 'Cold' ? 'Black' : 'Blue';
        reasons.push(`${recFit} fit ensures everyday ease of motion.`);
      }

      setRecommendation({
        fabric: recFabric,
        color: recColor,
        fit: recFit,
        reason: reasons.join(' ')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (recommendation && onApplyRecommendation) {
      onApplyRecommendation(recommendation);
      setAppliedSuccess(true);
      setTimeout(() => setAppliedSuccess(false), 3000);
    }
  };

  return (
    <div className="recommendation-engine-container">
      <div className="section-header">
        <div className="header-badge-row">
          <span className="step-tag">STEP 04</span>
          <span className="ai-badge">RULE-BASED INTELLIGENCE</span>
        </div>
        <h2 className="section-title">FITORA Smart Recommendation Engine</h2>
        <p className="section-subtitle">
          Input your contextual parameters. Our sartorial rule engine calculates the ideal fabric weave, color palette, and contour silhouette.
        </p>
      </div>

      {/* Input Matrix */}
      <div className="preferences-input-grid">
        {/* Occasion */}
        <div className="pref-box">
          <label className="pref-label">Intended Occasion</label>
          <div className="pref-options-row">
            {OCCASIONS.map((occ) => {
              const isSelected = preferences.occasion === occ;
              return (
                <button
                  key={occ}
                  type="button"
                  className={`pref-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => updatePreference('occasion', occ)}
                >
                  {occ}
                </button>
              );
            })}
          </div>
        </div>

        {/* Weather */}
        <div className="pref-box">
          <label className="pref-label">Climate / Weather</label>
          <div className="pref-options-row">
            {WEATHERS.map((w) => {
              const isSelected = preferences.weather === w;
              return (
                <button
                  key={w}
                  type="button"
                  className={`pref-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => updatePreference('weather', w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </div>

        {/* Priority */}
        <div className="pref-box">
          <label className="pref-label">Style Priority</label>
          <div className="pref-options-row">
            {PRIORITIES.map((p) => {
              const isSelected = preferences.priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  className={`pref-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => updatePreference('priority', p)}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <div className="action-row">
        <button
          type="button"
          className="btn-accent run-rec-btn"
          onClick={handleFetchRecommendation}
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="spin-icon" />
              <span>Analyzing Tailoring Matrix...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Smart Recommendation</span>
            </>
          )}
        </button>
      </div>

      {/* Recommendation Results Presentation */}
      {recommendation?.fabric && (
        <div className="recommendation-result-box">
          <div className="rec-box-top">
            <div className="rec-title-wrap">
              <Lightbulb size={20} className="rec-icon" />
              <h3 className="rec-header">FITORA SMART RECOMMENDATION</h3>
            </div>
            <span className="rec-status-tag">OPTIMAL TAILORING MATCH</span>
          </div>

          <div className="rec-attributes-grid">
            <div className="rec-attribute-card">
              <span className="rec-attr-label">RECOMMENDED FABRIC</span>
              <span className="rec-attr-val">{recommendation.fabric}</span>
            </div>
            <div className="rec-attribute-card">
              <span className="rec-attr-label">RECOMMENDED FIT</span>
              <span className="rec-attr-val">{recommendation.fit}</span>
            </div>
            <div className="rec-attribute-card">
              <span className="rec-attr-label">RECOMMENDED COLOR</span>
              <span className="rec-attr-val">{recommendation.color}</span>
            </div>
          </div>

          <div className="rec-why-box">
            <span className="why-tag">WHY THIS MATCH?</span>
            <p className="why-text">{recommendation.reason}</p>
          </div>

          <div className="rec-footer-actions">
            <button
              type="button"
              className="btn-primary apply-rec-btn"
              onClick={handleApply}
            >
              {appliedSuccess ? (
                <>
                  <Check size={16} color="#10b981" />
                  <span>Applied to Garment Preview!</span>
                </>
              ) : (
                <>
                  <span>Apply Recommendation to Customizer</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .recommendation-engine-container {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .header-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .ai-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent-primary);
          background: var(--accent-light);
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .preferences-input-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .pref-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pref-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .pref-options-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .pref-btn {
          flex: 1;
          min-width: 65px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 8px 10px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: center;
          transition: all 0.2s ease;
        }

        .pref-btn:hover {
          background: #ffffff;
          border-color: var(--border-medium);
        }

        .pref-btn.active {
          background: var(--text-primary);
          color: #ffffff;
          border-color: var(--text-primary);
        }

        .action-row {
          display: flex;
        }

        .run-rec-btn {
          width: 100%;
          padding: 13px 20px;
          font-size: 0.95rem;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Result Presentation */
        .recommendation-result-box {
          background: #faf5ff;
          border: 1.5px solid #d8b4fe;
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .rec-box-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .rec-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rec-icon {
          color: #7c3aed;
        }

        .rec-header {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: #581c87;
        }

        .rec-status-tag {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          background: #ede9fe;
          color: #6b21a8;
          padding: 4px 10px;
          border-radius: 9999px;
        }

        .rec-attributes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .rec-attribute-card {
          background: #ffffff;
          border: 1px solid #e9d5ff;
          border-radius: var(--radius-md);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .rec-attr-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #7e22ce;
          letter-spacing: 0.05em;
        }

        .rec-attr-val {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .rec-why-box {
          background: #ffffff;
          border: 1px solid #e9d5ff;
          border-radius: var(--radius-md);
          padding: 14px;
        }

        .why-tag {
          display: block;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #6b21a8;
          margin-bottom: 4px;
        }

        .why-text {
          font-size: 0.88rem;
          color: var(--text-primary);
          line-height: 1.55;
        }

        .rec-footer-actions {
          display: flex;
          justify-content: flex-end;
        }

        .apply-rec-btn {
          padding: 10px 22px;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .preferences-input-grid, .rec-attributes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default RecommendationCard;
