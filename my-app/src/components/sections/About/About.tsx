"use client";

import { motion } from "framer-motion";
import { Variants } from "framer-motion"
import styles from "./About.module.css";

const STATS = [
  { value: "2024", label: "Started building" },
  { value: "2", label: "Products launched" },
  { value: "1", label: "Live SaaS product" },
  { value: "4+", label: "Stacks in motion" },
];


const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay,
    },
  }),
};

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>

        {/* Left — text */}
        <motion.div
          className={styles.textColumn}
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className={styles.eyebrow}>About Me</p>

          <div className={styles.body}>
            <p>
              I&apos;m Allan Kihiu — a founder and full-stack developer based in
              Kenya, building products that solve real problems. I started
              Royaltie Technologies as the company that houses everything I
              create: a holding structure for my products, my work, and the
              engineer I&apos;m becoming.
            </p>
            <p>
              My first product under Royaltie is{" "}
              <a
                href="https://chatease.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.accentLink}
              >
                ChatEase
              </a>{" "}
              — an AI-powered customer support tool built for businesses that
              need smarter, faster responses without the overhead. It&apos;s
              live, it&apos;s real, and it&apos;s what I&apos;m actively taking
              to market right now.
            </p>
            <p>
              I&apos;m honest about where I am: I&apos;m early. I&apos;m
              polishing my backend skills by shipping, not by studying. Every
              product I build is a real-world systems problem — and that&apos;s
              intentional. The goal is cloud engineering, distributed systems,
              and scalable architecture. I&apos;m building my way there.
            </p>
            <p>
              If you&apos;re looking for someone who ships, learns fast, and
              treats every project like it matters — that&apos;s the work I do.
            </p>
          </div>
        </motion.div>

        {/* Right — stats */}
        <motion.div
          className={styles.statsColumn}
          variants={fadeUp}
          custom={0.15}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className={styles.statsGrid}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.tagline}>
            <span className={styles.taglineLine} aria-hidden="true" />
            <p className={styles.taglineText}>
              Royaltie Technologies — building the future, one product at a
              time.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom — closing statement */}
      <motion.p
        className={styles.closingStatement}
        variants={fadeUp}
        custom={0.25}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        Building with purpose, growing with intention.
      </motion.p>
    </section>
  );
}