"use client";

import { submitContactInquiry } from "@/lib/api/forms";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  MessageSquare,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { cn } from "@/lib/utils";

// Form validation schema strictly conforming to the 5 requested fields
const contactFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name (minimum 2 characters)"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^[0-9+ -]{10,15}$/, "Please enter a valid mobile number"),
  email: z.string().email("Please enter a valid email address"),
  interestedCourse: z.string().min(1, "Please select an interested course"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

type EnquiryCategory = "course" | "internship" | "enrollment";

interface EnquiryOption {
  id: EnquiryCategory;
  title: string;
  description: string;
  icon: React.ElementType;
  defaultPrompt: string;
  defaultCourseSlug?: string;
}

const ENQUIRY_OPTIONS: EnquiryOption[] = [
  {
    id: "course",
    title: "Course Enquiry",
    description: "Want to know which course is right for you?",
    icon: BookOpen,
    defaultPrompt: "I'd like guidance on which course curriculum best matches my semester background and career goals.",
  },
  {
    id: "internship",
    title: "Training & Internship",
    description: "Questions about training, internship, projects, or eligibility?",
    icon: GraduationCap,
    defaultPrompt: "I have questions about the training & internship program duration (10D/15D/30D/45D), college report dossier, and academic credit compliance.",
  },
  {
    id: "enrollment",
    title: "Enrollment Support",
    description: "Need help with registration or choosing a program?",
    icon: UserCheck,
    defaultPrompt: "I need assistance with cohort batch registration, shift timings, or enrollment onboarding.",
  },
];

const FAQS = [
  {
    question: "Which course is right for me?",
    answer:
      "We offer specialized tracks in MERN Full-Stack, Python Systems, AI & Machine Learning, Data Analytics with Power BI & SQL, Java Spring Boot, and Embedded Systems. Whether you are from BCA, MCA, B.Tech, BE, B.Com, BBA, B.Sc., or another academic discipline, our curriculum starts from foundational practices and builds up to production architectures. Feel free to submit this contact form or select 'Course Enquiry' above for personalized track guidance.",
  },
  {
    question: "How do the live sessions work?",
    answer:
      "Every internkul session is 100% live and interactive with screen-by-screen code defense, real-time mentor guidance, and daily git push checkpoints. We do not provide pre-recorded videos. To fit your college timetable, we operate 4 daily shifts: 07:30 AM (Early Bird), 02:00 PM (Afternoon Flexi), 06:00 PM (Evening Prime), and 08:30 PM (Late Night).",
  },
  {
    question: "Are training and internship programs available?",
    answer:
      "Yes. We offer AICTE-aligned vocational training and internship options in 10-day, 15-day, 30-day, and 45-day durations. Deliverables include official corporate certificates from Aon Digicon LLP, university project reports, verified daily evaluation logbooks, and corporate Letters of Recommendation (LOR) for top-performing students.",
  },
  {
    question: "How can I register?",
    answer:
      "You can browse all programs on our Courses page and click 'Register' on any track to choose your preferred batch timing. Alternatively, submit the contact form right here with your contact details, and our student onboarding team will assist you with enrollment within a few hours.",
  },
];

export function ContactClient() {
  const { publishedCourses } = useCourses();
  const availableCourses = publishedCourses;
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryCategory | null>("course");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      interestedCourse: "",
      message: ENQUIRY_OPTIONS[0].defaultPrompt,
    },
  });

  const handleSelectEnquiry = (option: EnquiryOption) => {
    setSelectedEnquiry(option.id);
    // Smoothly update the message placeholder/prompt if current message is empty or matches an existing default
    const currentMessage = watch("message");
    const isDefaultOrEmpty =
      !currentMessage ||
      ENQUIRY_OPTIONS.some((opt) => opt.defaultPrompt === currentMessage);

    if (isDefaultOrEmpty) {
      setValue("message", option.defaultPrompt);
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("support@internkul.dev");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError("");
    try {
      await submitContactInquiry({
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        interestedCourse: data.interestedCourse,
        message: data.message,
        enquiryCategory: selectedEnquiry,
      });
      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "We could not send your message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO — STUDENT-CENTRIC */}
      <section className="relative overflow-hidden pt-10 pb-10 sm:pt-14 sm:pb-14 border-b border-[#E2E8F0] bg-gradient-to-b from-white via-[#F8FAFC] to-[#F8FAFC]">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-[#EEF4FF]/70 blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#E0E7FF]/40 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            {/* Left Column: Heading, Supporting Text & Micro Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 text-center lg:text-left space-y-4"
            >
              {/* Student-Friendly Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] text-xs font-semibold font-sans shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#3157D5]" />
                <span>Student Support & Academic Desk</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F9F6E]" />
                <span className="text-[#0F9F6E] font-medium hidden sm:inline">Active Online</span>
              </div>

              {/* Main Hero Heading */}
              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-bold text-[#172033] tracking-tight leading-tight">
                Let&apos;s Talk About Your Learning Journey
              </h1>

              {/* Supporting Text */}
              <p className="font-sans text-sm sm:text-base text-[#475569] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Have questions about our courses, training, internships, projects, or enrollment? We&apos;re here to help.
              </p>

              {/* Micro Stats / Highlights */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#64748B] font-sans">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#3157D5]" />
                  <span>Response within 4 business hours</span>
                </div>
                <span className="hidden sm:inline text-[#CBD5E1]">•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F9F6E]" />
                  <span>Direct Mentor & Advisor Guidance</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Avatar Cutout Sticker with Gentle Floating Motion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-5 flex items-center justify-center lg:justify-end mt-2 lg:mt-0"
            >
              <div className="relative flex items-center justify-center">
                {/* Subtle soft backdrop glow for natural EdTech integration */}
                <div className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#EEF4FF] via-[#E0E7FF]/70 to-[#F0FDF4]/50 blur-2xl -z-10" />

                {/* Floating Avatar Container */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="relative w-[220px] sm:w-[260px] md:w-[290px] lg:w-[320px] xl:w-[340px] aspect-[1349/1536] max-w-full select-none drop-shadow-[0_16px_36px_rgba(25,59,143,0.12)]"
                >
                  <Image
                    src="/images/AvatarContact.png"
                    alt="internkul Student Support Specialist"
                    fill
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 290px, 340px"
                    className="object-contain pointer-events-none"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
        {/* 4. QUICK ENQUIRY — INTERACTIVE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#3157D5] font-bold font-sans">
                Quick Selection
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#172033]">
                What can we help you with?
              </h2>
            </div>
            <span className="text-xs text-[#64748B] font-sans hidden sm:block">
              Click an option below to tailor your inquiry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ENQUIRY_OPTIONS.map((option) => {
              const isSelected = selectedEnquiry === option.id;
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectEnquiry(option)}
                  className={cn(
                    "text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between group",
                    isSelected
                      ? "bg-white border-[#3157D5] ring-2 ring-[#3157D5]/15 shadow-sm"
                      : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#FBFDFF] shadow-xs"
                  )}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        isSelected
                          ? "bg-[#3157D5] text-white"
                          : "bg-[#EEF4FF] text-[#3157D5] group-hover:bg-[#E0E7FF]"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono text-[#3157D5] bg-[#EEF4FF] px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn(
                        "font-sans text-sm font-semibold mb-1 transition-colors",
                        isSelected ? "text-[#3157D5]" : "text-[#172033]"
                      )}
                    >
                      {option.title}
                    </h3>
                    <p className="font-sans text-xs text-[#64748B] leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2 & 3. MAIN CONTACT AREA — TWO-COLUMN COMPOSITION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT — "We're Here to Help" (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
                REACH OUT DIRECTLY
              </span>
              <h2 className="font-editorial text-3xl font-bold text-[#172033]">
                We&apos;re Here to Help
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Connect with our student counselors, technical mentors, and academic coordination desk through any of our channels below.
              </p>
            </div>

            {/* Compact Contact Cards */}
            <div className="space-y-3.5">
              {/* Card 1: Email */}
              <div className="p-4 sm:p-4.5 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs hover:border-[#3157D5]/40 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-bold text-[#172033] uppercase tracking-wider">
                        Email
                      </span>
                      <button
                        onClick={handleCopyEmail}
                        className="text-[11px] font-sans text-[#3157D5] hover:underline flex items-center gap-1 cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3 h-3 text-[#0F9F6E]" />
                            <span className="text-[#0F9F6E]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748B] font-sans">
                      For course and enrollment queries
                    </p>
                    <a
                      href="mailto:support@internkul.dev"
                      className="inline-block text-xs sm:text-sm font-semibold font-mono text-[#3157D5] hover:underline pt-0.5"
                    >
                      support@internkul.dev
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Phone / WhatsApp */}
              <div className="p-4 sm:p-4.5 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs hover:border-[#3157D5]/40 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="font-sans text-xs font-bold text-[#172033] uppercase tracking-wider block">
                      Phone / WhatsApp
                    </span>
                    <p className="text-xs text-[#64748B] font-sans">
                      For quick assistance
                    </p>
                    <div className="pt-0.5">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs font-semibold text-[#64748B]">
                        [Add official phone / WhatsApp]
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Training & Internship Support */}
              <div className="p-4 sm:p-4.5 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs hover:border-[#3157D5]/40 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="font-sans text-xs font-bold text-[#172033] uppercase tracking-wider block">
                      Training & Internship Support
                    </span>
                    <p className="text-xs text-[#64748B] font-sans">
                      Help with programs, projects, and internship-related queries
                    </p>
                    <div className="pt-1 flex flex-wrap items-center gap-3">
                      <a
                        href="mailto:support@internkul.dev"
                        className="text-xs font-semibold font-mono text-[#3157D5] hover:underline"
                      >
                        support@internkul.dev
                      </a>
                      <span className="text-[#CBD5E1] text-xs">•</span>
                      <a
                        href="https://t.me/internkul_cohorts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-[#3157D5] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Telegram Cohort</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Location */}
              <div className="p-4 sm:p-4.5 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs hover:border-[#3157D5]/40 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="font-sans text-xs font-bold text-[#172033] uppercase tracking-wider block">
                      Location
                    </span>
                    <div className="font-sans text-xs font-semibold text-[#172033]">
                      AON Digicon LLP
                    </div>
                    <p className="text-xs text-[#64748B] font-sans">
                      Chhattisgarh, India • Operational AICTE Technical Coordination Hub
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Assurance Badge */}
            <div className="p-3.5 rounded-xl bg-[#EEF4FF]/70 border border-[#D8E5FF] text-xs font-sans text-[#475569] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#0F9F6E] shrink-0" />
              <span>
                All inquiries reviewed by technical academic mentors within 4 hours.
              </span>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM (PRIMARY FOCUS) (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 lg:p-9 shadow-sm relative overflow-hidden">
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3157D5] via-[#4F46E5] to-[#0F9F6E]" />

              <AnimatePresence mode="wait">
                {isSubmitted && submittedData ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="py-6 sm:py-8 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-mono font-bold text-[#0F9F6E] tracking-wider uppercase">
                        MESSAGE DISPATCHED SUCCESSFULLY
                      </div>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172033]">
                        Thanks for reaching out! Our team will get back to you soon.
                      </h3>
                      <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed font-sans">
                        We have logged your query regarding{" "}
                        <strong className="text-[#172033]">{submittedData.interestedCourse}</strong>. An advisor will reach out to{" "}
                        <strong className="text-[#3157D5]">{submittedData.email}</strong> or WhatsApp (
                        <span className="font-mono">{submittedData.mobileNumber}</span>) shortly.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-md mx-auto text-left text-xs font-sans text-[#475569] space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Name:</span>
                        <span className="font-semibold text-[#172033]">{submittedData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Course Track:</span>
                        <span className="font-semibold text-[#172033]">{submittedData.interestedCourse}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Mobile Number:</span>
                        <span className="font-mono font-semibold text-[#172033]">{submittedData.mobileNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Email Address:</span>
                        <span className="font-mono font-semibold text-[#172033]">{submittedData.email}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          reset({
                            fullName: "",
                            mobileNumber: "",
                            email: "",
                            interestedCourse: "",
                            message: "",
                          });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs font-semibold text-[#172033] hover:bg-[#F8FAFC] transition-colors shadow-xs"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Form Card Header */}
                    <div className="space-y-1 pb-4 border-b border-[#F1F5F9]">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3157D5] font-sans">
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Us a Message</span>
                      </div>
                      <h3 className="font-editorial text-2xl font-bold text-[#172033]">
                        Student Inquiry & Consultation
                      </h3>
                      <p className="text-xs text-[#64748B] font-sans">
                        Takes about 30–60 seconds. Our cohort mentors respond directly.
                      </p>
                    </div>

                    {/* The 5 Fields Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
                      {submitError && (
                        <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
                          {submitError}
                        </div>
                      )}
                      {/* Field 1: Full Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-sans font-semibold text-[#172033]"
                        >
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          {...register("fullName")}
                          placeholder="e.g. Rahul Sharma"
                          aria-invalid={!!errors.fullName}
                          className={cn(
                            "w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border text-xs sm:text-sm font-sans text-[#172033] placeholder:text-[#94A3B8] transition-all",
                            "focus:outline-none focus:border-[#3157D5] focus:ring-2 focus:ring-[#3157D5]/15",
                            errors.fullName ? "border-rose-400 bg-rose-50/20" : "border-[#E2E8F0]"
                          )}
                        />
                        {errors.fullName && (
                          <span className="text-xs text-rose-500 font-sans block">
                            {errors.fullName.message}
                          </span>
                        )}
                      </div>

                      {/* Two-column on tablet/desktop for Mobile & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Field 2: Mobile Number */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="mobileNumber"
                            className="block text-xs font-sans font-semibold text-[#172033]"
                          >
                            Mobile Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            id="mobileNumber"
                            type="tel"
                            {...register("mobileNumber")}
                            placeholder="+91 98765 43210"
                            aria-invalid={!!errors.mobileNumber}
                            className={cn(
                              "w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border text-xs sm:text-sm font-sans text-[#172033] placeholder:text-[#94A3B8] transition-all",
                              "focus:outline-none focus:border-[#3157D5] focus:ring-2 focus:ring-[#3157D5]/15",
                              errors.mobileNumber ? "border-rose-400 bg-rose-50/20" : "border-[#E2E8F0]"
                            )}
                          />
                          {errors.mobileNumber && (
                            <span className="text-xs text-rose-500 font-sans block">
                              {errors.mobileNumber.message}
                            </span>
                          )}
                        </div>

                        {/* Field 3: Email Address */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="email"
                            className="block text-xs font-sans font-semibold text-[#172033]"
                          >
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="rahul@example.com"
                            aria-invalid={!!errors.email}
                            className={cn(
                              "w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border text-xs sm:text-sm font-sans text-[#172033] placeholder:text-[#94A3B8] transition-all",
                              "focus:outline-none focus:border-[#3157D5] focus:ring-2 focus:ring-[#3157D5]/15",
                              errors.email ? "border-rose-400 bg-rose-50/20" : "border-[#E2E8F0]"
                            )}
                          />
                          {errors.email && (
                            <span className="text-xs text-rose-500 font-sans block">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Field 4: Interested Course (Required Dropdown populated with existing course data) */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="interestedCourse"
                          className="block text-xs font-sans font-semibold text-[#172033]"
                        >
                          Interested Course <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="interestedCourse"
                            {...register("interestedCourse")}
                            aria-invalid={!!errors.interestedCourse}
                            className={cn(
                              "w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border text-xs sm:text-sm font-sans text-[#172033] appearance-none transition-all pr-10",
                              "focus:outline-none focus:border-[#3157D5] focus:ring-2 focus:ring-[#3157D5]/15",
                              errors.interestedCourse ? "border-rose-400 bg-rose-50/20" : "border-[#E2E8F0]"
                            )}
                          >
                            <option value="">Select a course / technical track...</option>
                            {availableCourses.map((track) => (
                              <option key={track.slug} value={track.name}>
                                {track.name} ({track.domainLabel})
                              </option>
                            ))}
                            <option value="General Technical Guidance / Multiple Courses">
                              General Technical Guidance / Multiple Courses
                            </option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#64748B] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.interestedCourse && (
                          <span className="text-xs text-rose-500 font-sans block">
                            {errors.interestedCourse.message}
                          </span>
                        )}
                      </div>

                      {/* Field 5: How can we help? (Short message) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="message"
                            className="block text-xs font-sans font-semibold text-[#172033]"
                          >
                            How can we help?
                          </label>
                          <span className="text-[11px] font-sans text-[#94A3B8]">
                            Short message
                          </span>
                        </div>
                        <textarea
                          id="message"
                          {...register("message")}
                          rows={3}
                          placeholder="Tell us what you need help with (batch timing preference, college project guidelines, syllabus questions)..."
                          className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-[#E2E8F0] text-xs sm:text-sm font-sans text-[#172033] placeholder:text-[#94A3B8] transition-all resize-none focus:outline-none focus:border-[#3157D5] focus:ring-2 focus:ring-[#3157D5]/15"
                        />
                      </div>

                      {/* Submit CTA Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 px-6 rounded-xl bg-[#3157D5] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#193B8F] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isSubmitting ? (
                            <span>Sending Your Inquiry...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Send Message</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-center text-[#94A3B8] font-sans">
                        🔒 We respect your privacy. No spam. You will only be contacted regarding your educational enquiry.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 5. FAQ / HELP SECTION */}
        <section className="space-y-6 pt-4 border-t border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
                QUICK ANSWERS
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172033]">
                Still have questions?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#64748B]">
                Here are answers to the most common queries from students across engineering colleges.
              </p>
            </div>

            <Link
              href="/internship-matrix#faqs"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3157D5] hover:text-[#193B8F] transition-colors shrink-0 font-sans group"
            >
              <span>View FAQs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-2xl border transition-all duration-200 overflow-hidden bg-white",
                    isOpen
                      ? "border-[#3157D5]/40 shadow-xs ring-1 ring-[#3157D5]/10"
                      : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#172033] leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 mt-0.5",
                        isOpen
                          ? "bg-[#EEF4FF] text-[#3157D5] rotate-180"
                          : "bg-[#F8FAFC] text-[#64748B]"
                      )}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-xs text-[#64748B] font-sans leading-relaxed border-t border-[#F8FAFC]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section className="rounded-2xl border border-[#D8E5FF] bg-gradient-to-br from-[#EEF4FF] via-white to-[#F0F5FF] p-6 sm:p-10 text-center space-y-4 shadow-xs relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-2 relative z-10">
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#172033]">
              Ready to Start Learning?
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xl mx-auto">
              Explore our comprehensive catalog of industry-ready courses, hands-on production codebases, and verified university credentials.
            </p>
          </div>

          <div className="pt-2 relative z-10">
            <Link
              href="/tracks"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3157D5] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#193B8F] active:scale-[0.99] transition-all shadow-xs hover:shadow"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
