import {
  Navbar,
  HeroSection,
  MainGrid,
  SwipeSection,
  ServicesSection,
  Footer,
  ImagePreviewProvider,
} from './components'

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
