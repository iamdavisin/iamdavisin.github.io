"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useTranslation, type Locale } from "./LanguageProvider";
import BottomSheet from "./BottomSheet";

const languages = [
  { id: "es", label: "Español" },
  { id: "en", label: "English" },
];

export default function LangSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, locale, changeLanguage } = useTranslation();

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label={t("a11y.changeLanguage")}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 p-3 rounded-full hover:scale-110 transition-transform"
      >
        <Languages size={18} />
        <span className="text-sm font-bold uppercase">{locale}</span>
      </motion.button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("settings.language")}
        options={languages}
        selected={locale}
        onSelect={(id) => changeLanguage(id as Locale)}
      />
    </>
  );
}
