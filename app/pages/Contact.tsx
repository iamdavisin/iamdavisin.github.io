"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Send, User, MessageSquare } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";

/* ── Variantes de animación ── */
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const formVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

/* ── Redes sociales ── */
const socials = [
  { name: "GitHub", icon: <FaGithub />, url: "https://github.com/iamdavisin" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/davidperezmi" },
  { name: "Email", icon: <Mail size={18} />, url: "mailto:perezdavidcv@gmail.com" },
];

/* ── Componente principal ── */
export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-6 flex flex-col items-center justify-center scroll-mt-8"
    >
      <div className="max-w-xl w-full">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          {t("contact.title")}
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-(--foreground)/60 mb-12"
        >
          {t("contact.subtitle")}
        </motion.p>

        {/* Formulario */}
        <motion.form
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Nombre */}
          <motion.div variants={fieldVariants}>
            <label className="block text-sm font-medium text-(--foreground)/70 mb-1.5">
              {t("contact.name")}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--foreground)/30">
                <User size={16} />
              </span>
              <input
                type="text"
                placeholder={t("contact.namePlaceholder")}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--foreground)/[0.03] border border-(--foreground)/[0.08] focus:border-blue-500/40 focus:bg-(--foreground)/[0.05] outline-none transition-all duration-300 text-sm text-(--foreground) placeholder:text-(--foreground)/30"
              />
            </div>
          </motion.div>

          {/* Correo electrónico */}
          <motion.div variants={fieldVariants}>
            <label className="block text-sm font-medium text-(--foreground)/70 mb-1.5">
              {t("contact.email")}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--foreground)/30">
                <Mail size={16} />
              </span>
              <input
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--foreground)/[0.03] border border-(--foreground)/[0.08] focus:border-blue-500/40 focus:bg-(--foreground)/[0.05] outline-none transition-all duration-300 text-sm text-(--foreground) placeholder:text-(--foreground)/30"
              />
            </div>
          </motion.div>

          {/* Mensaje */}
          <motion.div variants={fieldVariants}>
            <label className="block text-sm font-medium text-(--foreground)/70 mb-1.5">
              {t("contact.message")}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-(--foreground)/30">
                <MessageSquare size={16} />
              </span>
              <textarea
                rows={5}
                placeholder={t("contact.messagePlaceholder")}
                className="w-full pl-10 pr-4 py-3 rounded-xl resize-none bg-(--foreground)/[0.03] border border-(--foreground)/[0.08] focus:border-blue-500/40 focus:bg-(--foreground)/[0.05] outline-none transition-all duration-300 text-sm text-(--foreground) placeholder:text-(--foreground)/30"
              />
            </div>
          </motion.div>

          {/* Enviar */}
          <motion.div variants={fieldVariants}>
            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-medium text-sm bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              {t("contact.send")}
              <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.form>

        {/* Separador + Redes sociales */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-(--foreground)/10" />
            <span className="text-xs uppercase tracking-widest text-(--foreground)/30 font-medium">
              {t("contact.socials")}
            </span>
            <div className="flex-1 h-px bg-(--foreground)/10" />
          </div>

          <div className="flex justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-(--foreground)/[0.03] border border-(--foreground)/[0.06] hover:border-(--foreground)/[0.12] hover:bg-(--foreground)/[0.06] transition-all duration-300"
              >
                <span className="text-lg text-blue-500 transition-transform duration-300 group-hover:scale-110">
                  {social.icon}
                </span>
                <span className="text-sm font-medium text-(--foreground)/70 group-hover:text-(--foreground) transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}