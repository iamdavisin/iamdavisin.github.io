"use client";
import { motion } from "framer-motion";
import { FaGithub, FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";
import Link from "next/link";

/* ── Tipos ── */
type Project = {
  titleKey: string;
  descKey: string;
  tags: { label: string; icon: React.ReactNode; color: string }[];
  github?: string;
  demo?: string;
};

/* ── Datos ── */
const projects: Project[] = [
  {
    titleKey: "projects.portfolio",
    descKey: "projects.portfolio",
    tags: [
      { label: "Next.js", icon: <SiNextdotjs />, color: "#a0a0a0" },
      { label: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
      { label: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { label: "React", icon: <FaReact />, color: "#61DAFB" },
    ],
    github: "https://github.com/iamdavisin/iamdavisin.github.io",
  },
];

/* ── Variantes de animación ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ── Tarjeta de proyecto ── */
function ProjectCard({ project, t }: { project: Project; t: (key: string) => string }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col p-6 rounded-2xl bg-(--foreground)/[0.03] border border-(--foreground)/[0.06] hover:border-(--foreground)/[0.12] hover:bg-(--foreground)/[0.05] transition-all duration-300"
    >
      {/* Brillo */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 bg-blue-500/5" />

      {/* Título */}
      <h3 className="text-lg font-bold mb-2 text-(--foreground)/90 group-hover:text-(--foreground) transition-colors">
        {t(`${project.titleKey}.title`)}
      </h3>

      {/* Descripción */}
      <p className="text-sm text-(--foreground)/60 leading-relaxed mb-5 flex-1">
        {t(`${project.descKey}.desc`)}
      </p>

      {/* Etiquetas */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag.label}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-(--foreground)/[0.04] border border-(--foreground)/[0.06]"
          >
            <span style={{ color: tag.color }} className="text-[0.7rem]">
              {tag.icon}
            </span>
            <span className="text-(--foreground)/60">{tag.label}</span>
          </span>
        ))}
      </div>

      {/* Enlaces */}
      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-(--foreground)/[0.04] border border-(--foreground)/[0.06] hover:border-(--foreground)/[0.15] hover:bg-(--foreground)/[0.08] transition-all duration-300"
          >
            <FaGithub className="text-sm" />
            {t("projects.viewCode")}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
          >
            <ExternalLink size={13} />
            {t("projects.viewDemo")}
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ── Componente principal ── */
export default function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-6 flex flex-col items-center justify-center scroll-mt-8"
    >
      <div className="max-w-4xl w-full">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          {t("projects.title")}
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-(--foreground)/60 mb-12"
        >
          {t("projects.subtitle")}
        </motion.p>

        {/* Cuadrícula de proyectos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <ProjectCard key={project.titleKey} project={project} t={t} />
          ))}
        </motion.div>

        {/* Ver más */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-(--foreground)/[0.04] border border-(--foreground)/[0.08] hover:border-(--foreground)/[0.15] hover:bg-(--foreground)/[0.08] transition-all duration-300"
          >
            {t("projects.viewMore")}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}