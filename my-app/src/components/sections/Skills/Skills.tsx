"use client";

import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import styles from "./Skills.module.css";

type Skill = {
  name: string;
  icon: string | null;
  iconType: "devicon" | "symbol";
  symbol?: string;
};

const TOOLKIT: Skill[] = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    iconType: "devicon",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    iconType: "devicon",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    iconType: "devicon",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    iconType: "devicon",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    iconType: "devicon",
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    iconType: "devicon",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    iconType: "devicon",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    iconType: "devicon",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    iconType: "devicon",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    iconType: "devicon",
  },
  {
    name: "Prisma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    iconType: "devicon",
  },
  {
    name: "Git & GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    iconType: "devicon",
  },
  {
    name: "REST APIs",
    icon: null,
    iconType: "symbol",
    symbol: "⇄",
  },
  {
    name: "Responsive Design",
    icon: null,
    iconType: "symbol",
    symbol: "⊡",
  },
  {
    name: "Render",
    icon: null,
    iconType: "symbol",
    symbol: "▲",
  },
];

const GROWING_INTO: Skill[] = [
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    iconType: "devicon",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    iconType: "devicon",
  },
  {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    iconType: "devicon",
  },
  {
    name: "CI/CD",
    icon: null,
    iconType: "symbol",
    symbol: "⟳",
  },
  {
    name: "Distributed Systems",
    icon: null,
    iconType: "symbol",
    symbol: "⬡",
  },
  {
    name: "System Design",
    icon: null,
    iconType: "symbol",
    symbol: "◈",
  },
  {
    name: "Cloud Architecture",
    icon: null,
    iconType: "symbol",
    symbol: "☁",
  },
  {
    name: "Infrastructure as Code",
    icon: null,
    iconType: "symbol",
    symbol: "{ }",
  },
  {
    name: "DevOps Practices",
    icon: null,
    iconType: "symbol",
    symbol: "∞",
  },
  {
    name: "Microservices",
    icon: null,
    iconType: "symbol",
    symbol: "⬡",
  },
  {
    name: "Cybersecurity",
    icon: null,
    iconType: "symbol",
    symbol: "⛨",
  },
  {
    name: "AI Engineering",
    icon: null,
    iconType: "symbol",
    symbol: "◎",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

function SkillPill({
  skill,
  variant,
}: {
  skill: Skill;
  variant: "toolkit" | "growing";
}) {
  return (
    <span
      className={`${styles.pill} ${
        variant === "growing" ? styles.pillGrowing : styles.pillToolkit
      }`}
    >
      {skill.iconType === "devicon" && skill.icon ? (
        <img
          src={skill.icon}
          alt=""
          className={styles.pillIcon}
          aria-hidden="true"
          width={16}
          height={16}
        />
      ) : (
        <span className={styles.pillSymbol} aria-hidden="true">
          {skill.symbol}
        </span>
      )}
      {skill.name}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className={styles.eyebrow}>Technical Skills</p>
          <h2 className={styles.headline}>What I build with.</h2>
        </motion.div>

        {/* Toolkit */}
        <motion.div
          className={styles.group}
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className={styles.groupLabel}>In my toolkit</p>
          <div className={styles.pillList}>
            {TOOLKIT.map((skill) => (
              <SkillPill key={skill.name} skill={skill} variant="toolkit" />
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className={styles.divider}
          variants={fadeUp}
          custom={0.15}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          aria-hidden="true"
        />

        {/* Growing into */}
        <motion.div
          className={styles.group}
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className={styles.groupLabel}>
            Growing into
            <span className={styles.groupLabelBadge}>in motion</span>
          </p>
          <div className={styles.pillList}>
            {GROWING_INTO.map((skill) => (
              <SkillPill key={skill.name} skill={skill} variant="growing" />
            ))}
          </div>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          className={styles.githubRow}
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className={styles.githubDivider} aria-hidden="true" />
          <a
            href="https://github.com/Royaltie-byte"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
              alt=""
              className={styles.githubIcon}
              aria-hidden="true"
              width={18}
              height={18}
            />
            Explore more projects, experiments, and learning journeys on my GitHub
            <span className={styles.githubArrow} aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}