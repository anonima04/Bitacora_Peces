// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Page/HomePage/HomePage';
import TipsPage from './Page/TipsPage/TipsPage';
import AboutUsPage from './Page/AboutUsPage/AboutUsPage';
import FeaturedSpeciesPage from './Page/FeaturedSpeciesPage/FeaturedSpeciesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consejos" element={<TipsPage />} />
        <Route path="/sobre-nosotros" element={<AboutUsPage />} />
        <Route path="/especies-destacadas" element={<FeaturedSpeciesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
