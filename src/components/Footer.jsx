import './Footer.css'

const footerLinks = {
  Catalog: ['All Datasets', 'Auto & Vehicle', 'Home & Property', 'Health & Life', 'Cyber', 'Travel', 'Commercial P&C'],
  Company: ['About UWAII', 'How It Works', 'Coverage Map', 'Pricing', 'Contact'],
  Legal: ['Terms of Service', 'Data Licensing Terms', 'Privacy Policy', 'Refund Policy'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-dot" />
              UWAII
            </div>
            <p className="footer__tagline">The World's Insurance Data Layer</p>
            <p className="footer__desc">
              Bulk historical datasets for underwriters, actuaries, and insurtechs.
              Buy once. Use forever.
            </p>
            <a href="mailto:contact@uwaii.com" className="footer__email">
              contact@uwaii.com
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer__col">
              <h4 className="footer__col-title">{group}</h4>
              <ul>
                {links.map(l => (
                  <li key={l}>
                    <a href="#" onClick={e => e.preventDefault()} className="footer__link">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p>© 2025 UWAII.com — Underwriting AI Intelligence. All rights reserved.</p>
          <p>
            All datasets sourced from public records and government databases.
            <span className="footer__sep">·</span>
            Proof-of-concept — internal review only.
          </p>
        </div>
      </div>
    </footer>
  )
}
