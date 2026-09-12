import React from 'react';
import { IndianRupee, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const PriceSummary = ({
  garment = 'Shirt',
  sizeType = 'standard',
  design = {},
  onProceedToSpec
}) => {
  // Base Price
  let basePrice = 600;
  if (garment === 'T-Shirt') basePrice = 450;
  if (garment === 'Kurta') basePrice = 750;

  // Measurement surcharge
  const measurementSurcharge = sizeType === 'custom' ? 100 : 0;

  // Fabric surcharge
  const fabric = design.fabric || 'Cotton';
  let fabricSurcharge = 50;
  if (fabric === 'Linen') fabricSurcharge = 100;
  else if (fabric === 'Denim') fabricSurcharge = 120;
  else if (fabric === 'Polyester') fabricSurcharge = 0;

  // Pockets surcharge
  const pockets = Number(design.pockets || 0);
  const pocketSurcharge = pockets === 2 ? 50 : 0;

  // Premium Fit surcharge (e.g. Slim with special styling)
  const isPremiumStyling = design.fit === 'Slim' && design.sleeves === 'Full';
  const premiumSurcharge = isPremiumStyling ? 50 : 0;

  // Total
  const estimatedPrice = basePrice + measurementSurcharge + fabricSurcharge + pocketSurcharge + premiumSurcharge;

  // Production Time Calculation
  let productionTime = '3–5 Days';
  const isCustom = sizeType === 'custom';
  const isComplex = (fabric === 'Denim' || fabric === 'Linen') && pockets >= 2;

  if (isCustom && isComplex) {
    productionTime = '7–10 Days';
  } else if (isCustom || isComplex) {
    productionTime = '5–7 Days';
  }

  return (
    <div className="price-summary-card">
      <div className="summary-header">
        <div className="header-left">
          <span className="step-tag">STEP 05</span>
          <h3 className="card-title">Commercial Estimate & Lead Time</h3>
        </div>
        <div className="lead-time-pill">
          <Clock size={15} />
          <span>Estimated Production: <strong>{productionTime}</strong></span>
        </div>
      </div>

      {/* Dynamic Breakdown Table */}
      <div className="breakdown-list">
        <div className="breakdown-item">
          <span className="item-label">
            Base Construction ({garment})
          </span>
          <span className="item-value">₹{basePrice}</span>
        </div>

        {sizeType === 'custom' && (
          <div className="breakdown-item surcharge">
            <span className="item-label">
              Bespoke Pattern Drafting (Custom Measurements)
            </span>
            <span className="item-value">+₹{measurementSurcharge}</span>
          </div>
        )}

        <div className="breakdown-item surcharge">
          <span className="item-label">
            Selected Textile Weave ({fabric})
          </span>
          <span className="item-value">{fabricSurcharge > 0 ? `+₹${fabricSurcharge}` : 'Included'}</span>
        </div>

        {pocketSurcharge > 0 && (
          <div className="breakdown-item surcharge">
            <span className="item-label">
              Dual Utility Pockets (+1 Extra)
            </span>
            <span className="item-value">+₹{pocketSurcharge}</span>
          </div>
        )}

        {premiumSurcharge > 0 && (
          <div className="breakdown-item surcharge">
            <span className="item-label">
              Precision Tapered Darting (Slim Fit & Cuffs)
            </span>
            <span className="item-value">+₹{premiumSurcharge}</span>
          </div>
        )}
      </div>

      {/* Prominent Estimated Price Total */}
      <div className="total-price-banner">
        <div className="total-left">
          <span className="total-tag">TRANSPARENT VALUE</span>
          <div className="prominent-price-display">
            Estimated Price: <span className="price-number">₹{estimatedPrice}</span>
          </div>
          <span className="estimate-disclaimer">* The price is an estimate based on current raw fabric and custom tailoring specifications.</span>
        </div>

        {onProceedToSpec && (
          <button
            type="button"
            className="btn-accent proceed-spec-btn"
            onClick={onProceedToSpec}
          >
            <span>Review Production Tech Pack</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <style>{`
        .price-summary-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .lead-time-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-light);
          color: var(--accent-primary);
          border: 1px solid var(--accent-border);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.82rem;
        }

        .breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .breakdown-item.surcharge {
          color: var(--text-primary);
        }

        .item-label {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .item-value {
          font-weight: 700;
          color: var(--text-primary);
        }

        .total-price-banner {
          background: #f8fafc;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 6px;
        }

        .total-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .total-tag {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--emerald-accent);
          text-transform: uppercase;
        }

        .prominent-price-display {
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .price-number {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--accent-primary);
          margin-left: 6px;
        }

        .estimate-disclaimer {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .proceed-spec-btn {
          padding: 12px 26px;
          font-size: 0.92rem;
        }

        @media (max-width: 640px) {
          .total-price-banner {
            flex-direction: column;
            align-items: flex-start;
          }
          .proceed-spec-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default PriceSummary;
