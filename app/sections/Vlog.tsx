"use client";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hand, Play } from "lucide-react";
import { useTranslation } from "../components/LanguageProvider";
import { Reveal, SectionHeading } from "../components/motion";
import StoryViewer, { StoryMedia } from "../components/StoryViewer";
import { vlog, type VlogItem } from "../lib/vlog";

/* Tarjeta del carrusel: los vídeos se previsualizan al pasar el ratón */
function VlogCard({
    item,
    index,
    onOpen,
    dragging,
}: {
    item: VlogItem;
    index: number;
    onOpen: () => void;
    dragging: React.RefObject<boolean>;
}) {
    const { t, locale } = useTranslation();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <motion.button
            layout
            initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            whileHover={{ y: -8, rotate: index % 2 ? 1.5 : -1.5 }}
            onClick={() => { if (!dragging.current) onOpen(); }}
            onMouseEnter={() => videoRef.current?.play().catch(() => { })}
            onMouseLeave={() => { const v = videoRef.current; if (v) { v.pause(); v.currentTime = 0; } }}
            aria-label={`${item.tag[locale]}: ${item.caption[locale]}`}
            className="group relative aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-3xl border border-(--foreground)/[0.08] bg-(--foreground)/[0.04] text-left shadow-lg sm:w-64"
        >
            {item.type === "video" && item.src ? (
                <video
                    ref={videoRef}
                    src={item.src}
                    poster={item.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <StoryMedia item={item} index={index} lang={locale} placeholderText={t("vlog.placeholder")} />
                </div>
            )}

            {/* Degradado + texto */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0" />
            <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                {item.tag[locale]}
            </span>
            {item.type === "video" && (
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/35 text-white backdrop-blur transition-transform group-hover:scale-110">
                    <Play size={14} fill="currentColor" />
                </span>
            )}
            {item.src && (
                <p className="absolute inset-x-3 bottom-3 line-clamp-2 text-sm font-medium text-white">{item.caption[locale]}</p>
            )}
        </motion.button>
    );
}

export default function Vlog() {
    const { t, locale } = useTranslation();
    const [filter, setFilter] = useState<string | null>(null);
    const [openAt, setOpenAt] = useState<number | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    // Categorías únicas, en el orden en que aparecen
    const tags = useMemo(() => {
        const seen = new Map<string, string>();
        vlog.forEach((v) => seen.set(v.tag.es, v.tag[locale]));
        return [...seen.entries()];
    }, [locale]);

    const items = useMemo(() => (filter ? vlog.filter((v) => v.tag.es === filter) : vlog), [filter]);

    const chip = (active: boolean) =>
        `relative isolate rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${active ? "text-white" : "text-(--foreground)/70 hover:text-(--foreground)"}`;

    return (
        <section id="vlog" className="py-24 scroll-mt-8 overflow-hidden">
            <div className="mx-auto max-w-5xl px-6">
                <SectionHeading index="04" title={t("vlog.title")} subtitle={t("vlog.subtitle")} />

                {/* Filtros con píldora deslizante */}
                <Reveal className="mb-8 flex flex-wrap justify-center gap-1">
                    {[[null, t("vlog.all")] as const, ...tags].map(([key, label]) => {
                        const active = filter === key;
                        return (
                            <button key={key ?? "all"} onClick={() => setFilter(key)} aria-pressed={active} className={chip(active)}>
                                {active && (
                                    <motion.span
                                        layoutId="vlog-chip"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        className="absolute inset-0 -z-10 rounded-full bg-blue-600"
                                    />
                                )}
                                {label}
                            </button>
                        );
                    })}
                </Reveal>
            </div>

            {/* Carrusel arrastrable */}
            <Reveal delay={0.1}>
                <div ref={trackRef} className="cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                    <motion.div
                        drag="x"
                        dragConstraints={trackRef}
                        dragElastic={0.12}
                        onDragStart={() => { dragging.current = true; }}
                        onDragEnd={() => { setTimeout(() => { dragging.current = false; }, 50); }}
                        className="flex w-max gap-5 px-[max(1.5rem,calc((100vw-64rem)/2))] py-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {items.map((item, i) => (
                                <VlogCard key={item.id} item={item} index={vlog.indexOf(item)} dragging={dragging} onOpen={() => setOpenAt(i)} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </Reveal>

            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-(--foreground)/50">
                <Hand size={14} />
                {t("vlog.hint")}
            </p>

            <StoryViewer items={items} startIndex={openAt} onClose={() => setOpenAt(null)} />
        </section>
    );
}
