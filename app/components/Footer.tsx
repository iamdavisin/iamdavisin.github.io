"use client";
import { useTranslation } from "./LanguageProvider";
import { socials } from "../lib/socials";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="flex flex-wrap items-center justify-center gap-4 py-6 text-sm">
            <p>
                {t("footer.text")} <span className="text-blue-500 font-bold">David</span>
            </p>
            <div className="inline-flex gap-4">
                {socials.map((item) => (
                    <a
                        key={item.name}
                        href={item.url}
                        aria-label={item.name}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                        {item.icon}
                    </a>
                ))}
            </div>
        </footer>
    );
}
