import { useState, useEffect, useMemo } from 'react'
import DatasetCard from './DatasetCard'
import { useInView } from '../hooks/useInView'
import { LOB_LABELS } from '../data/datasets'
import datasets from '../data/datasets'
import './Catalog.css'

const LOB_FILTERS = [
  { key: 'all',          label: 'All' },
  { key: 'auto',         label: 'Auto' },
  { key: 'property',     label: 'Property' },
  { key: 'health',       label: 'Health' },
  { key: 'life',         label: 'Life' },
  { key: 'commercial',   label: 'Commercial' },
  { key: 'cyber',        label: 'Cyber' },
  { key: 'travel',       label: 'Travel' },
  { key: 'specialty',    label: 'Specialty' },
  { key: 'workers_comp', label: 'Workers Comp' },
  { key: 'marine',       label: 'Marine' },
  { key: 'agriculture',  label: 'Agriculture' },
  { key: 'renewable',    label: 'Renewable' },
]

const SORT_OPTIONS = [
  { value: 'default',   label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc',label: 'Price: High → Low' },
  { value: 'name_asc',  label: 'Name A → Z' },
]

export default function Catalog({ activeLob, setActiveLob, onPreview, onBuy }) {
  const [search, setSearch]     = useState('')
  const [sort, setSort]         = useState('default')
  const [headerRef, headerVis]  = useInView()

  // Sync external LOB click (from LOB section)
  useEffect(() => {
    // nothing extra needed — activeLob is passed from parent
  }, [activeLob])

  const filtered = useMemo(() => {
    let list = [...datasets]

    // LOB filter
    if (activeLob && activeLob !== 'all') {
      list = list.filter(d => d.lob === activeLob)
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        (LOB_LABELS[d.lob] || '').toLowerCase().includes(q) ||
        d.countries.toLowerCase().includes(q)
      )
    }

    // Sort
    if (sort === 'price_asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name_asc')   list.sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [activeLob, search, sort])

  return (
    <section className="catalog" id="catalog">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header fade-in ${headerVis ? 'visible' : ''}`}
        >
          <div className="section-label">Dataset Catalog</div>
          <h2 className="section-title">Browse the Full Dataset Catalog</h2>
          <p className="section-sub">
            Every dataset is sourced from public records, government databases, and legally
            scraped sources. Full provenance documentation included with every purchase.
          </p>
        </div>

        {/* Filter bar */}
        <div className="catalog__filters">
          {/* Search */}
          <div className="catalog__search-wrap">
            <svg className="catalog__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#8899AA" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="#8899AA" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="catalog__search"
              placeholder="Search datasets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="catalog__search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          {/* Sort */}
          <select
            className="catalog__sort form-input"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* LOB pills */}
        <div className="catalog__lob-pills">
          {LOB_FILTERS.map(f => (
            <button
              key={f.key}
              className={`catalog__lob-pill ${(activeLob === f.key || (!activeLob && f.key === 'all')) ? 'catalog__lob-pill--active' : ''}`}
              onClick={() => setActiveLob(f.key === 'all' ? '' : f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="catalog__results-count">
          Showing <strong>{filtered.length}</strong> of <strong>56</strong> datasets
          {activeLob && activeLob !== 'all' && (
            <span> in <em>{LOB_LABELS[activeLob] || activeLob}</em></span>
          )}
          {search && <span> matching "<em>{search}</em>"</span>}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="catalog__grid">
            {filtered.map((d, i) => (
              <DatasetCard
                key={d.id}
                dataset={d}
                index={i}
                onPreview={onPreview}
                onBuy={onBuy}
              />
            ))}
          </div>
        ) : (
          <div className="catalog__empty">
            <div className="catalog__empty-icon">🔍</div>
            <p>No datasets match your search.</p>
            <button className="btn-outline" onClick={() => { setSearch(''); setActiveLob('') }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
