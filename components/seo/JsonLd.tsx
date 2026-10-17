import React from "react";
import { Track } from "@/types";

interface JsonLdProps {
  type: "organization" | "course" | "webpage";
  course?: Track;
  url?: string;
  name?: string;
  description?: string;
}

export function JsonLd({
  type,
  course,
  url = "https://internkul.dev",
  name = "internkul",
  description = "India-wide developer-first live technical training and credentialing platform.",
}: JsonLdProps) {
  let schema: Record<string, any> = {};

  if (type === "organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "internkul",
      description: "India-wide developer-first live technical training and credentialing platform. Built in Chhattisgarh, designed for students and graduates from diverse academic backgrounds across India.",
      url: "https://internkul.dev",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Chhattisgarh",
        addressCountry: "IN",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "999",
        highPrice: "6999",
      },
      educationalCredentialAwarded: "Certificate of Industrial Training & Production Engineering",
    };
  } else if (type === "course" && course) {
    const defaultOption = course.durationOptions["45D"];
    schema = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.name,
      description: course.detailedDescription,
      provider: {
        "@type": "Organization",
        name: "internkul",
        sameAs: "https://internkul.dev",
      },
      courseCode: `INTERNKUL-${course.slug.toUpperCase()}`,
      educationalCredentialAwarded: "Industrial Training Certificate",
      hasCourseInstance: [
        {
          "@type": "CourseInstance",
          courseMode: "Online",
          courseWorkload: `PT${defaultOption.sessions || defaultOption.labHours}H`,
          offers: {
            "@type": "Offer",
            price: defaultOption.priceINR.toString(),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        },
      ],
    };
  } else {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name,
      description,
      url,
      isPartOf: {
        "@type": "WebSite",
        name: "internkul",
        url: "https://internkul.dev",
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
