// Portfolio Knowledge Base for AI Chatbot
// This data is used by Gemini to answer questions about Nimesh Kulkarni

export const portfolioKnowledge = {
    personal: {
        name: "Nimesh Kulkarni",
        title: "DevOps Engineer",
        email: "nimesh.kulkarni2004@gmail.com",
        location: "Nashik, India",
        summary: "Driven DevOps engineer with hands-on experience in CI/CD, containerization, cloud infrastructure, and automation. Skilled in Docker, Jenkins, Git/GitHub, Linux, AWS, and infrastructure-as-code workflows.",
        links: {
            linkedin: "https://www.linkedin.com/in/nimesh-kulkarni-526401266/",
            github: "https://github.com/GitNimay",
            resume: "https://drive.google.com/file/d/1IQliZDS4lBg8EX1JfefYlmytioWiIqMc/view?usp=sharing"
        }
    },

    education: [
        {
            degree: "Bachelor of Engineering",
            institution: "Guru Gobind Singh College of Engineering and Research Center (GCOERC)",
            location: "Nashik",
            year: "2026 (Expected)",
            grade: "7.2 CGPA (Overall Average)"
        },
        {
            degree: "Higher Secondary (12th)",
            institution: "Sukhdev College",
            location: "Nashik",
            year: "2022",
            grade: "73%",
            stream: "Science"
        }
    ],

    experience: [
        {
            title: "Web Technology Intern",
            company: "Gurado India Private Limited",
            location: "Nashik",
            period: "December 2024 - January 2025",
            achievements: [
                "Configured and deployed applications on AWS EC2 using IAM, S3, EBS, Elastic IP, and secure SSH access",
                "Implemented Docker containers and Auto Scaling Groups for scalable application environments"
            ]
        }
    ],

    skills: {
        programming: ["Python", "Go"],
        cloud: ["AWS EC2", "IAM", "S3", "VPC", "EKS"],
        containers: ["Docker", "Kubernetes"],
        cicd: ["Jenkins", "Terraform", "Ansible"],
        security: ["DevSecOps", "Prometheus", "Grafana", "Vulnerability Scanning"]
    },

    certifications: [
        {
            title: "DevOps: Planning to Production",
            issuer: "Geeks for Geeks",
            year: "2025",
            description: "DevOps fundamentals, CI/CD, automation, infrastructure, and deployment workflows"
        },
        {
            title: "Jenkins Pipeline",
            issuer: "KodeKloud",
            year: "2025",
            description: "Building automated CI/CD pipelines and secure deployment workflows"
        },
        {
            title: "Kubernetes for Absolute Beginners",
            issuer: "KodeKloud",
            year: "2025",
            description: "Deploying and managing containerized applications"
        },
        {
            title: "DevOps Short Course",
            issuer: "IT Masters & Charles Sturt University",
            year: "2025",
            description: "Industry-aligned DevOps program with 90.00 grade, CI/CD concepts, automation workflows"
        }
    ],

    projects: [
        {
            title: "Personal Portfolio",
            period: "January 2026 - Present",
            type: "Personal Project",
            description: "Modern developer portfolio showcasing skills, projects, and professional journey with interactive elements",
            highlights: [
                "Designed with a focus on immersive UI/UX using glassmorphism and animations",
                "Integrated smart AI chatbot for specific portfolio-related queries",
                "Optimized for performance and responsiveness across all devices"
            ],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Shadcn UI"],
            link: "https://nimesh-portfolio-iota.vercel.app/"
        },
        {
            title: "SaaS Validator - AI-Powered Startup Blueprint",
            period: "December 2025 - Present",
            type: "Personal Project",
            description: "Interactive platform for validating and architecting SaaS ideas using AI agents",
            highlights: [
                "AI-driven project generation pipeline with Google Gemini and animated UI",
                "Interactive node-based architecture diagrams using React Flow",
                "Real-time diagrams, charts, and drag-and-drop roadmaps"
            ],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Google GenAI", "Supabase", "React Flow"],
            link: "https://saa-s-val-lp.vercel.app/"
        },
        {
            title: "Lumino CRM - Real-time Sales Dashboard",
            period: "November 2025 - December 2025",
            type: "Personal Project",
            description: "Modern CRM with real-time collaboration and glassmorphism UI",
            highlights: [
                "Responsive SPA with React, TypeScript, Tailwind, and dark mode",
                "Real-time sync and notifications via Supabase",
                "Kanban pipelines, charts, and sales tools"
            ],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Real-time"],
            link: "https://lumino-crm-vc.vercel.app/"
        },
        {
            title: "Jenkins CI/CD Pipeline",
            period: "October 2025 - November 2025",
            type: "Personal Project",
            description: "Complete Jenkins-based CI/CD pipeline for Node.js microservice with DevSecOps practices",
            highlights: [
                "Automated build, test, code coverage, and deployment workflows",
                "npm audit, OWASP dependency scanning, Docker security checks",
                "Deployed to AWS EC2/Kubernetes with vulnerability checks and rollback protection"
            ],
            technologies: ["Jenkins", "Docker", "AWS", "Kubernetes", "DevSecOps"],
            link: "https://dev.to/nimesh_kulkarni_2f7a2057e/solar-app-deployment-from-nodejs-to-multi-cloud-cicd-4g9"
        },
        {
            title: "AI Powered Interview Platform",
            period: "October 2024 - November 2025",
            type: "Academic Project (GCOERC)",
            description: "AI-powered interview analysis platform evaluating communication and behavioral cues",
            highlights: [
                "Top-10 position in GenAI Hackathon",
                "Built with Gemini, AssemblyAI, React.js, Cloudinary, Firebase",
                "Real-time candidate assessment and report generation"
            ],
            technologies: ["React.js", "AI/ML", "Firebase", "Cloudinary", "Gemini"],
            link: "https://landing-page-interview-expert.vercel.app/"
        }
    ]
};

export const systemPrompt = `You are Nimesh Kulkarni's AI assistant, but you also function as a general-purpose helpful AI.
Your goal is to answer questions based on the user's intent.

MODE 1: PORTFOLIO & NIMESH (Priority High)
- If the user asks about Nimesh, his projects, skills, experience, or contact info, use the provided NIMESH'S DATA.
- Be friendly and professional.
- Always include live links for projects.

MODE 2: GENERAL KNOWLEDGE & REAL-TIME (Priority High)
- If the user asks general questions (e.g., "What is AI?", "What is an API?", "Latest news"), you MUST answer them.
- DO NOT mention Nimesh or his portfolio for these questions.
- KEEP ANSWERS SHORT, CONCISE, AND SIMPLE (2-3 sentences max for definitions).
- Use real-time data/search if needed.

NIMESH'S DATA:
${JSON.stringify(portfolioKnowledge, null, 2)}

IMPORTANT RULES:
1. Distinguish intent immediately. "What is React?" -> General Mode. "Does Nimesh know React?" -> Portfolio Mode.
2. For meaningful general definitions (e.g. "What is an API"), give a direct answer. Example: "An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other."
3. Do not be chatty for definitions. match the user's brevity.
4. If the user asks "Who made you?", you can say "I'm Nimesh's AI assistant, powered by Gemini."`;
