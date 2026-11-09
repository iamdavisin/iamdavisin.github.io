"use client";
import { motion } from "framer-motion";
import { FaJava, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaDatabase, FaAngular, } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiSpring, SiPostgresql, SiClaude } from "react-icons/si";
import { SquareTerminal } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";

/* ── Tipos ── */
type HardSkill = { name: string; icon: React.ReactNode; color: string };
type HardSkillCategory = { titleKey: string; skills: HardSkill[] };


/* ── Datos (iconos y colores no necesitan traducción) ── */
const hardSkillCategories: HardSkillCategory[] = [
    {
        titleKey: "skills.frontend",
        skills: [
            { name: "React", icon: <FaReact />, color: "#61DAFB" },
            { name: "Angular", icon: <FaAngular />, color: "#e32626ff" },
            { name: "Next.js", icon: <SiNextdotjs />, color: "#a0a0a0" },
            { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
            { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
            { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
            { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
            { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
        ],
    },
    {
        titleKey: "skills.backend",
        skills: [
            { name: "Java", icon: <FaJava />, color: "#ED8B00" },
            { name: "Spring", icon: <SiSpring />, color: "#6DB33F" },
            { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
            { name: "SQL", icon: <FaDatabase />, color: "#4479A1" },
        ],
    },
    {
        titleKey: "skills.tools",
        skills: [
            { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
            { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
        ],
    },
    {
        titleKey: "skills.ai",
        skills: [
            { name: "Claude", icon: <SiClaude />, color: "#D97757" },
            { name: "Claude Code", icon: <SquareTerminal size="1em" />, color: "#D97757" },
        ],
    },
];

/* ── Variantes de animación ── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

/* ── Tarjeta de habilidad ── */
function SkillCard({ skill }: { skill: HardSkill }) {


    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.04 }}
            className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-(--foreground)/[0.03] border border-(--foreground)/[0.06] hover:border-(--foreground)/[0.12] hover:bg-(--foreground)/[0.06] transition-colors duration-300 cursor-default"
        >
            {/* Brillo al pasar el ratón */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{ background: `${skill.color}15` }}
            />

            <span
                className="text-3xl transition-transform duration-300 group-hover:scale-110"
                style={{ color: skill.color }}
            >
                {skill.icon}
            </span>
            <span className="text-sm font-medium text-center leading-tight text-(--foreground)/80 group-hover:text-(--foreground) transition-colors">
                {skill.name}
            </span>
        </motion.div>
    );
}

/* ── Componente principal ── */
export default function Skills() {
    const { t } = useTranslation();

    return (
        <section
            id="skills"
            className="min-h-screen py-20 px-6 flex flex-col items-center justify-center scroll-mt-8"
        >
            <div className="max-w-4xl w-full">
                {/* Título */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-12 text-center"
                >
                    {t("skills.title")}
                </motion.h2>
                {/* Habilidades técnicas */}
                <div className="space-y-10">
                    {hardSkillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                        >
                            <h3 className="text-lg font-semibold mb-4 text-blue-500 tracking-wide uppercase text-xs">
                                {t(category.titleKey)}
                            </h3>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
                            >
                                {category.skills.map((skill) => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}