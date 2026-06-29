"use client";

import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import styles from "./CurrentlyLearning.module.css";

type LearningItem = {
  icon: string;
  name: string;
  description: string;
};

const LEARNING_ITEMS: LearningItem[] = [
  {
    icon: "☁️",
    name: "AWS",
    description:
      "Cloud infrastructure for scalable, production-grade deployments — the backbone of everything I want to build at scale.",
  },
  {
    icon: "🐳",
    name: "Docker",
    description:
      "Containerization for consistent, portable environments — so what works on my machine works everywhere else too.",
  },
  {
    icon: "⚙️",
    name: "CI/CD",
    description:
      "Automated pipelines for faster, safer shipping — so every push is tested, verified, and deployed without manual overhead.",
  },
  {
    icon: "🖥️",
    name: "Linux",
    description:
      "The foundation of every serious backend and cloud environment — understanding the OS your code actually runs on.",
  },
  {
    icon: "📡",
    name: "Distributed Systems",
    description:
      "Building systems that scale beyond a single machine — the theory and practice behind resilient, fault-tolerant architecture.",
  },
  {
    icon: "🏗️",
    name: "System Design",
    description:
      "Architecting products that survive real-world load — designing for scale, reliability, and maintainability from the start.",
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

export default function CurrentlyLearning() {
  return (
    <section id="learning" className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className={styles.eyebrow}>Currently Learning</p>
          <h2 className={styles.headline}>Always in motion.</h2>
          <p className={styles.subheadline}>
            These aren&apos;t aspirations written on a résumé. They&apos;re the
            next problems I&apos;m solving — the skills I&apos;m actively
            building toward as I grow Royaltie Technologies into a serious
            engineering company.
          </p>
        </motion.div>

        {/* Grid */}
        <div className={styles.grid}>
          {LEARNING_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              className={styles.card}
              variants={fadeUp}
              custom={i * 0.08}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <span className={styles.cardIcon} aria-hidden="true">
                {item.icon}
              </span>
              <div className={styles.cardBody}>
                <p className={styles.cardName}>{item.name}</p>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.div
          className={styles.closing}
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className={styles.closingLine} aria-hidden="true" />
          <p className={styles.closingText}>
            Every product I ship teaches me something the classroom never could.
          </p>
        </motion.div>
      </div>
    </section>
  );
}