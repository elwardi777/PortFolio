import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { styles } from "../styles";
import Typewriter from "typewriter-effect";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebookF,
  FaDownload,
} from "react-icons/fa";

const use3DEffect = () => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const ref = useRef(null);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handlePointerMove = (e) => {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
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

  return {
    ref,
    springRotateX,
    springRotateY,
    handlePointerMove,
    handlePointerLeave,
  };
};

const Hero = () => {
  const imageEffect = use3DEffect();
  const cvEffect = use3DEffect();
  const socialEffects = [use3DEffect(), use3DEffect(), use3DEffect(), use3DEffect()];

  const openCV = () => window.open("/Resume.pdf", "_blank");

  const socials = [
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/abderrahmane-ourdi-aa69062b4/", label: "LinkedIn" },
    { icon: <FaGithub />, url: "https://github.com/elwardi777/", label: "GitHub" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaFacebookF />, url: "https://www.facebook.com/abderahman.wardi.9/", label: "Facebook" },
  ];

  return (
    <section className="relative w-full min-h-screen h-[100svh] mx-auto">
      <div
        className={`relative md:absolute md:inset-0 md:top-[60px] sm:top-[90px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col md:flex-row items-center gap-8`}
      >
        {/* Indicator */}
        <div className="flex flex-col items-center justify-start mt-2 md:mt-5">
          <div className="w-4 h-4 rounded-full bg-[#915EFF]" />
          <div className="w-1 h-20 xs:h-28 sm:h-32 md:h-80 violet-gradient mt-2" />
        </div>

        {/* Text Content */}
        <div className="flex-1 w-full text-center md:text-left">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Salut, je suis <span className="text-[#915EFF]">Abderrahmane</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            développeur spécialisé en&nbsp;
            <span style={{ color: "#C4AAFF", letterSpacing: "0.05em" }}>
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
            </span>
          </p>

          {/* CV + Social Icons */}
          <div className="mt-6 flex flex-wrap gap-8 justify-center md:justify-start items-center">
            {/* 3D CV Button */}
            <motion.div
              ref={cvEffect.ref}
              style={{
                rotateX: cvEffect.springRotateX,
                rotateY: cvEffect.springRotateY,
                touchAction: "none",
              }}
              onMouseMove={cvEffect.handlePointerMove}
              onMouseLeave={cvEffect.handlePointerLeave}
              onTouchMove={cvEffect.handlePointerMove}
              onTouchEnd={cvEffect.handlePointerLeave}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCV}
                className="flex items-center gap-2 px-6 py-3 border-2 border-[#915EFF] text-[#915EFF] font-semibold rounded-full transition-all duration-300 hover:bg-[#915EFF] hover:text-white shadow-xl"
                aria-label="Download CV"
              >
                Télécharger le CV <FaDownload />
              </motion.button>
            </motion.div>

            {/* Social Icons 3D */}
            <div className="flex gap-6">
              {socials.map((item, i) => {
                const effect = socialEffects[i];
                return (
                  <motion.div
                    key={i}
                    ref={effect.ref}
                    style={{
                      rotateX: effect.springRotateX,
                      rotateY: effect.springRotateY,
                      touchAction: "none",
                    }}
                    onMouseMove={effect.handlePointerMove}
                    onMouseLeave={effect.handlePointerLeave}
                    onTouchMove={effect.handlePointerMove}
                    onTouchEnd={effect.handlePointerLeave}
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#915EFF] border border-[#915EFF] p-2 rounded-full hover:bg-[#915EFF] hover:text-white transition duration-300 text-lg shadow-md block"
                      aria-label={item.label}
                    >
                      {item.icon}
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex justify-center items-center w-full">
          <motion.div
            className="w-full max-w-[90vw] xs:max-w-[330px] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8 md:mt-0"
            ref={imageEffect.ref}
            style={{
              perspective: 1000,
              rotateX: imageEffect.springRotateX,
              rotateY: imageEffect.springRotateY,
            }}
            onMouseMove={imageEffect.handlePointerMove}
            onMouseLeave={imageEffect.handlePointerLeave}
            onTouchMove={imageEffect.handlePointerMove}
            onTouchEnd={imageEffect.handlePointerLeave}
            tabIndex={-1}
          >
            <motion.img
              src="/IMG-20250619-WA0031.jpg"
              alt="Abderrahmane"
              className="max-h-[250px] xs:max-h-[300px] sm:max-h-[360px] w-full object-cover rounded-xl shadow-lg"
              style={{
                scale: 1.05,
                willChange: "transform",
                userSelect: "none",
                touchAction: "none",
              }}
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
