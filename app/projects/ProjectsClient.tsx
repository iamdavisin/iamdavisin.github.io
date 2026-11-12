"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowLeft, Star, Code2 } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";
import Link from "next/link";
import { BackToTop, SpotlightCard } from "../components/motion";
import {
    type GitHubRepo,
    languageColors,
    formatRepoName,
} from "../lib/github";

/* ── Variantes de animación ── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};

/* ── Función auxiliar de tiempo relativo ── */
function timeAgo(dateStr: string, locale: string): string {
    const seconds = Math.floor(
        (Date.now() - new Date(dateStr).getTime()) / 1000
    );
    const intervals: [number, string, string][] = [
        [31536000, "year", "año"],
        [2592000, "month", "mes"],
        [604800, "week", "semana"],
        [86400, "day", "día"],
        [3600, "hour", "hora"],
        [60, "minute", "minuto"],
    ];

    for (const [secs, en, es] of intervals) {
        const count = Math.floor(seconds / secs);
        if (count >= 1) {
            if (locale === "es") {
                return count === 1 ? `hace 1 ${es}` : `hace ${count} ${es}s`;
            }
            return count === 1 ? `1 ${en} ago` : `${count} ${en}s ago`;
        }
    }
    return locale === "es" ? "justo ahora" : "just now";
}

/* ── Tarjeta de repositorio ── */
function RepoCard({
    repo,
    locale,
    t,
}: {
    repo: GitHubRepo;
    locale: string;
    t: (key: string) => string;
}) {
    const langColor = repo.language
        ? languageColors[repo.language] || "#888"
        : null;

    return (
        <motion.div variants={cardVariants} whileHover={{ y: -6 }} className="h-full">
        <SpotlightCard tilt={5} className="h-full">
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full flex-col p-6 cursor-pointer"
        >

            {/* Cabecera: icono + nombre */}
            <div className="flex items-start gap-3 mb-3">
                <FaGithub className="text-lg mt-0.5 text-(--foreground)/60 shrink-0" />
                <h2 className="text-base font-bold text-(--foreground)/90 group-hover:text-(--foreground) transition-colors leading-snug">
                    {formatRepoName(repo.name)}
                </h2>
            </div>

            {/* Descripción */}
            <p className="text-sm text-(--foreground)/60 leading-relaxed mb-4 flex-1 line-clamp-3">
                {repo.description || t("projects.noDescription")}
            </p>

            {/* Pie: lenguaje + estrellas + actualizado */}
            <div className="flex items-center gap-4 text-xs text-(--foreground)/60">
                {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                        <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: langColor || "#888" }}
                        />
                        {repo.language}
                    </span>
                )}

                {repo.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-1">
                        <Star size={12} />
                        {repo.stargazers_count}
                    </span>
                )}

                {/* La fecha relativa cambia entre el build y la visita */}
                <span className="ml-auto" suppressHydrationWarning>{timeAgo(repo.updated_at, locale)}</span>
            </div>
        </a>
        </SpotlightCard>
        </motion.div>
    );
}

/* ── Componente principal del cliente ── */
export default function ProjectsClient({ repos }: { repos: GitHubRepo[] }) {
    const { t, locale } = useTranslation();

    return (
        <main id="main" className="min-h-screen py-20 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Enlace de volver */}
                <div className="enter-up mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-(--foreground)/60
                            hover:text-(--foreground) transition-colors duration-300"
                    >
                        <ArrowLeft size={16} />
                        {t("projects.backHome")}
                    </Link>
                </div>

                {/* Título */}
                <h1 className="enter-blur text-4xl font-bold mb-4">
                    {t("projects.allProjectsTitle")}
                </h1>

                {/* Subtítulo */}
                <p style={{ "--d": "0.1s" } as React.CSSProperties} className="enter-blur text-(--foreground)/60 mb-12 max-w-lg">
                    {t("projects.allProjectsSubtitle")}
                </p>

                {/* Contador de repositorios */}
                <div style={{ "--d": "0.2s" } as React.CSSProperties} className="enter-fade mb-8">
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                          bg-(--foreground)/[0.04] border border-(--foreground)/[0.06] text-(--foreground)/60"
                    >
                        <Code2 size={13} />
                        {repos.length} {t("projects.repositories")}
                    </span>
                </div>

                {/* Cuadrícula de repositorios */}
                {repos.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {repos.map((repo) => (
                            <RepoCard
                                key={repo.name}
                                repo={repo}
                                locale={locale}
                                t={t}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-(--foreground)/60 py-20"
                    >
                        {t("projects.noRepos")}
                    </motion.p>
                )}
            </div>
            <BackToTop label={t("a11y.backToTop")} />
        </main>
    );
}
