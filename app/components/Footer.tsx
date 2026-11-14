"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "./LanguageProvider";
import { socials } from "../lib/socials";
import { BackToTop, Reveal } from "./motion";

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-10 px-6 pb-8 pt-10">
            {/* Línea superior con degradado */}
            <div aria-hidden className="mx-auto mb-8 h-px max-w-4xl bg-linear-to-r from-transparent via-(--foreground)/20 to-transparent" />

            <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center text-sm">
                <div className="flex gap-3">
                    {socials.map((item) => (
                        <motion.a
                            key={item.name}
                            href={item.url}
                            aria-label={item.name}
                            whileHover={{ y: -3, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="grid h-10 w-10 place-items-center rounded-full border border-(--foreground)/[0.1] bg-(--background)/60 text-lg backdrop-blur transition-colors hover:border-blue-500/50 hover:text-blue-500"
                            {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                            {item.icon}
                        </motion.a>
                    ))}
                </div>

                <p>
                    {t("footer.text")} <span className="font-bold text-blue-500">David</span>
                </p>

                <p className="text-xs text-(--foreground)/60">
                    © {year} David Pérez Miñano · {t("footer.built")} ·{" "}
                    <Link href="/legal" className="underline-offset-2 hover:text-(--foreground) hover:underline">
                        {t("footer.legal")}
                    </Link>
                </p>
            </Reveal>

            <BackToTop label={t("a11y.backToTop")} />
        </footer>
    );
}
