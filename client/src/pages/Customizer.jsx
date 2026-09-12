import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GarmentSelector from '../components/GarmentSelector';
import MeasurementForm from '../components/MeasurementForm';
import CustomizationPanel from '../components/CustomizationPanel';
import GarmentPreview from '../components/GarmentPreview';
import RecommendationCard from '../components/RecommendationCard';
import PriceSummary from '../components/PriceSummary';
import SpecificationCard from '../components/SpecificationCard';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Garment', code: '01' },
  { id: 2, label: 'Measurements', code: '02' },
  { id: 3, label: 'Customize', code: '03' },
  { id: 4, label: 'Recommendations', code: '04' },
  { id: 5, label: 'Preview & Price', code: '05' },
  { id: 6, label: 'Specification', code: '06' }
];

const Customizer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // 1. Garment State (Default: Shirt)
  const [garment, setGarment] = useState('Shirt');

  // 2. Measurements State
  const [sizeType, setSizeType] = useState('standard'); // 'standard' | 'custom'
  const [standardSize, setStandardSize] = useState('M');
  const [measurements, setMeasurements] = useState({
    chest: 40,
    shoulder: 18,
    waist: 36,
    sleeve: 24,
    length: 28
  });
  const [validationErrors, setValidationErrors] = useState({});

  // 3. Design State
  const [design, setDesign] = useState({
    color: 'Blue',
    fabric: 'Cotton',
    fit: 'Regular',
    sleeves: 'Full',
    neckline: 'Collar',
    pockets: 1,
    garmentLength: 'Regular'
  });

  // 4. Recommendation State
  const [preferences, setPreferences] = useState({
    occasion: 'Casual',
    weather: 'Moderate',
    priority: 'Comfort'
  });
  const [recommendation, setRecommendation] = useState({
    fabric: '',
    color: '',
    fit: '',
    reason: ''
  });

  // Calculate dynamic price
  const calculatePrice = () => {
    let price = 600;
    if (garment === 'T-Shirt') price = 450;
    if (garment === 'Kurta') price = 750;

    if (sizeType === 'custom') price += 100;

    const fabric = design.fabric || 'Cotton';
    if (fabric === 'Cotton') price += 50;
    else if (fabric === 'Linen') price += 100;
    else if (fabric === 'Denim') price += 120;

    if (Number(design.pockets) === 2) price += 50;
    if (design.fit === 'Slim' && design.sleeves === 'Full') price += 50;

    return price;
  };

  const calculateLeadTime = () => {
    const isCustom = sizeType === 'custom';
    const isComplex = (design.fabric === 'Denim' || design.fabric === 'Linen') && Number(design.pockets) >= 2;

    if (isCustom && isComplex) return '7–10 Days';
    if (isCustom || isComplex) return '5–7 Days';
    return '3–5 Days';
  };

  // Validation before going to step 3
  const validateMeasurements = () => {
    if (sizeType === 'custom') {
      const errors = {};
      const fields = ['chest', 'shoulder', 'waist', 'sleeve', 'length'];
      for (const f of fields) {
        const val = Number(measurements[f]);
        if (isNaN(val) || val <= 0) {
          errors[f] = `Please enter a valid ${f} measurement.`;
        }
      }
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (!validateMeasurements()) {
        return;
      }
    }
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleApplyRecommendation = (rec) => {
    setDesign((prev) => ({
      ...prev,
      fabric: rec.fabric || prev.fabric,
      color: rec.color || prev.color,
      fit: rec.fit || prev.fit
    }));
  };

  const estimatedPrice = calculatePrice();
  const productionTime = calculateLeadTime();

  const progressPercent = Math.round((currentStep / 6) * 100);

  return (
    <div className="customizer-page-view">
      {/* Main Split Layout Workspace */}
      <div className="customizer-workspace">
        {/* Left Column: Interactive Forms for Active Step */}
        <div className="customizer-controls-column">
          {/* Integrated Studio Progress Header */}
          <div className="studio-progress-card">
            <div className="studio-progress-meta">
              <div className="meta-left">
                <span className="studio-tag">CUSTOMIZER STUDIO</span>
                <span className="studio-step-counter">
                  Step <strong>0{currentStep}</strong> of <strong>06</strong> — <span className="step-name-highlight">{STEPS[currentStep - 1].label}</span>
                </span>
              </div>
              <span className="studio-percentage-badge">{progressPercent}% Completed</span>
            </div>

            {/* Visual Progress Bar Line */}
            <div className="studio-progress-track">
              <div
                className="studio-progress-bar"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Compact Step Navigator Tabs */}
            <div className="studio-step-pills">
              {STEPS.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`studio-step-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                    onClick={() => {
                      if (currentStep === 2 && step.id > 2 && !validateMeasurements()) {
                        return;
                      }
                      setCurrentStep(step.id);
                    }}
                  >
                    <span className="step-tab-badge">
                      {isCompleted ? <CheckCircle2 size={13} /> : step.code}
                    </span>
                    <span className="step-tab-name">{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {currentStep === 1 && (
            <div className="step-card-wrap">
              <GarmentSelector
                selectedGarment={garment}
                onSelectGarment={setGarment}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-card-wrap">
              <MeasurementForm
                sizeType={sizeType}
                setSizeType={setSizeType}
                standardSize={standardSize}
                setStandardSize={setStandardSize}
                measurements={measurements}
                setMeasurements={setMeasurements}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-card-wrap">
              <CustomizationPanel
                design={design}
                onChangeDesign={setDesign}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-card-wrap">
              <RecommendationCard
                garment={garment}
                preferences={preferences}
                setPreferences={setPreferences}
                recommendation={recommendation}
                setRecommendation={setRecommendation}
                onApplyRecommendation={handleApplyRecommendation}
              />
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-card-wrap">
              <PriceSummary
                garment={garment}
                sizeType={sizeType}
                design={design}
                onProceedToSpec={() => setCurrentStep(6)}
              />
            </div>
          )}

          {currentStep === 6 && (
            <div className="step-card-wrap">
              <SpecificationCard
                garment={garment}
                sizeType={sizeType}
                size={standardSize}
                measurements={measurements}
                design={design}
                preferences={preferences}
                recommendation={recommendation}
                estimatedPrice={estimatedPrice}
                productionTime={productionTime}
                onEditDesign={() => setCurrentStep(3)}
                onSaveSuccess={() => {}}
              />
            </div>
          )}

          {/* Stepper Navigation Footer Buttons */}
          {/* Stepper Navigation Footer Buttons */}
          <div className="stepper-navigation-bar">
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn-secondary nav-btn-back"
                onClick={handleBack}
              >
                <ArrowLeft size={15} />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {currentStep < 6 && (
              <button
                type="button"
                className="btn-accent nav-btn-next"
                onClick={handleNext}
              >
                <span>Proceed to {STEPS[currentStep].label}</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Live Garment Preview */}
        <div className="customizer-preview-column">
          <GarmentPreview
            garment={garment}
            design={design}
            measurements={measurements}
            sizeType={sizeType}
            standardSize={standardSize}
          />
        </div>
      </div>

      <style>{`
        .customizer-page-view {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 14px 20px 36px 20px;
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
        }

        /* Integrated Studio Progress Card */
        .studio-progress-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .studio-progress-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .meta-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .studio-tag {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--accent-primary);
          background: var(--accent-light);
          padding: 3px 9px;
          border-radius: 9999px;
        }

        .studio-step-counter {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .step-name-highlight {
          font-weight: 700;
          color: var(--text-primary);
        }

        .studio-percentage-badge {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--emerald-accent);
          background: var(--emerald-light);
          padding: 3px 10px;
          border-radius: 9999px;
        }

        .studio-progress-track {
          width: 100%;
          height: 5px;
          background: #e2e8f0;
          border-radius: 9999px;
          overflow: hidden;
        }

        .studio-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary) 0%, #6366f1 100%);
          border-radius: 9999px;
          transition: width 0.35s ease;
        }

        .studio-step-pills {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-top: 2px;
        }
        .studio-step-pills::-webkit-scrollbar {
          display: none;
        }

        .studio-step-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-card-subtle);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .studio-step-tab:hover {
          border-color: var(--accent-border);
          background: #ffffff;
          color: var(--text-primary);
        }

        .studio-step-tab.active {
          border-color: var(--text-primary);
          background: var(--text-primary);
          color: #ffffff;
          box-shadow: var(--shadow-sm);
        }

        .studio-step-tab.active .step-tab-badge {
          color: #ffffff;
        }

        .studio-step-tab.completed {
          border-color: #a7f3d0;
          background: #f0fdf4;
          color: #065f46;
        }

        .studio-step-tab.completed .step-tab-badge {
          color: #059669;
        }

        .step-tab-badge {
          font-size: 0.72rem;
          font-weight: 800;
          display: flex;
          align-items: center;
        }

        .step-tab-name {
          font-size: 0.78rem;
        }

        /* Workspace Grid */
        .customizer-workspace {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 20px;
          align-items: start;
        }

        .customizer-controls-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .step-card-wrap {
          animation: fadeIn 0.25s ease;
        }

        .stepper-navigation-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0 0 0;
          border-top: 1px solid var(--border-subtle);
        }

        .nav-btn-next {
          padding: 9px 20px;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.25);
          letter-spacing: 0.01em;
        }

        .nav-btn-back {
          padding: 8px 16px;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .customizer-preview-column {
          position: sticky;
          top: 84px;
        }

        @media (max-width: 1024px) {
          .customizer-workspace {
            grid-template-columns: 1fr;
          }
          .customizer-preview-column {
            position: static;
            order: -1;
          }
        }

        @media (max-width: 680px) {
          .step-tab-name {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Customizer;
