import React, { useState } from 'react';
import { Eye, Layers, Sparkles, Tag, Check, SlidersHorizontal } from 'lucide-react';

const COLOR_MAP = {
  black: '#1e293b',
  white: '#f8fafc',
  blue: '#2563eb',
  green: '#15803d',
  red: '#dc2626'
};

const GarmentPreview = ({ garment = 'Shirt', design = {}, measurements = {}, sizeType = 'standard', standardSize = 'M' }) => {
  const [showCallouts, setShowCallouts] = useState(true);

  // Compute resolved color
  const rawColor = (design.color || 'Blue').toLowerCase();
  const hexColor = COLOR_MAP[rawColor] || design.color || '#2563eb';
  const isWhite = rawColor === 'white' || hexColor.toLowerCase() === '#ffffff' || hexColor.toLowerCase() === '#f8fafc';
  const strokeColor = isWhite ? '#94a3b8' : 'rgba(255, 255, 255, 0.4)';
  const seamColor = isWhite ? '#cbd5e1' : 'rgba(255, 255, 255, 0.25)';
  const buttonColor = isWhite ? '#475569' : '#ffffff';

  const fabric = design.fabric || 'Cotton';
  const fit = design.fit || 'Regular';
  const sleeves = design.sleeves || 'Full';
  const neckline = design.neckline || (garment === 'T-Shirt' ? 'Round' : 'Collar');
  const pockets = Number(design.pockets ?? 1);
  const garmentLength = design.garmentLength || 'Regular';

  // Dynamic Silhouette calculation
  // Body width adjustments based on Fit
  let waistInset = 0; // Regular
  if (fit === 'Slim') waistInset = 12; // Narrower waist
  if (fit === 'Loose') waistInset = -10; // Wider waist

  // Hemline adjustment based on garmentLength & garment type
  let hemY = 270;
  if (garment === 'Kurta') hemY = 340; // Kurta is longline
  else if (garmentLength === 'Short') hemY = 245;
  else if (garmentLength === 'Long') hemY = 295;

  // Sleeve geometry coordinates
  // Armpit is at (65, 110) on left and (215, 110) on right
  let leftSleevePath = '';
  let rightSleevePath = '';

  if (sleeves === 'Short') {
    leftSleevePath = 'M 65,58 L 25,95 L 48,118 L 68,98 Z';
    rightSleevePath = 'M 215,58 L 255,95 L 232,118 L 212,98 Z';
  } else if (sleeves === 'Half') {
    leftSleevePath = 'M 65,58 L 15,130 L 42,145 L 70,105 Z';
    rightSleevePath = 'M 215,58 L 265,130 L 238,145 L 210,105 Z';
  } else {
    // Full sleeve
    leftSleevePath = 'M 65,58 L 8,185 L 32,195 L 72,110 Z';
    rightSleevePath = 'M 215,58 L 272,185 L 248,195 L 208,110 Z';
  }

  // Torso Body Path with dynamic waist & hem
  const torsoLeftX = 72;
  const torsoRightX = 208;
  const bodyPath = `
    M 78,54 
    L ${torsoLeftX},110 
    Q ${torsoLeftX + waistInset},180 ${torsoLeftX - 4},${hemY} 
    L ${torsoRightX + 4},${hemY} 
    Q ${torsoRightX - waistInset},180 ${torsoRightX},110 
    L 202,54 
    Z
  `;

  return (
    <div className="garment-preview-container">
      {/* Header bar of preview box */}
      <div className="preview-top-toolbar">
        <div className="preview-title-group">
          <span className="live-pulse" />
          <span className="preview-label">REAL-TIME PREVIEW</span>
        </div>
        <div className="toolbar-actions">
          <button
            type="button"
            className={`toggle-callouts-btn ${showCallouts ? 'active' : ''}`}
            onClick={() => setShowCallouts(!showCallouts)}
            title="Toggle measurement markers"
          >
            <SlidersHorizontal size={13} />
            <span>{showCallouts ? 'Hide Guides' : 'Show Guides'}</span>
          </button>
        </div>
      </div>

      {/* Main SVG Garment Canvas */}
      <div className="preview-stage">
        <svg
          viewBox="0 0 280 370"
          className="garment-render-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fabric texture filters */}
            <pattern id="denimWeave" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0,6 L6,0 M3,9 L9,3 M-3,3 L3,-3" stroke="#000000" strokeWidth="0.8" opacity="0.12" />
            </pattern>
            <pattern id="linenTexture" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0,4 L8,4 M4,0 L4,8" stroke="#ffffff" strokeWidth="0.7" opacity="0.15" />
            </pattern>
            <linearGradient id="bodyShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.15" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="shadowDrop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Garment Base Shadow on floor */}
          <ellipse cx="140" cy={hemY + 14} rx="78" ry="10" fill="url(#shadowDrop)" />

          {/* 1. Sleeves (Rendered behind torso edges) */}
          <path d={leftSleevePath} fill={hexColor} stroke={strokeColor} strokeWidth="1.5" />
          <path d={rightSleevePath} fill={hexColor} stroke={strokeColor} strokeWidth="1.5" />

          {/* Fabric texture overlay on sleeves */}
          {fabric === 'Denim' && (
            <>
              <path d={leftSleevePath} fill="url(#denimWeave)" />
              <path d={rightSleevePath} fill="url(#denimWeave)" />
            </>
          )}
          {fabric === 'Linen' && (
            <>
              <path d={leftSleevePath} fill="url(#linenTexture)" />
              <path d={rightSleevePath} fill="url(#linenTexture)" />
            </>
          )}

          {/* Cuffs on full sleeves */}
          {sleeves === 'Full' && (
            <>
              <line x1="8" y1="185" x2="32" y2="195" stroke={seamColor} strokeWidth="3" />
              <line x1="272" y1="185" x2="248" y2="195" stroke={seamColor} strokeWidth="3" />
            </>
          )}

          {/* 2. Main Torso Body */}
          <path d={bodyPath} fill={hexColor} stroke={strokeColor} strokeWidth="1.5" />

          {/* Fabric texture overlay on torso */}
          {fabric === 'Denim' && <path d={bodyPath} fill="url(#denimWeave)" />}
          {fabric === 'Linen' && <path d={bodyPath} fill="url(#linenTexture)" />}

          {/* Depth Gradient Shading */}
          <path d={bodyPath} fill="url(#bodyShade)" pointerEvents="none" />

          {/* Kurta Side Slits */}
          {garment === 'Kurta' && (
            <>
              <line x1={torsoLeftX - 4} y1={hemY - 45} x2={torsoLeftX - 4} y2={hemY} stroke="#ffffff" strokeWidth="2" />
              <line x1={torsoRightX + 4} y1={hemY - 45} x2={torsoRightX + 4} y2={hemY} stroke="#ffffff" strokeWidth="2" />
            </>
          )}

          {/* 3. Center Front: Shirt Button Placket or T-Shirt plain */}
          {garment === 'Shirt' && (
            <>
              {/* Placket Band */}
              <rect x="135" y="70" width="10" height={hemY - 70} fill={isWhite ? '#f1f5f9' : 'rgba(0,0,0,0.06)'} />
              <line x1="135" y1="70" x2="135" y2={hemY} stroke={seamColor} strokeWidth="1" />
              <line x1="145" y1="70" x2="145" y2={hemY} stroke={seamColor} strokeWidth="1" />
              {/* Buttons */}
              <circle cx="140" cy="85" r="2.5" fill={buttonColor} stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="140" cy="115" r="2.5" fill={buttonColor} stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="140" cy="145" r="2.5" fill={buttonColor} stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="140" cy="175" r="2.5" fill={buttonColor} stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="140" cy="205" r="2.5" fill={buttonColor} stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="140" cy="235" r="2.5" fill={buttonColor} stroke="#94a3b8" strokeWidth="0.5" />
            </>
          )}

          {garment === 'Kurta' && (
            <>
              {/* Mandarin Half Placket */}
              <rect x="136" y="55" width="8" height="60" fill={isWhite ? '#f1f5f9' : 'rgba(0,0,0,0.08)'} />
              <line x1="136" y1="55" x2="136" y2="115" stroke={seamColor} strokeWidth="1" />
              <line x1="144" y1="55" x2="144" y2="115" stroke={seamColor} strokeWidth="1" />
              <circle cx="140" cy="70" r="2" fill={buttonColor} />
              <circle cx="140" cy="90" r="2" fill={buttonColor} />
              <circle cx="140" cy="110" r="2" fill={buttonColor} />
            </>
          )}

          {/* 4. Collar / Neckline Architecture */}
          {neckline === 'Collar' && (
            <g className="collar-group">
              {/* Back neck inner collar */}
              <path d="M 115,50 Q 140,60 165,50 Z" fill="#0f172a" opacity="0.4" />
              {/* Left collar flap */}
              <polygon
                points="140,70 102,48 128,45 140,55"
                fill={hexColor}
                stroke={strokeColor}
                strokeWidth="1.5"
                filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))"
              />
              {/* Right collar flap */}
              <polygon
                points="140,70 178,48 152,45 140,55"
                fill={hexColor}
                stroke={strokeColor}
                strokeWidth="1.5"
                filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))"
              />
            </g>
          )}

          {neckline === 'Round' && (
            <g className="round-neck-group">
              {/* Inner depth */}
              <path d="M 115,52 Q 140,78 165,52 Q 140,48 115,52 Z" fill="#0f172a" opacity="0.3" />
              {/* Ribbed knit band */}
              <path
                d="M 115,52 Q 140,78 165,52 Q 140,68 115,52 Z"
                fill={hexColor}
                stroke={strokeColor}
                strokeWidth="1.5"
              />
            </g>
          )}

          {neckline === 'V-Neck' && (
            <g className="v-neck-group">
              {/* Inner neck depth */}
              <polygon points="140,82 116,50 164,50" fill="#0f172a" opacity="0.35" />
              {/* Angular V-collar band */}
              <line x1="116" y1="50" x2="140" y2="82" stroke={strokeColor} strokeWidth="3" />
              <line x1="164" y1="50" x2="140" y2="82" stroke={strokeColor} strokeWidth="3" />
            </g>
          )}

          {/* 5. Chest Pockets */}
          {pockets >= 1 && (
            <g className="pocket-left">
              <rect
                x="92"
                y="108"
                width="28"
                height="34"
                rx="2"
                fill={hexColor}
                stroke={strokeColor}
                strokeWidth="1.5"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
              />
              <line x1="92" y1="114" x2="120" y2="114" stroke={seamColor} strokeWidth="1" />
            </g>
          )}

          {pockets === 2 && (
            <g className="pocket-right">
              <rect
                x="160"
                y="108"
                width="28"
                height="34"
                rx="2"
                fill={hexColor}
                stroke={strokeColor}
                strokeWidth="1.5"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
              />
              <line x1="160" y1="114" x2="188" y2="114" stroke={seamColor} strokeWidth="1" />
            </g>
          )}

          {/* 6. Measurement Guides & Annotation Overlay */}
          {showCallouts && (
            <g className="measurement-callouts">
              {/* Chest line */}
              <line x1="56" y1="120" x2="224" y2="120" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="56" cy="120" r="2.5" fill="#f59e0b" />
              <circle cx="224" cy="120" r="2.5" fill="#f59e0b" />
              <rect x="110" y="112" width="60" height="15" rx="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="1" />
              <text x="140" y="123" textAnchor="middle" fill="#b45309" fontSize="8.5" fontWeight="700">
                Chest {measurements.chest || 40} cm
              </text>

              {/* Length indicator */}
              <line x1="246" y1="52" x2="246" y2={hemY} stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="246" cy="52" r="2.5" fill="#10b981" />
              <circle cx="246" cy={hemY} r="2.5" fill="#10b981" />
              <rect x="220" y={hemY - 45} width="54" height="14" rx="3" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
              <text x="247" y={hemY - 35} textAnchor="middle" fill="#047857" fontSize="8.5" fontWeight="700">
                L {measurements.length || 28} cm
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Floating Dynamic Specifications Badge Bar */}
      <div className="preview-attributes-panel">
        <div className="attr-item">
          <span className="attr-title">GARMENT</span>
          <span className="attr-value">{garment}</span>
        </div>
        <div className="attr-item">
          <span className="attr-title">FABRIC</span>
          <span className="attr-value">{fabric}</span>
        </div>
        <div className="attr-item">
          <span className="attr-title">FIT</span>
          <span className="attr-value">{fit}</span>
        </div>
        <div className="attr-item">
          <span className="attr-title">SLEEVES</span>
          <span className="attr-value">{sleeves}</span>
        </div>
        <div className="attr-item">
          <span className="attr-title">POCKETS</span>
          <span className="attr-value">{pockets}</span>
        </div>
        <div className="attr-item">
          <span className="attr-title">SIZING</span>
          <span className="attr-value">{sizeType === 'custom' ? 'Bespoke Custom' : `Standard (${standardSize})`}</span>
        </div>
      </div>

      <style>{`
        .garment-preview-container {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 16px;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: sticky;
          top: 80px;
        }

        .preview-top-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .preview-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .live-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--emerald-accent);
          box-shadow: 0 0 0 3px var(--emerald-light);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(5, 150, 105, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(5, 150, 105, 0);
          }
        }

        .preview-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        .toggle-callouts-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-card-subtle);
          padding: 3px 8px;
          border-radius: 9999px;
          border: 1px solid var(--border-subtle);
        }

        .toggle-callouts-btn.active {
          color: var(--accent-primary);
          background: var(--accent-light);
          border-color: var(--accent-border);
        }

        .preview-stage {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 250px;
          background: radial-gradient(circle at 50% 40%, #ffffff 0%, #f8fafc 100%);
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-subtle);
          padding: 8px;
        }

        .garment-render-svg {
          width: 100%;
          max-width: 250px;
          height: auto;
          filter: drop-shadow(0 10px 16px rgba(15, 23, 42, 0.08));
          transition: all 0.3s ease;
        }

        .preview-attributes-panel {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          background: var(--bg-card-subtle);
          padding: 8px 10px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .attr-item {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .attr-title {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }

        .attr-value {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};

export default GarmentPreview;
