"use client";
import { useTranslation } from "./LanguageProvider";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {

    const { t } = useTranslation();

    // Redes sociales
    const social = [
        { name: "GitHub", icon: <FaGithub />, url: "https://github.com/iamdavisin" },
        { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/davidperezmi" },
        { name: "Email", icon: <FaEnvelope />, url: "mailto:perezdavidcv@gmail.com" },
    ]

    return (
        <footer className="text-center mb-2">{t("footer.text")} <span className="text-blue-500 font-bold">David</span>
            <div className="inline-flex gap-4 ml-4">
                {social.map((item) => (
                    <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.icon}
                    </a>
                ))}
            </div>


        </footer>

    );
}