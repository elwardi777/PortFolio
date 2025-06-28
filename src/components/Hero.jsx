import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { styles } from "../styles";
import Typewriter from "typewriter-effect";

/**
 * Hero component — fully responsive and touch-friendly for any phone/tablet/desktop.
 */
const Hero = () => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const imageRef = useRef(null);

  // Fluid spring animations for both desktop and mobile
  const springConfig = { stiffness: 200, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Handles both mouse and touch events for 3D tilt
  const handlePointerMove = (e) => {
    if (!imageRef.current) return;
    const bounds = imageRef.current.getBoundingClientRect();
    const clientX = e.type.includes("touch")
      ? e.touches[0].clientX
      : e.clientX;
    const clientY = e.type.includes("touch")
      ? e.touches[0].clientY
      : e.clientY;
    const x = clientX - bounds.left;
    const y = clientY - bounds.top;
    const rotateYValue = ((x / bounds.width) - 0.5) * 30;
    const rotateXValue = -((y / bounds.height) - 0.5) * 30;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section className="relative w-full min-h-screen h-[100svh] mx-auto">
      <div
        className={`absolute inset-0 top-[60px] sm:top-[90px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col md:flex-row items-center gap-8`}
      >
        {/* Side indicator */}
        <div className="flex flex-col items-center justify-start mt-2 md:mt-5">
          <div className="w-4 h-4 rounded-full bg-[#915EFF]" />
          <div className="w-1 h-20 xs:h-28 sm:h-32 md:h-80 violet-gradient mt-2" />
        </div>

        {/* Text Content */}
        <div className="flex-1 w-full">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Salut, je suis <span className="text-[#915EFF]">Abderrahmane</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            développeur spécialisé en&nbsp;
            <Typewriter
              options={{
                strings: [
                  "Développement Web",
                  "Cybersécurité",
                  "Intelligence Artificielle (IA)",
                  "Big Data & Analyse des données",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: "natural",
                pauseFor: 1000,
              }}
            />
          </p>
        </div>

        {/* 3D Responsive Image, touch & mouse compatible */}
        <motion.div
          className="flex-1 w-full max-w-[90vw] xs:max-w-[330px] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8 md:mt-0"
          ref={imageRef}
          style={{ perspective: 1000 }}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
          tabIndex={-1}
        >
          <motion.img
            src="/IMG-20250619-WA0031.jpg"
            alt="Abderrahmane"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "1rem",
              boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
              rotateX: springRotateX,
              rotateY: springRotateY,
              scale: 1.05,
              willChange: "transform",
              touchAction: "none",
              userSelect: "none",
              maxHeight: "360px",
            }}
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;