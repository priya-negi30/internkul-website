import { MetadataRoute } from "next";
import { getTracks } from "@/lib/api/tracks";
import { Track } from "@/types";

const SAMPLE_CREDENTIAL_IDS = [
  "CG-2026-MERN-104",
  "CG-2026-PYAI-208",
  "CG-2026-DATA-315",
  "CG-2026-IOT-412",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://internkul.dev";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tracks`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/internship-matrix`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/verify`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/colleges`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let tracks: Track[] = [];
  try {
    const liveTracks = await getTracks();
    if (liveTracks && liveTracks.length > 0) {
      tracks = liveTracks;
    }
  } catch (err) {
    console.warn("[sitemap] Could not fetch live tracks:", err);
  }

  const trackRoutes: MetadataRoute.Sitemap = tracks.map((track) => ({
    url: `${baseUrl}/tracks/${track.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const verifyRoutes: MetadataRoute.Sitemap = SAMPLE_CREDENTIAL_IDS.map((id) => ({
    url: `${baseUrl}/verify/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...trackRoutes, ...verifyRoutes];
}
