import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://iamdavisin.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    ];
}
