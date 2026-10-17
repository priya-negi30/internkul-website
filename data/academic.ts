export interface ReportChapter {
  id: string;
  chapterNumber: string;
  title: string;
  summary: string;
  content: string[];
  sampleExcerpt: string;
  subsections: string[];
}

export const ACADEMIC_REPORT_CHAPTERS: ReportChapter[] = [
  {
    id: "01-student-info",
    chapterNumber: "01",
    title: "Student Information & Registration",
    summary: "Formal candidate identity, university enrollment number, department, semester, and academic mentor mapping.",
    content: [
      "Candidate Name, Roll Number, University Enrollment ID (Respective Affiliated College / University)",
      "Degree Program: BCA / MCA / B.Tech / BE / B.Com / BBA / B.Sc. / other academic disciplines with specialization stream",
      "Department Mentor and HOD Sign-off Verification Block",
      "Declaration of Original Technical Contribution & Non-Plagiarism Affidavit"
    ],
    sampleExcerpt: "I hereby declare that this industrial training project report entitled 'HealthPulse — Distributed Clinical Tele-Consultation Engine' is an authentic record of practical work carried out under the technical mentorship of internkul engineering cohorts.",
    subsections: ["Candidate Demographics", "University Affiliation", "Institutional Bonafide Declaration", "Academic Mentor Acknowledgement"],
  },
  {
    id: "02-org-info",
    chapterNumber: "02",
    title: "Organization Information & Training Profile",
    summary: "Company technical background, engineering session protocols, and national live cohort infrastructure.",
    content: [
      "Company Profile: internkul (Built in Chhattisgarh, serving students across India)",
      "Technical Training Infrastructure: Git/GitHub enterprise workflows, Jira sprint boards, live coding sandboxes",
      "Trainer Credentials & Industry Engineering Supervisors",
      "Batch Timing, Attendance Record & Live Interactive Sessions (45 Live Sessions with Side-by-Side Practice)"
    ],
    sampleExcerpt: "internkul provides high-intensity, practical engineering training designed specifically for undergraduate students. The organizational model emphasizes direct production deployments, side-by-side debugging, and verifiable proof of work.",
    subsections: ["About internkul", "Engineering Delivery Infrastructure", "Faculty & Industry Mentor Matrix", "Session Safety & Git Etiquette Protocols"],
  },
  {
    id: "03-objectives",
    chapterNumber: "03",
    title: "Training Objectives & Scope of Work",
    summary: "Clear technical learning goals, industry problem statement, and engineering competency targets.",
    content: [
      "Transition from theoretical classroom concepts to industry engineering standards",
      "Mastery of Git Flow: branch protections, semantic commit discipline, and peer code reviews",
      "End-to-end full lifecycle engineering: from schema modeling to production deployment",
      "Preparation for corporate software engineering standards and technical viva voce"
    ],
    sampleExcerpt: "The primary objective of the 45-day comprehensive immersion was to design, develop, test, and deploy a resilient multi-tenant clinical consultation engine adhering to modern security standards and RESTful API best practices.",
    subsections: ["Core Competency Objectives", "Technical Scope Boundaries", "Expected Engineering Outcomes", "Evaluation Milestones"],
  },
  {
    id: "04-tech-stack",
    chapterNumber: "04",
    title: "Technology Stack & Tooling Rationale",
    summary: "In-depth rationale for language, framework, database, and infrastructure choices.",
    content: [
      "Primary Languages: TypeScript, JavaScript (Node.js runtime v20+), HTML5/CSS3",
      "Frontend Architecture: React 19, Tailwind CSS, TanStack Query, Radix UI",
      "Backend Framework: Express.js REST API with modular Controller-Service-Repository pattern",
      "Database & Caching: MongoDB Atlas (Replica Set) + Redis Pub/Sub for low-latency websockets",
      "DevOps & Quality: Docker, GitHub Actions, Jest, Supertest, Postman Collection"
    ],
    sampleExcerpt: "Node.js was selected for the API gateway to leverage its non-blocking asynchronous event loop, enabling high-concurrency websocket streams during active teleconsultations without thread overhead.",
    subsections: ["Frontend Framework Evaluation", "Backend Runtime & Middleware Architecture", "Persistence Layer & NoSQL Schema Strategy", "DevOps & Containerization Stack"],
  },
  {
    id: "05-daily-work-log",
    chapterNumber: "05",
    title: "Daily Work Log & Practical Session Journal",
    summary: "Comprehensive day-by-day record of practical sessions, commit hashes, bugs encountered, and solutions implemented.",
    content: [
      "Day 01–10: Development environment setup, Git hooks, REST scaffolding, and database connection pooling",
      "Day 11–20: JWT stateless authentication, password hashing, and role-based access control (RBAC)",
      "Day 21–30: React client state hydration, TanStack queries, and end-to-end API integration",
      "Day 31–40: Real-time WebSockets, Redis cache invalidation, Docker multi-stage builds, and load tests",
      "Day 41–45: Production cloud deployment, automated CI/CD pipeline, security audit, and final report compilation"
    ],
    sampleExcerpt: "Day 24 [Commit 8e910bd]: Resolved race condition during simultaneous patient queue check-in using MongoDB optimistic concurrency control and atomic $inc operators.",
    subsections: ["Sprint 1 Journal (Day 1–10)", "Sprint 2 Journal (Day 11–20)", "Sprint 3 Journal (Day 21–35)", "Final Sprint & Hardening Journal (Day 36–45)"],
  },
  {
    id: "06-architecture",
    chapterNumber: "06",
    title: "System Architecture & Design Blueprints",
    summary: "Architectural block diagrams, data flow diagrams (DFD), entity-relationship (ER) schemas, and sequence flows.",
    content: [
      "High-Level Architecture: Client Layer → Reverse Proxy / API Gateway → Microservice Controllers → Database Layer",
      "Data Flow Diagrams: Level 0 (Context Diagram), Level 1 (Functional Decomposition), Level 2 (Auth & Consultation Subsystems)",
      "Database Schema: Mongoose Entity Schemas, Index Specifications, and Foreign Key References",
      "Sequence Diagrams: User Authentication Flow, Appointment Booking Transaction, Real-time WebRTC Signaling"
    ],
    sampleExcerpt: "The architecture decouples the stateless HTTP API service from the stateful WebRTC signaling server, allowing independent horizontal scaling behind an Nginx reverse proxy.",
    subsections: ["Architectural Diagram & Component Breakdown", "Data Flow Diagram (Level 0, 1 & 2)", "Entity-Relationship & Schema Dictionary", "UML Sequence Diagrams"],
  },
  {
    id: "07-implementation",
    chapterNumber: "07",
    title: "Technical Implementation & Code Walkthrough",
    summary: "Deep-dive into core algorithmic modules, key code excerpts, state machines, and middleware logic.",
    content: [
      "Module A: Secure Authentication with Refresh Token Rotation and HTTP-Only Cookies",
      "Module B: Role-Based Authorization Guards (Doctor, Patient, Clinic Admin)",
      "Module C: Real-Time Consultation Queue with Redis Priority Sets",
      "Module D: Encrypted Prescription Generation and Automated S3 Cloud Dispatch"
    ],
    sampleExcerpt: "Implemented custom Express middleware verifying RSA-signed JWT tokens with automatic clock skew tolerance and blacklisted token eviction via Redis.",
    subsections: ["Auth & Token Verification Pipeline", "Service Layer Business Logic", "Client-Side State Management Composition", "Third-Party Cloud API Integrations"],
  },
  {
    id: "08-testing",
    chapterNumber: "08",
    title: "Testing, Quality Gates & Debugging",
    summary: "Unit tests, integration tests, API automated collections, boundary value analysis, and security vulnerability scans.",
    content: [
      "Unit Testing: Jest test suites covering authentication helpers and billing calculations (84% code coverage)",
      "Integration Testing: Supertest automated suite verifying all REST API endpoints with ephemeral test databases",
      "Performance Benchmarks: Artillery load testing under 500 concurrent virtual users (P99 latency < 140ms)",
      "Security Audits: OWASP Top 10 compliance check, SQL/NoSQL injection prevention, XSS sanitization"
    ],
    sampleExcerpt: "All pull requests were required to pass automated GitHub Actions CI workflows including ESLint static analysis, TypeScript compiler checks, and full Supertest test suites before merge approval.",
    subsections: ["Test Strategy & Plan", "Unit Test Matrix & Jest Reports", "API Integration Test Cases", "Security & Vulnerability Assessment"],
  },
  {
    id: "09-deployment",
    chapterNumber: "09",
    title: "Production Deployment & DevOps Pipeline",
    summary: "Cloud provisioning, containerization, environment secrets management, and automated continuous delivery.",
    content: [
      "Multi-stage Dockerfile optimizing production image size from 1.2GB down to 142MB",
      "Cloud hosting on Render / AWS ECS with automatic health checks and SSL certificate auto-renewal",
      "Continuous Deployment via GitHub Actions triggered upon merge into main branch",
      "Public production URL and verified GitHub source repository link"
    ],
    sampleExcerpt: "The production pipeline utilizes Docker multi-stage builds: Stage 1 compiles TypeScript assets, while Stage 2 copies only distribution bundles into a lightweight Alpine Linux runtime image.",
    subsections: ["Containerization Strategy", "CI/CD Pipeline Workflow", "Cloud Infrastructure Configuration", "Live Production Verification & DNS"],
  },
  {
    id: "10-conclusion",
    chapterNumber: "10",
    title: "Conclusion, Future Roadmap & References",
    summary: "Summary of learning outcomes, engineering milestones achieved, future enhancements, and academic bibliography.",
    content: [
      "Summary of technical competencies acquired across 45 cohort days",
      "Self-assessment against industry engineering standards and AICTE-aligned industrial training guidelines",
      "Future Architectural Enhancements: AI-powered diagnostic triage, native mobile app companion",
      "Bibliography and Formal Academic References (IEEE & standard software engineering citations)"
    ],
    sampleExcerpt: "The 45-day comprehensive immersion provided invaluable exposure to corporate software engineering disciplines. Transitioning from theoretical algorithms to shipping production code with CI/CD and unit tests has prepared the student for immediate industry contributions.",
    subsections: ["Project Achievements Summary", "Industrial Learning Outcomes", "Future Roadmap & Extension Capabilities", "Academic References & Standards"],
  },
];
