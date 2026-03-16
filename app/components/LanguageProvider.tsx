"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';

type Locale = 'es' | 'en';
type Translations = typeof es;

interface LanguageContextType {
  locale: Locale;
  t: (path: string) => string;
  changeLanguage: (newLang: Locale) => void;
}

const translations: Record<Locale, Translations> = { es, en };
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Estado inicial 'es' por defecto para evitar diferencias Servidor/Cliente
  const [locale, setLocale] = useState<Locale>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Locale;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLocale(savedLang);
    }
    setMounted(true);
  }, []);

  const t = (path: string): string => {
    const keys = path.split('.');
    let result: any = translations[locale];
    for (const key of keys) {
      if (result?.[key]) result = result[key];
      else return path;
    }
    return result as string;
  };

  const changeLanguage = (newLang: Locale) => {
    setLocale(newLang);
    localStorage.setItem('lang', newLang);
  };

  // Usamos useEffect para aplicar la visibilidad al body directamente,
  // manteniendo la misma estructura del DOM en servidor y cliente.
  useEffect(() => {
    document.body.style.visibility = mounted ? 'visible' : 'hidden';
  }, [mounted]);

  return (
    <LanguageContext.Provider value={{ locale, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation debe usarse dentro de LanguageProvider');
  return context;
};