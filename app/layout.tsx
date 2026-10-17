import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { CourseProvider } from "@/context/CourseContext";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "internkul — Live Industrial Training & Internship Platform",
    template: "%s | internkul",
  },
  description:
    "India-wide live industrial technical training and internship for students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines. Practical coding cohorts, side-by-side debugging, academic documentation, and verified GitHub proof-of-work.",
  keywords: [
    "technical training in India",
    "live coding training",
    "engineering internship training",
    "B.Tech internship training",
    "BCA internship training",
    "MCA internship training",
    "software development training",
    "MERN training",
    "Python training",
    "AI ML training",
    "industrial training & internship",
    "industrial training",
    "technical certification",
    "internkul",
  ],
  authors: [{ name: "internkul Engineering Board" }],
  creator: "internkul",
  publisher: "internkul",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://internkul.dev"),
  openGraph: {
    title: "internkul — Live Engineering Training & Credentialing Platform",
    description:
      "Build real software. Earn recognized credentials. Prove what you can do. Live cohorts for students across India with academic industrial training support and industry mentorship.",
    url: "https://internkul.dev",
    siteName: "internkul",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "internkul — Developer-First Live Technical Training",
    description:
      "Live engineering cohorts for students and graduates from diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines across India. Practical Git workflows, academic project reports, and proof of work.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col font-sans selection:bg-[#3157D5] selection:text-white antialiased">
        <AuthProvider>
          <CourseProvider>
            <JsonLd type="organization" />
            <SiteChrome>{children}</SiteChrome>
          </CourseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
