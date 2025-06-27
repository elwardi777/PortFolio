import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { close, menu } from '../assets';
import { navLinks } from '../constants';
import { styles } from '../styles';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

const NAME = "Abderrahmane Ourdi";
const COLORS = ["#915EFF", "white"];

const NAVBAR_HEIGHT = 56; // la hauteur fixe de ta navbar (en px)

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Animated name effect
  const [logoHovered, setLogoHovered] = useState(false);
  const [logoLetterStates, setLogoLetterStates] = useState(
    Array(NAME.length).fill(false)
  );

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const imgRef = useRef(null);
  const springConfig = { stiffness: 200, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handlePointerMove = (e) => {
    if (!imgRef.current) return;
    const bounds = imgRef.current.getBoundingClientRect();
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
    const x = clientX - bounds.left;
    const y = clientY - bounds.top;
    const rotateYValue = ((x / bounds.width) - 0.5) * 32;
    const rotateXValue = -((y / bounds.height) - 0.5) * 32;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const toggleResume = () => {
    const resumeUrl = '/Resume.pdf';
    window.open(resumeUrl);
  };

  useEffect(() => {
    if (toggle) setActive('');
  }, [toggle]);

  useEffect(() => {
    let timeout;
    if (logoHovered) {
      NAME.split('').forEach((_, idx) => {
        timeout = setTimeout(() => {
          setLogoLetterStates((old) => {
            const arr = [...old];
            arr[idx] = true;
            return arr;
          });
        }, idx * 30);
      });
    } else {
      setLogoLetterStates(Array(NAME.length).fill(false));
    }
    return () => clearTimeout(timeout);
  }, [logoHovered]);

  const renderModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
      style={{ cursor: 'zoom-out' }}
    >
      <div className="relative">
        <button
          aria-label="Fermer"
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg text-black text-xl"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
        >
          &times;
        </button>
        <img
          src="/IMG-20250619-WA0031.jpg"
          alt="Agrandir"
          className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );

  return (
    <>
      {showModal && renderModal()}

      <nav
        className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-20 bg-primary shadow-md`}
        style={{
          height: NAVBAR_HEIGHT,
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto" style={{ height: '100%' }}>
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            {/* Avatar 3D */}
            <motion.div
              ref={imgRef}
              style={{
                perspective: 800,
                width: 56,
                height: 56,
                minWidth: 56,
                minHeight: 56,
                marginRight: 8,
                borderRadius: '50%',
                boxShadow: '0 6px 24px rgba(145,94,255,0.3)',
                rotateX: springRotateX,
                rotateY: springRotateY,
                willChange: 'transform',
                touchAction: 'none',
                userSelect: 'none',
                background: 'linear-gradient(135deg, #915EFF55 0%, #fff2 100%)',
                border: '3px solid #915EFF',
                cursor: 'pointer',
                
              }}
              className="overflow-hidden flex items-center justify-center"
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerLeave}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              tabIndex={0}
              aria-label="Afficher la photo en grand"
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") setShowModal(true);
              }}
            >
              <img
                src="/IMG-20250619-WA0031.jpg"
                alt="logo"
                className="w-full h-full object-cover rounded-full"
                draggable={false}
              />
            </motion.div>

            {/* Animated Name */}
            <span className="text-lg md:text-xl font-bold overflow-hidden select-none whitespace-nowrap">
              {NAME.split('').map((letter, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-block transition-all duration-300",
                    logoHovered || logoLetterStates[index]
                      ? ""
                      : "text-secondary"
                  )}
                  style={{
                    color: logoHovered || logoLetterStates[index]
                      ? COLORS[index % COLORS.length]
                      : "#cbd5e1",
                    transform: logoHovered || logoLetterStates[index]
                      ? "translateY(-2px)"
                      : "none",
                    transitionDelay: `${index * 30}ms`
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="list-none hidden sm:flex flex-row gap-6">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? 'text-white' : 'text-white'
                } hover:text-white text-[20px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
            <li className="text-white hover:text-white text-[20px] font-medium cursor-pointer">
              <button onClick={toggleResume}>CV</button>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-8 h-8 object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
      </nav>

      {/* Sidebar mobile collée JUSTE SOUS la navbar */}
      <AnimatePresence>
        {toggle && (
          <motion.div
          className="fixed left-0 right-0 bg-transparent backdrop-blur-md text-white shadow-md z-10 rounded-b-2xl max-w-md mx-auto overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              top: NAVBAR_HEIGHT,
              maxHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`
            }}
          >
            <nav className="flex flex-col space-y-6 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`py-3 px-4 rounded-md text-lg transition-colors ${
                    active === link.title
                      ? 'text-[#915EFF] bg-[#fff1]'
                      : 'text-white/80 hover:text-[#915EFF] hover:bg-white/10'
                  }`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(false);
                  }}
                >
                  {link.title}
                </a>
              ))}
              <button
                onClick={() => {
                  toggleResume();
                  setToggle(false);
                }}
                className="py-3 px-4 rounded-md text-lg transition-colors text-white/80 hover:text-[#915EFF] hover:bg-white/10"
              >
                CV
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer pour éviter que le contenu saute */}
      <div className="block sm:hidden" style={{ height: toggle ? 'auto' : 0 }} />
    </>
  );
};

export default Navbar;
