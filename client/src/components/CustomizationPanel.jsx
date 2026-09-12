import React from 'react';
import { Palette, Layers, Scissors, Check } from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Black', hex: '#1e293b', label: 'Midnight Black' },
  { name: 'White', hex: '#f8fafc', border: true, label: 'Crisp White' },
  { name: 'Blue', hex: '#2563eb', label: 'Navy Blue' },
  { name: 'Green', hex: '#15803d', label: 'Forest Green' },
  { name: 'Red', hex: '#dc2626', label: 'Crimson Red' }
];

const FABRICS = [
  { id: 'Cotton', name: '100% Combed Cotton', price: 50, tag: 'Breathable & Soft', desc: 'Hypoallergenic natural staple fiber, optimal for daily wear.' },
  { id: 'Linen', name: 'Artisan Washed Linen', price: 100, tag: 'Airy & Textured', desc: 'Open-weave flax fibers delivering maximum cooling in heat.' },
  { id: 'Denim', name: 'Selvedge Twill Denim', price: 120, tag: 'Structured & Durable', desc: 'Heavyweight cotton weave with classic twill drape.' },
  { id: 'Polyester', name: 'Performance Poly Blend', price: 0, tag: 'Wrinkle-Resistant', desc: 'Moisture-wicking synthetic engineered for high active durability.' }
];

const FITS = [
  { id: 'Slim', name: 'Slim Fit', desc: 'Tailored closer to the torso with defined waist shaping.' },
  { id: 'Regular', name: 'Regular Fit', desc: 'Balanced traditional cut providing comfortable ease.' },
  { id: 'Loose', name: 'Loose Fit', desc: 'Relaxed airy drape with generous chest and waist volume.' }
];

const SLEEVES = [
  { id: 'Short', name: 'Short Sleeve', desc: 'Ending mid-bicep.' },
  { id: 'Half', name: 'Half Sleeve', desc: 'Ending at elbow level.' },
  { id: 'Full', name: 'Full Sleeve', desc: 'Tailored cuff at the wrist.' }
];

const NECKLINES = [
  { id: 'Collar', name: 'Structured Collar', desc: 'Classic spread collar with interlining.' },
  { id: 'Round', name: 'Round / Crew', desc: 'Clean rib-bound circular neckline.' },
  { id: 'V-Neck', name: 'V-Neckline', desc: 'Geometric angular drop collar.' }
];

const POCKETS = [
  { id: 0, name: 'None (0)', desc: 'Clean minimalist front.' },
  { id: 1, name: 'One Pocket (1)', desc: 'Standard left chest pocket.' },
  { id: 2, name: 'Two Pockets (2)', desc: 'Dual utility pockets (+₹50).' }
];

const LENGTHS = [
  { id: 'Short', name: 'Cropped / Short', desc: 'Sits at beltline.' },
  { id: 'Regular', name: 'Regular Standard', desc: 'Mid-hip traditional length.' },
  { id: 'Long', name: 'Extended Longline', desc: 'Over-hip curved hemline.' }
];

