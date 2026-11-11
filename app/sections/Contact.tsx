"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";
import { EMAIL, socials } from "../lib/socials";
import { Magnetic, SectionHeading, SpotlightCard, blurUp, staggerBox, useScramble } from "../components/motion";

/* ── Componente principal ── */
export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const { out: scrambledEmail, start: scramble } = useScramble(EMAIL);

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
        <SectionHeading index="04" title={t("contact.title")} subtitle={t("contact.subtitle")} />

        {/* Tarjeta de correo */}
        <motion.div
          variants={blurUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
        <SpotlightCard tilt={3}>
        <motion.div
          variants={staggerBox(0.1, 0.2)}
          className="flex flex-col items-center gap-5 p-8 sm:p-10"
        >
          <motion.span
            variants={blurUp}
            onMouseEnter={scramble}
            aria-label={EMAIL}
            className="font-mono text-lg sm:text-2xl break-all text-center bg-linear-to-r from-(--foreground) to-(--foreground)/60 bg-clip-text text-transparent cursor-default"
          >
            {scrambledEmail}
          </motion.span>

          <motion.div variants={blurUp} className="flex flex-wrap justify-center gap-3">
            <Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-medium text-sm bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-[0.98] transition-all duration-300"
            >
              <Mail size={16} />
              {t("contact.send")}
            </a>
            </Magnetic>
            <Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-(--foreground)/[0.04] border border-(--foreground)/[0.08] hover:border-(--foreground)/[0.15] hover:bg-(--foreground)/[0.08] transition-all duration-300"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              <span aria-live="polite">{copied ? t("contact.copied") : t("contact.copy")}</span>
            </button>
            </Magnetic>
          </motion.div>
        </motion.div>
        </SpotlightCard>
        </motion.div>

        {/* Separador + Redes sociales */}
        <motion.div
          variants={blurUp}
          initial="hidden"
          whileInView="show"
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
