import styles from './styles/MainLayout.module.scss';
import Navigation from './Navigation';
import CurrentUser from './CurrentUser';

interface MainLayoutProps {
  children: JSX.Element
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="container">
      <header className={styles.header}>
        <Navigation />
        <CurrentUser />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}