const CustomizationPanel = ({ design, onChangeDesign }) => {
  const updateField = (field, value) => {
    onChangeDesign({
      ...design,
      [field]: value
    });
  };

  const isPresetColor = PRESET_COLORS.some(
    (c) => c.name.toLowerCase() === (design.color || '').toLowerCase()
  );

  return (
    <div className="customization-panel-wrapper">
      <div className="section-header">
        <div>
          <span className="step-tag">STEP 03</span>
          <h2 className="section-title">Garment Architecture & Styling</h2>
        </div>
        <p className="section-subtitle">
          Fine-tune every sartorial component. Color, fabric weave, collar profile, and pocket configurations.
        </p>
      </div>

      {/* 1. Color Palette Selector */}
      <div className="custom-section">
        <label className="section-label">
          <Palette size={16} />
          <span>Garment Hue & Tone</span>
          <span className="current-selection-badge">{design.color || 'Blue'}</span>
        </label>

        <div className="colors-grid">
          {PRESET_COLORS.map((c) => {
            const isSelected = (design.color || '').toLowerCase() === c.name.toLowerCase();
            return (
              <button
                key={c.name}
                type="button"
                className={`color-swatch-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => updateField('color', c.name)}
                title={c.label}
              >
                <div
                  className="swatch-circle"
                  style={{
                    backgroundColor: c.hex,
                    border: c.border ? '1px solid #cbd5e1' : 'none'
                  }}
                >
                  {isSelected && (
                    <Check
                      size={14}
                      color={c.name === 'White' ? '#0f172a' : '#ffffff'}
                      strokeWidth={3}
                    />
                  )}
                </div>
                <span className="swatch-name">{c.name}</span>
              </button>
            );
          })}

          {/* Custom Hex Picker */}
          <div className="custom-color-picker-box">
            <input
              type="color"
              id="customColorInput"
              className="color-picker-input"
              value={isPresetColor ? '#2563eb' : (design.color || '#2563eb')}
              onChange={(e) => updateField('color', e.target.value)}
            />
            <label htmlFor="customColorInput" className="custom-color-label">
              <span className="picker-text">Custom HEX</span>
              <span className="picker-val">{isPresetColor ? 'Select' : design.color}</span>
            </label>
          </div>
        </div>
      </div>

      {/* 2. Fabric Weave */}
      <div className="custom-section">
        <label className="section-label">
          <Layers size={16} />
          <span>Fabric Material & Finish</span>
          <span className="current-selection-badge">{design.fabric || 'Cotton'}</span>
        </label>

        <div className="fabrics-grid">
          {FABRICS.map((fabric) => {
            const isSelected = design.fabric === fabric.id;
            return (
              <button
                key={fabric.id}
                type="button"
                className={`fabric-card ${isSelected ? 'selected' : ''}`}
                onClick={() => updateField('fabric', fabric.id)}
              >
                <div className="fabric-card-header">
                  <span className="fabric-name">{fabric.name}</span>
                  <span className="fabric-price">
                    {fabric.price > 0 ? `+₹${fabric.price}` : 'Included'}
                  </span>
                </div>
                <span className="fabric-tag">{fabric.tag}</span>
                <p className="fabric-desc">{fabric.desc}</p>
                {isSelected && <div className="active-dot" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Silhouette Fit */}
      <div className="custom-section">
        <label className="section-label">
          <Scissors size={16} />
          <span>Silhouette Profile</span>
          <span className="current-selection-badge">{design.fit || 'Regular'}</span>
        </label>
        <div className="pills-grid">
          {FITS.map((fit) => {
            const isSelected = design.fit === fit.id;
            return (
              <button
                key={fit.id}
                type="button"
                className={`option-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => updateField('fit', fit.id)}
              >
                <div className="pill-title">{fit.name}</div>
                <div className="pill-desc">{fit.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Sleeves & Collar Grid */}
      <div className="two-col-grid">
        {/* Sleeves */}
        <div className="custom-section">
          <label className="section-label">
            <span>Sleeve Length</span>
            <span className="current-selection-badge">{design.sleeves || 'Full'}</span>
          </label>
          <div className="pills-grid-col">
            {SLEEVES.map((s) => {
              const isSelected = design.sleeves === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`option-pill-mini ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateField('sleeves', s.id)}
                >
                  <span className="pill-text">{s.name}</span>
                  {isSelected && <Check size={14} className="pill-check" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collar / Neckline */}
        <div className="custom-section">
          <label className="section-label">
            <span>Collar / Neckline</span>
            <span className="current-selection-badge">{design.neckline || 'Collar'}</span>
          </label>
          <div className="pills-grid-col">
            {NECKLINES.map((n) => {
              const isSelected = design.neckline === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  className={`option-pill-mini ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateField('neckline', n.id)}
                >
                  <span className="pill-text">{n.name}</span>
                  {isSelected && <Check size={14} className="pill-check" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Pockets & Garment Length Grid */}
      <div className="two-col-grid">
        {/* Pockets */}
        <div className="custom-section">
          <label className="section-label">
            <span>Chest Pockets</span>
            <span className="current-selection-badge">
              {Number(design.pockets) === 2 ? 'Two Pockets' : Number(design.pockets) === 1 ? 'One Pocket' : 'None'}
            </span>
          </label>
          <div className="pills-grid-col">
            {POCKETS.map((p) => {
              const isSelected = Number(design.pockets) === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`option-pill-mini ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateField('pockets', p.id)}
                >
                  <span className="pill-text">{p.name}</span>
                  {isSelected && <Check size={14} className="pill-check" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Length */}
        <div className="custom-section">
          <label className="section-label">
            <span>Garment Hemline</span>
            <span className="current-selection-badge">{design.garmentLength || 'Regular'}</span>
          </label>
          <div className="pills-grid-col">
            {LENGTHS.map((l) => {
              const isSelected = (design.garmentLength || 'Regular') === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  className={`option-pill-mini ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateField('garmentLength', l.id)}
                >
                  <span className="pill-text">{l.name}</span>
                  {isSelected && <Check size={14} className="pill-check" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .customization-panel-wrapper {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .custom-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .current-selection-badge {
          margin-left: auto;
          font-size: 0.72rem;
          font-weight: 700;
          background: var(--bg-card-subtle);
          color: var(--accent-primary);
          padding: 2px 8px;
          border-radius: 9999px;
        }

        /* Color Swatches */
        .colors-grid {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .color-swatch-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: none;
          padding: 6px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .color-swatch-btn:hover {
          transform: translateY(-2px);
        }

        .swatch-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .color-swatch-btn.selected .swatch-circle {
          box-shadow: 0 0 0 3px #ffffff, 0 0 0 5px var(--accent-primary);
          transform: scale(1.08);
        }

        .swatch-name {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .custom-color-picker-box {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-md);
          cursor: pointer;
        }

        .color-picker-input {
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          background: none;
        }

        .color-picker-input::-webkit-color-swatch-wrapper {
          padding: 0;
        }

        .color-picker-input::-webkit-color-swatch {
          border-radius: 50%;
          border: 1px solid var(--border-medium);
        }

        .custom-color-label {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .picker-text {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .picker-val {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Fabric Cards */
        .fabrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .fabric-card {
          background: #ffffff;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          transition: all 0.2s ease;
        }

        .fabric-card:hover {
          border-color: var(--accent-border);
          transform: translateY(-2px);
        }

        .fabric-card.selected {
          border-color: var(--accent-primary);
          background: #fafafa;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.08);
        }

        .fabric-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fabric-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .fabric-price {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--emerald-accent);
        }

        .fabric-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .fabric-desc {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-top: 4px;
        }

        /* Fit pills */
        .pills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .option-pill {
          background: #ffffff;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .option-pill:hover {
          border-color: var(--accent-border);
        }

        .option-pill.selected {
          border-color: var(--accent-primary);
          background: var(--accent-light);
        }

        .pill-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .pill-desc {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        /* Two Col Grid */
        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .pills-grid-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .option-pill-mini {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .option-pill-mini:hover {
          border-color: var(--accent-border);
          background: var(--bg-card-subtle);
        }

        .option-pill-mini.selected {
          border-color: var(--accent-primary);
          background: var(--accent-light);
        }

        .pill-text {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .pill-check {
          color: var(--accent-primary);
        }

        @media (max-width: 640px) {
          .fabrics-grid, .pills-grid, .two-col-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomizationPanel;
