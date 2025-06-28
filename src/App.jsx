import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
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
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ show }) => (
  <div
    className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-all duration-1000 ${
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
        animation: glow 1.6s ease-in-out infinite alternate;
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

const MainContent = ({ show }) => (
  <motion.div
    initial={{ y: "100%" }}
    animate={{ y: show ? 0 : "100%" }}
    transition={{ 
      duration: 2.5, // Slower duration
      ease: "easeInOut", // Smooth easing
      type: "tween" // Remove spring for smoother motion
    }}
    className="w-full min-h-screen bg-primary"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 1.5, delay: 1.5 }}
      className="bg-hero-pattern bg-cover bg-no-repeat bg-center"
    >
      <Navbar />
      <Hero />
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 1.5, delay: 2 }}
    >
      <About />
      <Experience />
      <Tech />
      <Works />
      <div className="relative z-0">
        <Contact />
        <Footer />
        <StarsCanvas />
      </div>
    </motion.div>
  </motion.div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Longer initial loading time
    const timer = setTimeout(() => setLoading(false), 3000);

    let hideTimer;
    if (!loading) {
      // Slower transition after loading
      hideTimer = setTimeout(() => {
        setShowLoader(false);
        setShowContent(true);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [loading]);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="relative z-0 overflow-hidden">
        {showLoader && <Loader show={loading} />}
        <MainContent show={showContent} />
      </div>
    </BrowserRouter>
  );
};

export default App;