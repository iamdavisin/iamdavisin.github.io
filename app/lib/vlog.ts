/* ── Mini vlog: lo que hago fuera del código ──
   Cómo añadir contenido:
   1. Copia tus fotos/vídeos a  public/vlog/  (p. ej. public/vlog/escalada.jpg)
   2. Añade una entrada aquí con  src: "/vlog/escalada.jpg"
   - Fotos: .jpg / .webp (idealmente en vertical, 3:4 o 9:16)
   - Vídeos: .mp4 (H.264, 720p, < 10 MB). Opcional: poster con un fotograma .jpg
   - Las entradas con src vacío se muestran como tarjetas de ejemplo.
   El orden de esta lista es el orden en la web. */

export type VlogItem = {
    id: string;
    type: "image" | "video";
    src: string;
    poster?: string;
    tag: { es: string; en: string };
    caption: { es: string; en: string };
    date?: string; // texto libre, p. ej. "Oct 2026"
};

export const vlog: VlogItem[] = [
    {
        id: "ejemplo-1",
        type: "image",
        src: "",
        tag: { es: "Deporte", en: "Sports" },
        caption: { es: "Sustituye esta tarjeta por una foto tuya haciendo deporte", en: "Replace this card with a photo of you doing sports" },
    },
    {
        id: "ejemplo-2",
        type: "video",
        src: "",
        tag: { es: "Viajes", en: "Travel" },
        caption: { es: "Un vídeo corto de algún viaje", en: "A short clip from a trip" },
    },
    {
        id: "ejemplo-3",
        type: "image",
        src: "",
        tag: { es: "Setup", en: "Setup" },
        caption: { es: "Tu escritorio o tu homelab", en: "Your desk or your homelab" },
    },
    {
        id: "ejemplo-4",
        type: "image",
        src: "",
        tag: { es: "Viajes", en: "Travel" },
        caption: { es: "Otra foto de viaje", en: "Another travel photo" },
    },
    {
        id: "ejemplo-5",
        type: "video",
        src: "",
        tag: { es: "Deporte", en: "Sports" },
        caption: { es: "Un momento del día a día", en: "An everyday moment" },
    },
    {
        id: "ejemplo-6",
        type: "image",
        src: "",
        tag: { es: "Setup", en: "Setup" },
        caption: { es: "Algo que estés construyendo", en: "Something you are building" },
    },
];

/* Degradados para las tarjetas de ejemplo (sin foto) */
export const placeholderGradients = [
    "from-blue-500 to-cyan-400",
    "from-violet-500 to-fuchsia-400",
    "from-emerald-500 to-teal-400",
    "from-orange-500 to-amber-400",
    "from-rose-500 to-pink-400",
    "from-sky-500 to-indigo-400",
];
