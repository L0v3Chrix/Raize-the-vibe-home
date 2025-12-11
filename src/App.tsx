import Hero from './components/Hero';
import VibeQuiz from './components/VibeQuiz';
import VibeResults from './components/VibeResults';
import StoryTimeline from './components/StoryTimeline';
import ServicesSection from './components/ServicesSection';
import ProofSection from './components/ProofSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import TestBooking from './pages/TestBooking';

function App() {
  // Check for test mode via URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const testMode = urlParams.get('test') === 'booking';

  // If in test mode, show only the booking test page
  if (testMode) {
    return <TestBooking />;
  }

  return (
    <div className="min-h-screen bg-vibe-black text-white">
      {/* Hero Section */}
      <Hero />

      {/* Quiz Section - only shows after quiz starts */}
      <VibeQuiz />

      {/* Results Section - only shows after quiz completes */}
      <VibeResults />

      {/* Story Timeline */}
      <StoryTimeline />

      {/* Services Section */}
      <ServicesSection />

      {/* Proof/Testimonials Section */}
      <ProofSection />

      {/* Footer */}
      <Footer />

      {/* Booking Modal - popup only, no footer form */}
      <BookingModal />
    </div>
  );
}

export default App;
