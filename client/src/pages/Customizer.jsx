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
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
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

  return (
    <div className="customizer-page-view">
      {/* Progress Stepper Bar */}
      <div className="stepper-bar-container">
        <div className="stepper-track">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <button
                key={step.id}
                type="button"
                className={`step-nav-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  if (currentStep === 2 && step.id > 2 && !validateMeasurements()) {
                    return;
                  }
                  setCurrentStep(step.id);
                }}
              >
                <div className="step-badge-circle">
                  {isCompleted ? <CheckCircle2 size={15} /> : step.code}
                </div>
                <span className="step-nav-label">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Layout Workspace */}
      <div className="customizer-workspace">
        {/* Left Column: Interactive Forms for Active Step */}
        <div className="customizer-controls-column">
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
          <div className="stepper-navigation-bar">
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn-secondary nav-btn"
                onClick={handleBack}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 6 && (
              <button
                type="button"
                className="btn-primary nav-btn"
                onClick={handleNext}
              >
                <span>Continue to {STEPS[currentStep].label}</span>
                <ArrowRight size={16} />
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
          gap: 24px;
          padding: 24px 20px 80px 20px;
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
        }

        /* Stepper Navigation */
        .stepper-bar-container {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 12px 20px;
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 68px;
          z-index: 40;
        }

        .stepper-track {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .stepper-track::-webkit-scrollbar {
          display: none;
        }

        .step-nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 9999px;
          background: none;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
        }

        .step-nav-btn:hover {
          background: var(--bg-card-subtle);
          color: var(--text-primary);
        }

        .step-nav-btn.active {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .step-nav-btn.completed {
          color: var(--text-primary);
        }

        .step-badge-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--bg-card-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .step-nav-btn.active .step-badge-circle {
          background: var(--accent-primary);
          color: #ffffff;
        }

        .step-nav-btn.completed .step-badge-circle {
          background: var(--emerald-light);
          color: var(--emerald-accent);
        }

        .step-nav-label {
          font-size: 0.85rem;
          font-weight: 700;
        }

        /* Workspace Grid */
        .customizer-workspace {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 32px;
          align-items: start;
        }

        .customizer-controls-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .step-card-wrap {
          animation: fadeIn 0.25s ease;
        }

        .stepper-navigation-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-top: 1px solid var(--border-subtle);
        }

        .nav-btn {
          padding: 12px 24px;
        }

        .customizer-preview-column {
          position: sticky;
          top: 134px;
        }

        @media (max-width: 1024px) {
          .customizer-workspace {
            grid-template-columns: 1fr;
          }
          .customizer-preview-column {
            position: static;
            order: -1; /* Place preview at top on mobile / tablet if desired, or under controls */
          }
        }

        @media (max-width: 680px) {
          .step-nav-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Customizer;
