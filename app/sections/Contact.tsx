"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";
import { EMAIL, socials } from "../lib/socials";

/* ── Variantes de animación ── */
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ── Componente principal ── */
export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      className="min-h-[70vh] py-20 px-6 flex flex-col items-center justify-center scroll-mt-8"
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
          className="text-center text-(--foreground)/70 mb-10"
        >
          {t("contact.subtitle")}
        </motion.p>

        {/* Tarjeta de correo */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-center gap-5 p-8 rounded-2xl bg-(--foreground)/[0.03] border border-(--foreground)/[0.08]"
        >
          <span className="font-mono text-base sm:text-lg break-all text-center">{EMAIL}</span>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-300"
            >
              <Mail size={16} />
              {t("contact.send")}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-(--foreground)/[0.04] border border-(--foreground)/[0.08] hover:border-(--foreground)/[0.15] hover:bg-(--foreground)/[0.08] transition-all duration-300"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              <span aria-live="polite">{copied ? t("contact.copied") : t("contact.copy")}</span>
            </button>
          </div>
        </motion.div>

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
            <span className="text-xs uppercase tracking-widest text-(--foreground)/60 font-medium">
              {t("contact.socials")}
            </span>
            <div className="flex-1 h-px bg-(--foreground)/10" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                {...(social.external && { target: "_blank", rel: "noopener noreferrer" })}
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
