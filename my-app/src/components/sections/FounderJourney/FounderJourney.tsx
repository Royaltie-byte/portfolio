"use client";

import { motion } from "framer-motion";
import styles from "./FounderJourney.module.css";

const MILESTONES = [
  {
    id: 1,
    eyebrow: "The foundation",
    title: "Royaltie Technologies",
    description:
      "The parent company — the vision and the vehicle. Royaltie is the structure that houses every product, every project, and every direction I'm building toward. Think Anthropic to Claude.",
    link: null,
    side: "left",
  },
  {
    id: 2,
    eyebrow: "Product 01",
    title: "ChatEase",
    description:
      "AI-powered customer support SaaS built for businesses that need smarter, faster responses without the overhead. Live, real, and actively going to market.",
    link: { label: "chatease.co.ke", href: "https://chatease.co.ke" },
    side: "right",
  },
  {
    id: 3,
    eyebrow: "Product 02",
    title: "Matra",
    description:
      "An AI-powered postpartum monitoring and complication tracking system — built to close a critical gap in maternal healthcare through intelligent, accessible technology.",
    link: null,
    side: "left",
  },
  {
    id: 4,
    eyebrow: "The direction",
    title: "Cloud Engineering & Distributed Systems",
    description:
      "Where everything is heading. Scalable architecture, distributed infrastructure, cloud-native systems. Not a destination claimed — a direction being built toward, one product at a time.",
    link: null,
    side: "right",
  },
];

const slideIn = (side: string) => ({
  hidden: {
    opacity: 0,
    x: side === "left" ? -40 : 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function FounderJourney() {
  return (
    <section id="journey" className={styles.section}>
      <div className={styles.header}>
        <motion.p
          className={styles.eyebrow}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          Founder Journey
        </motion.p>
        <motion.h2
          className={styles.headline}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          The road so far.
        </motion.h2>
      </div>

      <div className={styles.timeline}>
        {/* Central line */}
        <div className={styles.line} aria-hidden="true" />

        {MILESTONES.map((milestone) => (
          <div
            key={milestone.id}
            className={`${styles.milestone} ${
              milestone.side === "right" ? styles.milestoneRight : styles.milestoneLeft
            }`}
          >
            {/* Dot on the line */}
            <div className={styles.dotWrapper} aria-hidden="true">
              <span className={styles.dotOuter} />
              <span className={styles.dotInner} />
            </div>

            {/* Card */}
            <motion.div
              className={styles.card}
              variants={slideIn(milestone.side)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <p className={styles.cardEyebrow}>{milestone.eyebrow}</p>
              <h3 className={styles.cardTitle}>{milestone.title}</h3>
              <p className={styles.cardDescription}>{milestone.description}</p>
              {milestone.link && (
                <a
                  href={milestone.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  {milestone.link.label}
                  <span className={styles.cardLinkArrow} aria-hidden="true">
                    →
                  </span>
                </a>
              )}
            </motion.div>

            {/* Spacer for alternating layout */}
            <div className={styles.spacer} aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}