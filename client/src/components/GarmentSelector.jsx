import React from 'react';
import { Check } from 'lucide-react';

const GARMENT_OPTIONS = [
  {
    id: 'Shirt',
    name: 'Classic Bespoke Shirt',
    subtitle: 'Formal / Casual Button-down',
    basePrice: 600,
    badge: 'Primary MVP',
    description: 'Crisp structured collar, button placket, tailored armholes, and single/double chest pocket options.',
    silhouetteIcon: (color = '#4f46e5') => (
      <svg viewBox="0 0 100 100" className="garment-icon-svg">
        <path d="M30,15 L20,20 L10,40 L22,46 L26,30 L26,90 L74,90 L74,30 L78,46 L90,40 L80,20 L70,15 Z" fill={color} opacity="0.9" />
        <polygon points="50,26 38,15 48,13 50,18" fill="#ffffff" />
        <polygon points="50,26 62,15 52,13 50,18" fill="#ffffff" />
        <line x1="50" y1="26" x2="50" y2="90" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="1 2" />
      </svg>
    )
  },
  {
    id: 'T-Shirt',
    name: 'Modern Tailored T-Shirt',
    subtitle: 'Crew / V-Neck Casual',
    basePrice: 450,
    badge: 'Popular Everyday',
    description: 'Seamless relaxed contour, comfortable shoulder drop, breathable knit construction.',
    silhouetteIcon: (color = '#4f46e5') => (
      <svg viewBox="0 0 100 100" className="garment-icon-svg">
        <path d="M32,18 C40,24 60,24 68,18 L85,26 L76,46 L68,40 L68,90 L32,90 L32,40 L24,46 L15,26 Z" fill={color} opacity="0.9" />
        <path d="M40,18 C45,24 55,24 60,18" stroke="#ffffff" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'Kurta',
    name: 'Ethnic Bespoke Kurta',
    subtitle: 'Mandarin Collar Longline',
    basePrice: 750,
    badge: 'Traditional Sartorial',
    description: 'Extended knee-length drape, mandarin neckband, side slits, and artisanal hand-finished hem.',
    silhouetteIcon: (color = '#4f46e5') => (
      <svg viewBox="0 0 100 100" className="garment-icon-svg">
        <path d="M32,15 L22,19 L15,44 L25,48 L28,32 L28,95 L48,95 L48,80 L52,80 L52,95 L72,95 L72,32 L75,48 L85,44 L78,19 L68,15 Z" fill={color} opacity="0.9" />
        <path d="M45,15 L55,15 L55,36 L45,36 Z" fill="#ffffff" opacity="0.4" />
        <line x1="50" y1="15" x2="50" y2="40" stroke="#ffffff" strokeWidth="2" />
      </svg>
    )
  }
];

const GarmentSelector = ({ selectedGarment, onSelectGarment }) => {
  return (
    <div className="garment-selector-section">
      <div className="section-header">
        <div>
          <span className="step-tag">STEP 01</span>
          <h2 className="section-title">Select Your Garment Foundation</h2>
        </div>
        <p className="section-subtitle">
          Choose the archetype you wish to personalize. Every garment is cut and sewn to your exact specification.
        </p>
      </div>

      <div className="garment-cards-grid">
        {GARMENT_OPTIONS.map((garment) => {
          const isSelected = selectedGarment === garment.id;
          return (
            <div
              key={garment.id}
              className={`garment-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectGarment(garment.id)}
              role="button"
              tabIndex={0}
            >
              <div className="card-top-row">
                <span className={`garment-badge ${isSelected ? 'badge-active' : ''}`}>
                  {garment.badge}
                </span>
                <div className={`selection-checkbox ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>
              </div>

              <div className="garment-svg-preview">
                {garment.silhouetteIcon(isSelected ? '#4f46e5' : '#64748b')}
              </div>

              <div className="garment-details">
                <h3 className="garment-name">{garment.name}</h3>
                <span className="garment-sub">{garment.subtitle}</span>
                <p className="garment-desc">{garment.description}</p>
                <div className="garment-price-row">
                  <span className="base-label">Base Construction</span>
                  <span className="base-price">₹{garment.basePrice}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .garment-selector-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .step-tag {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--accent-primary);
          text-transform: uppercase;
        }

        .section-title {
          font-size: 1.55rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .section-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .garment-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .garment-card {
          background: #ffffff;
          border: 2px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: all var(--transition-normal);
          position: relative;
        }

        .garment-card:hover {
          border-color: var(--accent-border);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .garment-card.selected {
          border-color: var(--accent-primary);
          background: #ffffff;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.12);
        }

        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .garment-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 9999px;
          background: var(--bg-card-subtle);
          color: var(--text-secondary);
        }

        .garment-badge.badge-active {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .selection-checkbox {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          background: #ffffff;
          transition: all 0.2s ease;
        }

        .selection-checkbox.checked {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .garment-svg-preview {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .garment-icon-svg {
          width: 80px;
          height: 80px;
          transition: transform 0.25s ease;
        }

        .garment-card:hover .garment-icon-svg {
          transform: scale(1.06);
        }

        .garment-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .garment-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .garment-sub {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .garment-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-top: 4px;
        }

        .garment-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          margin-top: 8px;
          border-top: 1px dashed var(--border-subtle);
        }

        .base-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .base-price {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        @media (max-width: 900px) {
          .garment-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default GarmentSelector;
