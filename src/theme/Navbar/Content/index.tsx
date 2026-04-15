import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HeaderTools from '@site/src/components/HeaderTools';
import styles from './styles.module.css';

export default function NavbarContent(): ReactNode {
  const logoUrl = useBaseUrl('/img/SheshaLogo.png');

  return (
    <div className={styles.navbarInner}>
      <Link className={styles.brand} to="/">
        <img className={styles.brandLogo} src={logoUrl} alt="Shesha logo" />
      </Link>
      <HeaderTools />
    </div>
  );
}
