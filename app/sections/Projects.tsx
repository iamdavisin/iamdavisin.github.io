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
import { Magnetic, Reveal, SectionHeading, SpotlightCard, blurUp, staggerBox } from "../components/motion";

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


/* ── Tarjeta de proyecto ── */
function ProjectCard({ project, t }: { project: Project; t: (key: string) => string }) {
  return (
    <motion.div variants={blurUp} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]">
    <SpotlightCard tilt={6} className="h-full">
    <div className="flex h-full flex-col p-6">

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
    </div>
    </SpotlightCard>
    </motion.div>
  );
}

/* ── Componente principal ── */
export default function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="min-h-screen py-24 px-6 flex flex-col items-center justify-center scroll-mt-8"
    >
      <div className="max-w-4xl w-full">
        <SectionHeading index="03" title={t("projects.title")} subtitle={t("projects.subtitle")} />

        {/* Cuadrícula de proyectos */}
        <motion.div
          variants={staggerBox(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-5"
        >
          {projects.map((project) => (
            <ProjectCard key={project.titleKey} project={project} t={t} />
          ))}
        </motion.div>

        {/* Ver más */}
        <Reveal delay={0.2} className="flex justify-center mt-10">
          <Magnetic>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-(--background)/60 backdrop-blur border border-(--foreground)/[0.1] hover:border-(--foreground)/[0.25] transition-colors duration-300"
          >
            {t("projects.viewMore")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}