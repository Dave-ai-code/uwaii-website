import { useInView } from '../hooks/useInView'
import { LINES_OF_BUSINESS } from '../data/datasets'
import './LinesOfBusiness.css'

/* Clean monoline SVG icons — 24×24 viewBox */
const LOB_ICONS = {
  auto: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="10" width="22" height="9" rx="2"/>
      <path d="M5 10l2.5-5h9l2.5 5"/>
      <circle cx="7.5" cy="19" r="2"/><circle cx="16.5" cy="19" r="2"/>
    </svg>
  ),
  property: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-9 9 9"/><path d="M5 10.5V20h5v-5h4v5h5v-9.5"/>
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  life: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
  commercial: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="1"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/>
    </svg>
  ),
  cyber: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  travel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 3L3 10.5l7.5 3L14 21l3-9z"/>
      <path d="M10.5 13.5L14 10"/>
    </svg>
  ),
  specialty: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h2a2 2 0 012-2 2 2 0 012 2 2 2 0 002 2 2 2 0 002-2 2 2 0 012-2 2 2 0 012 2h2"/>
      <path d="M13 5l-1 4h3l-4 10 1-6H9l4-8z"/>
    </svg>
  ),
  workers_comp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18h20v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z"/>
      <path d="M12 7C8.5 7 5 9.5 5 13v5h14v-5c0-3.5-3.5-6-7-6z"/>
      <path d="M9 7.5L7.5 5.5M15 7.5l1.5-2M12 7V4"/>
    </svg>
  ),
  marine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/>
      <line x1="12" y1="7" x2="12" y2="15"/>
      <path d="M5 15H2a10 10 0 0020 0h-3"/>
      <line x1="6" y1="15" x2="12" y2="9"/>
      <line x1="18" y1="15" x2="12" y2="9"/>
    </svg>
  ),
  agriculture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 000 20"/>
      <path d="M12 2c2.5 5 4 8 4 12a10 10 0 01-4 8"/>
      <path d="M2 12h20"/>
      <path d="M12 2c-2.5 5-4 8-4 12a10 10 0 004 8"/>
    </svg>
  ),
  renewable: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M14.5 7l-5 5h7l-5 5"/>
    </svg>
  ),
  reinsurance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 4v6h6"/><path d="M23 20v-6h-6"/>
      <path d="M20.5 9A9 9 0 004.6 6.2L1 10M23 14l-3.6 3.8A9 9 0 013.5 15"/>
    </svg>
  ),
}

function LobCard({ lob, index, onLobClick }) {
  const [ref, visible] = useInView()
  const icon = LOB_ICONS[lob.key]

  return (
    <button
      ref={ref}
      className={`lob-card fade-in delay-${(index % 6) + 1} ${visible ? 'visible' : ''}`}
      onClick={() => onLobClick(lob.key)}
      title={`Browse ${lob.label} datasets`}
    >
      <div className="lob-card__icon">{icon}</div>
      <div className="lob-card__name">{lob.label}</div>
      <div className="lob-card__count">
        {lob.count} dataset{lob.count !== 1 ? 's' : ''}
      </div>
    </button>
  )
}

export default function LinesOfBusiness({ onLobClick }) {
  const [headerRef, headerVisible] = useInView()

  return (
    <section className="lob-section" id="lob">
      <div className="section-divider" />
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-label">Lines of Business</div>
          <h2 className="section-title">Data Across Every Line of Business</h2>
          <p className="section-sub">
            Click any line of business to browse its datasets in the catalog below.
          </p>
        </div>

        <div className="lob-grid">
          {LINES_OF_BUSINESS.map((lob, i) => (
            <LobCard key={lob.key} lob={lob} index={i} onLobClick={onLobClick} />
          ))}
        </div>
      </div>
      <div className="section-divider" style={{ marginTop: '80px' }} />
    </section>
  )
}
