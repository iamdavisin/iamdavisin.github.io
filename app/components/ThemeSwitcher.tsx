"use client";
import { useState } from "react";
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

  if (!mounted) return <div className="w-10 h-10" />;

  const themes = [
    { id: "light", icon: <Sun size={18} />, label: t("settings.light") },
    { id: "dark", icon: <Moon size={18} />, label: t("settings.dark") },
    { id: "system", icon: <Monitor size={18} />, label: t("settings.system") },
  ];

  return (
    <>
      <motion.button
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
        onSelect={setTheme}
      />
    </>
  );
}
