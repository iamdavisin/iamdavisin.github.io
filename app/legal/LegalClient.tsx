"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";
import { EMAIL } from "../lib/socials";

const REPO_URL = "https://github.com/iamdavisin/iamdavisin.github.io";
const GITHUB_PRIVACY_URL = "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement";
const AEPD_URL = "https://www.aepd.es";

const linkClass = "text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:no-underline";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <h2 className="text-xl font-semibold text-(--foreground)">{title}</h2>
            <div className="space-y-3 leading-relaxed text-(--foreground)/75">{children}</div>
        </section>
    );
}

export default function LegalClient() {
    const { t } = useTranslation();

    return (
        <main id="main" className="min-h-screen py-20 px-6">
            <div className="mx-auto max-w-3xl">
                <div className="enter-up mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-(--foreground)/60 hover:text-(--foreground) transition-colors"
                    >
                        <ArrowLeft size={16} />
                        {t("projects.backHome")}
                    </Link>
                </div>

                <h1 className="enter-blur text-4xl font-bold">{t("legal.title")}</h1>
                <p className="mt-3 mb-12 text-sm text-(--foreground)/60">{t("legal.updated")}</p>

                <div className="space-y-10">
                    <Section title={t("legal.ownerTitle")}>
                        <p>
                            {t("legal.owner")}{" "}
                            <a href={`mailto:${EMAIL}`} className={linkClass}>{EMAIL}</a>.
                        </p>
                    </Section>

                    <Section title={t("legal.ipTitle")}>
                        <p>
                            {t("legal.ip1")}{" "}
                            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>.
                        </p>
                        <p>{t("legal.ip2")}</p>
                        <p>{t("legal.ip3")}</p>
                    </Section>

                    <Section title={t("legal.privacyTitle")}>
                        <p>{t("legal.privacy1")}</p>
                        <p>{t("legal.privacy2")}</p>
                        <p>
                            {t("legal.privacy3")}{" "}
                            <a href={GITHUB_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                {t("legal.privacyLink")}
                            </a>.
                        </p>
                    </Section>

                    <Section title={t("legal.emailTitle")}>
                        <p>{t("legal.email1")}</p>
                        <p>
                            {t("legal.email2")}{" "}
                            (<a href={AEPD_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>aepd.es</a>).
                        </p>
                    </Section>

                    <Section title={t("legal.linksTitle")}>
                        <p>{t("legal.links")}</p>
                    </Section>

                    <Section title={t("legal.changesTitle")}>
                        <p>{t("legal.changes")}</p>
                    </Section>
                </div>
            </div>
        </main>
    );
}
