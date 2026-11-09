import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { fetchGitHubRepos } from "../lib/github";

export const metadata: Metadata = {
    title: "Proyectos",
    description: "Todos los repositorios públicos de David Pérez en GitHub.",
    alternates: { canonical: "/projects" },
};

// Los repositorios se obtienen una vez en el build: sin límites de la API
// en el navegador, sin estado de carga y con los forks ya filtrados.
export default async function ProjectsPage() {
    const repos = await fetchGitHubRepos();
    return <ProjectsClient repos={repos} />;
}
