import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpecificationCard from '../components/SpecificationCard';
import { FolderHeart, Plus, RefreshCw, Trash2, Eye, Calendar, ArrowLeft, AlertCircle, Database } from 'lucide-react';

const Specification = () => {
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [dbStatus, setDbStatus] = useState('checking');

  const fetchDesigns = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/designs');
      const data = await res.json();

      if (res.ok && data.success) {
        setDesigns(data.data || []);
        setDbStatus('connected');
        if (data.data && data.data.length > 0 && !selectedDesign) {
          setSelectedDesign(data.data[0]);
        }
      } else {
        setDbStatus('offline');
        setErrorMsg(data.message || 'Unable to retrieve designs from database.');
      }
    } catch (err) {
      console.warn('Network error reaching /api/designs:', err);
      setDbStatus('offline');
      setErrorMsg('Could not reach backend API at http://localhost:5000. Please ensure server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this specification record?')) {
      return;
    }

    try {
      const res = await fetch(`/api/designs/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const updated = designs.filter((d) => d._id !== id);
        setDesigns(updated);
        if (selectedDesign?._id === id) {
          setSelectedDesign(updated.length > 0 ? updated[0] : null);
        }
      } else {
        alert(data.message || 'Failed to delete record.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error while attempting to delete.');
    }
  };

  return (
    <div className="specifications-page-view">
      <div className="spec-page-container">
        {/* Top Header */}
        <div className="page-header-row">
          <div className="title-left">
            <Link to="/customize" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to Customizer</span>
            </Link>
            <h1 className="page-title">Saved Garment Specifications</h1>
            <p className="page-desc">
              Central manufacturing archive of your saved custom apparel tech packs stored in MongoDB.
            </p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={fetchDesigns}
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? 'spin-icon' : ''} />
              <span>Refresh Records</span>
            </button>
            <Link to="/customize" className="btn-accent btn-sm">
              <Plus size={16} />
              <span>New Bespoke Garment</span>
            </Link>
          </div>
        </div>

        {/* Database Status Alert */}
        {dbStatus === 'offline' && (
          <div className="db-offline-banner">
            <Database size={20} className="db-icon" />
            <div className="db-banner-text">
              <strong>Database Connection Notice:</strong> {errorMsg}
              <div className="db-sub">
                To enable live persistence, start your local MongoDB service (e.g. <code>mongod</code>) or supply a remote MongoDB Atlas URI in <code>server/.env</code>.
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <RefreshCw size={28} className="spin-icon text-accent" />
            <span>Fetching saved tech pack specifications...</span>
          </div>
        ) : designs.length === 0 ? (
          /* Empty State */
          <div className="empty-spec-card">
            <FolderHeart size={48} className="empty-icon" />
            <h3 className="empty-title">No Saved Specifications Yet</h3>
            <p className="empty-desc">
              You have not stored any bespoke garment specifications. Use the FITORA customizer to create your first tailor-made shirt, t-shirt, or kurta!
            </p>
            <Link to="/customize" className="btn-primary empty-btn">
              <span>Start Customizing Now</span>
            </Link>
          </div>
        ) : (
          /* Two Column Gallery & Inspector View */
          <div className="specs-layout-grid">
            {/* Left list of designs */}
            <div className="specs-list-column">
              <span className="list-heading">SAVED TECH PACKS ({designs.length})</span>
              <div className="cards-stack">
                {designs.map((item) => {
                  const isSelected = selectedDesign?._id === item._id;
                  const itemDate = new Date(item.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <div
                      key={item._id}
                      className={`spec-list-item-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedDesign(item)}
                    >
                      <div className="item-card-top">
                        <span className="item-garment-tag">{item.garment}</span>
                        <span className="item-price">₹{item.estimatedPrice}</span>
                      </div>

                      <div className="item-details-line">
                        <span>{item.design?.fabric || 'Cotton'}</span> •
                        <span>{item.design?.color || 'Blue'}</span> •
                        <span>{item.design?.fit || 'Regular'}</span>
                      </div>

                      <div className="item-card-footer">
                        <div className="item-meta-date">
                          <Calendar size={12} />
                          <span>{itemDate}</span>
                        </div>
                        <button
                          type="button"
                          className="delete-item-btn"
                          title="Delete specification"
                          onClick={(e) => handleDelete(item._id, e)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed Specification Viewer */}
            <div className="specs-viewer-column">
              {selectedDesign ? (
                <SpecificationCard
                  garment={selectedDesign.garment}
                  sizeType={selectedDesign.sizeType}
                  size={selectedDesign.size}
                  measurements={selectedDesign.measurements}
                  design={selectedDesign.design}
                  preferences={selectedDesign.preferences}
                  recommendation={selectedDesign.recommendation}
                  estimatedPrice={selectedDesign.estimatedPrice}
                  productionTime={selectedDesign.productionTime}
                  isSavedMode={true}
                  savedId={selectedDesign._id}
                />
              ) : (
                <div className="select-prompt">
                  <span>Select a specification from the left to inspect manufacturing details.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .specifications-page-view {
          padding: 32px 24px 80px 24px;
          min-height: calc(100vh - 80px);
        }

        .spec-page-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .page-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-primary);
          margin-bottom: 8px;
        }

        .page-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .page-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .db-offline-banner {
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: var(--radius-md);
          padding: 16px 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          color: #92400e;
        }

        .db-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .db-sub {
          font-size: 0.8rem;
          color: #b45309;
          margin-top: 4px;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 80px 20px;
          color: var(--text-secondary);
        }

        .text-accent {
          color: var(--accent-primary);
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .empty-spec-card {
          background: #ffffff;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-xl);
          padding: 60px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          max-width: 540px;
          margin: 40px auto;
        }

        .empty-icon {
          color: var(--text-muted);
        }

        .empty-title {
          font-size: 1.35rem;
          font-weight: 700;
        }

        .empty-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .empty-btn {
          margin-top: 8px;
        }

        /* Layout Grid */
        .specs-layout-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 28px;
          align-items: start;
        }

        .specs-list-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .list-heading {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .cards-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .spec-list-item-card {
          background: #ffffff;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .spec-list-item-card:hover {
          border-color: var(--accent-border);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .spec-list-item-card.selected {
          border-color: var(--accent-primary);
          background: var(--accent-light);
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.12);
        }

        .item-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .item-garment-tag {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .item-price {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--emerald-accent);
        }

        .item-details-line {
          font-size: 0.78rem;
          color: var(--text-secondary);
          display: flex;
          gap: 6px;
        }

        .item-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
          border-top: 1px dashed var(--border-subtle);
        }

        .item-meta-date {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .delete-item-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s ease;
        }

        .delete-item-btn:hover {
          color: var(--rose-accent);
        }

        .select-prompt {
          background: #ffffff;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-xl);
          padding: 48px;
          text-align: center;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .specs-layout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Specification;
