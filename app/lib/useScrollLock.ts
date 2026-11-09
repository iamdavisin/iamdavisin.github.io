"use client";
import { useEffect } from "react";

/* Contador compartido: si hay varios overlays abiertos, el scroll solo se
   desbloquea cuando se cierra el último. */
let locks = 0;

export function useScrollLock(active: boolean) {
    useEffect(() => {
        if (!active) return;
        locks++;
        document.body.style.overflow = "hidden";
        return () => {
            locks--;
            if (locks === 0) document.body.style.overflow = "";
        };
    }, [active]);
}

/* Cierra el overlay con la tecla Escape */
export function useEscape(active: boolean, onClose: () => void) {
    useEffect(() => {
        if (!active) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active, onClose]);
}
