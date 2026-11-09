"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Globe, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "../components/LanguageProvider";
import LangSwitcher from "../components/LangSwitcher";
import { education, experience, languages, skillCategories, type TimelineEntry } from "../lib/resume";
import { EMAIL } from "../lib/socials";

/* El CV se dibuja siempre en claro (colores fijos, sin variables del tema)
   para que la pantalla y el PDF sean idénticos. */

const contacts = [
    { icon: <Mail size={13} />, label: EMAIL, href: `mailto:${EMAIL}` },
    { icon: <Globe size={13} />, label: "iamdavisin.github.io", href: "https://iamdavisin.github.io" },
    { icon: <FaGithub size={13} />, label: "github.com/iamdavisin", href: "https://github.com/iamdavisin" },
    { icon: <FaLinkedin size={13} />, label: "linkedin.com/in/davidperezmi", href: "https://linkedin.com/in/davidperezmi" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            {children}
            <span className="h-px flex-1 bg-zinc-200" />
        </h2>
    );
}

function Entry({ item, t }: { item: TimelineEntry; t: (k: string) => string }) {
    return (
        <div className="relative pl-4 pb-4 last:pb-0 break-inside-avoid">
            <span className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-full bg-blue-600" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[13px] font-semibold text-zinc-900">{t(item.titleKey)}</h3>
                <span className="text-[11px] font-medium tabular-nums text-zinc-500">{t(item.dateKey)}</span>
            </div>
            <p className="text-[12px] font-medium text-blue-700">{t(item.placeKey)}</p>
            {item.descKey && <p className="mt-1 text-[12px] leading-relaxed text-zinc-600">{t(item.descKey)}</p>}
        </div>
    );
}

export default function CvClient() {
    const { t } = useTranslation();

    return (
        <div className="cv-root min-h-screen bg-zinc-100 py-8 print:bg-white print:p-0">
            {/* Barra de acciones (no se imprime) */}
            <div className="print:hidden mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 px-4 text-zinc-800">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900">
                    <ArrowLeft size={16} />
                    {t("cv.back")}
                </Link>
                <div className="flex items-center gap-2">
                    <LangSwitcher />
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                        <Download size={16} />
                        {t("cv.download")}
                    </button>
                </div>
                <p className="w-full text-right text-xs text-zinc-500">{t("cv.hint")}</p>
            </div>

            {/* Hoja A4 */}
            <article className="cv-sheet mx-auto flex flex-col w-full max-w-[210mm] bg-white text-zinc-800 shadow-xl print:shadow-none sm:min-h-[297mm]">
                {/* Cabecera */}
                <header className="flex flex-col items-center gap-5 border-b border-zinc-200 px-8 py-8 sm:flex-row sm:px-10">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-blue-100">
                        <Image src="/profile.jpg" alt={t("home.photoAlt")} fill sizes="96px" className="object-cover" priority />
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-black tracking-tight text-zinc-900">{t("home.title")}</h1>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{t("home.subtitle")}</p>
                        <p className="mt-2 max-w-md text-[13px] text-zinc-600">{t("home.tagline")}</p>
                    </div>
                </header>

                <div className="grid flex-1 sm:grid-cols-[1fr_220px] print:grid-cols-[1fr_220px]">
                    {/* Columna principal */}
                    <main className="space-y-6 px-8 py-7 sm:px-10">
                        <section>
                            <SectionTitle>{t("cv.profile")}</SectionTitle>
                            <p className="text-[12.5px] leading-relaxed text-zinc-700">{t("about.p1")}</p>
                            <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-700">{t("about.p2")}</p>
                        </section>

                        <section>
                            <SectionTitle>{t("about.experience")}</SectionTitle>
                            {experience.map((item) => <Entry key={item.titleKey + item.placeKey} item={item} t={t} />)}
                        </section>

                        <section>
                            <SectionTitle>{t("about.education")}</SectionTitle>
                            {education.map((item) => <Entry key={item.titleKey} item={item} t={t} />)}
                        </section>
                    </main>

                    {/* Barra lateral */}
                    <aside className="space-y-6 bg-zinc-50 px-8 py-7 sm:px-6 print:bg-zinc-50">
                        <section>
                            <SectionTitle>{t("cv.contact")}</SectionTitle>
                            <ul className="space-y-2">
                                {contacts.map((c) => (
                                    <li key={c.href}>
                                        <a href={c.href} className="flex items-center gap-2 text-[10.5px] text-zinc-700 hover:text-blue-700 break-words">
                                            <span className="shrink-0 text-blue-600">{c.icon}</span>
                                            {c.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <SectionTitle>{t("cv.languages")}</SectionTitle>
                            <ul className="space-y-1.5">
                                {languages.map((l) => (
                                    <li key={l.nameKey} className="flex items-baseline justify-between gap-2 text-[11px]">
                                        <span className="font-medium text-zinc-800">{t(l.nameKey)}</span>
                                        <span className="text-zinc-500">{t(l.levelKey)}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <SectionTitle>{t("cv.skills")}</SectionTitle>
                            <div className="space-y-3">
                                {skillCategories.map((cat) => (
                                    <div key={cat.titleKey} className="break-inside-avoid">
                                        <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                            {t(cat.titleKey)}
                                        </h3>
                                        <div className="flex flex-wrap gap-1">
                                            {cat.skills.map((s) => (
                                                <span
                                                    key={s.name}
                                                    className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 text-[10.5px] text-zinc-700"
                                                >
                                                    <span style={{ color: s.color }} className="text-[10px]">{s.icon}</span>
                                                    {s.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>
            </article>
        </div>
    );
}
