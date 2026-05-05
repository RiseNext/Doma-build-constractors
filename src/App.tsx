import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import JournalSection from './sections/JournalSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Sections with z-index stacking */}
      <div className="relative">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <AboutSection />
        <JournalSection />
        <ContactSection />
      </div>
    </main>
  );
}

export default App;
