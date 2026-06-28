import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Allan Kihiu`,
      description: project.shortDescription,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const STATUS_LABELS = {
    live: "Live",
    research: "Research & Validation",
    "in-progress": "In Progress",
  };

  return (
    <main className={styles.main}>
      <div className={styles.inner}>

        {/* Back link */}
        <Link href="/#projects" className={styles.backLink}>
          <span aria-hidden="true">←</span> Back to projects
        </Link>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroMeta}>
            <p className={styles.eyebrow}>{project.eyebrow}</p>
            <span
              className={`${styles.statusBadge} ${
                styles[`status__${project.status}`]
              }`}
            >
              {STATUS_LABELS[project.status]}
            </span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.shortDescription}>{project.shortDescription}</p>

          <div className={styles.stackList}>
            {project.stack.map((tech) => (
              <span key={tech} className={styles.stackTag}>
                {tech}
              </span>
            ))}
          </div>

          {project.externalLink && (
            <a
              href={project.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              Visit {project.externalLink.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Case study body */}
        <div className={styles.body}>
          <div className={styles.block}>
            <h2 className={styles.blockLabel}>Problem</h2>
            <p className={styles.blockText}>{project.caseStudy.problem}</p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockLabel}>
              {project.caseStudy.solutionLabel}
            </h2>
            <p className={styles.blockText}>{project.caseStudy.solution}</p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockLabel}>
              {project.caseStudy.challengesLabel}
            </h2>
            <p className={styles.blockText}>{project.caseStudy.challenges}</p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockLabel}>
              {project.caseStudy.lessonsLabel}
            </h2>
            <p className={styles.blockText}>{project.caseStudy.lessons}</p>
          </div>
        </div>

        {/* Bottom nav */}
        <div className={styles.bottomNav}>
          <Link href="/#projects" className={styles.backLink}>
            <span aria-hidden="true">←</span> Back to projects
          </Link>
        </div>
      </div>
    </main>
  );
}