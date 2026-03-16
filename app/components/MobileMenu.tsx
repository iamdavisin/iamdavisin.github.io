"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "./LanguageProvider";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: { name: string; href: string }[];
  activeSection: string;
}

export default function MobileMenu({ isOpen, onClose, items, activeSection }: MobileMenuProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloqueo de scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex">
          {/* Overlay Oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Sidebar Deslizable de Izquierda a Derecha */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative h-fit inset-y-4 w-4/5 max-w-sm p-6 border-r border-zinc-500 bg-(--background) shadow-2xl rounded-r-[2.5rem]"
          >
            <div className="flex flex-col h-full">
              {/* Cabecera */}
              <div className="flex justify-between items-center mb-10 pl-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter">{t("settings.menu")}</h2>
                <button
                  onClick={onClose}
                  className="p-2  rounded-full hover:bg-zinc-500/20 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3 overflow-y-auto grow">
                {items.map((item) => {
                  // LÓGICA DE CAMBIO: Comparamos el ID de la sección activa con el href
                  const isActive = activeSection === item.href.replace("#", "");

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        document.getElementById(item.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isActive // <--- CAMBIADO
                        ? "bg-zinc-500/10 border border-(--foreground) font-bold"
                        : "hover:bg-zinc-500/5 border border-transparent opacity-80"
                        }`}
                    >
                      <span className="text-xl">{item.name}</span>
                      {isActive && <ChevronRight size={20} />} {/* <--- CAMBIADO */}
                    </a>
                  );
                })}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}