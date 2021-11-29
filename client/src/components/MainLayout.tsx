import Link from 'next/dist/client/link';
import styles from '../styles/MainLayout.module.scss';
import Navigation from './Navigation';

interface MainLayoutProps {
  children: JSX.Element
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  let avatarImg: boolean = false;

  return (
    <div className="container">
      <header className={styles.header}>
        <Navigation />
        <div className={styles.user}>
          <div
            className={styles.user__avatar}
            style={{ background: avatarImg ? '' : '#c4c4c4' }}
          >
            {avatarImg ? <img src="#" alt="avatar" /> : ''}
          </div>
          <div className={styles.user__info}>
            <div className={styles.user__name}>
              <Link href="/profile">
                <a>Андрей Харитонов</a>
              </Link>
            </div>
            <div className={styles.user__post}>Admin</div>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}