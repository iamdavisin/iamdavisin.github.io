"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, Pause, Play, Video, Volume2, VolumeX, X } from "lucide-react";
import { useTranslation } from "./LanguageProvider";
import { useEscape, useScrollLock } from "../lib/useScrollLock";
import { placeholderGradients, type VlogItem } from "../lib/vlog";

const IMAGE_SECONDS = 5;
const PLACEHOLDER_VIDEO_SECONDS = 6;

/* Barra de progreso de una historia */
function Bar({ state, progress }: { state: "done" | "active" | "todo"; progress: ReturnType<typeof useMotionValue<number>> }) {
    return (
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
            {state === "done" && <div className="h-full w-full bg-white" />}
            {state === "active" && <motion.div className="h-full origin-left bg-white" style={{ scaleX: progress }} />}
        </div>
    );
}

/* Contenido visual de una historia (foto, vídeo o tarjeta de ejemplo) */
export function StoryMedia({
    item,
    index,
    videoRef,
    muted,
    onVideoTime,
    onVideoEnd,
    lang,
    placeholderText,
}: {
    item: VlogItem;
    index: number;
    videoRef?: React.RefObject<HTMLVideoElement | null>;
    muted?: boolean;
    onVideoTime?: (p: number) => void;
    onVideoEnd?: () => void;
    lang: "es" | "en";
    placeholderText: string;
}) {
    if (!item.src) {
        return (
            <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br ${placeholderGradients[index % placeholderGradients.length]} p-8 text-center text-white`}>
                {item.type === "video" ? <Video size={40} /> : <ImageIcon size={40} />}
                <p className="text-sm font-semibold uppercase tracking-widest opacity-90">{placeholderText}</p>
                <p className="text-xs opacity-80">{item.caption[lang]}</p>
            </div>
        );
    }
    if (item.type === "video") {
        return (
            <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                playsInline
                muted={muted}
                onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) onVideoTime?.(v.currentTime / v.duration);
                }}
                onEnded={onVideoEnd}
            />
        );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.src} alt={item.caption[lang]} className="absolute inset-0 h-full w-full object-cover" draggable={false} />;
}

export default function StoryViewer({
    items,
    startIndex,
    onClose,
}: {
    items: VlogItem[];
    startIndex: number | null;
    onClose: () => void;
}) {
    const { t, locale } = useTranslation();
    const open = startIndex !== null;
    const [index, setIndex] = useState(startIndex ?? 0);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(true);
    const [dir, setDir] = useState(1);
    const progress = useMotionValue(0);
    const controls = useRef<AnimationPlaybackControls | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const holdTimer = useRef<number | null>(null);
    const held = useRef(false);

    useScrollLock(open);
    useEscape(open, onClose);

    // Al abrir en otra historia, se sincroniza el índice (patrón "ajustar estado durante el render")
    const [lastStart, setLastStart] = useState(startIndex);
    if (startIndex !== lastStart) {
        setLastStart(startIndex);
        if (startIndex !== null) { setIndex(startIndex); setPaused(false); }
    }

    const item = items[index];

    const go = useCallback((delta: number) => {
        const nextIndex = index + delta;
        if (nextIndex < 0) return;
        if (nextIndex >= items.length) { onClose(); return; }
        setDir(delta);
        setIndex(nextIndex);
    }, [index, items.length, onClose]);

    // Temporizador: fotos y tarjetas de ejemplo avanzan solas; los vídeos reales mandan con su duración
    useEffect(() => {
        if (!open || !item) return;
        progress.set(0);
        const isRealVideo = item.type === "video" && item.src;
        if (isRealVideo) return;
        const seconds = item.type === "video" ? PLACEHOLDER_VIDEO_SECONDS : IMAGE_SECONDS;
        controls.current = animate(progress, 1, { duration: seconds, ease: "linear", onComplete: () => go(1) });
        return () => controls.current?.stop();
    }, [open, item, progress, go]);

    // Pausa / reanuda
    useEffect(() => {
        if (paused) { controls.current?.pause(); videoRef.current?.pause(); }
        else { controls.current?.play(); videoRef.current?.play().catch(() => { }); }
    }, [paused, index]);

    // Teclado
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") go(1);
            else if (e.key === "ArrowLeft") go(-1);
            else if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, go]);

    // Mantener pulsado = pausa; toque corto = avanzar/retroceder según el lado
    const onPointerDown = () => {
        held.current = false;
        holdTimer.current = window.setTimeout(() => { held.current = true; setPaused(true); }, 220);
    };
    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (holdTimer.current) clearTimeout(holdTimer.current);
        if (held.current) { setPaused(false); return; }
        const r = e.currentTarget.getBoundingClientRect();
        go(e.clientX - r.left < r.width * 0.3 ? -1 : 1);
    };

    if (typeof document === "undefined") return null;
    const lang = locale;

    return createPortal(
        <AnimatePresence>
            {open && item && (
                <motion.div
                    key="viewer"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t("vlog.title")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl"
                    onClick={onClose}
                >
                    {/* Flechas (escritorio) */}
                    <button
                        aria-label={t("vlog.prev")}
                        onClick={(e) => { e.stopPropagation(); go(-1); }}
                        disabled={index === 0}
                        className="absolute left-4 hidden md:grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-30"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        aria-label={t("vlog.next")}
                        onClick={(e) => { e.stopPropagation(); go(1); }}
                        className="absolute right-4 hidden md:grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                    >
                        <ChevronRight />
                    </button>

                    {/* Tarjeta 9:16; deslizar hacia abajo para cerrar */}
                    <motion.div
                        initial={{ scale: 0.85, y: 40 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.85, y: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.6 }}
                        onDragEnd={(_, info) => { if (info.offset.y > 120) onClose(); }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative aspect-[9/16] h-[100dvh] max-h-[100dvh] overflow-hidden bg-black sm:h-[88vh] sm:rounded-3xl shadow-2xl"
                    >
                        <AnimatePresence initial={false} custom={dir} mode="popLayout">
                            <motion.div
                                key={item.id}
                                custom={dir}
                                variants={{
                                    enter: (d: number) => ({ x: d > 0 ? "30%" : "-30%", opacity: 0, scale: 0.96 }),
                                    center: { x: 0, opacity: 1, scale: 1 },
                                    exit: (d: number) => ({ x: d > 0 ? "-30%" : "30%", opacity: 0, scale: 0.96 }),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                <StoryMedia
                                    item={item}
                                    index={index}
                                    videoRef={videoRef}
                                    muted={muted}
                                    onVideoTime={(p) => progress.set(p)}
                                    onVideoEnd={() => go(1)}
                                    lang={lang}
                                    placeholderText={t("vlog.placeholder")}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Zona táctil */}
                        <div
                            className="absolute inset-0 z-10 select-none"
                            onPointerDown={onPointerDown}
                            onPointerUp={onPointerUp}
                            onPointerLeave={() => { if (holdTimer.current) clearTimeout(holdTimer.current); if (held.current) setPaused(false); }}
                        />

                        {/* Cabecera: progreso + controles */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-linear-to-b from-black/60 to-transparent p-3 pb-10">
                            <div className="flex gap-1">
                                {items.map((it, j) => (
                                    <Bar key={it.id} state={j < index ? "done" : j === index ? "active" : "todo"} progress={progress} />
                                ))}
                            </div>
                            <div className="mt-3 flex items-center justify-between text-white">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold backdrop-blur">{item.tag[lang]}</span>
                                    {item.date && <span className="text-xs opacity-80">{item.date}</span>}
                                </div>
                                <div className="pointer-events-auto flex items-center gap-1">
                                    <button
                                        aria-label={paused ? t("vlog.play") : t("vlog.pause")}
                                        onClick={() => setPaused((p) => !p)}
                                        className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15"
                                    >
                                        {paused ? <Play size={18} /> : <Pause size={18} />}
                                    </button>
                                    {item.type === "video" && item.src && (
                                        <button
                                            aria-label={muted ? t("vlog.unmute") : t("vlog.mute")}
                                            onClick={() => setMuted((m) => !m)}
                                            className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15"
                                        >
                                            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                        </button>
                                    )}
                                    <button aria-label={t("a11y.close")} onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Pie: texto */}
                        {item.src && (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/70 to-transparent p-5 pt-16">
                                <motion.p
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="text-sm leading-relaxed text-white"
                                >
                                    {item.caption[lang]}
                                </motion.p>
                            </div>
                        )}

                        {/* Indicador de pausa */}
                        <AnimatePresence>
                            {paused && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="pointer-events-none absolute inset-0 z-20 grid place-items-center"
                                >
                                    <span className="grid h-16 w-16 place-items-center rounded-full bg-black/40 text-white backdrop-blur">
                                        <Pause size={28} />
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
