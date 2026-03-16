"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

/* ── Componente de esfera flotante ── */
function FloatingOrb({ size, x, y, delay, duration, color }: {
  size: number; x: string; y: string; delay: number; duration: number; color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
        opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ── Punto en órbita ── */
function OrbitDot({ radius, duration, delay, dotSize, color }: {
  radius: number; duration: number; delay: number; dotSize: number; color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: dotSize,
        height: dotSize,
        background: color,
        boxShadow: `0 0 ${dotSize * 2}px ${color}`,
      }}
      animate={{
        x: Array.from({ length: 61 }, (_, i) => Math.cos((i / 60) * Math.PI * 2) * radius),
        y: Array.from({ length: 61 }, (_, i) => Math.sin((i / 60) * Math.PI * 2) * radius),
      }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    />
  );
}

/* ── Capa de efecto glitch para el texto 404 ── */
function GlitchText({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative select-none">
      {/* Capas de sombra para efecto glitch */}
      <motion.span
        className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-cyan-500/30"
        aria-hidden
        animate={{
          x: [0, -4, 2, -1, 3, 0],
          y: [0, 2, -1, 1, -2, 0],
          opacity: [0, 0.7, 0, 0, 0.5, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-red-500/20"
        aria-hidden
        animate={{
          x: [0, 3, -2, 4, -1, 0],
          y: [0, -1, 2, -2, 1, 0],
          opacity: [0, 0.5, 0, 0.6, 0, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, delay: 0.15 }}
      >
        {children}
      </motion.span>
      {/* Texto principal */}
      <motion.span
        className="relative text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter bg-gradient-to-b from-(--foreground) to-(--foreground)/20 bg-clip-text text-transparent"
        animate={{
          opacity: [1, 1, 0.85, 1, 0.9, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
      >
        {children}
      </motion.span>
    </div>
  );
}

/* ── Capa de líneas de escaneo ── */
function ScanLines() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }}
      animate={{ y: [0, 4, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-(--background) relative overflow-hidden">

      <ScanLines />

      {/* Fondo ambiental brillante — pulsante */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Esferas flotantes */}
      <FloatingOrb size={6} x="15%" y="25%" delay={0} duration={5} color="rgba(59,130,246,0.5)" />
      <FloatingOrb size={4} x="80%" y="20%" delay={1} duration={6} color="rgba(6,182,212,0.5)" />
      <FloatingOrb size={8} x="70%" y="70%" delay={0.5} duration={7} color="rgba(59,130,246,0.3)" />
      <FloatingOrb size={3} x="25%" y="75%" delay={2} duration={4} color="rgba(6,182,212,0.4)" />
      <FloatingOrb size={5} x="50%" y="15%" delay={1.5} duration={5.5} color="rgba(59,130,246,0.4)" />
      <FloatingOrb size={4} x="90%" y="50%" delay={0.8} duration={6.5} color="rgba(6,182,212,0.3)" />
      <FloatingOrb size={6} x="5%" y="55%" delay={2.5} duration={5} color="rgba(59,130,246,0.35)" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Puntos orbitando alrededor del 404 */}
        <div className="relative flex items-center justify-center">
          <div className="absolute flex items-center justify-center">
            <OrbitDot radius={140} duration={8} delay={0} dotSize={5} color="rgba(59,130,246,0.6)" />
            <OrbitDot radius={160} duration={12} delay={2} dotSize={3} color="rgba(6,182,212,0.5)" />
            <OrbitDot radius={120} duration={10} delay={4} dotSize={4} color="rgba(59,130,246,0.4)" />
          </div>

          {/* 404 con efecto glitch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <GlitchText>404</GlitchText>
          </motion.div>
        </div>

        {/* Mensaje */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="-mt-4 md:-mt-8"
        >
          <motion.p
            className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-3"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Página no encontrada
          </motion.p>
          <p className="text-(--foreground)/50 text-sm md:text-base max-w-md">
            La página que buscas no existe o ha sido movida.
          </p>
        </motion.div>

        {/* Botón animado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-medium text-sm
                       overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
          >
            {/* Fondo degradado del botón */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              style={{ backgroundSize: "200% 200%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Efecto de brillo */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
            <Home className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span className="relative z-10">Volver al inicio</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}