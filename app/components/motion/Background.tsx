"use client";
import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

/* Fondo global: rejilla de puntos difuminada, dos "auroras" que flotan
   despacio y un foco suave que sigue al cursor (solo con ratón). */
export default function Background() {
    const mx = useMotionValue(-1000);
    const my = useMotionValue(-1000);
    const x = useSpring(mx, { stiffness: 80, damping: 20 });
    const y = useSpring(my, { stiffness: 80, damping: 20 });
    const spotlight = useMotionTemplate`radial-gradient(500px circle at ${x}px ${y}px, rgba(59,130,246,0.09), transparent 70%)`;

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const onMove = (e: PointerEvent) => { mx.set(e.clientX); my.set(e.clientY); };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [mx, my]);

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden">
            {/* Ruido */}
            <div className="bg-noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />
            {/* Rejilla de puntos */}
            <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]" />
            {/* Auroras */}
            <div className="aurora aurora-a absolute -top-40 left-[10%] h-[480px] w-[480px] rounded-full bg-blue-500/20 blur-[120px]" />
            <div className="aurora aurora-b absolute top-[20%] right-[5%] h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-[120px]" />
            {/* Foco del cursor */}
            <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        </div>
    );
}
