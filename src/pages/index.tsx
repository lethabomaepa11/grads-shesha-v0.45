import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const logoUrl = useBaseUrl('/img/SheshaLogo.png');

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Official-style Shesha docs experience</span>
          <Heading as="h1" className={styles.heroTitle}>
            Build faster with Shesha.
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p className={styles.heroText}>
            Explore practical guides, front-end notes, and issue write-ups for the
            Shesha v0.45 learning track in a docs experience aligned to the live
            Shesha documentation site.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Start with the docs
            </Link>
            <Link
              className={clsx('button button--secondary button--lg', styles.secondaryButton)}
              to="/docs/shesha-basics/adding-header">
              Front-end basics
            </Link>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <img className={styles.heroLogo} src={logoUrl} alt="Shesha logo" />
          <div className={styles.heroStats}>
            <div>
              <span className={styles.statLabel}>Focus</span>
              <strong>Low-code application delivery</strong>
            </div>
            <div>
              <span className={styles.statLabel}>Stack</span>
              <strong>ASP.NET Core, React, Next.js</strong>
            </div>
            <div>
              <span className={styles.statLabel}>Use case</span>
              <strong>Business apps with faster implementation</strong>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className={styles.quickLinksHeader}>
          <Heading as="h2">Jump into the right area</Heading>
          <p>Use the local docs set as a focused Shesha learning path.</p>
        </div>
        <div className={styles.linkGrid}>
          <Link className={styles.linkCard} to="/docs/intro">
            <span className={styles.cardKicker}>Get Started</span>
            <strong>What is Shesha</strong>
            <span>Start with the platform overview and its low-code development model.</span>
          </Link>
          <Link className={styles.linkCard} to="/docs/shesha-basics/adding-header">
            <span className={styles.cardKicker}>Front-End Basics</span>
            <strong>Adding Header</strong>
            <span>Follow a concrete UI-focused customization example in the docs.</span>
          </Link>
          <Link className={styles.linkCard} to="/docs/shesha-issues/subform">
            <span className={styles.cardKicker}>Issues</span>
            <strong>Subform Data Notes</strong>
            <span>Review a documented issue and the expected handling around subform data.</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Shesha documentation customized to match the official docs branding.">
      <HomepageHeader />
      <main>
        <QuickLinks />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
