/* ── Datos compartidos entre la web y el CV (/cv) ──
   Los textos viven en app/locales/*.json; aquí solo están las claves,
   los iconos y los colores. Cambia algo aquí y se actualizan ambos. */
import { FaJava, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaDatabase, FaAngular } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiSpring, SiPostgresql, SiClaude } from "react-icons/si";
import { SquareTerminal } from "lucide-react";

export type Skill = { name: string; icon: React.ReactNode; color: string };
export type SkillCategory = { titleKey: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
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

export type TimelineEntry = { titleKey: string; placeKey: string; dateKey: string; descKey?: string };

export const education: TimelineEntry[] = [
    { titleKey: "about.edu1_title", placeKey: "about.edu1_place", dateKey: "about.edu1_date" },
    { titleKey: "about.edu2_title", placeKey: "about.edu2_place", dateKey: "about.edu2_date" },
    { titleKey: "about.edu3_title", placeKey: "about.edu3_place", dateKey: "about.edu3_date" },
    { titleKey: "about.edu4_title", placeKey: "about.edu4_place", dateKey: "about.edu4_date" },
];

export const experience: TimelineEntry[] = [
    { titleKey: "about.exp1_title", placeKey: "about.exp1_place", dateKey: "about.exp1_date", descKey: "about.exp1_desc" },
    { titleKey: "about.exp2_title", placeKey: "about.exp2_place", dateKey: "about.exp2_date", descKey: "about.exp2_desc" },
];

export const languages = [
    { nameKey: "cv.spanish", levelKey: "cv.spanishLevel" },
    { nameKey: "cv.english", levelKey: "cv.englishLevel" },
];
