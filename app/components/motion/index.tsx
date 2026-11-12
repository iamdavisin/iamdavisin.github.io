"use client";
/* ── Primitivas de animación reutilizables ──
   Todas respetan "reducir movimiento" gracias a <MotionConfig reducedMotion="user">
   en Providers (los desplazamientos se anulan y solo queda el fundido). */
import { ReactNode, useEffect, useRef, useState, MouseEvent } from "react";
import { ArrowUp } from "lucide-react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    type HTMLMotionProps,
    type Variants,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* Aparece al entrar en pantalla: sube, se aclara y pierde el desenfoque */
export const blurUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export const staggerBox = (gap = 0.08, delay = 0): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export function Reveal({
    children,
    delay = 0,
    className,
    ...rest
}: { children: ReactNode; delay?: number; className?: string } & HTMLMotionProps<"div">) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={blurUp}
            transition={{ delay }}
            className={className}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

/* Texto que sube palabra a palabra desde detrás de una máscara */
export function TextReveal({
    text,
    className,
    as = "span",
    delay = 0,
    onMount = false,
}: {
    text: string;
    className?: string;
    as?: "span" | "h1" | "h2" | "p";
    delay?: number;
    onMount?: boolean;
}) {
    const Tag = motion[as];
    const words = text.split(" ");
    const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } };
    return (
        <Tag
            key={text}
            initial="hidden"
            {...trigger}
            variants={staggerBox(0.06, delay)}
            className={className}
            aria-label={text}
        >
            {words.map((w, i) => (
                <span key={w + i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: "110%" },
                            show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
                        }}
                    >
                        {w}
                        {i < words.length - 1 && " "}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}

/* Cabecera de sección: número + título enmascarado + línea que se dibuja */
export function SectionHeading({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
    return (
        <div className="mb-12 flex flex-col items-center text-center">
            <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mb-3 font-mono text-xs tracking-widest text-blue-500"
            >
                {index} /
            </motion.span>
            <TextReveal as="h2" text={title} className="text-4xl md:text-5xl font-bold tracking-tight" />
            <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="mt-4 h-[3px] w-16 origin-left rounded-full bg-linear-to-r from-blue-500 to-cyan-400"
            />
            {subtitle && (
                <Reveal delay={0.25} className="mt-5 max-w-lg text-(--foreground)/70">
                    {subtitle}
                </Reveal>
            )}
        </div>
    );
}

/* Tarjeta con brillo que sigue al ratón (borde + relleno) */
export function SpotlightCard({
    children,
    className = "",
    color = "59,130,246",
    tilt = 0,
    style,
    ...rest
}: { children: ReactNode; className?: string; color?: string; tilt?: number } & HTMLMotionProps<"div">) {
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const bg = useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, rgba(${color},0.14), transparent 70%)`;
    const border = useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, rgba(${color},0.55), transparent 70%)`;

    // Inclinación 3D hacia el cursor (grados máximos = tilt)
    const rx = useSpring(0, { stiffness: 200, damping: 20 });
    const ry = useSpring(0, { stiffness: 200, damping: 20 });

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        x.set(px);
        y.set(py);
        if (tilt) {
            ry.set(((px / r.width) - 0.5) * tilt * 2);
            rx.set((0.5 - (py / r.height)) * tilt * 2);
        }
    };

    return (
        <motion.div
            onMouseMove={onMove}
            onMouseLeave={() => { x.set(-200); y.set(-200); rx.set(0); ry.set(0); }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
            className={`group relative rounded-2xl border border-(--foreground)/[0.08] bg-(--foreground)/[0.025] ${className}`}
            {...rest}
        >
            {/* Borde iluminado (máscara: solo el anillo de 1px) */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: border,
                    padding: 1,
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: bg }}
            />
            <div className="relative h-full">{children}</div>
        </motion.div>
    );
}

/* Envoltorio "magnético": el contenido se desplaza un poco hacia el cursor */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
    const y = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x, y }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}

/* Barra de progreso de lectura */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
    return (
        <motion.div
            aria-hidden
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500"
        />
    );
}

/* Texto que se "descifra": al pasar el ratón, las letras bailan y vuelven a su sitio */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/";
export function useScramble(text: string, speed = 28) {
    // Mientras no se anima, se muestra el texto real (así un cambio de idioma se refleja al instante)
    const [scrambled, setScrambled] = useState<string | null>(null);
    const out = scrambled ?? text;
    const frame = useRef<number | null>(null);

    const start = () => {
        if (frame.current) clearInterval(frame.current);
        let i = 0;
        frame.current = window.setInterval(() => {
            setScrambled(
                text
                    .split("")
                    .map((ch, idx) => {
                        if (ch === " " || ch === "." || ch === "@") return ch;
                        if (idx < i) return ch;
                        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                    })
                    .join("")
            );
            i += 1;
            if (i > text.length) { clearInterval(frame.current!); frame.current = null; setScrambled(null); }
        }, speed);
    };

    useEffect(() => () => { if (frame.current) clearInterval(frame.current); }, []);
    return { out, start };
}

/* Botón flotante "volver arriba": el anillo se va rellenando según bajas
   y al pasar el ratón muestra el porcentaje leído */
export function BackToTop({ label }: { label: string }) {
    const { scrollY, scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);
    const [percent, setPercent] = useState(0);
    useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 400));
    useMotionValueEvent(scrollYProgress, "change", (v) => setPercent(Math.round(v * 100)));
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24 });
    const C = 2 * Math.PI * 22; // circunferencia (r = 22)
    const dash = useTransform(progress, [0, 1], [C, 0]);

    return (
        <motion.button
            type="button"
            aria-label={label}
            title={label}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={false}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5, y: visible ? 0 : 20, pointerEvents: visible ? "auto" : "none" }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            className="group print:hidden fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-(--background)/80 backdrop-blur-md shadow-lg shadow-blue-500/20"
        >
            <svg aria-hidden className="absolute inset-0 -rotate-90" viewBox="0 0 50 50">
                <defs>
                    <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                </defs>
                <circle cx="25" cy="25" r="22" fill="none" strokeWidth="3" className="stroke-(--foreground)/10" />
                <motion.circle
                    cx="25" cy="25" r="22" fill="none" strokeWidth="3" strokeLinecap="round"
                    stroke="url(#btt-grad)"
                    strokeDasharray={C}
                    style={{ strokeDashoffset: dash }}
                    className="transition-[filter] duration-300 group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"
                />
            </svg>
            {/* Flecha que deja paso al porcentaje al pasar el ratón */}
            <motion.span
                variants={{ hover: { y: -24, opacity: 0 } }}
                transition={{ duration: 0.25 }}
                className="absolute"
            >
                <ArrowUp size={20} />
            </motion.span>
            <motion.span
                initial={{ y: 24, opacity: 0 }}
                variants={{ hover: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.25 }}
                className="absolute text-xs font-bold tabular-nums"
            >
                {percent}%
            </motion.span>
        </motion.button>
    );
}
