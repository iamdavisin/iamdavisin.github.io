"use client";

import { useEffect, useState } from "react";
import ProjectsClient from "./ProjectsClient";
import { type GitHubRepo } from "../lib/github";

export default function ProjectsPage() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);

    useEffect(() => {
        fetch("https://api.github.com/users/iamdavisin/repos?sort=updated&per_page=30")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setRepos(data);
            })
            .catch(() => setRepos([]));
    }, []);

    return <ProjectsClient repos={repos} />;
}
