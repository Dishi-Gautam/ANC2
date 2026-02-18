import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MainGrid from './components/MainGrid'
import SwipeSection from './components/SwipeSection'
import ServicesSection from './components/ServicesSection'
import Footer from './components/Footer'
import { ImagePreviewProvider } from './components/ImagePreview'

function App() {
  return (
    <ImagePreviewProvider>
      <div className="min-h-screen bg-black overflow-x-clip">
        <Navbar />
        <HeroSection />
        <MainGrid />
        <SwipeSection />
        <ServicesSection />
        <Footer />
      </div>
    </ImagePreviewProvider>
  )
}

export default App
