import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Background from "./components/motion/Background";
import { langInitScript } from "./components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const SITE_URL = "https://iamdavisin.github.io";
const description =
  "Portfolio de David Pérez Miñano, desarrollador Full Stack especializado en Java, Spring Boot, React y Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "David Pérez — Desarrollador Full Stack",
    template: "%s | David Pérez",
  },
  description,
  authors: [{ name: "David Pérez Miñano", url: SITE_URL }],
  keywords: ["David Pérez", "desarrollador full stack", "Java", "Spring Boot", "React", "Next.js", "portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "David Pérez",
    title: "David Pérez — Desarrollador Full Stack",
    description,
    locale: "es_ES",
    alternateLocale: ["en_US"],
    images: [{ url: "/profile.jpg", alt: "David Pérez" }],
  },
  twitter: {
    card: "summary",
    title: "David Pérez — Desarrollador Full Stack",
    description,
    images: ["/profile.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Saltar al contenido
        </a>
        <Providers>
          <Background />
          {children}
        </Providers>
      </body>
    </html>
  );
}
