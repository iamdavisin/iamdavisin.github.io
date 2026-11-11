"use client";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTranslation } from "./LanguageProvider";
import BottomSheet from "./BottomSheet";
import { useMounted } from "../lib/useMounted";

export default function ThemeSwitch() {
  const mounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();
  const btnRef = useRef<HTMLButtonElement>(null);

  /* Cambia el tema con un círculo que se expande desde el botón.
     Si el navegador no soporta View Transitions (o "reducir movimiento"), cambia al instante. */
  const applyTheme = (id: string) => {
    const root = document.documentElement;
    const resolved = id === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : id;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches || resolved === resolvedTheme) {
      setTheme(id);
      return;
    }
    const r = btnRef.current?.getBoundingClientRect();
    const cx = r ? r.left + r.width / 2 : window.innerWidth / 2;
    const cy = r ? r.top + r.height / 2 : window.innerHeight / 2;
    const radius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(id));
      root.setAttribute("data-theme", resolved);
      root.style.colorScheme = resolved;
    });
    transition.ready.then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] },
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      )
    );
  };

  if (!mounted) return <div className="w-10 h-10" />;

  const themes = [
    { id: "light", icon: <Sun size={18} />, label: t("settings.light") },
    { id: "dark", icon: <Moon size={18} />, label: t("settings.dark") },
    { id: "system", icon: <Monitor size={18} />, label: t("settings.system") },
  ];

  return (
    <>
      <motion.button
        ref={btnRef}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label={t("a11y.changeTheme")}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 p-3 rounded-full hover:scale-110 transition-transform"
      >
        {/* resolvedTheme refleja el tema real también en modo "sistema" */}
        {resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
      </motion.button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("settings.theme")}
        options={themes}
        selected={theme}
        // Pequeña espera para que el panel se cierre antes del revelado
        onSelect={(id) => setTimeout(() => applyTheme(id), 250)}
      />
    </>
  );
}
