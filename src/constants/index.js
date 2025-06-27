import {
  c,
  python,
  java,
  cpp,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  edunet,
  weatherpedia,
  termpw,
  payloadmaster,
  threejs,
  mhft,
  sketcher,
  mathwork,
  CompileVortex,
  eduskill,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "À propos",
  },
  {
    id: "work",
    title: "Travail",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  { title: "C", icon: c },
  { title: "Python", icon: python },
  { title: "Java", icon: java },
  { title: "Html", icon: html }, 
  { title: "CSS", icon: css },
  { title: "JavaScript", icon: javascript },
];

export const technologies = [
  { name: "C", icon: c },
  { name: "Python", icon: python },
  { name: "Java", icon: java },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "Rect JS", icon: reactjs },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
   



];

export const experiences = [
  {
    title: "Stagiaire Développeur  Front-End",
    company_name: "Excelo (Groupe Anouar Invest)",
    icon: eduskill,
    iconBg: "#161329",
    date: "Avr 2024 - Juin 2024",
    points: [
     "Développement d’un site vitrine moderne pour Excelo en utilisant HTML, CSS et JavaScript, avec une attention particulière à l’ergonomie et à la performance.",
  "Création d’interfaces interactives et responsive, avec une mise en page adaptée aux mobiles, tablettes et ordinateurs.",
  "Utilisation des bonnes pratiques de développement front-end pour présenter les produits, la vision de l’entreprise et les offres commerciales.",
],
  },
  {
    title: "Stagiaire Full Stack – Gestion des Stagiaires",
    company_name: "France Ascenseurs",
    icon: mathwork,
    iconBg: "#161329",
    date: "Avr 2025 - Juin 2025",
    points: [
     "Conception et développement d’un système complet de gestion des stagiaires en React, TypeScript et Express.js.",
      "Mise en place de fonctionnalités telles que l'ajout, la suppression, la modification et la recherche des stagiaires avec stockage sécurisé en base de données.",
      "Intégration d’une interface intuitive pour l'administration avec authentification, filtres, et notifications en temps réel.",
    ],
  },
 
];export const projects = [
  {
    name: "Frontend Excelo (Excelissia)",
    description:
      "Développement frontend moderne et responsive pour le site vitrine d’Excelo, avec un accent sur l’ergonomie et la performance.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Responsive Design", color: "pink-text-gradient" },
    ],
    image: "/Excelissia.png",
    source_code_link: "https://github.com/elwardi777/Excelissia",
  },

  {
    name: "Gestion des Stagiaires pour France Ascenseurs",
    description:
      "Application web pour la gestion complète des stagiaires durant leur période de formation, avec suivi des stages et évaluations.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "MySQL", color: "green-text-gradient" },
    ],
    image: "https://example.com/images/gestion-stagiaire.png",
    source_code_link: "",
  },

  {
    name: "Projet de Fin d'Études (PFE) VintedMaghreb",
    description:
      "Application full-stack inspirée de Vinted, avec gestion des utilisateurs, catalogue, panier, et intégration de Supabase pour le backend et l’authentification.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "MySQL", color: "green-text-gradient" },
      { name: "Full-stack", color: "pink-text-gradient" },
    ],
    image: "https://example.com/images/vintedmaghreb.png",
    source_code_link: "",
  },
];
