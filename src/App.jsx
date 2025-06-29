import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import ContactFab from "./components/ContactFab";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "./components";
import Footer from "./components/Footer";

// Responsive Loader
const Loader = ({ show }) => (
  <div
    className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-all duration-700 ${
      show
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none translate-y-10"
    }`}
  >
    <span className="loader-text">CHARGEMENT...</span>
    <style>{`
      .loader-text {
        color: #915EFF;
        font-size: 2.5rem;
        font-family: 'Montserrat', 'Arial', sans-serif;
        font-weight: bold;
        text-shadow:
          0 0 8px #915EFF,
          0 0 24px #915EFF,
          0 0 40px #915EFF;
        letter-spacing: 0.25em;
        transition: opacity 0.7s, transform 0.7s;
        animation: glow 1.6s ease-in-out infinite alternate;
        /* Responsive font size */
        font-size: 2.5rem;
      }
      @media (max-width: 640px) {
        .loader-text {
          font-size: 1.4rem;
          letter-spacing: 0.12em;
        }
      }
      @media (max-width: 400px) {
        .loader-text {
          font-size: 1rem;
          letter-spacing: 0.09em;
        }
      }
      @keyframes glow {
        0% {
          text-shadow:
            0 0 8px #915EFF,
            0 0 24px #915EFF,
            0 0 40px #915EFF;
        }
        100% {
          text-shadow:
            0 0 32px #915EFF,
            0 0 48px #915EFF,
            0 0 72px #915EFF;
        }
      }
    `}</style>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    let hideTimer;
    if (!loading) {
      hideTimer = setTimeout(() => setShowLoader(false), 700);
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [loading]);

  if (showLoader) {
    return <Loader show={loading} />;
  }

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="relative z-0 bg-primary min-h-screen">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Experience />
      
        <Works />
        <div className="relative z-0">
          <Contact />
          <Footer />
          <StarsCanvas />
          <ContactFab />

        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;