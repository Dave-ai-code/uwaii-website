import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from 'react-simple-maps'
import allDatasets, { LOB_COLORS, LOB_LABELS } from '../data/datasets'
import './InteractiveMap.css'

/* Natural Earth world at 110m resolution — public domain via jsDelivr */
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

/* ─── ISO numeric code → UWAII region ─────────────────────────── */
const COUNTRY_REGIONS = {
  // NORTH AMERICA
  '840':'north-america', '124':'north-america', '484':'north-america',
  '320':'north-america', '340':'north-america', '222':'north-america',
  '558':'north-america', '188':'north-america', '591':'north-america',
  '192':'north-america', '332':'north-america', '214':'north-america',
  '388':'north-america', '780':'north-america',  '44':'north-america',
   '84':'north-america', '308':'north-america', '659':'north-america',
  '662':'north-america', '670':'north-america',  '28':'north-america',
   '52':'north-america', '630':'north-america',

  // SOUTH AMERICA
   '76':'south-america',  '32':'south-america', '604':'south-america',
  '170':'south-america', '862':'south-america', '152':'south-america',
  '218':'south-america',  '68':'south-america', '600':'south-america',
  '858':'south-america', '328':'south-america', '740':'south-america',
  '254':'south-america', '531':'south-america', '535':'south-america',

  // EUROPE
  '826':'europe', '276':'europe', '250':'europe', '380':'europe',
  '724':'europe', '528':'europe',  '56':'europe', '616':'europe',
  '203':'europe',  '40':'europe', '756':'europe', '752':'europe',
  '578':'europe', '246':'europe', '208':'europe', '372':'europe',
  '620':'europe', '300':'europe', '348':'europe', '642':'europe',
  '100':'europe', '703':'europe', '705':'europe', '191':'europe',
   '70':'europe', '807':'europe', '688':'europe', '498':'europe',
  '804':'europe', '112':'europe', '440':'europe', '428':'europe',
  '233':'europe',   '8':'europe', '499':'europe', '442':'europe',
  '470':'europe', '196':'europe', '352':'europe', '492':'europe',
  '438':'europe',

  // AFRICA
   '12':'africa',  '24':'africa', '204':'africa',  '72':'africa',
  '854':'africa', '108':'africa', '120':'africa', '140':'africa',
  '148':'africa', '174':'africa', '180':'africa', '178':'africa',
  '262':'africa', '818':'africa', '232':'africa', '231':'africa',
  '266':'africa', '270':'africa', '288':'africa', '324':'africa',
  '624':'africa', '384':'africa', '404':'africa', '426':'africa',
  '430':'africa', '434':'africa', '450':'africa', '454':'africa',
  '466':'africa', '478':'africa', '480':'africa', '504':'africa',
  '508':'africa', '516':'africa', '562':'africa', '566':'africa',
  '646':'africa', '686':'africa', '694':'africa', '706':'africa',
  '710':'africa', '728':'africa', '729':'africa', '748':'africa',
  '834':'africa', '768':'africa', '788':'africa', '800':'africa',
  '894':'africa', '716':'africa', '678':'africa',

  // ASIA  (includes Russia, Middle East, Central Asia, SE Asia)
  '643':'asia', '156':'asia', '356':'asia', '392':'asia',
  '410':'asia', '408':'asia', '764':'asia', '360':'asia',
  '458':'asia', '608':'asia', '704':'asia', '116':'asia',
  '418':'asia', '104':'asia',  '50':'asia', '144':'asia',
  '524':'asia',  '64':'asia', '586':'asia',   '4':'asia',
  '398':'asia', '417':'asia', '762':'asia', '795':'asia',
  '860':'asia', '496':'asia', '268':'asia',  '51':'asia',
   '31':'asia', '792':'asia', '368':'asia', '364':'asia',
  '376':'asia', '400':'asia', '414':'asia', '422':'asia',
  '682':'asia', '760':'asia', '784':'asia', '887':'asia',
  '512':'asia', '634':'asia',  '48':'asia', '275':'asia',
  '462':'asia', '702':'asia',  '96':'asia', '626':'asia',
  '158':'asia',

  // AUSTRALIA & PACIFIC
   '36':'australia', '554':'australia', '598':'australia',
   '90':'australia', '548':'australia', '242':'australia',
  '585':'australia', '583':'australia', '584':'australia',
  '520':'australia', '798':'australia', '882':'australia',
  '776':'australia', '184':'australia', '316':'australia',
}

/* ─── Region metadata ───────────────────────────────────────────── */
const REGIONS = [
  { id: 'north-america', label: 'North America',      sub: 'US, CA, MX and Caribbean' },
  { id: 'south-america', label: 'South America',      sub: 'BR, AR, CO, CL and more' },
  { id: 'europe',        label: 'Europe',              sub: 'EU, UK, CH, NO and more' },
  { id: 'africa',        label: 'Africa',              sub: 'Global datasets apply' },
  { id: 'asia',          label: 'Asia',                sub: 'Incl. Russia, Middle East, SE Asia' },
  { id: 'australia',     label: 'Australia & Pacific', sub: 'AU, NZ and Pacific nations' },
]

