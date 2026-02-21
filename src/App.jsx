import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LangProvider } from './hooks/useLang';
import Crosshair from './components/Crosshair';
import LangToggle from './components/LangToggle';
import LandingPage from './components/LandingPage';
import MainMenu from './components/MainMenu';
import ContentPageRoute from './components/ContentPageRoute';
import PhotographyPageRoute from './components/PhotographyPageRoute';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import KeyboardNavProvider from './components/KeyboardNavProvider';

function AppRoutes() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
  }, []);

  return (
    <>
      <KeyboardNavProvider />
      <Crosshair />
      <LangToggle />
      <Routes>
        <Route
          path="/"
          element={
            hasEntered ? (
              <Navigate to="/menu" replace />
            ) : (
              <LandingPage onEnter={handleEnter} />
            )
          }
        />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/about" element={<ContentPageRoute section="about" />} />
        <Route path="/it" element={<ContentPageRoute section="it" />} />
        <Route path="/actor" element={<ContentPageRoute section="actor" />} />
        <Route path="/photography" element={<PhotographyPageRoute />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <LangProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </LangProvider>
  );
}

export default App;
