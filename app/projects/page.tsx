import { fetchGitHubRepos } from "../lib/github";
import ProjectsClient from "./ProjectsClient";

export const revalidate = 3600; // ISR — revalidar cada hora

export default async function ProjectsPage() {
    const repos = await fetchGitHubRepos();

    return <ProjectsClient repos={repos} />;
}
