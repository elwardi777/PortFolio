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

// Responsive Loader with "log-in-the-picture" animated effect
const Loader = ({ show }) => (
  <div
    className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-all duration-700 ${
      show
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none translate-y-10"
    }`}
  >
    <div className="relative flex items-center justify-center">
      <span className="loader-text">CHARGEMENT...</span>
      {/* Animated glowing log/bar */}
      <span className="loader-log" />
    </div>
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
        position: relative;
        z-index: 2;
      }
      .loader-log {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 0.6em;
        background: linear-gradient(90deg, rgba(145,94,255,0) 0%, #915EFF 50%, rgba(145,94,255,0) 100%);
        opacity: 0.55;
        border-radius: 0.3em;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: 1;
        animation: sweep 1.2s linear infinite;
        filter: blur(3px);
      }
      @keyframes sweep {
        0% { left: -60%; width: 40%; opacity: 0.2; }
        30% { opacity: 0.55; }
        50% { left: 10%; width: 80%; opacity: 0.9; }
        70% { opacity: 0.55; }
        100% { left: 100%; width: 40%; opacity: 0.2; }
      }
      @media (max-width: 640px) {
        .loader-text {
          font-size: 1.4rem;
          letter-spacing: 0.12em;
        }
        .loader-log {
          height: 0.35em;
        }
      }
      @media (max-width: 400px) {
        .loader-text {
          font-size: 1rem;
          letter-spacing: 0.09em;
        }
        .loader-log {
          height: 0.22em;
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