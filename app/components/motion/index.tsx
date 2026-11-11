"use client";
/* ── Primitivas de animación reutilizables ──
   Todas respetan "reducir movimiento" gracias a <MotionConfig reducedMotion="user">
   en Providers (los desplazamientos se anulan y solo queda el fundido). */
import { ReactNode, useRef, MouseEvent } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useScroll,
    useSpring,
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
    ...rest
}: { children: ReactNode; className?: string; color?: string } & HTMLMotionProps<"div">) {
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const bg = useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, rgba(${color},0.14), transparent 70%)`;
    const border = useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, rgba(${color},0.55), transparent 70%)`;

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
    };

    return (
        <motion.div
            onMouseMove={onMove}
            onMouseLeave={() => { x.set(-200); y.set(-200); }}
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
