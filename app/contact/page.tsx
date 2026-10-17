import React from "react";
import { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Student & University Learning Support",
  description:
    "Have questions about our live technical courses, training & internship programs, academic project reports, or batch enrollment? Connect with internkul's student help desk.",
  openGraph: {
    title: "Contact Us | internkul Student & University Support",
    description:
      "Reach out to internkul for course curriculum inquiries, training and internship support, batch schedules, and academic credentials.",
    url: "https://internkul.dev/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
