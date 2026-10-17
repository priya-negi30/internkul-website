import { RegistrationInput, StudentProfile } from "@/types";
import { apiRequest } from "./http";

export interface ContactInquiryInput {
  fullName: string;
  mobileNumber: string;
  email: string;
  interestedCourse: string;
  message?: string;
  enquiryCategory?: "course" | "internship" | "enrollment" | null;
}

export interface CollegeInquiryInput {
  institutionName: string;
  contactPerson: string;
  designation: string;
  officialEmail: string;
  phone: string;
  numberOfStudents: string;
  preferredTechnology: string;
  preferredDuration: string;
  preferredTrainingWindow: string;
  message?: string;
}

export async function submitContactInquiry(input: ContactInquiryInput): Promise<void> {
  await apiRequest("/inquiries/contact", { method: "POST", body: input });
}

export async function submitCollegeInquiry(input: CollegeInquiryInput): Promise<void> {
  await apiRequest("/inquiries/college", { method: "POST", body: input });
}

export async function registerStudentRequest(input: RegistrationInput): Promise<StudentProfile> {
  const res = await apiRequest<{ data: StudentProfile }>("/students/register", {
    method: "POST",
    body: input,
  });
  return res.data;
}
