import type { Metadata } from "next";
import LegalClient from "./LegalClient";

export const metadata: Metadata = {
    title: "Aviso legal y privacidad",
    description: "Aviso legal, propiedad intelectual y política de privacidad del portfolio de David Pérez Miñano.",
    alternates: { canonical: "/legal" },
};

export default function LegalPage() {
    return <LegalClient />;
}
