import { useEffect, useState } from 'react';
import SmoothScroll from './context/SmoothScroll';
import Navigation from './components/layout/Navigation';
import Cursor from './components/ui/Cursor';
import Hero from './components/sections/Hero';
import Story from './components/sections/Story';
import Vision from './components/sections/Vision';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import WhyChoose from './components/sections/WhyChoose';
import Leadership from './components/sections/Leadership';
import Team from './components/sections/Team';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import './styles/global.scss';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('is-loading');
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.classList.remove('is-loading');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <Cursor />
      <Navigation />
      <main>
        <Hero />
        <Story />
        <Vision />
        <Projects />
        <Experience />
        <WhyChoose />
        <Leadership />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
