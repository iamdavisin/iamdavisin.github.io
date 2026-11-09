"use client";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslation } from "./LanguageProvider";
import { useEscape, useScrollLock } from "../lib/useScrollLock";
import { useMounted } from "../lib/useMounted";

export type SheetOption = { id: string; label: string; icon?: ReactNode };

/* Panel inferior reutilizable para elegir una opción (tema, idioma...) */
export default function BottomSheet({
    isOpen,
    onClose,
    title,
    options,
    selected,
    onSelect,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: SheetOption[];
    selected?: string;
    onSelect: (id: string) => void;
}) {
    const { t } = useTranslation();
    const mounted = useMounted();
    useScrollLock(isOpen);
    useEscape(isOpen, onClose);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-9999 flex items-end">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full p-6 rounded-t-4xl border-t border-zinc-500 bg-(--background) shadow-2xl"
                    >
                        <div className="max-w-xs mx-auto space-y-4">
                            <div className="w-12 h-1.5 bg-zinc-400/50 rounded-full mx-auto mb-2" />
                            <div className="flex justify-between items-center px-2">
                                <h2 className="text-xl font-bold">{title}</h2>
                                <button
                                    onClick={onClose}
                                    aria-label={t("a11y.close")}
                                    className="p-2 rounded-full hover:bg-zinc-500/20 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="grid gap-3 pb-8">
                                {options.map((opt) => {
                                    const isSelected = selected === opt.id;
                                    return (
                                        <button
                                            key={opt.id}
                                            aria-pressed={isSelected}
                                            onClick={() => { onSelect(opt.id); onClose(); }}
                                            className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${isSelected
                                                ? "bg-zinc-500/10 border border-(--foreground) font-bold"
                                                : "hover:bg-zinc-500/5 border border-transparent opacity-80"
                                                }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                {opt.icon}
                                                <span className="text-lg font-medium">{opt.label}</span>
                                            </span>
                                            {isSelected && <Check size={20} className="text-blue-500" />}
                                        </button>
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
