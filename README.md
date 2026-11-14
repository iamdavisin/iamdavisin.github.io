<p align="center">
  <h1 align="center">🚀 David Pérez — Portfolio</h1>
  <p align="center">Sitio web de portfolio personal construido con tecnologías web modernas.</p>
</p>

<p align="center">
  <a href="https://iamdavisin.github.io"><img src="https://img.shields.io/badge/Live%20Demo-iamdavisin.github.io-2563EB?style=flat-square&logo=googlechrome&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/iamdavisin"><img src="https://img.shields.io/badge/GitHub-iamdavisin-181717?style=flat-square&logo=github" alt="GitHub" /></a>
  <a href="https://linkedin.com/in/davidperezmi"><img src="https://img.shields.io/badge/LinkedIn-davidperezmi-0A66C2?style=flat-square&logo=linkedin" alt="LinkedIn" /></a>
</p>

---

## ✨ Características

- ⚡ **Ultra rápido** — Construido con Next.js 16 y Turbopack para HMR instantáneo
- 🎨 **Tema oscuro / claro / sistema** — Cambio de tema fluido a través de `next-themes`
- 🌍 **Internacionalización (i18n)** — Soporte en español e inglés con un proveedor de idioma personalizado
- 📱 **Totalmente responsive** — Diseño mobile-first con menú móvil dedicado
- 🎬 **Animaciones fluidas** — Revelados al hacer scroll, navbar que se transforma en isla flotante, tarjetas con brillo e inclinación 3D y cambio de tema con revelado circular
- 📄 **CV dinámico** — La página `/cv` genera el currículum en A4 con los mismos datos de la web y se descarga como PDF desde el navegador
- 🐙 **Repos de GitHub** — `/projects` lista los repositorios públicos, obtenidos en el build
- ♿ **Accesible y rápido** — 100 en accesibilidad, buenas prácticas y SEO en Lighthouse; respeta "reducir movimiento"
- 🧩 **Arquitectura modular** — Separación limpia entre secciones, componentes, datos y traducciones

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
iamdavisin.github.io/
├── app/
│   ├── components/       # Componentes de UI reutilizables
│   │   ├── motion/        # Primitivas de animación y fondo animado
│   │   ├── BottomSheet.tsx
│   │   ├── Footer.tsx
│   │   ├── LangSwitcher.tsx
│   │   ├── LanguageProvider.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Navbar.tsx
│   │   ├── Providers.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── cv/                # Página /cv (currículum imprimible)
│   ├── lib/               # Datos (resume.tsx: habilidades, experiencia, formación), GitHub API y hooks
│   ├── locales/           # Archivos de traducción i18n
│   │   ├── en.json
│   │   └── es.json
│   ├── projects/          # Página /projects (repos de GitHub en el build)
│   ├── sections/          # Secciones de la página principal
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── apple-icon.tsx
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── template.tsx
├── public/
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🚀 Empezar

### Requisitos previos

- **Node.js** ≥ 20
- **pnpm** (recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/iamdavisin/iamdavisin.github.io
cd iamdavisin.github.io

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Compilar para producción

```bash
pnpm build   # genera la web estática en ./out
```

El despliegue a GitHub Pages es automático al hacer push a `main`.

## 📄 Licencia

El código es de código abierto bajo la [Licencia MIT](LICENSE.md). Las fotografías, los textos personales y el contenido del CV no están incluidos y conservan todos los derechos reservados.

---

<p align="center">Hecho con ❤️ por <strong>David Pérez</strong></p>
