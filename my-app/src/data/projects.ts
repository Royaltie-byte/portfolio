export type Project = {
  slug: string;
  eyebrow: string;
  title: string;
  shortDescription: string;
  status: "live" | "research" | "in-progress";
  externalLink?: { label: string; href: string };
  stack: string[];
  caseStudy: {
    problem: string;
    solutionLabel: string;
    solution: string;
    challengesLabel: string;
    challenges: string;
    lessonsLabel: string;
    lessons: string;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "chatease",
    eyebrow: "Product 01",
    title: "ChatEase",
    shortDescription:
      "AI-powered customer support workflows that capture leads, answer questions, and guide prospects toward bookings — built for service businesses.",
    status: "live",
    externalLink: { label: "chatease.co.ke", href: "https://chatease.co.ke" },
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "WhatsApp Business API",
      "Render",
    ],
    caseStudy: {
      problem:
        "Many service businesses lose customers because inquiries arrive outside working hours, responses are inconsistent, and valuable leads disappear inside messaging platforms without structured follow-up.",
      solutionLabel: "Solution",
      solution:
        "ChatEase provides customizable AI-powered customer support workflows that capture leads, answer common questions, qualify customers, and guide prospects toward bookings — while giving business owners greater visibility into customer interactions.",
      challengesLabel: "Challenges",
      challenges:
        "The biggest challenge was building a system flexible enough to support different businesses while maintaining a simple onboarding and customization experience.",
      lessonsLabel: "Lessons Learned",
      lessons:
        "Businesses care about outcomes rather than technology itself. Faster responses, better customer experiences, and more captured opportunities matter far more than the underlying AI.",
    },
  },
  {
    slug: "matra",
    eyebrow: "Product 02",
    title: "Matra",
    shortDescription:
      "An AI-powered postpartum monitoring and complication tracking system — bridging the gap between hospital discharge and home recovery for mothers in Kenya.",
    status: "research",
    stack: ["Research & Validation", "Maternal Health", "Kenya"],
    caseStudy: {
      problem:
        "Many mothers leave healthcare facilities with little guidance during the critical postpartum period, causing danger signs and complications to be identified too late.",
      solutionLabel: "Vision",
      solution:
        "Matra seeks to extend maternal support beyond hospital walls through accessible digital follow-up, educational resources, and structured symptom monitoring tailored to Kenyan realities.",
      challengesLabel: "Current Focus",
      challenges:
        "The project is currently in its research and validation phase, with emphasis on understanding mothers' experiences, healthcare workflows, and community needs before any technical implementation begins.",
      lessonsLabel: "Key Lesson",
      lessons:
        "The most impactful healthcare solutions are built with communities, not merely for them. Deep research and user validation must come before writing code.",
    },
  },
  {
    slug: "glambox",
    eyebrow: "Product 03",
    title: "GlamBox",
    shortDescription:
      "A modern, responsive website for a premium wig and beauty brand — focused on elegant presentation, intuitive browsing, and a polished customer experience.",
    status: "live",
    externalLink: {
      label: "glambox.onrender.com",
      href: "https://glambox.onrender.com",
    },
    stack: ["React", "TypeScript", "Tailwind CSS", "Render"],
    caseStudy: {
      problem:
        "Many beauty brands struggle to present their products online through experiences that feel premium, trustworthy, and mobile-friendly.",
      solutionLabel: "Solution",
      solution:
        "GlamBox delivers a clean, elegant, and responsive web presence that showcases products and reinforces brand identity through thoughtful design and user experience.",
      challengesLabel: "Challenges",
      challenges:
        "Balancing visual richness with performance and ensuring a seamless experience across devices required careful design decisions.",
      lessonsLabel: "Lessons Learned",
      lessons:
        "Strong digital experiences are not only about aesthetics — they are about trust, usability, and communicating a brand's identity consistently.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}