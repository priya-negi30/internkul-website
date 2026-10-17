import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTrackBySlug, getTracks } from "@/lib/api/tracks";
import { TrackDetailClient } from "./TrackDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { Track } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ duration?: string }>;
}

async function resolveTrack(slug: string): Promise<Track | null> {
  try {
    const liveTrack = await getTrackBySlug(slug);
    if (liveTrack) {
      return liveTrack;
    }
  } catch (err) {
    console.error(`[resolveTrack] Failed to fetch live track for slug "${slug}":`, err);
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = await resolveTrack(slug);

  if (!track) {
    return {
      title: "Course Not Found | internkul",
      description: "The requested engineering cohort could not be found.",
    };
  }

  return {
    title: `${track.name} — Live Engineering Cohort`,
    description: track.summary,
    openGraph: {
      title: `${track.name} | internkul`,
      description: track.detailedDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${track.name} | internkul`,
      description: track.summary,
    },
  };
}

export async function generateStaticParams() {
  try {
    const liveTracks = await getTracks();
    if (liveTracks && liveTracks.length > 0) {
      return liveTracks.map((t) => ({ slug: t.slug }));
    }
  } catch (err) {
    console.warn("[generateStaticParams] Could not fetch live tracks for static generation:", err);
  }
  return [];
}

export default async function TrackDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { duration } = await searchParams;

  const track = await resolveTrack(slug);

  if (!track) {
    notFound();
  }

  const validDuration =
    duration === "1D" ||
    duration === "10D" ||
    duration === "20D" ||
    duration === "30D" ||
    duration === "45D"
      ? duration
      : "45D";

  return (
    <>
      <JsonLd type="course" course={track} />
      <TrackDetailClient track={track} initialDuration={validDuration} />
    </>
  );
}
