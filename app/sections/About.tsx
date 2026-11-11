"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";
import { education, experience, type TimelineEntry } from "../lib/resume";
import { Reveal, SectionHeading, blurUp, staggerBox } from "../components/motion";

/* ── Línea de tiempo que se "dibuja" según avanza el scroll ── */
function Timeline({
  icon,
  title,
  items,
  t,
}: {
  icon: React.ReactNode;
  title: string;
  items: TimelineEntry[];
  t: (k: string) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div>
      <Reveal className="flex items-center gap-2 mb-6">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-500">{icon}</span>
        <h3 className="text-xs uppercase tracking-widest text-(--foreground)/60 font-medium">{title}</h3>
      </Reveal>

      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerBox(0.12)}
        className="relative"
      >
        {/* Carril y trazo animado */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-(--foreground)/10" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-linear-to-b from-blue-500 via-cyan-400 to-blue-500"
        />

        {items.map((item) => (
          <motion.div key={item.titleKey + item.placeKey} variants={blurUp} className="group relative pl-8 pb-8 last:pb-0">
            <motion.span
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 400, damping: 18 } } }}
              className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-blue-500 bg-(--background) transition-colors duration-300 group-hover:bg-blue-500 group-hover:shadow-[0_0_12px] group-hover:shadow-blue-500/60"
            />
            <div className="transition-transform duration-300 group-hover:translate-x-1">
              <p className="text-sm font-bold text-(--foreground)/90">{t(item.titleKey)}</p>
              <p className="text-sm text-blue-500 font-medium">{t(item.placeKey)}</p>
              <p className="text-xs text-(--foreground)/60 mt-0.5 font-mono">{t(item.dateKey)}</p>
              {item.descKey && (
                <p className="text-sm text-(--foreground)/70 mt-2 leading-relaxed">{t(item.descKey)}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Componente principal ── */
export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center scroll-mt-8">
      <div className="max-w-3xl w-full">
        <SectionHeading index="01" title={t("about.title")} />

        {/* Biografía */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerBox(0.15)}
          className="space-y-4 mb-16 text-center md:text-left"
        >
          <motion.p variants={blurUp} className="text-lg leading-relaxed text-(--foreground)/80">
            {t("about.p1")}
          </motion.p>
          <motion.p variants={blurUp} className="text-base leading-relaxed text-(--foreground)/70">
            {t("about.p2")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Timeline icon={<GraduationCap size={18} />} title={t("about.education")} items={education} t={t} />
          <Timeline icon={<Briefcase size={18} />} title={t("about.experience")} items={experience} t={t} />
        </div>
      </div>
    </section>
  );
}
