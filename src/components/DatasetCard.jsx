import { useInView } from '../hooks/useInView'
import { LOB_COLORS, LOB_LABELS } from '../data/datasets'
import './DatasetCard.css'

export default function DatasetCard({ dataset, index, onPreview, onBuy }) {
  const [ref, visible] = useInView()
  const color = LOB_COLORS[dataset.lob] || '#0066FF'
  const lobLabel = LOB_LABELS[dataset.lob] || dataset.lob

  return (
    <article
      ref={ref}
      className={`dcard fade-in ${visible ? 'visible' : ''}`}
      style={{
        transitionDelay: `${(index % 3) * 80}ms`,
        '--lob-color': color,
      }}
    >
      {/* Top row */}
      <div className="dcard__top">
        <div className="dcard__lob">
          <span className="dcard__lob-dot" style={{ background: color }} />
          <span className="dcard__lob-label">{lobLabel}</span>
          {dataset.popular && (
            <span className="dcard__popular">Popular</span>
          )}
        </div>
        <div className="dcard__price">${dataset.price}<span> one-time</span></div>
      </div>

      {/* Name */}
      <h3 className="dcard__name">{dataset.name}</h3>

      {/* Description */}
      <p className="dcard__desc">{dataset.description}</p>

      {/* Pills */}
      <div className="dcard__pills">
        <span className="dcard__pill">
          🌍 {dataset.countries}
        </span>
        <span className="dcard__pill">
          📅 {dataset.dateRange}
        </span>
        <span className="dcard__pill">
          📁 {dataset.formats.join(' + ')}
        </span>
      </div>

      {/* Actions */}
      <div className="dcard__actions">
        <button className="dcard__preview" onClick={() => onPreview(dataset)}>
          Preview &amp; Details
        </button>
        <button className="btn-primary dcard__buy" onClick={() => onBuy(dataset)}>
          Buy Dataset →
        </button>
      </div>
    </article>
  )
}
