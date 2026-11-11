"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { Menu } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ScrollProgress } from "./motion";
import LangSwitcher from "./LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslation } from "./LanguageProvider";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Se esconde al bajar y reaparece al subir
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300 && !isMobileMenuOpen);
  });

  // Referencia para medir la posición real del Navbar
  const navRef = useRef<HTMLDivElement>(null);

  const navbarItems = useMemo(() => [
    { name: t("navbar.home"), href: "#home" },
    { name: t("navbar.about"), href: "#about" },
    { name: t("navbar.skills"), href: "#skills" },
    { name: t("navbar.projects"), href: "#projects" },
    { name: t("navbar.contact"), href: "#contact" },
  ], [t]);

  useEffect(() => {
    const navbarTop = navRef.current?.offsetTop || 0;

    const handleScrollState = () => {
      // Se vuelve "isla" flotante justo cuando el scroll alcanza el Navbar
      setIsScrolled(window.scrollY >= navbarTop);

      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -75% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navbarItems.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScrollState);
    // Ejecutamos una vez al cargar por si el usuario refresca ya habiendo hecho scroll
    handleScrollState();

    return () => {
      window.removeEventListener("scroll", handleScrollState);
      observer.disconnect();
    };
  }, [navbarItems]);

  const activeItem = navbarItems.find((i) => i.href === `#${activeSection}`);
  const currentPageName = activeItem ? activeItem.name : "";

  return (
    <>
      <ScrollProgress />
      <div ref={navRef} className="relative h-18 md:h-20 w-full">
        <motion.div
          animate={{ y: hidden && isScrolled ? -120 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`z-40 transition-[padding] duration-500 ${isScrolled ? "fixed top-0 left-0 right-0 flex justify-center pt-4" : "absolute inset-0 w-full"}`}
        >
          <nav aria-label={t("a11y.nav")} className={`flex items-center justify-between transition-all duration-500 mx-auto ${isScrolled ? "w-[90%] max-w-4xl rounded-full border border-zinc-500/20 bg-(--background)/70 backdrop-blur-xl shadow-xl shadow-black/5 px-4 py-2" : "w-full border-y border-zinc-500/10 bg-(--background)/60 backdrop-blur-md px-4 py-4 lg:px-20"}`}>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label={t("a11y.openMenu")}
                aria-expanded={isMobileMenuOpen}
                className="md:hidden p-2"
              >
                <Menu size={24} />
              </button>

              <span className="md:hidden overflow-hidden font-bold text-xs uppercase tracking-widest text-blue-500">
                <motion.span
                  key={currentPageName}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block"
                >
                  {currentPageName}
                </motion.span>
              </span>

              <div className="hidden md:flex items-center gap-1">
                {navbarItems.map((item) => {
                  const id = item.href.replace("#", "");
                  const isActive = activeSection === id;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`group relative isolate px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${isActive ? "font-bold text-blue-600 dark:text-blue-400" : "opacity-60 hover:opacity-100"
                        }`}
                    >
                      {/* Píldora que se desliza hasta la sección activa */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 -z-10 rounded-full bg-blue-500/10 border border-blue-500/20"
                        />
                      )}
                      {/* Las letras "ruedan" hacia arriba al pasar el ratón */}
                      <span className="relative block overflow-hidden">
                        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{item.name}</span>
                        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">{item.name}</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LangSwitcher />
              <ThemeSwitcher />
            </div>
          </nav>
        </motion.div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navbarItems}
        activeSection={activeSection}
      />
    </>
  );
}