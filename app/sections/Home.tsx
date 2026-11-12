"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";
import { EASE, Magnetic } from "../components/motion";
import { skillCategories, skillName } from "../lib/resume";

const profileImages = ["/profile.jpg", "/profile2.jpg"];

/* Giro 3D entre las dos fotos */
const flip: Variants = {
  enter: { rotateY: -180, opacity: 0 },
  center: { rotateY: 0, opacity: 1, zIndex: 1, transition: { duration: 0.9, ease: EASE } },
  exit: { rotateY: 180, opacity: 0, zIndex: 0, transition: { duration: 0.9, ease: EASE } },
};

/* Nombre letra a letra */
function LetterReveal({ text }: { text: string }) {
  let n = 0; // índice global de letra para escalonar el retraso
  return (
    <h1
      key={text}
      aria-label={text}
      style={{ perspective: "600px" }}
      className="mt-5 text-center text-[2.6rem] sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.05]"
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => (
            <span
              key={ci}
              className="enter-letter inline-block bg-linear-to-b from-(--foreground) to-(--foreground)/60 bg-clip-text text-transparent"
              style={{ "--d": `${0.35 + n++ * 0.035}s` } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
          {wi < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
}

/* Cinta infinita con las tecnologías */
function TechMarquee() {
  const { t } = useTranslation();
  const skills = skillCategories.flatMap((c) => c.skills);
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {skills.map((s) => (
        <span key={s.name} className="inline-flex items-center gap-2 text-sm font-medium text-(--foreground)/60 whitespace-nowrap">
          <span className="text-xl" style={{ color: s.color }}>{s.icon}</span>
          {skillName(s, t)}
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee relative mt-16 w-full max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // Parallax: el hero se aleja y se desvanece al hacer scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // La foto se inclina hacia el cursor (solo con ratón)
  const tiltX = useSpring(0, { stiffness: 120, damping: 16 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 16 });
  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    tiltY.set(dx * 24);
    tiltX.set(-dy * 24);
  };
  const resetTilt = () => { tiltX.set(0); tiltY.set(0); };

  useEffect(() => {
    const timer = setInterval(() => setCurrent((i) => (i + 1) % profileImages.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const btnSecondary =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-(--background)/60 backdrop-blur border border-(--foreground)/[0.1] hover:border-(--foreground)/[0.25] transition-colors";

  return (
    <section ref={ref} id="home" onMouseMove={onMove} onMouseLeave={resetTilt} className="relative w-full min-h-[92vh] pt-32 pb-16 flex flex-col items-center justify-center px-6 scroll-mt-40">
      <motion.div style={{ y, opacity, scale }} className="flex w-full max-w-4xl flex-col items-center">
        {/* Foto con anillo de degradado giratorio */}
        <div className="enter-pop">
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 800 }}
          className="relative w-40 h-40"
        >
          <span aria-hidden className="absolute -inset-[4px] rounded-full bg-[conic-gradient(from_0deg,#3b82f6,#22d3ee,#a78bfa,#3b82f6)] motion-safe:animate-[spin_8s_linear_infinite]" />
          <span aria-hidden className="absolute -inset-6 rounded-full bg-blue-500/25 blur-2xl" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current}
              variants={flip}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden ring-[3px] ring-(--background)">
                <Image src={profileImages[current]} alt={t("home.photoAlt")} fill sizes="160px" className="object-cover" priority />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        </div>

        {/* Disponible */}
        <span
          style={{ "--d": "0.25s" } as React.CSSProperties}
          className="enter-up mt-8 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          {t("home.available")}
        </span>

        <LetterReveal text={t("home.title")} />

        <div className="flex flex-col items-center">
          <p style={{ "--d": "0.9s" } as React.CSSProperties} className="enter-up mt-4 text-xs md:text-sm font-bold uppercase tracking-[0.3em] bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-[shine_4s_linear_infinite]">
            {t("home.subtitle")}
          </p>

          <p style={{ "--d": "0.3s" } as React.CSSProperties} className="enter-blur mt-5 max-w-md text-center text-base md:text-lg text-(--foreground)/70">
            {t("home.tagline")}
          </p>

          <div style={{ "--d": "1.14s" } as React.CSSProperties} className="enter-up mt-9 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden px-6 py-3 rounded-full text-sm font-medium text-white bg-blue-600 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-shadow"
              >
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Mail size={16} />
                {t("home.ctaContact")}
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#projects" className={btnSecondary}>
                {t("home.ctaProjects")}
                <ArrowDown size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <Link href="/cv" className={btnSecondary}>
                <FileText size={16} />
                {t("home.ctaCv")}
              </Link>
            </Magnetic>
          </div>
        </div>

        <div style={{ "--d": "1.4s" } as React.CSSProperties} className="enter-fade flex w-full justify-center">
          <TechMarquee />
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#about"
        aria-hidden
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-4 hidden md:flex h-9 w-5 justify-center rounded-full border-2 border-(--foreground)/25 pt-1.5"
      >
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1 rounded-full bg-(--foreground)/60"
        />
      </motion.a>
    </section>
  );
}
