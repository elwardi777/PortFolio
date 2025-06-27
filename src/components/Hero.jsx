import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { styles } from "../styles";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const imageRef = useRef(null);

  // Animations à ressort plus fluides pour mobile/desktop
  const springConfig = { stiffness: 200, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Calcul de la rotation lors du déplacement du pointeur/toucher
  const handlePointerMove = (e) => {
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

  // Remise à zéro lors du départ du pointeur/fin du toucher
  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[100px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col md:flex-row items-center gap-8`}
      >
        {/* Indicateur latéral */}
        <div className="flex flex-col md:flex-col items-center justify-start mt-2 md:mt-5">
  <div className="w-4 h-4 rounded-full bg-[#915EFF]" />
  <div className="w-1 h-32 md:h-80 violet-gradient mt-2" />
</div>


        {/* Contenu texte */}
        <div className="flex-1 w-full">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Salut, je suis <span className="text-[#915EFF]">Abderrahmane</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          développeur spécialisé en&nbsp;{" "}
            <Typewriter
              options={{
                strings: [
                  "Développement Web ",
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


        {/* Image 3D, compatible responsive et touch/souris */}
        <motion.div
          className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8 md:mt-0"
          ref={imageRef}
          style={{ perspective: 1000 }}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          <motion.img
            src="/formation-programmation-personne.jpg"
            alt="Abderrahmane"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "1rem",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              rotateX: springRotateX,
              rotateY: springRotateY,
              scale: 1.05,
              willChange: "transform",
              touchAction: "none",
              userSelect: "none",
              maxHeight: "400px",
            }}
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;