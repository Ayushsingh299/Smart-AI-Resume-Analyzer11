export interface Course {
  id: string;
  title: string;
  platform: string;
  url: string;
  thumbnail?: string;
  embedId?: string; // YouTube video embed ID if applicable
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  price: string;
  tags: string[];
}

export interface RoadmapStep {
  title: string;
  desc: string;
  skills: string[];
}

export interface Roadmap {
  role: string;
  description: string;
  steps: RoadmapStep[];
}

export const ROADMAPS: Roadmap[] = [
  {
    role: "Frontend Developer",
    description: "Master modern user interfaces, client-side application logic, and web performance optimization.",
    steps: [
      {
        title: "Step 1: Core Web Standards",
        desc: "Learn HTML5 semantics, responsive web design with CSS3 layouts (Flexbox/Grid), and JavaScript essentials.",
        skills: ["HTML5", "CSS3", "JavaScript ES6+", "DOM Manipulation", "Responsive Design"]
      },
      {
        title: "Step 2: Component Frameworks",
        desc: "Adopt React or Next.js to build modular SPA and Server-side rendered interfaces.",
        skills: ["React.js", "Next.js", "TypeScript", "JSX/TSX", "State Management (Redux/Zustand)"]
      },
      {
        title: "Step 3: Styling & Build Tools",
        desc: "Learn styling solutions and modern frontend build tools for optimized performance.",
        skills: ["TailwindCSS", "CSS Modules", "Vite", "ESLint", "Webpack"]
      },
      {
        title: "Step 4: API Integration & Testing",
        desc: "Fetch external data secure and verify UI components with unit/integration testing frameworks.",
        skills: ["RESTful APIs", "GraphQL", "Axios", "Jest", "React Testing Library"]
      }
    ]
  },
  {
    role: "Backend Developer",
    description: "Design highly-scalable APIs, backend business logic, databases, and microservices.",
    steps: [
      {
        title: "Step 1: Core Programming Languages",
        desc: "Learn backend-focused systems and object-oriented languages.",
        skills: ["Python", "Node.js/TypeScript", "Java", "Go", "Object Oriented Design"]
      },
      {
        title: "Step 2: Frameworks & APIs",
        desc: "Build HTTP APIs using micro-frameworks and understand MVC structures.",
        skills: ["FastAPI", "Express.js", "Spring Boot", "RESTful Routing", "GraphQL", "WebSockets"]
      },
      {
        title: "Step 3: Databases & Cache",
        desc: "Model relational and non-relational databases, write complex SQL, and cache operations.",
        skills: ["PostgreSQL", "MongoDB", "Redis", "SQL Queries", "ORM (Prisma/SQLAlchemy)"]
      },
      {
        title: "Step 4: System Architecture",
        desc: "Understand message brokers, server environments, and microservices scaling.",
        skills: ["Docker", "RabbitMQ / Kafka", "Microservices", "System Design", "JWT Auth"]
      }
    ]
  },
  {
    role: "Data Scientist & AI Engineer",
    description: "Analyze large-scale datasets, build machine learning models, and deploy intelligence pipelines.",
    steps: [
      {
        title: "Step 1: Quantitative Foundations",
        desc: "Learn essential math, probability theory, statistics, and linear algebra.",
        skills: ["Linear Algebra", "Calculus", "Probability & Statistics", "Statistical Inference"]
      },
      {
        title: "Step 2: Core Data Tools",
        desc: "Process and manipulate datasets using Python data libraries.",
        skills: ["Python", "Pandas", "NumPy", "SQL Data Extraction", "Jupyter Notebooks"]
      },
      {
        title: "Step 3: Machine Learning Frameworks",
        desc: "Train supervised and unsupervised models for predictive analytics.",
        skills: ["Scikit-Learn", "Regression/Classification", "Clustering", "Feature Engineering"]
      },
      {
        title: "Step 4: Deep Learning & Large Language Models",
        desc: "Implement neural networks, text embeddings, vector search databases, and LLM fine-tuning.",
        skills: ["PyTorch / TensorFlow", "NLP", "Gemini / OpenAI API", "Vector Databases (FAISS/Chroma)", "RAG Architecture"]
      }
    ]
  },
  {
    role: "DevOps & Cloud Engineer",
    description: "Maintain automated deployment systems, cloud environments, CI/CD, and server uptime.",
    steps: [
      {
        title: "Step 1: Linux & Scripting",
        desc: "Learn Unix file systems, shell commands, and automated scripting.",
        skills: ["Linux Shell Bash", "Python Scripting", "SSH Key Management", "Basic Networking"]
      },
      {
        title: "Step 2: Containerization",
        desc: "Package applications in environments that run reliably across different platforms.",
        skills: ["Docker", "Docker Compose", "Multi-stage builds", "Container registries"]
      },
      {
        title: "Step 3: Infrastructure as Code & Orchestration",
        desc: "Manage multi-container applications and define cloud systems as configurations.",
        skills: ["Kubernetes (K8s)", "Terraform", "Ansible", "Helm Charts"]
      },
      {
        title: "Step 4: CI/CD Pipelines & Monitoring",
        desc: "Build automatic code delivery systems and check production metrics.",
        skills: ["GitHub Actions", "Jenkins", "Prometheus & Grafana", "ELK Stack Logging"]
      }
    ]
  }
];