/* ─── Dataset filter per region ────────────────────────────────── */
function datasetsForRegion(regionId) {
  return allDatasets.filter(d => {
    const c = d.countries.toLowerCase()
    const isGlobal = ['global','190','80+','60 countries','50 major','100+','40 countries']
      .some(k => c.includes(k))
    switch (regionId) {
      case 'north-america': return c.includes('us') || c.includes('ca')
      case 'south-america': return c.includes('brazil') || isGlobal
      case 'europe':        return c.includes('uk') || c.includes('eu') || isGlobal
      case 'africa':        return isGlobal
      case 'asia':          return isGlobal
      case 'australia':     return c.includes('au') || isGlobal
      default: return false
    }
  })
}

/* ─── Fill colour helper ────────────────────────────────────────── */
const FILL = {
  covered:        '#162038',
  coveredHover:   '#1E3D6E',
  coveredActive:  '#1B48A0',
  uncovered:      '#0C1522',
  ocean:          '#070F1E',
}

/* ─── Mini dataset card in the panel ─────────────────────────────  */
function MapDatasetCard({ dataset, onPreview, onBuy }) {
  const color = LOB_COLORS[dataset.lob] || '#0066FF'
  return (
    <div className="map-card">
      <div className="map-card__top">
        <span className="map-card__dot" style={{ background: color }} />
        <span className="map-card__lob">{LOB_LABELS[dataset.lob] || dataset.lob}</span>
        <span className="map-card__price">${dataset.price}</span>
      </div>
      <div className="map-card__name">{dataset.name}</div>
      <div className="map-card__meta">{dataset.countries} · {dataset.dateRange}</div>
      <div className="map-card__actions">
        <button className="map-card__preview" onClick={() => onPreview(dataset)}>
          Preview &amp; Details
        </button>
        <button className="btn-primary map-card__buy" onClick={() => onBuy(dataset)}>
          Buy →
        </button>
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function InteractiveMap({ onPreview, onBuy }) {
  const [hovered,  setHovered]  = useState(null)
  const [selected, setSelected] = useState(null)

  const handleClick = (regionId) => {
    if (!regionId) return
    setSelected(prev => prev === regionId ? null : regionId)
  }

  const activeRegion   = REGIONS.find(r => r.id === selected)
  const panelDatasets  = selected ? datasetsForRegion(selected) : []
  const tooltipRegion  = hovered ? REGIONS.find(r => r.id === hovered) : null

  return (
    <section className="imap-section" id="coverage">
      <div className="section-divider" />
      <div className="container">

        {/* Header */}
        <div className="section-header">
          <div className="section-label">Global Coverage</div>
          <h2 className="section-title">80+ Countries. Every Major Insurance Market.</h2>
          <p className="section-sub">
            Click a region to browse its available datasets. From California wildfire data
            to UK flood maps, European construction indices to global mortality tables.
          </p>
        </div>

        {/* Map container */}
        <div className="imap-wrap">
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 153, center: [10, 8] }}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            {/* Ocean sphere */}
            <Sphere id="rsm-sphere" fill={FILL.ocean} stroke="rgba(0,102,255,0.12)" strokeWidth={0.5} />

            {/* Graticule — lat/lon grid */}
            <Graticule stroke="rgba(0,102,255,0.07)" strokeWidth={0.4} />

            {/* Countries */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const region    = COUNTRY_REGIONS[String(geo.id)]
                  const isHovered = region && hovered  === region
                  const isActive  = region && selected === region

                  const fill = isActive  ? FILL.coveredActive :
                               isHovered ? FILL.coveredHover  :
                               region    ? FILL.covered        :
                                           FILL.uncovered

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke="rgba(0,102,255,0.18)"
                      strokeWidth={0.4}
                      style={{
                        default: { outline: 'none' },
                        hover:   { outline: 'none', cursor: region ? 'pointer' : 'default' },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={() => region && setHovered(region)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => handleClick(region)}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Hover tooltip — fixed inside map container */}
          <div className={`imap-tooltip ${tooltipRegion ? 'imap-tooltip--visible' : ''}`}>
            {tooltipRegion && (
              <>
                <span className="imap-tooltip__name">{tooltipRegion.label}</span>
                <span className="imap-tooltip__sub">
                  {datasetsForRegion(tooltipRegion.id).length} datasets — click to explore
                </span>
              </>
            )}
          </div>

          {/* Legend */}
          <div className="imap-legend">
            <span className="imap-legend__item" style={{ '--dot': FILL.covered }}>
              Covered region
            </span>
            <span className="imap-legend__item" style={{ '--dot': FILL.coveredActive }}>
              Selected
            </span>
            <span className="imap-legend__item" style={{ '--dot': FILL.uncovered }}>
              No data (yet)
            </span>
          </div>
        </div>

        {/* Dataset panel */}
        {selected && (
          <div className="imap-panel" key={selected}>
            <div className="imap-panel__header">
              <div>
                <h3 className="imap-panel__title">{activeRegion?.label}</h3>
                <p className="imap-panel__sub">{activeRegion?.sub} · <strong>{panelDatasets.length}</strong> datasets available</p>
              </div>
              <button className="imap-panel__close" onClick={() => setSelected(null)} aria-label="Close panel">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="imap-panel__grid">
              {panelDatasets.map(d => (
                <MapDatasetCard key={d.id} dataset={d} onPreview={onPreview} onBuy={onBuy} />
              ))}
            </div>
          </div>
        )}

      </div>
      <div className="section-divider" style={{ marginTop: '80px' }} />
    </section>
  )
}
