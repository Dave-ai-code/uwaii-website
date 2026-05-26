import { useState, useEffect } from 'react'
import { LOB_COLORS, LOB_LABELS } from '../data/datasets'
import './DetailDrawer.css'

const TABS = ['Overview', 'Provenance', 'Sample Data', 'Pricing']

export default function DetailDrawer({ dataset, onClose, onPurchase }) {
  const [tab, setTab] = useState('Overview')
  const color = LOB_COLORS[dataset.lob] || '#0066FF'

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={onClose} />

      {/* Drawer panel */}
      <aside className="drawer">
        {/* Header */}
        <div className="drawer__header">
          <div className="drawer__header-top">
            <div className="drawer__lob-tag" style={{ color, background: color + '18', borderColor: color + '40' }}>
              <span className="drawer__lob-dot" style={{ background: color }} />
              {LOB_LABELS[dataset.lob] || dataset.lob}
            </div>
            <button className="drawer__close" onClick={onClose} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <h2 className="drawer__name">{dataset.name}</h2>
          <div className="drawer__price-row">
            <span className="drawer__price">${dataset.price}</span>
            <span className="drawer__price-label">one-time purchase</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="drawer__tabs">
          {TABS.map(t => (
            <button
              key={t}
              className={`drawer__tab ${tab === t ? 'drawer__tab--active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="drawer__body">
          {tab === 'Overview' && <OverviewTab dataset={dataset} color={color} />}
          {tab === 'Provenance' && <ProvenanceTab dataset={dataset} />}
          {tab === 'Sample Data' && <SampleDataTab dataset={dataset} />}
          {tab === 'Pricing' && <PricingTab dataset={dataset} onPurchase={onPurchase} />}
        </div>
      </aside>
    </>
  )
}

/* ── Overview Tab ── */
function OverviewTab({ dataset, color }) {
  return (
    <div className="tab-content">
      <p className="tab-desc">{dataset.description}</p>

      <div className="tab-section">
        <h4 className="tab-section-title">Why it improves underwriting</h4>
        <ul className="tab-bullets">
          {dataset.bullets.map((b, i) => (
            <li key={i}>
              <span className="tab-bullet-dot" style={{ background: color }} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-meta-grid">
        <div className="tab-meta-item">
          <div className="tab-meta-label">Countries Covered</div>
          <div className="tab-meta-value">{dataset.countries}</div>
        </div>
        <div className="tab-meta-item">
          <div className="tab-meta-label">Date Range</div>
          <div className="tab-meta-value">{dataset.dateRange}</div>
        </div>
        <div className="tab-meta-item">
          <div className="tab-meta-label">Record Estimate</div>
          <div className="tab-meta-value">{dataset.records}</div>
        </div>
        <div className="tab-meta-item">
          <div className="tab-meta-label">File Formats</div>
          <div className="tab-meta-formats">
            {dataset.formats.map(f => (
              <span key={f} className="tab-format-badge">{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Provenance Tab ── */
function ProvenanceTab({ dataset }) {
  return (
    <div className="tab-content">
      <div className="tab-section">
        <h4 className="tab-section-title">How This Dataset Was Built</h4>
        <p className="tab-desc">{dataset.methodology}</p>
      </div>

      <div className="tab-section">
        <h4 className="tab-section-title">Data Sources</h4>
        <ul className="tab-sources">
          {dataset.sources.map((s, i) => (
            <li key={i} className="tab-source-item">
              <span className="tab-source-dot" />
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="tab-source-link">
                {s.name}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 8.5l7-7M3 1.5h5.5V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <span className="tab-source-url">{s.url}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-section">
        <h4 className="tab-section-title">Refresh Methodology</h4>
        <p className="tab-desc">{dataset.refreshNotes}</p>
      </div>

      <div className="tab-section">
        <h4 className="tab-section-title">Quality Assurance</h4>
        <p className="tab-desc">{dataset.qualityNotes}</p>
      </div>
    </div>
  )
}

/* ── Sample Data Tab ── */
function SampleDataTab({ dataset }) {
  return (
    <div className="tab-content">
      <p className="tab-sample-note">
        Sample showing 8 of {dataset.records} records. Column headers and data types are
        representative of the full dataset schema.
      </p>

      <div className="tab-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {dataset.sampleColumns.map(c => <th key={c}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {dataset.sampleRows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tab-sample-footer">
        <span>Full dataset contains {dataset.records}</span>
        <button className="tab-dl-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download Sample (Free)
        </button>
      </div>
    </div>
  )
}

/* ── Pricing Tab ── */
function PricingTab({ dataset, onPurchase }) {
  return (
    <div className="tab-content">
      <div className="tab-price-card">
        <div className="tab-price-amount">${dataset.price}</div>
        <div className="tab-price-label">One-time purchase — no subscription</div>
      </div>

      <div className="tab-section">
        <h4 className="tab-section-title">What's Included</h4>
        <ul className="tab-included">
          {[
            'Full dataset in all available formats (CSV, JSON)',
            'Comprehensive data dictionary (column definitions, units)',
            'Methodology documentation (sourcing, cleaning, normalisation)',
            'Email support — questions answered within 1 business day',
            'Future updates — you\'re notified when data refreshes',
          ].map((item, i) => (
            <li key={i}>
              <span className="tab-check">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button className="btn-primary tab-buy-btn" onClick={onPurchase}>
        Buy Dataset — ${dataset.price}
      </button>

      <a href="#" className="tab-custom-link" onClick={e => e.preventDefault()}>
        Request a Custom Cut or Enterprise License →
      </a>

      <div className="tab-secure-note">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L2 3.5v4c0 3 2.5 5 5 5.5 2.5-.5 5-2.5 5-5.5v-4L7 1z" stroke="#8899AA" strokeWidth="1.2" fill="none"/>
          <path d="M4.5 7l1.5 1.5 3-3" stroke="#8899AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Purchase processed securely. Dataset delivered via email within 1 business day.
        Questions? <a href="mailto:contact@uwaii.com">contact@uwaii.com</a>
      </div>
    </div>
  )
}
