<p align="center">
  <h1 align="center">🚀 David Pérez — Portfolio</h1>
  <p align="center">Sitio web de portfolio personal construido con tecnologías web modernas.</p>
</p>

<p align="center">
  <a href="https://github.com/iamdavisin"><img src="https://img.shields.io/badge/GitHub-iamdavisin-181717?style=flat-square&logo=github" alt="GitHub" /></a>
  <a href="https://linkedin.com/in/davidperezmi"><img src="https://img.shields.io/badge/LinkedIn-davidperezmi-0A66C2?style=flat-square&logo=linkedin" alt="LinkedIn" /></a>
</p>

---

## ✨ Características

- ⚡ **Ultra rápido** — Construido con Next.js 16 y Turbopack para HMR instantáneo
- 🎨 **Tema oscuro / claro / sistema** — Cambio de tema fluido a través de `next-themes`
- 🌍 **Internacionalización (i18n)** — Soporte en español e inglés con un proveedor de idioma personalizado
- 📱 **Totalmente responsive** — Diseño mobile-first con menú móvil dedicado
- 🎬 **Animaciones fluidas** — Transiciones de página y micro-interacciones con Framer Motion
- 🧩 **Arquitectura modular** — Separación limpia entre páginas, componentes y locales

## 🛠️ Stack Tecnológico

| Categoría       | Tecnología                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------- |
| **Framework**   | [Next.js 16](https://nextjs.org/) (App Router)                                                  |
| **Lenguaje**    | [TypeScript 5](https://www.typescriptlang.org/)                                                 |
| **UI**          | [React 19](https://react.dev/)                                                                  |
| **Estilos**     | [Tailwind CSS 4](https://tailwindcss.com/)                                                      |
| **Animaciones** | [Framer Motion](https://www.framer.com/motion/)                                                 |
| **Iconos**      | [Lucide React](https://lucide.dev/) · [React Icons](https://react-icons.github.io/react-icons) |
| **Temas**       | [next-themes](https://github.com/pacocoursey/next-themes)                                       |
| **Linting**     | [ESLint](https://eslint.org/)                                                                   |
| **Bundler**     | [Turbopack](https://turbo.build/pack)                                                           |

## 📁 Estructura del Proyecto

```
web/
├── app/
│   ├── components/       # Componentes de UI reutilizables
│   │   ├── Footer.tsx
│   │   ├── LangSwitcher.tsx
│   │   ├── LanguageProvider.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── locales/           # Archivos de traducción i18n
│   │   ├── en.json
│   │   └── es.json
│   ├── pages/             # Secciones de página
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── public/
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🚀 Empezar

### Requisitos previos

- **Node.js** ≥ 18
- **pnpm** (recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/iamdavisin/iamdavisin.github.io
cd portfolio/web

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Compilar para producción

```bash
pnpm build
pnpm start
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE.md).

---

<p align="center">Hecho con ❤️ por <strong>David Pérez</strong></p>
