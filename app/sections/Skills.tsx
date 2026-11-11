"use client";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "../components/LanguageProvider";
import { skillCategories, type Skill } from "../lib/resume";
import { SectionHeading, SpotlightCard, blurUp, staggerBox } from "../components/motion";

const tile: Variants = {
    hidden: { opacity: 0, scale: 0.7, filter: "blur(6px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 300, damping: 20 } },
};

/* ── Icono de tecnología: se ilumina con su propio color ── */
function SkillTile({ skill }: { skill: Skill }) {
    return (
        <motion.div
            variants={tile}
            whileHover={{ y: -4 }}
            className="group/tile relative flex flex-col items-center gap-2 rounded-xl p-3 cursor-default"
        >
            <span
                aria-hidden
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 35%, ${skill.color}26, transparent 70%)` }}
            />
            <span
                className="relative text-3xl transition-transform duration-300 group-hover/tile:scale-110 group-hover/tile:-rotate-6"
                style={{ color: skill.color, filter: `drop-shadow(0 0 0 ${skill.color})` }}
            >
                {skill.icon}
            </span>
            <span className="relative text-xs font-medium text-center leading-tight text-(--foreground)/75 group-hover/tile:text-(--foreground) transition-colors">
                {skill.name}
            </span>
        </motion.div>
    );
}

/* ── Componente principal ── */
export default function Skills() {
    const { t } = useTranslation();

    return (
        <section id="skills" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center scroll-mt-8">
            <div className="max-w-5xl w-full">
                <SectionHeading index="02" title={t("skills.title")} />

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={staggerBox(0.12)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {skillCategories.map((category) => {
                        // La categoría más grande ocupa todo el ancho (diseño "bento")
                        const wide = category.skills.length > 5;
                        return (
                            <motion.div key={category.titleKey} variants={blurUp} className={wide ? "md:col-span-2" : ""}>
                                <SpotlightCard className="h-full p-6">
                                    <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        {t(category.titleKey)}
                                    </h3>
                                    <motion.div
                                        variants={staggerBox(0.05, 0.15)}
                                        className={`grid gap-1 ${wide ? "grid-cols-4 sm:grid-cols-8" : "grid-cols-4"}`}
                                    >
                                        {category.skills.map((skill) => (
                                            <SkillTile key={skill.name} skill={skill} />
                                        ))}
                                    </motion.div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
