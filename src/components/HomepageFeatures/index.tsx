import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  label: string;
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    label: 'Why Shesha',
    title: 'Faster business application delivery',
    description: (
      <>
        Shesha is positioned as a low-code framework for reducing the repetitive
        work involved in business app implementation.
      </>
    ),
  },
  {
    label: 'Developer Stack',
    title: 'Built around familiar Microsoft and React tooling',
    description: (
      <>
        The docs and examples center on the Shesha workflow across ASP.NET Core,
        React, and practical front-end customization tasks.
      </>
    ),
  },
  {
    label: 'Learning Path',
    title: 'Use this site as a focused v0.45 reference',
    description: (
      <>
        The current content set combines intros, front-end notes, and issue
        documentation into a tighter Shesha-specific study flow.
      </>
    ),
  },
];

function Feature({label, title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className={styles.featureCard}>
        <span className={styles.featureLabel}>{label}</span>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeading}>
          <Heading as="h2">Built around the Shesha workflow</Heading>
          <p>
            Starter-template placeholders have been replaced with Shesha-specific
            content and navigation.
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
