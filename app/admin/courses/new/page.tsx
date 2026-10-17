import { AdminPageHeading } from "@/components/admin/AdminUI";
import CourseForm from "@/components/admin/CourseForm";
export default function NewCoursePage() { return <><AdminPageHeading eyebrow="Catalog / New course" title="Create a course" description="Add a course and configure its description, pricing, batch timings, and curriculum."/><CourseForm/></>; }
