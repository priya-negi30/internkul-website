"use client";

import React, { useState } from "react";
import { Check, Copy, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowStep {
  step: string;
  stage: string;
  title: string;
  description: string;
  techTag: string;
  codeSnippet: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    stage: "LIVE SESSION",
    title: "Live Instructor-Led Sessions",
    description: "Instructors conduct interactive live sessions. Core engineering and architecture concepts are explained clearly with practical, industry-grade examples and screen-shared demonstrations.",
    techTag: "LIVE • INTERACTIVE SESSION",
    codeSnippet: `// Step 1: Live instructor session
import { LiveSession } from "@internkul/core";

const session = new LiveSession({
  topic: "System Architecture & API Design",
  instructor: "Senior Software Engineer",
  mode: "Live Interactive Screen-Sharing"
});
await session.startWithPracticalExamples();`,
  },
  {
    step: "02",
    stage: "PRACTICE",
    title: "Side-by-Side Hands-On Practice",
    description: "Students follow the instructor and practice the code and activities simultaneously. Learning happens by doing, building, and running real code—not by passively watching recorded lectures.",
    techTag: "PRACTICE • SIMULTANEOUS CODE",
    codeSnippet: `// Step 2: Side-by-side practical coding
export const verifyAuth = async (req, res, next) => {
  const token = req.cookies["session_token"];
  const decoded = await jwtVerify(token, process.env.JWT_SECRET);
  req.user = decoded;
  return next();
};`,
  },
  {
    step: "03",
    stage: "RESOLVE",
    title: "Instant & Dedicated Doubt Resolution",
    description: "Students ask questions and resolve doubts directly during the live session. Dedicated doubt-clearing sessions and 1-on-1 mentor guidance ensure zero roadblocks.",
    techTag: "DOUBT DESK • REAL-TIME Q&A",
    codeSnippet: `✓ Instructor live audio & chat Q&A active
✓ Screen-sharing stack trace debugged with mentor
✓ 1-on-1 doubt resolution: Concurrency lock resolved
✓ Dedicated evening doubt clearing: Open & active`,
  },
  {
    step: "04",
    stage: "APPLY",
    title: "Continuous Practical Application",
    description: "Students continuously apply what they learn through real-world programming tasks, guided minor projects, and production-ready capstone engineering modules.",
    techTag: "PROJECTS • GITHUB PIPELINE",
    codeSnippet: `✓ Feature implemented: JWT Auth & RBAC Middleware
✓ Automated test suite: 22 unit tests passing
✓ Git commit: feat(auth): add refresh token rotation
✓ Project milestone: Sprint 3 validated`,
  },
  {
    step: "05",
    stage: "GOAL",
    title: "Goal-Oriented Skill Outcomes",
    description: "Each session directly contributes toward completing the project, achieving recognized skill outcomes, earning authenticated certificates from Aon Digicon LLP, and unlocking corporate letters of recommendation and 3-month PPO opportunities.",
    techTag: "OUTCOMES • VERIFIED CREDENTIAL",
    codeSnippet: `[GOAL ACHIEVED: COURSE COMPLETED]
Candidate: Aayush Sharma (B.Tech CSE)
Course: MERN Full-Stack Engineering (45 Days)
Certification: Aon Digicon LLP
Verified Profile Badge: Active on Resume
Executive Recommendation (LOR): Issued (Top 40%)
PPO Qualification Scorecard: 95/100 (Eligible)`,
  },
];

export function LiveTerminal() {
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = WORKFLOW_STEPS[activeStep];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-card overflow-hidden">
      {/* Top Progression Header: Learn live -> Practice -> Resolve doubts -> Apply -> Reach the goal */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#172033]">
              The internkul Learning Model:
            </span>
            <span className="text-xs text-[#3157D5] font-medium hidden sm:inline">
              Learn live → Practice side-by-side → Resolve doubts → Apply → Reach the goal
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {WORKFLOW_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0",
                  activeStep === idx
                    ? "bg-[#3157D5] text-white shadow-sm"
                    : "bg-white text-[#64748B] border border-[#E2E8F0] hover:text-[#172033]"
                )}
              >
                <span className="font-mono text-[10px]">{s.step}</span>
                <span>{s.stage}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left explanation, Right code preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left Column: Pedagogical Details */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-mono text-xs font-semibold">
                STAGE {current.step} OF 05
              </span>
              <span className="text-xs font-mono text-[#64748B]">
                [{current.techTag}]
              </span>
            </div>

            <h3 className="font-editorial text-2xl font-bold text-[#172033] leading-snug">
              {current.title}
            </h3>

            <p className="text-sm text-[#64748B] leading-relaxed font-sans">
              {current.description}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#0F9F6E] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#0F9F6E]" />
              <span>Production Standard Practice</span>
            </div>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length)}
              className="font-medium text-[#3157D5] hover:text-[#193B8F] flex items-center gap-1"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Clean Code / Workflow Window */}
        <div className="lg:col-span-7 bg-[#0F172A] p-6 sm:p-8 flex flex-col justify-between text-slate-100">
          <div>
            {/* Editor header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/60 text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-300 font-medium">
                  internkul-lab/stage-{current.step}.ts
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Code Body */}
            <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 overflow-x-auto whitespace-pre-wrap">
              <code>{current.codeSnippet}</code>
            </pre>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>LIVE INSTRUCTOR CODE DEFENSE</span>
            <span className="text-emerald-400">● REAL ENGINEERING SESSIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
