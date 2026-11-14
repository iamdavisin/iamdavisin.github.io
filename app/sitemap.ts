import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://iamdavisin.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/cv`, changeFrequency: "monthly", priority: 0.9 },
        { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/legal`, changeFrequency: "yearly", priority: 0.3 },
    ];
}
