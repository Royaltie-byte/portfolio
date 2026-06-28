"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./Hero.module.css";

const NodeNetwork = dynamic(() => import("@/components/three/NodeNetwork"), {
  ssr: false,
});

const BUILDING_PHRASES = [
  "AI-powered products.",
  "Modern web experiences.",
  "Scalable systems.",
  "Future cloud solutions.",
];

const PHRASE_DURATION = 3000;

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % BUILDING_PHRASES.length);
    }, PHRASE_DURATION);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className={styles.hero}>
      <div className={styles.canvasLayer} aria-hidden="true">
        <NodeNetwork />
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.textColumn}>
          <h1 className={styles.name}>Allan Kihiu</h1>

          <p className={styles.subtitle}>
            Founder, Product Engineer &amp; Full-Stack Developer
          </p>

          <div className={styles.buildingBlock}>
            <p className={styles.buildingLabel}>Building...</p>
            <div className={styles.phraseViewport}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  className={styles.phrase}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -10 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {BUILDING_PHRASES[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.ctas}>
            <a href="#projects" className={styles.primaryCta}>
              View projects
            </a>
            <a
              href="https://wa.me/254791003081"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryCta}
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}