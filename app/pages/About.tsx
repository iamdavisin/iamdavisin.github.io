"use client";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";

/* ── Variantes de animación ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

/* ── Elemento del timeline ── */
function TimelineItem({
  title,
  place,
  date,
  desc,
  isLast,
}: {
  title: string;
  place: string;
  date: string;
  desc?: string;
  isLast?: boolean;
}) {
  return (
    <motion.div variants={itemVariants} className="relative pl-8 pb-8 group">
      {/* Línea vertical */}
      {!isLast && (
        <div className="absolute left-[7px] top-3 bottom-0 w-px bg-(--foreground)/10" />
      )}
      {/* Punto */}
      <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-blue-500 bg-(--background) group-hover:bg-blue-500 transition-colors duration-300" />

      <div>
        <p className="text-sm font-bold text-(--foreground)/90">{title}</p>
        <p className="text-sm text-blue-500 font-medium">{place}</p>
        <p className="text-xs text-(--foreground)/40 mt-0.5">{date}</p>
        {desc && (
          <p className="text-sm text-(--foreground)/60 mt-2 leading-relaxed">{desc}</p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Componente principal ── */
export default function About() {
  const { t } = useTranslation();

  const education = [
    { titleKey: "about.edu1_title", placeKey: "about.edu1_place", dateKey: "about.edu1_date" },
    { titleKey: "about.edu2_title", placeKey: "about.edu2_place", dateKey: "about.edu2_date" },
    { titleKey: "about.edu3_title", placeKey: "about.edu3_place", dateKey: "about.edu3_date" },
    { titleKey: "about.edu4_title", placeKey: "about.edu4_place", dateKey: "about.edu4_date" },
  ];

  const experience = [
    { titleKey: "about.exp1_title", placeKey: "about.exp1_place", dateKey: "about.exp1_date", descKey: "about.exp1_desc" },
    { titleKey: "about.exp2_title", placeKey: "about.exp2_place", dateKey: "about.exp2_date", descKey: "about.exp2_desc" },
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-20 px-6 flex flex-col items-center justify-center scroll-mt-8"
    >
      <div className="max-w-3xl w-full">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          {t("about.title")}
        </motion.h2>

        {/* Biografía */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4 mb-16"
        >
          <motion.p variants={itemVariants} className="text-base leading-relaxed text-(--foreground)/70">
            {t("about.p1")}
          </motion.p>
          <motion.p variants={itemVariants} className="text-base leading-relaxed text-(--foreground)/70">
            {t("about.p2")}
          </motion.p>
        </motion.div>

        {/* Diseño a dos columnas para Educación y Experiencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Educación */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={20} className="text-blue-500" />
              <h3 className="text-xs uppercase tracking-widest text-(--foreground)/30 font-medium">
                {t("about.education")}
              </h3>
            </div>
            {education.map((item, idx) => (
              <TimelineItem
                key={item.titleKey}
                title={t(item.titleKey)}
                place={t(item.placeKey)}
                date={t(item.dateKey)}
                isLast={idx === education.length - 1}
              />
            ))}
          </motion.div>

          {/* Experiencia */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={20} className="text-blue-500" />
              <h3 className="text-xs uppercase tracking-widest text-(--foreground)/30 font-medium">
                {t("about.experience")}
              </h3>
            </div>
            {experience.map((item, idx) => (
              <TimelineItem
                key={item.titleKey + idx}
                title={t(item.titleKey)}
                place={t(item.placeKey)}
                date={t(item.dateKey)}
                desc={t(item.descKey)}
                isLast={idx === experience.length - 1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}