"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgyljzn";

const CONTACT_LINKS = [
  {
    id: "email",
    label: "Email",
    value: "kihiuallan46@gmail.com",
    href: "mailto:kihiuallan46@gmail.com",
    icon: "✉",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/Royaltie-byte",
    href: "https://github.com/Royaltie-byte",
    icon: "⌥",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/kihiu-njogu",
    href: "https://www.linkedin.com/in/kihiu-njogu-023059353/",
    icon: "in",
    external: true,
  },
];

type FormState = "idle" | "submitting" | "success" | "error";

const fadeUp = {
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

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormState("success");
        form.reset();
      } else {
        const json = await response.json();
        setErrorMessage(
          json?.errors?.[0]?.message ||
            "Something went wrong. Please try again."
        );
        setFormState("error");
      }
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setFormState("error");
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>

        {/* Header — centered, full width */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className={styles.eyebrow}>Contact</p>
          <h2 className={styles.headline}>Let&apos;s build something.</h2>
          <p className={styles.subheadline}>
            Whether you need a website, an AI-powered product, startup guidance,
            or simply want to discuss an idea — I&apos;d love to hear from you.
          </p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <span aria-hidden="true">📍</span> Nairobi, Kenya
            </span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span className={styles.metaItem}>
              <span aria-hidden="true">⚡</span> Usually responds within 24
              hours
            </span>
          </div>
        </motion.div>

        {/* Two columns */}
        <div className={styles.columns}>

          {/* Left — contact methods */}
          <motion.div
            className={styles.leftColumn}
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* WhatsApp — primary */}
            <a
              href="https://wa.me/254791003081"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappCard}
            >
              <div className={styles.whatsappTop}>
                <span className={styles.whatsappIcon} aria-hidden="true">
                  💬
                </span>
                <span className={styles.whatsappBadge}>
                  Preferred · Fastest response
                </span>
              </div>
              <p className={styles.whatsappLabel}>WhatsApp</p>
              <p className={styles.whatsappNumber}>+254 791 003 081</p>
              <span className={styles.whatsappCta}>
                Open WhatsApp
                <span aria-hidden="true" className={styles.arrow}>
                  →
                </span>
              </span>
            </a>

            {/* Other links */}
            <div className={styles.linkList}>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={styles.contactLink}
                >
                  <span
                    className={styles.contactLinkIcon}
                    aria-hidden="true"
                  >
                    {link.icon}
                  </span>
                  <span className={styles.contactLinkBody}>
                    <span className={styles.contactLinkLabel}>
                      {link.label}
                    </span>
                    <span className={styles.contactLinkValue}>
                      {link.value}
                    </span>
                  </span>
                  <span
                    className={styles.contactLinkArrow}
                    aria-hidden="true"
                  >
                    {link.external ? "↗" : "→"}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className={styles.rightColumn}
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {formState === "success" ? (
              <div className={styles.successState}>
                <span className={styles.successIcon} aria-hidden="true">
                  ✓
                </span>
                <h3 className={styles.successTitle}>Message sent.</h3>
                <p className={styles.successText}>
                  Thanks for reaching out — I&apos;ll get back to you within
                  24 hours.
                </p>
                <button
                  type="button"
                  className={styles.successReset}
                  onClick={() => setFormState("idle")}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className={styles.input}
                    disabled={formState === "submitting"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className={styles.input}
                    disabled={formState === "submitting"}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me what you're working on..."
                    className={styles.textarea}
                    disabled={formState === "submitting"}
                  />
                </div>

                {formState === "error" && (
                  <p className={styles.errorMessage} role="alert">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={formState === "submitting"}
                >
                  {formState === "submitting" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <span aria-hidden="true" className={styles.arrow}>
                        →
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}