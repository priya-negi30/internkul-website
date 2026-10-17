"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import CourseForm from "@/components/admin/CourseForm";
import { AdminPageHeading } from "@/components/admin/AdminUI";
import { useCourses } from "@/context/CourseContext";

export default function EditCoursePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { getCourseBySlug, isReady } = useCourses();
  const course = getCourseBySlug(decodeURIComponent(params.slug));

  useEffect(() => {
    if (isReady && !course) router.replace("/admin/courses");
  }, [isReady, course, router]);

  if (!isReady || !course) {
    return <div className="animate-pulse h-72 rounded-2xl bg-white border border-[#E2E8F0] shadow-card" />;
  }

  return (
    <>
      <AdminPageHeading
        eyebrow="Catalog / Edit course"
        title="Edit course"
        description={`Update curriculum, pricing tiers, and configuration for ${course.name}.`}
      />
      <CourseForm key={course.slug} initialCourse={course} editing />
    </>
  );
}
