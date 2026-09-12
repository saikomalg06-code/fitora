import React from 'react';
import { Ruler, Info, Check, AlertCircle } from 'lucide-react';

const STANDARD_SIZES = [
  { id: 'S', label: 'Small (S)', chest: 38, shoulder: 17, waist: 34, sleeve: 23, length: 27 },
  { id: 'M', label: 'Medium (M)', chest: 40, shoulder: 18, waist: 36, sleeve: 24, length: 28 },
  { id: 'L', label: 'Large (L)', chest: 42, shoulder: 19, waist: 38, sleeve: 25, length: 29 },
  { id: 'XL', label: 'Extra Large (XL)', chest: 44, shoulder: 20, waist: 40, sleeve: 26, length: 30 },
  { id: 'XXL', label: 'Double XL (XXL)', chest: 46, shoulder: 21, waist: 42, sleeve: 27, length: 31 }
];

const MEASUREMENT_FIELDS = [
  { key: 'chest', label: 'Chest Circumference', min: 50, max: 180, defaultVal: 40, unit: 'cm', tip: 'Measured around the fullest point of chest.' },
  { key: 'shoulder', label: 'Shoulder Width', min: 25, max: 75, defaultVal: 18, unit: 'cm', tip: 'Tip of left shoulder bone to right shoulder bone.' },
  { key: 'waist', label: 'Waist Circumference', min: 45, max: 180, defaultVal: 36, unit: 'cm', tip: 'Around natural waistline above navel.' },
  { key: 'sleeve', label: 'Sleeve Length', min: 15, max: 100, defaultVal: 24, unit: 'cm', tip: 'From top shoulder seam to desired wrist point.' },
  { key: 'length', label: 'Garment Length', min: 40, max: 150, defaultVal: 28, unit: 'cm', tip: 'From base of collar down to desired hemline.' }
];

