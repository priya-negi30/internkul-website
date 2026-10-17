export interface TopicItem {
  id: string;
  name: string;
  category: string;
  courseSlugs: string[];
}

export const POPULAR_TOPICS: TopicItem[] = [
  // Full-Stack & Web
  { id: "react", name: "React 19", category: "Frontend", courseSlugs: ["mern-full-stack"] },
  { id: "nextjs", name: "Next.js", category: "Frontend", courseSlugs: ["mern-full-stack"] },
  { id: "nodejs", name: "Node.js", category: "Backend", courseSlugs: ["mern-full-stack"] },
  { id: "express", name: "Express", category: "Backend", courseSlugs: ["mern-full-stack"] },
  { id: "mongodb", name: "MongoDB", category: "Database", courseSlugs: ["mern-full-stack"] },
  { id: "typescript", name: "TypeScript", category: "Languages", courseSlugs: ["mern-full-stack"] },
  { id: "javascript", name: "JavaScript", category: "Languages", courseSlugs: ["mern-full-stack"] },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", courseSlugs: ["mern-full-stack"] },
  { id: "redis", name: "Redis Caching", category: "Database", courseSlugs: ["mern-full-stack", "python-development"] },
  { id: "rest-api", name: "REST APIs", category: "Architecture", courseSlugs: ["mern-full-stack", "python-development", "dotnet-core", "core-java"] },

  // Python & Backend
  { id: "python", name: "Python 3.12", category: "Languages", courseSlugs: ["python-development", "ai-ml"] },
  { id: "fastapi", name: "FastAPI", category: "Backend", courseSlugs: ["python-development", "ai-ml"] },
  { id: "django", name: "Django", category: "Backend", courseSlugs: ["python-development"] },
  { id: "postgresql", name: "PostgreSQL", category: "Database", courseSlugs: ["python-development", "power-bi-sql", "core-java"] },
  { id: "celery", name: "Celery & Async Workers", category: "Backend", courseSlugs: ["python-development"] },
  { id: "sqlalchemy", name: "SQLAlchemy", category: "Database", courseSlugs: ["python-development"] },

  // AI & Machine Learning
  { id: "ai-ml", name: "AI & Machine Learning", category: "AI/ML", courseSlugs: ["ai-ml"] },
  { id: "pytorch", name: "PyTorch", category: "AI/ML", courseSlugs: ["ai-ml"] },
  { id: "scikit-learn", name: "Scikit-Learn", category: "AI/ML", courseSlugs: ["ai-ml"] },
  { id: "computer-vision", name: "Computer Vision", category: "AI/ML", courseSlugs: ["ai-ml"] },
  { id: "nlp", name: "NLP & LLMs", category: "AI/ML", courseSlugs: ["ai-ml"] },
  { id: "transformers", name: "Vision Transformers", category: "AI/ML", courseSlugs: ["ai-ml"] },
  { id: "mlflow", name: "MLflow Deployment", category: "AI/ML", courseSlugs: ["ai-ml"] },

  // Data Analytics & BI
  { id: "data-analytics", name: "Data Analytics", category: "Data", courseSlugs: ["power-bi-sql"] },
  { id: "power-bi", name: "Power BI Desktop", category: "Data", courseSlugs: ["power-bi-sql"] },
  { id: "sql", name: "SQL Query Optimization", category: "Database", courseSlugs: ["power-bi-sql", "mern-full-stack", "python-development", "dotnet-core"] },
  { id: "dax", name: "DAX Measures", category: "Data", courseSlugs: ["power-bi-sql"] },
  { id: "power-query", name: "Power Query (M)", category: "Data", courseSlugs: ["power-bi-sql"] },
  { id: "data-modeling", name: "Data Warehousing", category: "Data", courseSlugs: ["power-bi-sql"] },

  // Embedded Systems & IoT
  { id: "esp32", name: "ESP32 Firmware", category: "Embedded", courseSlugs: ["iot-esp32"] },
  { id: "freertos", name: "FreeRTOS", category: "Embedded", courseSlugs: ["iot-esp32"] },
  { id: "cpp", name: "C++ Systems", category: "Languages", courseSlugs: ["iot-esp32"] },
  { id: "mqtt", name: "MQTT over TLS", category: "Embedded", courseSlugs: ["iot-esp32"] },
  { id: "hardware-telemetry", name: "Industrial Telemetry", category: "Embedded", courseSlugs: ["iot-esp32"] },

  // Enterprise .NET Core & Java
  { id: "dotnet", name: ".NET 8 Core", category: "Enterprise", courseSlugs: ["dotnet-core"] },
  { id: "csharp", name: "C#", category: "Languages", courseSlugs: ["dotnet-core"] },
  { id: "java", name: "Core Java 21", category: "Languages", courseSlugs: ["core-java"] },
  { id: "springboot", name: "Spring Boot", category: "Enterprise", courseSlugs: ["core-java"] },
  { id: "microservices", name: "Microservices", category: "Architecture", courseSlugs: ["dotnet-core", "core-java", "mern-full-stack"] },

  // Mobile & Cloud & Enterprise
  { id: "flutter", name: "Flutter", category: "Mobile", courseSlugs: ["flutter-mobile"] },
  { id: "dart", name: "Dart", category: "Languages", courseSlugs: ["flutter-mobile"] },
  { id: "sap", name: "SAP ABAP & ERP", category: "Enterprise", courseSlugs: ["sap-erp"] },
  { id: "docker", name: "Docker Containers", category: "DevOps", courseSlugs: ["mern-full-stack", "python-development", "core-java"] },
  { id: "git", name: "Git & GitHub CI/CD", category: "DevOps", courseSlugs: ["mern-full-stack", "python-development", "ai-ml"] },
  { id: "cybersecurity", name: "Cybersecurity Basics", category: "Security", courseSlugs: ["mern-full-stack", "python-development"] },
  { id: "cloud", name: "Cloud Architecture", category: "Cloud", courseSlugs: ["dotnet-core", "mern-full-stack", "python-development"] },
];

export const DEFAULT_SUGGESTED_TOPICS = [
  "React 19",
  "Python 3.12",
  "AI & Machine Learning",
  "Data Analytics",
  "Next.js",
  "Node.js",
  "SQL Query Optimization",
  "Power BI Desktop",
  "FastAPI",
  "Docker Containers",
  "ESP32 Firmware",
  "Spring Boot",
  "Flutter",
  "SAP ABAP & ERP",
  "Git & GitHub CI/CD",
];
