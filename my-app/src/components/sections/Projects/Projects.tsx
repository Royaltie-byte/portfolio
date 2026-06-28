"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS, type Project } from "@/data/projects";
import styles from "./Projects.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
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

const STATUS_LABELS: Record<Project["status"], string> = {
  live: "Live",
  research: "Research & Validation",
  "in-progress": "In Progress",
};

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className={styles.eyebrow}>Projects</p>
          <h2 className={styles.headline}>What I&apos;ve been building.</h2>
        </motion.div>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              className={styles.card}
              variants={fadeUp}
              custom={i * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  <p className={styles.cardEyebrow}>{project.eyebrow}</p>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[`status__${project.status}`]
                    }`}
                  >
                    {STATUS_LABELS[project.status]}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>
                  {project.shortDescription}
                </p>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.stackList}>
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.stackTag}>
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className={styles.stackTag}>
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className={styles.cardLinks}>
                  <Link
                    href={`/works/${project.slug}`}
                    className={styles.caseStudyLink}
                  >
                    View case study
                    <span aria-hidden="true" className={styles.arrow}>
                      →
                    </span>
                  </Link>
                  {project.externalLink && (
                    <a
                      href={project.externalLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                    >
                      {project.externalLink.label}
                      <span aria-hidden="true" className={styles.externalArrow}>
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}