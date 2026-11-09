"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, ReactNode } from "react";
import { useMounted } from "../lib/useMounted";
import es from "../locales/es.json";
import en from "../locales/en.json";

export type Locale = "es" | "en";
type Translations = typeof es;

interface LanguageContextType {
  locale: Locale;
  t: (path: string) => string;
  changeLanguage: (newLang: Locale) => void;
}

const translations: Record<Locale, Translations> = { es, en };
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const DEFAULT_LOCALE: Locale = "es";

/* Script que se ejecuta antes de pintar la página: si el visitante eligió inglés,
   oculta el contenido hasta que React lo traduzca (evita ver un parpadeo en español).
   El resto de visitas y los buscadores ven el HTML al instante.
   Si el JS falla, el contenido se muestra igualmente tras 1,5 s. */
export const langInitScript = `try{var l=localStorage.getItem('lang');if(l&&l!=='${DEFAULT_LOCALE}'){document.documentElement.setAttribute('data-lang-pending','');document.documentElement.lang=l;setTimeout(function(){document.documentElement.removeAttribute('data-lang-pending')},1500)}}catch(e){}`;

/* Idioma guardado en localStorage como "store" externo de React */
const listeners = new Set<() => void>();
let memoryLocale: Locale | null = null; // por si localStorage no está disponible

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

function readStoredLocale(): Locale {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") return saved;
  } catch { }
  return memoryLocale ?? DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // El HTML estático se genera en el idioma por defecto
  const locale = useSyncExternalStore(subscribe, readStoredLocale, () => DEFAULT_LOCALE);
  const ready = useMounted();

  // Mantiene <html lang> sincronizado y muestra el contenido ya traducido
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    document.documentElement.removeAttribute("data-lang-pending");
  }, [locale, ready]);

  const t = useCallback((path: string): string => {
    let result: unknown = translations[locale];
    for (const key of path.split(".")) {
      if (result && typeof result === "object" && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    return typeof result === "string" ? result : path;
  }, [locale]);

  const changeLanguage = useCallback((newLang: Locale) => {
    try { localStorage.setItem("lang", newLang); } catch { }
    memoryLocale = newLang;
    listeners.forEach((l) => l());
  }, []);

  const value = useMemo(() => ({ locale, t, changeLanguage }), [locale, t, changeLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation debe usarse dentro de LanguageProvider");
  return context;
};
