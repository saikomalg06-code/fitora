import React, { useState } from 'react';
import { 
  Printer, 
  Save, 
  Edit3, 
  CheckCircle2, 
  FileSpreadsheet, 
  Clock, 
  Calendar, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const SpecificationCard = ({
  garment = 'Shirt',
  sizeType = 'standard',
  size = 'M',
  measurements = {},
  design = {},
  preferences = {},
  recommendation = {},
  estimatedPrice = 850,
  productionTime = '5–7 Days',
  onEditDesign,
  onSaveSuccess,
  isSavedMode = false,
  savedId = null
}) => {
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(savedId ? 'saved' : 'idle');
  const [currentId, setCurrentId] = useState(savedId);
  const [statusMessage, setStatusMessage] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage('');

    const payload = {
      garment,
      sizeType,
      size,
      measurements: {
        chest: Number(measurements.chest || 40),
        shoulder: Number(measurements.shoulder || 18),
        waist: Number(measurements.waist || 36),
        sleeve: Number(measurements.sleeve || 24),
        length: Number(measurements.length || 28)
      },
      design: {
        color: design.color || 'Blue',
        fabric: design.fabric || 'Cotton',
        fit: design.fit || 'Regular',
        sleeves: design.sleeves || 'Full',
        neckline: design.neckline || 'Collar',
        pockets: Number(design.pockets ?? 1),
        garmentLength: design.garmentLength || 'Regular'
      },
      preferences: {
        occasion: preferences.occasion || 'Casual',
        weather: preferences.weather || 'Moderate',
        priority: preferences.priority || 'Comfort'
      },
      recommendation: {
        fabric: recommendation.fabric || '',
        color: recommendation.color || '',
        fit: recommendation.fit || '',
        reason: recommendation.reason || ''
      },
      estimatedPrice,
      productionTime
    };

    try {
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSaveStatus('saved');
        setCurrentId(data.data._id);
        setStatusMessage('Design specification saved successfully to MongoDB database!');
        if (onSaveSuccess) {
          onSaveSuccess(data.data);
        }
      } else {
        setSaveStatus('error');
        setStatusMessage(data.message || 'Unable to save to database. Please check connection.');
      }
    } catch (err) {
      console.error('Save design network error:', err);
      setSaveStatus('error');
      setStatusMessage('Network failure connecting to API server at http://localhost:5000.');
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const specNumber = currentId ? `FIT-${currentId.slice(-6).toUpperCase()}` : 'FIT-SPEC-DRAFT';

  return (
    <div className="spec-sheet-container">
      {/* Industrial Tech-Pack Header */}
      <div className="spec-header-banner">
        <div className="brand-spec-title">
          <span className="sub-brand">FITORA APPAREL LABS</span>
          <h2 className="main-spec-title">PRODUCTION SPECIFICATION</h2>
          <span className="spec-tagline">Your Fit. Your Style. Your Creation.</span>
        </div>
        <div className="spec-meta-block">
          <div className="meta-row">
            <span className="meta-k">DOC REF:</span>
            <span className="meta-v highlight-mono">{specNumber}</span>
          </div>
          <div className="meta-row">
            <span className="meta-k">DATE:</span>
            <span className="meta-v">{new Date().toLocaleDateString('en-GB')}</span>
          </div>
          <div className="meta-row">
            <span className="meta-k">STATUS:</span>
            <span className="status-badge-ready">READY FOR MANUFACTURING</span>
          </div>
        </div>
      </div>

      {/* Confirmation or Success Banner */}
      {saveStatus === 'saved' && (
        <div className="spec-alert-success">
          <CheckCircle2 size={18} />
          <div>
            <strong>Specification Stored:</strong> Record ID <code>{currentId}</code> is now permanently archived in MongoDB.
          </div>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="spec-alert-error">
          <AlertCircle size={18} />
          <div>
            <strong>Notice:</strong> {statusMessage}
          </div>
        </div>
      )}

      {confirmed && (
        <div className="spec-alert-confirm">
          <ShieldCheck size={20} />
          <div>
            <strong>Design Confirmed!</strong> Production queue slot assigned. Factory pattern-makers will initiate fabric laydown within 24 hours.
          </div>
        </div>
      )}

      {/* Section 1: Garment Archetype */}
      <div className="spec-section-box">
        <div className="spec-sec-title">01. GARMENT CLASSIFICATION</div>
        <div className="spec-grid-three">
          <div className="spec-field">
            <span className="field-label">GARMENT TYPE</span>
            <span className="field-value">{garment}</span>
          </div>
          <div className="spec-field">
            <span className="field-label">SIZING SYSTEM</span>
            <span className="field-value">
              {sizeType === 'custom' ? 'Bespoke Custom Measurements' : `Standard Size (${size})`}
            </span>
          </div>
          <div className="spec-field">
            <span className="field-label">PATTERN CAD TOLERANCE</span>
            <span className="field-value">± 0.5 cm Exacting</span>
          </div>
        </div>
      </div>

      {/* Section 2: Measurements Table */}
      <div className="spec-section-box">
        <div className="spec-sec-title">02. ANTHROPOMETRIC MEASUREMENTS (METRIC)</div>
        <div className="measurements-spec-table">
          <div className="table-head-row">
            <span>PARAMETER</span>
            <span>SPECIFICATION VALUE</span>
            <span>UNIT</span>
            <span>TOLERANCE</span>
          </div>
          <div className="table-body-row">
            <span className="param-name">Chest Circumference</span>
            <span className="param-val">{measurements.chest || 40}</span>
            <span>cm</span>
            <span>±0.5 cm</span>
          </div>
          <div className="table-body-row">
            <span className="param-name">Shoulder Width (Bi-acromial)</span>
            <span className="param-val">{measurements.shoulder || 18}</span>
            <span>cm</span>
            <span>±0.5 cm</span>
          </div>
          <div className="table-body-row">
            <span className="param-name">Natural Waist Circumference</span>
            <span className="param-val">{measurements.waist || 36}</span>
            <span>cm</span>
            <span>±0.5 cm</span>
          </div>
          <div className="table-body-row">
            <span className="param-name">Sleeve Inseam / Length</span>
            <span className="param-val">{measurements.sleeve || 24}</span>
            <span>cm</span>
            <span>±0.5 cm</span>
          </div>
          <div className="table-body-row">
            <span className="param-name">Total Garment Vertical Length</span>
            <span className="param-val">{measurements.length || 28}</span>
            <span>cm</span>
            <span>±0.5 cm</span>
          </div>
        </div>
      </div>

      {/* Section 3: Design & Styling Bill of Materials */}
      <div className="spec-section-box">
        <div className="spec-sec-title">03. BESPOKE DESIGN & TRIMS SPECIFICATION</div>
        <div className="design-attributes-table">
          <div className="design-attr-cell">
            <span className="cell-k">COLOR SPEC</span>
            <span className="cell-v highlight-color">{design.color || 'Blue'}</span>
          </div>
          <div className="design-attr-cell">
            <span className="cell-k">FABRIC WEAVE</span>
            <span className="cell-v">{design.fabric || 'Cotton'}</span>
          </div>
          <div className="design-attr-cell">
            <span className="cell-k">SILHOUETTE FIT</span>
            <span className="cell-v">{design.fit || 'Regular'}</span>
          </div>
          <div className="design-attr-cell">
            <span className="cell-k">SLEEVES DRAFT</span>
            <span className="cell-v">{design.sleeves || 'Full'}</span>
          </div>
          <div className="design-attr-cell">
            <span className="cell-k">COLLAR / NECK</span>
            <span className="cell-v">{design.neckline || 'Collar'}</span>
          </div>
          <div className="design-attr-cell">
            <span className="cell-k">CHEST POCKETS</span>
            <span className="cell-v">{Number(design.pockets ?? 1)}</span>
          </div>
          <div className="design-attr-cell">
            <span className="cell-k">HEMLINE LENGTH</span>
            <span className="cell-v">{design.garmentLength || 'Regular'}</span>
          </div>
          <div className="design-attr-cell">
            <span className="cell-k">STITCH DENSITY</span>
            <span className="cell-v">14 Stitches / Inch</span>
          </div>
        </div>
      </div>

      {/* Section 4: Preferences & Smart Recommendation Log */}
      <div className="spec-section-box">
        <div className="spec-sec-title">04. CONTEXT & SMART RECOMMENDATION LOG</div>
        <div className="spec-grid-two">
          <div className="pref-summary-block">
            <span className="field-label">CLIENT PREFERENCES</span>
            <div className="pref-chips">
              <span>Occasion: <strong>{preferences.occasion || 'Casual'}</strong></span>
              <span>Climate: <strong>{preferences.weather || 'Moderate'}</strong></span>
              <span>Priority: <strong>{preferences.priority || 'Comfort'}</strong></span>
            </div>
          </div>
          <div className="pref-summary-block">
            <span className="field-label">FITORA SMART ENGINE VERDICT</span>
            <p className="rec-text-small">
              {recommendation.reason || 'Optimized for breathable drape and versatile daily comfort.'}
            </p>
          </div>
        </div>
      </div>

      {/* Section 5: Commercial and Lead Schedule */}
      <div className="spec-commercial-box">
        <div className="commercial-col">
          <span className="comm-label">ESTIMATED PRICE</span>
          <span className="comm-value-price">₹{estimatedPrice}</span>
          <span className="comm-sub">* Includes bespoke drafting, textile, & hand finishing</span>
        </div>
        <div className="commercial-divider" />
        <div className="commercial-col">
          <span className="comm-label">ESTIMATED PRODUCTION TIME</span>
          <span className="comm-value-lead">{productionTime}</span>
          <span className="comm-sub">* From CAD confirmation to final QC inspection</span>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="spec-actions-toolbar">
        {onEditDesign && (
          <button
            type="button"
            className="btn-secondary spec-btn"
            onClick={onEditDesign}
          >
            <Edit3 size={16} />
            <span>Edit Design</span>
          </button>
        )}

        <button
          type="button"
          className="btn-accent spec-btn"
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={16} />
          <span>{saving ? 'Saving to Database...' : saveStatus === 'saved' ? 'Re-Save Design' : 'Save Design'}</span>
        </button>

        <button
          type="button"
          className="btn-primary spec-btn"
          onClick={handleConfirm}
        >
          <CheckCircle2 size={16} />
          <span>Confirm Design</span>
        </button>

        <button
          type="button"
          className="btn-secondary spec-btn"
          onClick={handlePrint}
          title="Print official factory tech pack"
        >
          <Printer size={16} />
          <span>Print / Export Tech Pack</span>
        </button>
      </div>

      <style>{`
        .spec-sheet-container {
          background: #ffffff;
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-xl);
          padding: 32px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        .spec-header-banner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--text-primary);
          gap: 20px;
          flex-wrap: wrap;
        }

        .sub-brand {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--accent-primary);
        }

        .main-spec-title {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .spec-tagline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        .spec-meta-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: var(--bg-card-subtle);
          padding: 12px 18px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
        }

        .meta-k {
          font-weight: 700;
          color: var(--text-muted);
          min-width: 65px;
        }

        .meta-v {
          font-weight: 600;
          color: var(--text-primary);
        }

        .highlight-mono {
          font-family: monospace;
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 700;
        }

        .status-badge-ready {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--emerald-accent);
          background: var(--emerald-light);
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .spec-alert-success {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: var(--radius-md);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #065f46;
          font-size: 0.88rem;
        }

        .spec-alert-error {
          background: #fff1f2;
          border: 1px solid #fecdd3;
          border-radius: var(--radius-md);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #9f1239;
          font-size: 0.88rem;
        }

        .spec-alert-confirm {
          background: #eef2ff;
          border: 1px solid #c7d2fe;
          border-radius: var(--radius-md);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--accent-primary);
          font-size: 0.92rem;
        }

        .spec-section-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .spec-sec-title {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          border-left: 3px solid var(--accent-primary);
          padding-left: 8px;
        }

        .spec-grid-three {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          background: var(--bg-card-subtle);
          padding: 14px;
          border-radius: var(--radius-md);
        }

        .spec-field {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .field-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }

        .field-value {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Measurements Table */
        .measurements-spec-table {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .table-head-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          background: #f1f5f9;
          padding: 8px 14px;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--text-secondary);
          letter-spacing: 0.06em;
        }

        .table-body-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 8px 14px;
          font-size: 0.84rem;
          border-top: 1px solid var(--border-subtle);
          align-items: center;
        }

        .table-body-row:nth-child(even) {
          background: #fafafa;
        }

        .param-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .param-val {
          font-weight: 800;
          color: var(--accent-primary);
        }

        /* Design Attributes Grid */
        .design-attributes-table {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .design-attr-cell {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .cell-k {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .cell-v {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .highlight-color {
          color: var(--accent-primary);
        }

        /* Context Grid */
        .spec-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .pref-summary-block {
          background: var(--bg-card-subtle);
          border-radius: var(--radius-md);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pref-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .rec-text-small {
          font-size: 0.8rem;
          color: var(--text-primary);
          line-height: 1.45;
        }

        /* Commercial Box */
        .spec-commercial-box {
          background: #0f172a;
          color: #ffffff;
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 20px;
          flex-wrap: wrap;
        }

        .commercial-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4px;
        }

        .comm-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #94a3b8;
        }

        .comm-value-price {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: #34d399;
          line-height: 1;
        }

        .comm-value-lead {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: #818cf8;
          line-height: 1;
        }

        .comm-sub {
          font-size: 0.72rem;
          color: #cbd5e1;
        }

        .commercial-divider {
          width: 1px;
          height: 50px;
          background: #334155;
        }

        /* Action Toolbar */
        .spec-actions-toolbar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        .spec-btn {
          padding: 10px 20px;
          font-size: 0.88rem;
        }

        @media (max-width: 768px) {
          .spec-grid-three, .design-attributes-table, .spec-grid-two {
            grid-template-columns: 1fr;
          }
          .table-head-row, .table-body-row {
            grid-template-columns: 1.5fr 1fr 1fr 1fr;
          }
          .commercial-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SpecificationCard;
