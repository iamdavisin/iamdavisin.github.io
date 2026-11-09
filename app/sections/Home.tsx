"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../components/LanguageProvider";
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

const profileImages = [
  "/profile.jpg",
  "/profile2.png",
];

/* ── Variantes de giro sólido ── */
const solidFlipVariants: Variants = {
  enter: { rotateY: -180 },
  center: {
    rotateY: 0,
    zIndex: 1,
    transition: { duration: 0.8, ease: "easeInOut" }
  },
  exit: {
    rotateY: 180,
    zIndex: 0,
    transition: { duration: 0.8, ease: "easeInOut" }
  },
};

export default function Hero() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === profileImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="w-full pt-40 pb-20 flex flex-col items-center justify-center bg-(--background) px-6 scroll-mt-40">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Contenedor con perspectiva 3D */}
        <div
          // Contenedor sin rounded-full ni overflow para que el brillo no se corte
          className="relative w-40 h-40"
          style={{ perspective: "1200px" }}
        >
          {/* Animación de flip entre imágenes */}

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentImageIndex}
              variants={solidFlipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d"
              }}
              // Contenedor de agrupación para girar todo el conjunto
              className="absolute inset-0 w-full h-full"
            >
              {/* Capa trasera: brillo azul (gira junto con la imagen) */}
              <div className="absolute -inset-2 bg-linear-to-r from-blue-500/60 to-cyan-500/60 rounded-full blur-md z-0"></div>

              {/* Capa media: recorte circular de la imagen */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-(--background) z-10">
                <Image
                  src={profileImages[currentImageIndex]}
                  alt={t("home.photoAlt")}
                  fill
                  sizes="(max-width: 768px) 160px, 160px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Capa frontal: marco/borde */}
              <div className="absolute inset-0 rounded-full border-2 border-zinc-500/20 shadow-xl z-20 pointer-events-none"></div>

            </motion.div>
          </AnimatePresence>
        </div>

        <span className="mt-8 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          {t("home.available")}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mt-4 text-center tracking-tighter">
          {t("home.title")}
        </h1>

        <p className="text-blue-500 font-bold uppercase tracking-[0.2em] mt-2 text-xs md:text-sm">
          {t("home.subtitle")}
        </p>

        <p className="mt-5 max-w-md text-center text-base text-(--foreground)/70">
          {t("home.tagline")}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Mail size={16} />
            {t("home.ctaContact")}
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-(--foreground)/[0.04] border border-(--foreground)/[0.08] hover:border-(--foreground)/[0.15] hover:bg-(--foreground)/[0.08] transition-colors"
          >
            {t("home.ctaProjects")}
            <ArrowDown size={16} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}