"use client";

import { submitCollegeInquiry } from "@/lib/api/forms";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const collegeFormSchema = z.object({
  institutionName: z.string().min(3, "Institution name is required (min 3 characters)"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  designation: z.string().min(2, "Designation is required (e.g., TPO, HOD, Principal)"),
  officialEmail: z.string().email("Enter a valid official institutional email"),
  phone: z.string().regex(/^[0-9+ -]{10,15}$/, "Enter a valid 10-digit phone number"),
  numberOfStudents: z.string().min(1, "Select estimated student cohort size"),
  preferredTechnology: z.string().min(1, "Select primary technology stream"),
  preferredDuration: z.string().min(1, "Select preferred duration tier"),
  preferredTrainingWindow: z.string().min(1, "Specify start month / academic semester window"),
  message: z.string().optional(),
});

type CollegeFormData = z.infer<typeof collegeFormSchema>;

export function CollegeInquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedData, setSubmittedData] = useState<CollegeFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CollegeFormData>({
    resolver: zodResolver(collegeFormSchema),
    defaultValues: {
      institutionName: "",
      contactPerson: "",
      designation: "",
      officialEmail: "",
      phone: "",
      numberOfStudents: "50-100",
      preferredTechnology: "MERN Full-Stack Engineering",
      preferredDuration: "45 Days (Internship Pack)",
      preferredTrainingWindow: "Upcoming Semester Break",
      message: "",
    },
  });

  const onSubmit = async (data: CollegeFormData) => {
    setSubmitError("");
    try {
      await submitCollegeInquiry({
        institutionName: data.institutionName,
        contactPerson: data.contactPerson,
        designation: data.designation,
        officialEmail: data.officialEmail,
        phone: data.phone,
        numberOfStudents: data.numberOfStudents,
        preferredTechnology: data.preferredTechnology,
        preferredDuration: data.preferredDuration,
        preferredTrainingWindow: data.preferredTrainingWindow,
        message: data.message || undefined,
      });
      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "We could not send your request. Please try again.");
    }
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-8 sm:p-12 text-center space-y-4 shadow-card">
        <div className="w-14 h-14 rounded-full bg-white border border-[#A7F3D0] text-[#0F9F6E] flex items-center justify-center mx-auto shadow-soft">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="text-xs font-mono font-bold text-[#0F9F6E] tracking-wider uppercase">
          STATUS: REQUEST_RECEIVED
        </div>
        <h3 className="font-editorial text-3xl font-bold text-[#172033]">
          Institutional MoU Inquiry Registered
        </h3>
        <p className="text-sm text-[#475569] max-w-lg mx-auto leading-relaxed font-sans">
          Thank you, <strong className="text-[#172033]">{submittedData.contactPerson}</strong> ({submittedData.designation}) from{" "}
          <strong className="text-[#172033]">{submittedData.institutionName}</strong>. Our academic engineering partnership desk will dispatch a customized syllabus matrix, training infrastructure specs, and MoU draft to <strong className="text-[#3157D5]">{submittedData.officialEmail}</strong> within 1 business day.
        </p>

        <div className="p-4 rounded-xl bg-white border border-[#A7F3D0] max-w-md mx-auto text-left text-xs font-sans text-[#475569] space-y-1 shadow-soft">
          <div><strong className="text-[#172033]">Cohort Scope:</strong> {submittedData.numberOfStudents} Students</div>
          <div><strong className="text-[#172033]">Technology:</strong> {submittedData.preferredTechnology}</div>
          <div><strong className="text-[#172033]">Duration:</strong> {submittedData.preferredDuration}</div>
          <div><strong className="text-[#172033]">Academic Window:</strong> {submittedData.preferredTrainingWindow}</div>
        </div>

        <button
          onClick={() => {
            setIsSubmitted(false);
            reset();
          }}
          className="px-5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs font-semibold text-[#172033] hover:bg-[#F8FAFC] shadow-soft transition-all"
        >
          Submit Another Institutional Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-card">
      <div className="pb-6 mb-6 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#3157D5]" />
          <span className="text-xs uppercase tracking-wider text-[#3157D5] font-bold font-sans">
            Institutional MoU & Bulk Cohort Application
          </span>
        </div>
        <h3 className="font-editorial text-3xl font-bold text-[#172033] mt-2">
          Partner with internkul for Campus Industrial Training
        </h3>
        <p className="text-sm text-[#64748B] mt-1 font-sans">
          Structured industrial training & internship, project reports, letters of recommendation, and live technical cohorts for departments and students across diverse academic backgrounds, including BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., and other disciplines.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitError && (
          <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
            {submitError}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Institution Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-[#172033]">
              Institution / College Name *
            </label>
            <input
              {...register("institutionName")}
              placeholder="e.g. Government Engineering College, Bilaspur"
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]",
                errors.institutionName ? "border-rose-400" : "border-[#E2E8F0]"
              )}
            />
            {errors.institutionName && (
              <span className="text-xs text-rose-500 block">
                {errors.institutionName.message}
              </span>
            )}
          </div>

          {/* Contact Person */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-[#172033]">
              Contact Person *
            </label>
            <input
              {...register("contactPerson")}
              placeholder="Dr. Rajesh Patel"
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]",
                errors.contactPerson ? "border-rose-400" : "border-[#E2E8F0]"
              )}
            />
            {errors.contactPerson && (
              <span className="text-xs text-rose-500 block">
                {errors.contactPerson.message}
              </span>
            )}
          </div>

          {/* Designation */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-[#172033]">
              Designation *
            </label>
            <input
              {...register("designation")}
              placeholder="Head of Training & Placement / HOD CSE"
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]",
                errors.designation ? "border-rose-400" : "border-[#E2E8F0]"
              )}
            />
            {errors.designation && (
              <span className="text-xs text-rose-500 block">
                {errors.designation.message}
              </span>
            )}
          </div>

          {/* Official Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-[#172033]">
              Official Institutional Email *
            </label>
            <input
              {...register("officialEmail")}
              type="email"
              placeholder="tpo@gecbsp.ac.in"
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]",
                errors.officialEmail ? "border-rose-400" : "border-[#E2E8F0]"
              )}
            />
            {errors.officialEmail && (
              <span className="text-xs text-rose-500 block">
                {errors.officialEmail.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-[#172033]">
              Contact Phone / WhatsApp *
            </label>
            <input
              {...register("phone")}
              placeholder="+91 98260 12345"
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]",
                errors.phone ? "border-rose-400" : "border-[#E2E8F0]"
              )}
            />
            {errors.phone && (
              <span className="text-xs text-rose-500 block">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Number of Students */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-[#172033]">
              Estimated Batch Size *
            </label>
            <select
              {...register("numberOfStudents")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5]"
            >
              <option value="20-50">20 – 50 Students</option>
              <option value="50-100">50 – 100 Students</option>
              <option value="100-250">100 – 250 Students</option>
              <option value="250+">250+ Students (Department-wide / Institution-wide)</option>
            </select>
          </div>

          {/* Preferred Technology */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-[#172033]">
              Target Technology Stream *
            </label>
            <select
              {...register("preferredTechnology")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5]"
            >
              <option value="MERN Full-Stack Engineering">MERN Full-Stack Engineering</option>
              <option value="Python Systems & Backend">Python Systems & Backend</option>
              <option value="AI & Machine Learning">AI & Machine Learning Engineering</option>
              <option value="Data Analytics with Power BI & SQL">Data Analytics with Power BI & SQL</option>
              <option value="Embedded Systems & IoT with ESP32">Embedded Systems & IoT with ESP32</option>
              <option value=".NET Core Enterprise Systems">.NET Core Enterprise Systems</option>
              <option value="Core Java & Spring Boot">Core Java & Spring Boot</option>
              <option value="Flutter Mobile Development">Flutter Mobile Development</option>
              <option value="Enterprise SAP ERP">Enterprise SAP ERP</option>
              <option value="Multi-Course Institutional Suite">Multi-Course Institutional Suite</option>
            </select>
          </div>

          {/* Preferred Duration */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-[#172033]">
              Preferred Cohort Duration *
            </label>
            <select
              {...register("preferredDuration")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5]"
            >
              <option value="45 Days (Internship Pack)">45 Days (Internship Pack — Includes PPO & Project Report)</option>
              <option value="30 Days (Marathon)">30 Days (Marathon — Includes University Project Report & LOR)</option>
              <option value="20 Days (Skill Sprint)">20 Days (Skill Sprint)</option>
              <option value="10 Days (Skill Sprint)">10 Days (Skill Sprint)</option>
            </select>
          </div>
        </div>

        {/* Preferred Window */}
        <div className="space-y-1.5">
          <label className="block text-xs font-sans font-semibold text-[#172033]">
            Preferred Training Window / Semester Schedule *
          </label>
          <input
            {...register("preferredTrainingWindow")}
            placeholder="e.g. Summer Break (June-July) / Winter Internship / 7th Semester Industrial Training"
            className={cn(
              "w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5]",
              errors.preferredTrainingWindow ? "border-rose-400" : "border-[#E2E8F0]"
            )}
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="block text-xs font-sans font-semibold text-[#172033]">
            Specific Requirements / Notes (Optional)
          </label>
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Specify any university-specific syllabus constraints, daily timing preference, or training coordinator requirements..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-sans text-[#172033] focus:outline-none focus:border-[#3157D5] resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-[#3157D5] text-white font-sans text-xs font-semibold hover:bg-[#193B8F] transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            {isSubmitting ? (
              <span>DISPATCHING INSTITUTIONAL REQUEST...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Institutional Inquiry (Dispatch to Academic Desk)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
