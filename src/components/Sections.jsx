import { useInView } from '../hooks/useInView'
import './Sections.css'

/* ── How It Works ── */
const STEPS = [
  {
    number: '01',
    title: 'Browse & Filter',
    body: 'Search the catalog by line of business, geography, or keyword. Preview sample data and full methodology documentation before you commit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Buy Once',
    body: 'One-time purchase — no subscription, no recurring fee. Pay by card or invoice. Your dataset is yours permanently with no usage limits.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Receive & Build',
    body: 'Dataset delivered via secure download link within 1 business day. Includes data dictionary, methodology doc, and ongoing email support.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
]

export function HowItWorksSection() {
  const [ref, visible] = useInView()
  return (
    <section className="hiw-section" id="how-it-works">
      <div className="container">
        <div ref={ref} className={`section-header fade-in ${visible ? 'visible' : ''}`}>
          <div className="section-label">Process</div>
          <h2 className="section-title">Simple, Direct, No Contracts</h2>
          <p className="section-sub">
            Designed for teams that need data fast — not six-week vendor negotiations.
          </p>
        </div>

        <div className="hiw-steps">
          {STEPS.map((s, i) => <StepCard key={s.number} step={s} delay={i + 1} />)}
        </div>
      </div>
      <div className="section-divider" style={{ marginTop: '80px' }} />
    </section>
  )
}

function StepCard({ step, delay }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className={`hiw-card fade-in delay-${delay} ${visible ? 'visible' : ''}`}>
      <div className="hiw-card__icon">{step.icon}</div>
      <div className="hiw-card__number">{step.number}</div>
      <h3 className="hiw-card__title">{step.title}</h3>
      <p className="hiw-card__body">{step.body}</p>
    </div>
  )
}

/* ── About ── */
export function AboutSection() {
  const [ref, visible] = useInView()
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-inner">
          <div ref={ref} className={`about-text fade-in ${visible ? 'visible' : ''}`}>
            <div className="section-label">About UWAII</div>
            <h2 className="about-title">
              Built by Actuaries.<br />For the Insurance Industry.
            </h2>
            <p>
              UWAII (Underwriting AI Intelligence) was founded by a team of insurance data
              scientists and actuaries who spent years frustrated that the most relevant
              external data for pricing — already public — was never properly packaged.
            </p>
            <p>
              Every dataset in our catalog is sourced from public records, government databases,
              and legally scraped sources. We add the structure, documentation, and quality
              assurance that makes raw government data actually usable for actuarial work.
            </p>
            <p>
              We believe insurance markets work better when risk is properly priced — and that
              starts with better data.
            </p>
            <a href="mailto:contact@uwaii.com" className="about-contact btn-outline">
              Contact the Team
            </a>
          </div>

          <div className="about-stats">
            {[
              { value: '56',    label: 'Datasets Available' },
              { value: '80+',   label: 'Countries Covered' },
              { value: '$79',   label: 'Lowest Price Point' },
              { value: '1-day', label: 'Delivery SLA' },
            ].map((s, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [statRef, statVisible] = useInView()
              return (
                <div key={s.label} ref={statRef} className={`about-stat fade-in delay-${i+1} ${statVisible ? 'visible' : ''}`}>
                  <div className="about-stat__value">{s.value}</div>
                  <div className="about-stat__label">{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
