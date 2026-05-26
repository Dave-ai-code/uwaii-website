import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import LinesOfBusiness from './components/LinesOfBusiness'
import Catalog from './components/Catalog'
import InteractiveMap from './components/InteractiveMap'
import { HowItWorksSection, AboutSection } from './components/Sections'
import Footer from './components/Footer'
import DetailDrawer from './components/DetailDrawer'
import PurchaseModal from './components/PurchaseModal'
import './App.css'

export default function App() {
  const [selectedDataset, setSelectedDataset] = useState(null)
  const [isModalOpen, setIsModalOpen]         = useState(false)
  const [activeLob, setActiveLob]             = useState('')

  const handlePreview = (dataset) => {
    setSelectedDataset(dataset)
    setIsModalOpen(false)
  }

  const handleBuy = (dataset) => {
    setSelectedDataset(dataset)
    setIsModalOpen(true)
  }

  const handleLobClick = (lobKey) => {
    setActiveLob(lobKey)
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleBrowse = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCoverage = () => {
    document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Nav />

      <section id="hero">
        <Hero onBrowse={handleBrowse} onCoverage={handleCoverage} />
      </section>

      <LinesOfBusiness onLobClick={handleLobClick} />

      <Catalog
        activeLob={activeLob}
        setActiveLob={setActiveLob}
        onPreview={handlePreview}
        onBuy={handleBuy}
      />

      <InteractiveMap onPreview={handlePreview} onBuy={handleBuy} />

      <HowItWorksSection />
      <AboutSection />
      <Footer />

      {/* Detail Drawer — opened from catalog or map */}
      {selectedDataset && !isModalOpen && (
        <DetailDrawer
          dataset={selectedDataset}
          onClose={() => setSelectedDataset(null)}
          onPurchase={() => setIsModalOpen(true)}
        />
      )}

      {/* Purchase Modal */}
      {isModalOpen && selectedDataset && (
        <PurchaseModal
          dataset={selectedDataset}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedDataset(null)
          }}
        />
      )}
    </div>
  )
}
