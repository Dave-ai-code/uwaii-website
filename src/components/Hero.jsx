import { useCountUp } from '../hooks/useCountUp'
import './Hero.css'

const stats = [
  { label: 'Datasets',          end: 56,   suffix: '',    prefix: '' },
  { label: 'Countries',         end: 80,   suffix: '+',   prefix: '' },
  { label: 'Lines of Business', end: 12,   suffix: '',    prefix: '' },
  { label: 'Starting at',       end: 79,   suffix: '',    prefix: '$' },
]

function StatBox({ stat }) {
  const [ref, val] = useCountUp(stat.end, 1600)
  return (
    <div className="hero__stat" ref={ref}>
      <div className="hero__stat-value">
        {stat.prefix}{Math.round(val)}{stat.suffix}
      </div>
      <div className="hero__stat-label">{stat.label}</div>
    </div>
  )
}

const previewRows = [
  ['Honda',     'Civic',   '2022', 'US', '8.2'],
  ['Kia',       'Optima',  '2022', 'US', '14.7'],
  ['Ford',      'F-150',   '2023', 'US', '6.7'],
  ['Land Rover','Defender','2023', 'UK', '9.8'],
  ['Toyota',    'Corolla', '2022', 'AU', '3.4'],
]

export default function Hero({ onBrowse, onCoverage }) {
  return (
    <section className="hero" id="hero">
      {/* Dot-grid background */}
      <div className="hero__grid" aria-hidden="true" />
      {/* Gradient overlay */}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__inner">
        {/* Left column */}
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            UWAII.com — Underwriting AI Intelligence
          </div>

          <h1 className="hero__headline">
            The World's Insurance<br />
            <span className="hero__headline-accent">Data Layer</span>
          </h1>

          <p className="hero__sub">
            Bulk historical datasets for underwriters, actuaries, and insurtechs.
            Buy once. Use forever. No contracts, no subscriptions.
          </p>

          <div className="hero__actions">
            <button className="btn-primary hero__cta-primary" onClick={onBrowse}>
              Browse the Catalog
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-outline hero__cta-secondary" onClick={onCoverage}>
              View Coverage Map
            </button>
          </div>

          {/* Stat boxes */}
          <div className="hero__stats">
            {stats.map(s => <StatBox key={s.label} stat={s} />)}
          </div>
        </div>

        {/* Right column — floating data card */}
        <div className="hero__card-wrap" aria-hidden="true">
          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__card-dot" />
              <span className="hero__card-title">VEHICLE THEFT RATES — SAMPLE</span>
              <span className="hero__card-badge">PREVIEW</span>
            </div>
            <div className="hero__card-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>MAKE</th><th>MODEL</th><th>YEAR</th><th>COUNTRY</th><th>RATE/1K</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => <td key={j}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="hero__card-footer">
              <span>AUTO & VEHICLE</span>
              <span className="hero__card-price">$99 one-time</span>
            </div>
          </div>

          {/* Second card — blurred offset */}
          <div className="hero__card hero__card--ghost" aria-hidden="true">
            <div className="hero__card-header">
              <div className="hero__card-dot hero__card-dot--cyan" />
              <span className="hero__card-title">FLOOD ZONE EVENT HISTORY</span>
            </div>
            <div className="hero__card-footer">
              <span>HOME & PROPERTY</span>
              <span className="hero__card-price">$199 one-time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
