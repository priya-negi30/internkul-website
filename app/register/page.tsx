import React from "react";
import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register Yourself — Start Your Learning Journey",
  description:
    "Register for live technical cohorts at internkul. Choose your course, tell us what topics you want to learn, and practice code side-by-side with senior engineering mentors.",
  openGraph: {
    title: "Register Yourself | internkul",
    description: "Start your engineering learning journey. Real projects, live sessions, and verified credentials.",
  },
};

export default function RegisterPage() {
  return (
    <div className="w-full py-12 sm:py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </div>
  );
}
