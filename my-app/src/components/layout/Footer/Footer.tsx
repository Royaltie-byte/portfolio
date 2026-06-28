import Link from "next/link";
import styles from "./Footer.module.css";

const WHATSAPP_NUMBER = "254791003081";
const PHONE_DISPLAY = "+254 791 003 081";

const QUICK_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>Allan Kihiu</p>
          <p className={styles.tagline}>
            Founder & full-stack developer building Royaltie Technologies and
            ChatEase.
          </p>
        </div>

        <div className={styles.column}>
          <p className={styles.heading}>Quick links</p>

          <ul className={styles.linkList}>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <p className={styles.heading}>Connect</p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.madeWith}
          >
            Made with <span aria-hidden="true">❤️</span> by Royaltie
            Technologies
          </a>

          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className={styles.phone}
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {year} Allan Kihiu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}