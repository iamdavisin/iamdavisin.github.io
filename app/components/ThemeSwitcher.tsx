"use client"
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, Check, X } from 'lucide-react'
import { useTranslation } from "./LanguageProvider"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    setMounted(true)
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isOpen])

  if (!mounted) return <div className="w-10 h-10" />

  const themes = [
    { id: 'light', icon: <Sun size={18}/>, name: t('settings.light') },
    { id: 'dark', icon: <Moon size={18}/>, name: t('settings.dark') },
    { id: 'system', icon: <Monitor size={18}/>, name: t('settings.system') }
  ]

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-end">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full p-6 rounded-t-4xl border-t border-zinc-500 bg-(--background) shadow-2xl"
          >
            <div className="max-w-xs mx-auto space-y-4">
              <div className="w-12 h-1.5 bg-zinc-400/50 rounded-full mx-auto mb-2" />
              <div className="flex justify-between items-center px-2">
                <h2 className="text-xl font-bold">{t('settings.theme')}</h2>
                <button onClick={() => setIsOpen(false)} className="p-2  rounded-full hover:bg-zinc-500/20 transition-colors"><X size={24}/></button>
              </div>
              <div className="grid gap-3 pb-8">
                {themes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setTheme(item.id); setIsOpen(false); }}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${
                      theme === item.id ? "bg-zinc-500/10 border border-(--foreground) font-bold" : "hover:bg-zinc-500/5 border border-transparent opacity-80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon} <span className="text-lg font-medium">{item.name}</span>
                    </div>
                    {theme === item.id && <Check size={20} className="text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        className="inline-flex items-center gap-2 p-3 rounded-full hover:scale-110 transition-transform"
      >
        {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
      </motion.button>
      {createPortal(menuContent, document.body)}
    </>
  )
}