export const FREE_COURSES: Course[] = [
  {
    id: "f1",
    title: "Next.js 14 Full Course for Beginners",
    platform: "YouTube (freeCodeCamp)",
    url: "https://www.youtube.com/watch?v=tjSxFAGP9Ss",
    embedId: "tjSxFAGP9Ss",
    duration: "5.5 hours",
    level: "Beginner",
    rating: 4.8,
    price: "Free",
    tags: ["React", "Next.js", "Frontend", "Web Development"]
  },
  {
    id: "f2",
    title: "FastAPI Complete Tutorial with Real Projects",
    platform: "YouTube (freeCodeCamp)",
    url: "https://www.youtube.com/watch?v=tLKKmCOkkZs",
    embedId: "tLKKmCOkkZs",
    duration: "4 hours",
    level: "Intermediate",
    rating: 4.7,
    price: "Free",
    tags: ["FastAPI", "Python", "Backend", "APIs"]
  },
  {
    id: "f3",
    title: "SQL & Databases for Beginners Tutorial",
    platform: "YouTube (Programming with Mosh)",
    url: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
    embedId: "7S_tz1z_5bA",
    duration: "3 hours",
    level: "Beginner",
    rating: 4.9,
    price: "Free",
    tags: ["SQL", "Databases", "PostgreSQL", "MySQL"]
  },
  {
    id: "f4",
    title: "Generative AI and LLMs for Beginners",
    platform: "YouTube (Google Cloud Tech)",
    url: "https://www.youtube.com/watch?v=G2fqAlgmoPo",
    embedId: "G2fqAlgmoPo",
    duration: "1.5 hours",
    level: "Beginner",
    rating: 4.6,
    price: "Free",
    tags: ["Generative AI", "LLM", "Python", "Machine Learning"]
  },
  {
    id: "f5",
    title: "Docker & Containerization - Complete Guide",
    platform: "YouTube (TechWorld with Nana)",
    url: "https://www.youtube.com/watch?v=3c-iKn5qMo0",
    embedId: "3c-iKn5qMo0",
    duration: "2.5 hours",
    level: "Intermediate",
    rating: 4.8,
    price: "Free",
    tags: ["Docker", "DevOps", "Containers", "Cloud"]
  },
  {
    id: "f6",
    title: "Data Structures and Algorithms in Python",
    platform: "YouTube (freeCodeCamp)",
    url: "https://www.youtube.com/watch?v=pkYVOmU3QbA",
    embedId: "pkYVOmU3QbA",
    duration: "6 hours",
    level: "Intermediate",
    rating: 4.9,
    price: "Free",
    tags: ["DSA", "Python", "Computer Science", "Algorithms"]
  }
];

export const PREMIUM_COURSES: Course[] = [
  {
    id: "p1",
    title: "Meta Front-End Developer Professional Certificate",
    platform: "Coursera",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    duration: "7 months (6 hrs/wk)",
    level: "Beginner",
    rating: 4.8,
    price: "Subscription / Financial Aid Available",
    tags: ["React", "UI/UX", "JavaScript", "Meta Certification"]
  },
  {
    id: "p2",
    title: "Google Data Analytics Professional Certificate",
    platform: "Coursera",
    url: "https://www.coursera.org/professional-certificates/google-data-analytics",
    duration: "6 months (10 hrs/wk)",
    level: "Beginner",
    rating: 4.8,
    price: "Subscription / Financial Aid Available",
    tags: ["Data Analytics", "SQL", "Tableau", "R Programming", "Google Certification"]
  },
  {
    id: "p3",
    title: "Deep Learning Specialization by Andrew Ng",
    platform: "Coursera",
    url: "https://www.coursera.org/specializations/deep-learning",
    duration: "5 months (8 hrs/wk)",
    level: "Advanced",
    rating: 4.9,
    price: "Subscription / Financial Aid Available",
    tags: ["Deep Learning", "Neural Networks", "NLP", "Computer Vision"]
  },
  {
    id: "p4",
    title: "AWS Certified Solutions Architect Associate",
    platform: "Udemy (Stephane Maarek)",
    url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    duration: "27 hours",
    level: "Intermediate",
    rating: 4.7,
    price: "Paid (~₹499 - ₹3,499)",
    tags: ["AWS", "Cloud Computing", "Infrastructure", "DevOps"]
  }
];

export const PRACTICE_RESOURCES = [
  {
    name: "LeetCode",
    category: "Coding & Algorithms",
    description: "The gold standard for technical interview preparation, containing thousands of algorithm questions.",
    url: "https://leetcode.com/",
    cta: "Practice Algorithms"
  },
  {
    name: "HackerRank",
    category: "Structured Skills Practise",
    description: "Provides structured badges for SQL, Functional Programming, Python, Core Java, and Problem Solving.",
    url: "https://www.hackerrank.com/",
    cta: "Earn Badges"
  },
  {
    name: "System Design Primer",
    category: "System Design",
    description: "An open-source GitHub repository detailing how to build high-scale system architectures.",
    url: "https://github.com/donnemartin/system-design-primer",
    cta: "Read Primer"
  },
  {
    name: "Kaggle",
    category: "Data Science & ML",
    description: "Participate in data science competitions, download datasets, and write code in collaborative notebook environments.",
    url: "https://www.kaggle.com/",
    cta: "Join Kaggle Competitions"
  }
];
