/* ── Datos compartidos entre la web y el CV (/cv) ──
   Los textos viven en app/locales/*.json; aquí solo están las claves,
   los iconos y los colores. Cambia algo aquí y se actualizan ambos. */
import { FaJava, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaDatabase, FaAngular } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiSpring, SiPostgresql, SiClaude } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

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
            { name: "VS Code", icon: <VscVscode />, color: "#007ACC" },
            { name: "Claude", icon: <SiClaude />, color: "#D97757" },
        ],
    },
];

/* start/end en formato "AAAA-MM"; sin end = en curso. Se usan para calcular las cifras. */
export type TimelineEntry = { titleKey: string; placeKey: string; dateKey: string; descKey?: string; start: string; end?: string };

export const education: TimelineEntry[] = [
    { titleKey: "about.edu1_title", placeKey: "about.edu1_place", dateKey: "about.edu1_date", start: "2025-09" },
    { titleKey: "about.edu2_title", placeKey: "about.edu2_place", dateKey: "about.edu2_date", start: "2023-09", end: "2024-06" },
    { titleKey: "about.edu3_title", placeKey: "about.edu3_place", dateKey: "about.edu3_date", start: "2021-09", end: "2023-06" },
    { titleKey: "about.edu4_title", placeKey: "about.edu4_place", dateKey: "about.edu4_date", start: "2019-09", end: "2021-06" },
];

export const experience: TimelineEntry[] = [
    { titleKey: "about.exp3_title", placeKey: "about.exp3_place", dateKey: "about.exp3_date", start: "2026-07" },
    { titleKey: "about.exp1_title", placeKey: "about.exp1_place", dateKey: "about.exp1_date", descKey: "about.exp1_desc", start: "2024-03", end: "2024-06" },
    { titleKey: "about.exp2_title", placeKey: "about.exp2_place", dateKey: "about.exp2_date", descKey: "about.exp2_desc", start: "2023-03", end: "2023-06" },
];

export const languages = [
    { nameKey: "cv.spanish", levelKey: "cv.spanishLevel" },
    { nameKey: "cv.english", levelKey: "cv.englishLevel" },
];

/* Meses trabajados en total (ambos meses incluidos; lo que está en curso cuenta hasta hoy) */
function monthsBetween(start: string, end: string | undefined, now: Date) {
    const [sy, sm] = start.split("-").map(Number);
    const [ey, em] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
    return Math.max(0, (ey - sy) * 12 + (em - sm) + 1);
}

export function yearsOfExperience(now = new Date()) {
    const months = experience.reduce((n, e) => n + monthsBetween(e.start, e.end, now), 0);
    return Math.max(1, Math.floor(months / 12));
}

/* Titulaciones terminadas (las que están en curso no cuentan) */
export const completedDegrees = education.filter((e) => e.end).length;