const MeasurementForm = ({
  sizeType,
  setSizeType,
  standardSize,
  setStandardSize,
  measurements,
  setMeasurements,
  validationErrors = {},
  setValidationErrors
}) => {
  // Handle toggling between standard and custom
  const handleTypeChange = (newType) => {
    setSizeType(newType);
    if (newType === 'standard') {
      const preset = STANDARD_SIZES.find((s) => s.id === standardSize) || STANDARD_SIZES[1];
      setMeasurements({
        chest: preset.chest,
        shoulder: preset.shoulder,
        waist: preset.waist,
        sleeve: preset.sleeve,
        length: preset.length
      });
      if (setValidationErrors) setValidationErrors({});
    }
  };

  const handleStandardSelect = (sizeId) => {
    setStandardSize(sizeId);
    const preset = STANDARD_SIZES.find((s) => s.id === sizeId);
    if (preset) {
      setMeasurements({
        chest: preset.chest,
        shoulder: preset.shoulder,
        waist: preset.waist,
        sleeve: preset.sleeve,
        length: preset.length
      });
    }
  };

  const handleCustomChange = (fieldKey, value) => {
    const numVal = value === '' ? '' : Number(value);
    const updated = { ...measurements, [fieldKey]: numVal };
    setMeasurements(updated);

    // Validate
    if (setValidationErrors) {
      const errors = { ...validationErrors };
      if (value === '' || isNaN(numVal)) {
        errors[fieldKey] = `Please enter a valid ${fieldKey} measurement.`;
      } else if (numVal <= 0) {
        errors[fieldKey] = `Measurement for ${fieldKey} cannot be zero or negative.`;
      } else {
        delete errors[fieldKey];
      }
      setValidationErrors(errors);
    }
  };

  return (
    <div className="measurement-form-wrapper">
      <div className="section-header">
        <div>
          <span className="step-tag">STEP 02</span>
          <h2 className="section-title">Fit & Measurement Architecture</h2>
        </div>
        <p className="section-subtitle">
          Eliminate off-the-rack compromises. Choose a standardized baseline or enter bespoke measurements for an exact contour.
        </p>
      </div>

      {/* Mode Switcher Pills */}
      <div className="measurement-mode-toggle">
        <button
          type="button"
          className={`mode-btn ${sizeType === 'standard' ? 'active' : ''}`}
          onClick={() => handleTypeChange('standard')}
        >
          <span>Standard Size Preset</span>
        </button>
        <button
          type="button"
          className={`mode-btn ${sizeType === 'custom' ? 'active' : ''}`}
          onClick={() => handleTypeChange('custom')}
        >
          <Ruler size={16} />
          <span>Custom Measurements (+₹100)</span>
        </button>
      </div>

      {/* Standard Size Selector View */}
      {sizeType === 'standard' ? (
        <div className="standard-size-container">
          <div className="sizes-pill-grid">
            {STANDARD_SIZES.map((size) => {
              const isSelected = standardSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  className={`size-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleStandardSelect(size.id)}
                >
                  <span className="size-id">{size.id}</span>
                  <span className="size-label">{size.label}</span>
                  {isSelected && <Check size={14} className="size-check" />}
                </button>
              );
            })}
          </div>

          <div className="standard-size-preview-table">
            <div className="table-title">Standard Calibrated Metrics for Size {standardSize}:</div>
            <div className="metrics-chip-row">
              <span className="metric-chip">Chest: <strong>{measurements.chest || 40} cm</strong></span>
              <span className="metric-chip">Shoulder: <strong>{measurements.shoulder || 18} cm</strong></span>
              <span className="metric-chip">Waist: <strong>{measurements.waist || 36} cm</strong></span>
              <span className="metric-chip">Sleeve: <strong>{measurements.sleeve || 24} cm</strong></span>
              <span className="metric-chip">Length: <strong>{measurements.length || 28} cm</strong></span>
            </div>
          </div>
        </div>
      ) : (
        /* Custom Measurement Form View */
        <div className="custom-measurements-container">
          <div className="custom-info-banner">
            <Info size={18} className="banner-icon" />
            <div>
              <strong>Bespoke Tailoring Mode Activated:</strong> Enter your exact body metrics in centimeters. Every panel of the garment will be pattern-drafted specifically for your physique.
            </div>
          </div>

          <div className="measurements-inputs-grid">
            {MEASUREMENT_FIELDS.map((field) => {
              const val = measurements[field.key] ?? '';
              const error = validationErrors[field.key];
              return (
                <div key={field.key} className="form-group">
                  <label className="form-label" htmlFor={`input-${field.key}`}>
                    <span>{field.label}</span>
                    <span className="unit-tag">{field.unit}</span>
                  </label>
                  <div className="input-affix-wrapper">
                    <input
                      id={`input-${field.key}`}
                      type="number"
                      step="0.5"
                      min="1"
                      className={`form-input ${error ? 'input-error' : ''}`}
                      value={val}
                      onChange={(e) => handleCustomChange(field.key, e.target.value)}
                      placeholder={`e.g. ${field.defaultVal}`}
                    />
                    <span className="input-affix">{field.unit}</span>
                  </div>
                  {error ? (
                    <div className="error-message">
                      <AlertCircle size={12} />
                      <span>{error}</span>
                    </div>
                  ) : (
                    <span className="input-tip">{field.tip}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .measurement-form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .measurement-mode-toggle {
          display: flex;
          background: var(--bg-card-subtle);
          padding: 5px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          gap: 6px;
        }

        .mode-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .mode-btn:hover {
          color: var(--text-primary);
        }

        .mode-btn.active {
          background: #ffffff;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .sizes-pill-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .size-pill {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .size-pill:hover {
          border-color: var(--accent-border);
          transform: translateY(-2px);
        }

        .size-pill.selected {
          border-color: var(--accent-primary);
          background: var(--accent-light);
        }

        .size-id {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .size-label {
          font-size: 0.72rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .size-check {
          position: absolute;
          top: 6px;
          right: 6px;
          color: var(--accent-primary);
        }

        .standard-size-preview-table {
          margin-top: 16px;
          background: var(--bg-card-subtle);
          border-radius: var(--radius-md);
          padding: 14px 18px;
          border: 1px solid var(--border-subtle);
        }

        .table-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .metrics-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .metric-chip {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 5px 12px;
          border-radius: 9999px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .metric-chip strong {
          color: var(--text-primary);
        }

        .custom-info-banner {
          background: var(--accent-light);
          border: 1px solid var(--accent-border);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.85rem;
          color: var(--accent-primary);
          line-height: 1.5;
        }

        .banner-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .measurements-inputs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        .input-affix-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-affix {
          position: absolute;
          right: 14px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          pointer-events: none;
        }

        .input-tip {
          font-size: 0.74rem;
          color: var(--text-muted);
          margin-top: 3px;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.76rem;
          color: var(--rose-accent);
          margin-top: 4px;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .sizes-pill-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .measurements-inputs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default MeasurementForm;
