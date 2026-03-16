"use client";
import { useState, useEffect, useMemo, useRef } from "react"; // Añadimos useRef
import { Menu } from "lucide-react";
import LangSwitcher from "./LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslation } from "./LanguageProvider";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Referencia para medir la posición real del Navbar
  const navRef = useRef<HTMLDivElement>(null);

  const navbarItems = useMemo(() => [
    { name: t("navbar.home"), href: "#home" },
    { name: t("navbar.about"), href: "#about" },
    { name: t("navbar.skills"), href: "#skills" },
    { name: t("navbar.projects"), href: "#projects" },
    { name: t("navbar.contact"), href: "#contact" },
  ], [t]);

  useEffect(() => {
    // 2. Calculamos la posición inicial del Navbar respecto al top de la página
    const navbarTop = navRef.current?.offsetTop || 0;

    const handleScrollState = () => {
      // 3. CAMBIO CLAVE: Se vuelve isla justo cuando el scroll toca el Navbar
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
      {/* 4. Añadimos la ref aquí para saber dónde empieza el Navbar */}
      <div ref={navRef} className="relative h-18 md:h-20 w-full">
        <div className={`z-40 transition-all duration-500 ${isScrolled ? "fixed top-0 left-0 right-0 flex justify-center pt-4" : "absolute inset-0 w-full"}`}>
          <nav className={`flex items-center justify-between transition-all duration-500 mx-auto ${isScrolled ? "w-[90%] max-w-4xl rounded-full border border-zinc-500/20 bg-(--background)/80 backdrop-blur-md shadow-xl px-6 py-2" : "w-full border-y border-zinc-500/10 bg-(--background) px-4 py-4 lg:px-20"}`}>

            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2">
                <Menu size={24} />
              </button>

              <span className="md:hidden font-bold text-xs uppercase tracking-widest text-blue-500 transition-all duration-300">
                {currentPageName}
              </span>

              <div className="hidden md:flex items-center gap-8">
                {navbarItems.map((item) => {
                  const id = item.href.replace("#", "");
                  const isActive = activeSection === id;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${isActive ? "font-black text-blue-500 scale-110 opacity-100" : "opacity-40 hover:opacity-100"
                        }`}
                    >
                      {item.name}
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
        </div>
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