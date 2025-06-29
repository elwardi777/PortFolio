import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import "../index.css";

const InputField = ({ label, value, onChange, placeholder, name, type }) => (
  <label className="flex flex-col">
    <span className="text-white font-medium mb-4">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
    />
  </label>
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setConfirmation("");

    if (!form.name.trim()) {
      setNameError("Le nom est requis.");
      return;
    }

    setLoading(true);

    // Message WhatsApp joliment formaté
    const phoneNumber = "212717628421";
    // Utilise \n pour les retours à la ligne, puis encodeURIComponent convertira en %0A
    const messageText =
      ` Nouveau message de contact \n` +
      `--------------------\n` +
      `Nom : ${form.name}\n` +
      `Message :\n${form.message}\n` +
      `--------------------\n` ;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

    window.open(whatsappUrl, "_blank");

    setLoading(false);
    setConfirmation(
      "Votre message a été ouvert dans WhatsApp. Je vous répondrai dès que possible."
    );

    setForm({
      name: "",
      message: "",
    });
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Entrer en contact</p>
        <h3 className={styles.sectionHeadText}>Contactez-moi</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <InputField
            label="Votre nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Insérez votre nom ici..."
            type="text"
          />
          {nameError && <span className="text-red-500">{nameError}</span>}

          <InputField
            label="Votre message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Que voulez-vous dire...?"
            type="text"
          />

<div className="flex justify-center">
  <button
    type="submit"
    className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
  >
    {loading ? "Ouverture de WhatsApp..." : "Envoyer sur WhatsApp"}
  </button>
</div>

          {confirmation && <p className="text-green-500">{confirmation}</p>}
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");