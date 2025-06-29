import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

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

const TechCard = ({ name, icon, proficiency }) => {
  const {
    ref,
    springRotateX,
    springRotateY,
    handlePointerMove,
    handlePointerLeave,
  } = use3DEffect();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`
        flex flex-col items-center justify-center w-32 h-36 sm:w-40 sm:h-44 rounded-2xl bg-[#181028]
        cursor-pointer border-2
        ${hovered ? "border-violet-500 shadow-xl scale-105" : "border-transparent"}
        will-change-transform
        transition-transform
      `}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 1000,
      }}
      onMouseMove={(e) => {
        handlePointerMove(e);
        if (!hovered) setHovered(true);
      }}
      onMouseLeave={() => {
        handlePointerLeave();
        setHovered(false);
      }}
      onTouchMove={handlePointerMove}
      onTouchEnd={() => {
        handlePointerLeave();
        setHovered(false);
      }}
    >
      <img
        src={icon}
        alt={name}
        className={`w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3 transition-all duration-300 ${
          hovered ? "grayscale-0 opacity-100" : "grayscale opacity-50"
        }`}
      />
      <span
        className={`text-lg sm:text-2xl font-bold transition-opacity duration-200 ${
          hovered ? "text-violet-400 opacity-100" : "opacity-0"
        }`}
      >
        {proficiency}
      </span>
      <span
        className={`mt-1 sm:mt-2 text-sm sm:text-base font-medium transition-colors duration-200 ${
          hovered ? "text-violet-400" : "text-transparent"
        }`}
      >
        {name}
      </span>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <section id="skills" className="w-full flex flex-col items-center py-8 px-2 sm:px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-violet-400">Mes compétences</h2><br />
      <div className="w-full flex flex-wrap justify-center items-center gap-5 sm:gap-10 overflow-visible">
        {technologies.map((tech) => (
          <TechCard
            key={tech.name}
            name={tech.name}
            icon={tech.icon}
            proficiency={tech.proficiency}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "");