import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/Themes';
import GlobalStyles from './styles/GlobalStyles';

import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import ParticleCanvas from './components/three/ParticleCanvas';

import Hero from './components/sections/Hero';
import MarqueeBanner from './components/sections/MarqueeBanner';
import Overview from './components/sections/Overview';
import GreatUnity from './components/sections/GreatUnity';
import InternationalUnity from './components/sections/InternationalUnity';
import ModernApplication from './components/sections/ModernApplication';
import QuoteShowcase from './components/sections/QuoteShowcase';
import ReviewQuiz from './components/sections/ReviewQuiz';
import ReferencesFooter from './components/sections/ReferencesFooter';

const AppLayout = styled.div`
  width: ${props => (props.menuOpen ? 'calc(100vw - 380px)' : '100%')};
  max-width: ${props => (props.menuOpen ? 'calc(100vw - 380px)' : '100%')};
  min-height: 100vh;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-right: ${props => (props.menuOpen ? '380px' : '0')};
  overflow-x: hidden;
  position: relative;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
  }
`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <ParticleCanvas />
      <AppLayout menuOpen={menuOpen}>
        <Navigation menuOpen={menuOpen} />
        <main style={{ position: 'relative', zIndex: 2 }}>
          <Hero />
          <MarqueeBanner />
          <Overview />
          <GreatUnity />
          <InternationalUnity />
          <ModernApplication />
          <QuoteShowcase />
          <ReviewQuiz />
        </main>
        <ReferencesFooter />
      </AppLayout>
      <ScrollToTop isOpen={menuOpen} setIsOpen={setMenuOpen} />
    </ThemeProvider>
  );
}

export default App;
