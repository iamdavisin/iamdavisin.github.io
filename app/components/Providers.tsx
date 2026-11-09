"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "./LanguageProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <LanguageProvider>
            <ThemeProvider>
                {/* Respeta la preferencia "reducir movimiento" del sistema */}
                <MotionConfig reducedMotion="user">{children}</MotionConfig>
            </ThemeProvider>
        </LanguageProvider>
    );
}
