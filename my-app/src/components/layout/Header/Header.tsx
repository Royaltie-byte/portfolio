"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.seal}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Allan Kihiu — home"
        >
          AK
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className={styles.cta}>
          Let&apos;s talk
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={isMenuOpen ? styles.iconOpen : styles.iconClosed} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className={styles.mobileCta}
              onClick={() => setIsMenuOpen(false)}
            >
              Let&apos;s talk
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}