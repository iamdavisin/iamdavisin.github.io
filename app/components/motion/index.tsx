"use client";
/* ── Primitivas de animación reutilizables ──
   Todas respetan "reducir movimiento" gracias a <MotionConfig reducedMotion="user">
   en Providers (los desplazamientos se anulan y solo queda el fundido). */
import { ReactNode, useEffect, useRef, useState, MouseEvent } from "react";
import { ArrowUp } from "lucide-react";
import {
    animate,
    motion,
    useInView,
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

/* Contador que sube de 0 al valor cuando entra en pantalla */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const mv = useMotionValue(0);
    const rounded = useTransform(mv, (v) => Math.round(v).toString());

    useEffect(() => {
        if (!inView) return;
        const controls = animate(mv, value, { duration: 1.6, ease: EASE });
        return controls.stop;
    }, [inView, mv, value]);

    return (
        <span ref={ref} className={className}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
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

/* Botón flotante "volver arriba" con anillo de progreso */
export function BackToTop({ label }: { label: string }) {
    const { scrollY, scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);
    useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 600));
    const dash = useTransform(scrollYProgress, [0, 1], [113, 0]); // 2π·18 ≈ 113

    return (
        <motion.button
            type="button"
            aria-label={label}
            title={label}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={false}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6, pointerEvents: visible ? "auto" : "none" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="print:hidden fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-(--foreground)/[0.12] bg-(--background)/70 backdrop-blur-md shadow-lg"
        >
            <svg aria-hidden className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" strokeWidth="2" className="stroke-(--foreground)/10" />
                <motion.circle
                    cx="20" cy="20" r="18" fill="none" strokeWidth="2" strokeLinecap="round"
                    className="stroke-blue-500"
                    strokeDasharray="113"
                    style={{ strokeDashoffset: dash }}
                />
            </svg>
            <ArrowUp size={18} />
        </motion.button>
    );
}
