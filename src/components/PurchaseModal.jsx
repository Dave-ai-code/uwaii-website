import { useState, useEffect } from 'react'
import './PurchaseModal.css'

const INTENDED_USE_OPTIONS = [
  'Pricing Model Development',
  'Rate Filing Support',
  'Actuarial Research',
  'Product Development',
  'Risk Management',
  'Competitor Benchmarking',
  'Other',
]

export default function PurchaseModal({ dataset, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', company: '', intendedUse: '', agreed: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  // Escape key & body scroll
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name        = 'Full name is required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid work email required'
    if (!form.company.trim())     e.company     = 'Company name is required'
    if (!form.intendedUse)        e.intendedUse = 'Please select an intended use'
    if (!form.agreed)             e.agreed      = 'You must agree to the licensing terms'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    // PoC: simulate submit
    setSubmitted(true)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="modal__header">
          <div>
            <h2 className="modal__title">{dataset.name}</h2>
            <div className="modal__subtitle">
              Complete your purchase · <strong className="modal__price">${dataset.price} one-time</strong>
            </div>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {submitted ? (
          <SuccessState dataset={dataset} onClose={onClose} />
        ) : (
          <form className="modal__form" onSubmit={handleSubmit} noValidate>
            <div className="modal__form-grid">
              <FormField label="Full Name" error={errors.name}>
                <input
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
              </FormField>

              <FormField label="Work Email" error={errors.email}>
                <input
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  type="email"
                  placeholder="jane@insurer.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                />
              </FormField>

              <FormField label="Company Name" error={errors.company} className="modal__field--full">
                <input
                  className={`form-input ${errors.company ? 'form-input--error' : ''}`}
                  type="text"
                  placeholder="Acme Insurance Group"
                  value={form.company}
                  onChange={e => set('company', e.target.value)}
                />
              </FormField>

              <FormField label="Intended Use" error={errors.intendedUse} className="modal__field--full">
                <select
                  className={`form-input ${errors.intendedUse ? 'form-input--error' : ''}`}
                  value={form.intendedUse}
                  onChange={e => set('intendedUse', e.target.value)}
                >
                  <option value="">Select intended use...</option>
                  {INTENDED_USE_OPTIONS.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Terms */}
            <label className={`modal__terms ${errors.agreed ? 'modal__terms--error' : ''}`}>
              <input
                type="checkbox"
                checked={form.agreed}
                onChange={e => set('agreed', e.target.checked)}
              />
              <span>
                I agree to the{' '}
                <a href="#" onClick={e => e.preventDefault()} className="modal__terms-link">
                  UWAII Data Licensing Terms
                </a>{' '}
                — dataset is for internal use only and may not be resold or redistributed.
              </span>
            </label>
            {errors.agreed && <p className="modal__error-text">{errors.agreed}</p>}

            {/* Submit */}
            <button type="submit" className="btn-primary modal__submit">
              Complete Purchase — ${dataset.price}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <p className="modal__footer-note">
              Dataset delivered via email within 1 business day.
              Questions? <a href="mailto:contact@uwaii.com">contact@uwaii.com</a>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function FormField({ label, error, children, className = '' }) {
  return (
    <div className={`form-group ${className}`}>
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="modal__error-text">{error}</p>}
    </div>
  )
}

function SuccessState({ dataset, onClose }) {
  return (
    <div className="modal__success">
      <div className="modal__success-icon">✓</div>
      <h3>Purchase Received!</h3>
      <p>
        Thank you for purchasing <strong>{dataset.name}</strong>.
        You'll receive an email confirmation and your dataset within 1 business day.
      </p>
      <p className="modal__success-sub">
        Confirmation sent to your work email. Questions? <a href="mailto:contact@uwaii.com">contact@uwaii.com</a>
      </p>
      <button className="btn-primary" onClick={onClose}>
        Done
      </button>
    </div>
  )
}
