import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="relative w-full flex flex-col items-center pt-8 pb-6 px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 40% at 50% 80%, rgba(30,41,59,0.9) 60%, #0a0a0a 100%)",
        boxShadow: "0 10px 32px 0 rgba(0,0,0,.3), 0 2px 8px 0 #1e293b",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* 3D Logo/Button Effect */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/abderrahmane-ourdi-aa69062b4/",
              "_blank"
            )
          }
          aria-label="LinkedIn"
          className="bg-tertiary p-3 rounded-full shadow-2xl transition-transform duration-200 hover:bg-primary hover:text-white"
          style={{
            boxShadow:
              "0 6px 18px 0 rgba(59,130,246,0.4), 0 2.5px 9px 0 #3b82f6, 0 2px 12px 0 rgba(0,0,0,0.5)",
            transform:
              "perspective(700px) rotateX(10deg) rotateY(-8deg) scale(1.07)",
            border: "2px solid #3b82f6",
            transition:
              "box-shadow 0.3s, transform 0.2s, background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform =
              "perspective(700px) rotateX(4deg) rotateY(-3deg) scale(1.14)";
            e.currentTarget.style.boxShadow =
              "0 10px 26px 0 rgba(59,130,246,0.7), 0 7px 18px 0 #3b82f6, 0 3px 16px 0 rgba(0,0,0,0.7)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform =
              "perspective(700px) rotateX(10deg) rotateY(-8deg) scale(1.07)";
            e.currentTarget.style.boxShadow =
              "0 6px 18px 0 rgba(59,130,246,0.4), 0 2.5px 9px 0 #3b82f6, 0 2px 12px 0 rgba(0,0,0,0.5)";
          }}
        >
          <FaLinkedin size={28} />
        </button>
        <button
          onClick={() =>
            window.open("https://github.com/elwardi777", "_blank")
          }
          aria-label="GitHub"
          className="bg-tertiary p-3 rounded-full shadow-2xl transition-transform duration-200 hover:bg-primary hover:text-white"
          style={{
            boxShadow:
              "0 6px 18px 0 rgba(99,102,241,0.4), 0 2.5px 9px 0 #6366f1, 0 2px 12px 0 rgba(0,0,0,0.5)",
            transform:
              "perspective(700px) rotateX(10deg) rotateY(-8deg) scale(1.07)",
            border: "2px solid #6366f1",
            transition:
              "box-shadow 0.3s, transform 0.2s, background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform =
              "perspective(700px) rotateX(4deg) rotateY(-3deg) scale(1.14)";
            e.currentTarget.style.boxShadow =
              "0 10px 26px 0 rgba(99,102,241,0.7), 0 7px 18px 0 #6366f1, 0 3px 16px 0 rgba(0,0,0,0.7)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform =
              "perspective(700px) rotateX(10deg) rotateY(-8deg) scale(1.07)";
            e.currentTarget.style.boxShadow =
              "0 6px 18px 0 rgba(99,102,241,0.4), 0 2.5px 9px 0 #6366f1, 0 2px 12px 0 rgba(0,0,0,0.5)";
          }}
        >
          <FaGithub size={28} />
        </button>
      </div>
      <span className="text-xs tracking-widest text-center font-extrabold text-white drop-shadow-lg">
        © {new Date().getFullYear()} — <span className="font-extrabold">created by Abderrahmane Ourdi</span>
      </span>
    </footer>
  );
};

export default Footer;