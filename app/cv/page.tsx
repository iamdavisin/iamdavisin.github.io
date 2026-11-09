import type { Metadata } from "next";
import CvClient from "./CvClient";

export const metadata: Metadata = {
    // También es el nombre por defecto del PDF al guardarlo
    title: { absolute: "CV David Pérez Miñano" },
    description: "Currículum de David Pérez Miñano, desarrollador Full Stack.",
    alternates: { canonical: "/cv" },
};

export default function CvPage() {
    return <CvClient />;
}
