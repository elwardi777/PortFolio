import React, { useState, useRef } from "react";
import { FaCommentDots, FaWhatsapp, FaEnvelope, FaTimes } from "react-icons/fa";
import { motion, useMotionValue, useSpring } from "framer-motion";

const whatsappNumber = "212717628421";
const gmailAddress = "abderahmanelwardi62@gmail.com";

// 3D effect hook
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

const ContactFab = () => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const fabEffect = use3DEffect();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Replace this with your form sending logic, e.g. EmailJS or backend API
  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setShowForm(false);
      alert("Message sent! Thank you 😊");
      setForm({ name: "", email: "", message: "" });
    }, 1400);
  };

  return (
    <>
      {/* Floating 3D Action Button */}
      <motion.button
        ref={fabEffect.ref}
        style={{
          rotateX: fabEffect.springRotateX,
          rotateY: fabEffect.springRotateY,
          touchAction: "none",
          boxShadow: "0 0 24px 0 #915EFF80, 0 8px 32px 0 #915EFF40",
        }}
        onMouseMove={fabEffect.handlePointerMove}
        onMouseLeave={fabEffect.handlePointerLeave}
        onTouchMove={fabEffect.handlePointerMove}
        onTouchEnd={fabEffect.handlePointerLeave}
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 z-50 bg-[#915EFF] hover:bg-[#7d42e6] transition-colors duration-200 w-16 h-16 rounded-full shadow-xl flex items-center justify-center focus:outline-none"
        aria-label="Contact"
      >
        <FaCommentDots color="white" size={32} />
      </motion.button>

      {/* Choices popup */}
      {open && (
        <div className="fixed bottom-28 right-8 z-50 flex flex-col gap-3 bg-white p-4 rounded-xl shadow-lg min-w-[200px] animate-fadeIn">
          <button
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
            onClick={() =>
              window.open(`https://wa.me/${whatsappNumber}`, "_blank")
            }
          >
            <FaWhatsapp color="#25d366" size={22} />
            <span className="text-gray-800 font-medium">WhatsApp</span>
          </button>
          <button
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
            onClick={() =>
              window.open(`mailto:${gmailAddress}`, "_blank")
            }
          >
            <FaEnvelope color="#EA4335" size={20} />
            <span className="text-gray-800 font-medium">Gmail</span>
          </button>
         
        </div>
      )}

      {/* Modal Contact Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[90vw] max-w-md relative animate-fadeIn">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              <FaTimes size={22} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#915EFF]">Send me a message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-[#915EFF]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-[#915EFF]"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-[#915EFF]"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-[#915EFF] hover:bg-[#7d42e6] text-white rounded py-2 font-semibold mt-2 transition"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s cubic-bezier(.4,2,.2,1) both;
        }
      `}</style>
    </>
  );
};

export default ContactFab;