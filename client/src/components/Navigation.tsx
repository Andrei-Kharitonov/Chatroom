import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navigation.module.scss';

export default function Navigation(): JSX.Element {
  let [url, setUrl] = useState('');
  let [active, setActive] = useState(false);

  useEffect(() => {
    setUrl(window.location.pathname);
  });

  return (
    <div className={styles.nav}>
      <div className={styles.iconMenu} onClick={() => setActive(!active)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={active ? styles.nav__body_active : styles.nav__body}>
        <Link href="/">
          <a
            className={styles.nav__link}
            style={{ color: url == '/' ? '#0066FF' : 'inherit' }}
            onClick={() => setActive(false)}
          >
            Chatroom
          </a>
        </Link>
        <Link href="/sign-up">
          <a
            className={styles.nav__link}
            style={{ color: url == '/sign-up' ? '#0066FF' : 'inherit' }}
            onClick={() => setActive(false)}
          >
            Регистрация
          </a>
        </Link>
        <Link href="/sign-in">
          <a
            className={styles.nav__link}
            style={{ color: url == '/sign-in' ? '#0066FF' : 'inherit' }}
            onClick={() => setActive(false)}
          >
            Войти
          </a>
        </Link>
        <Link href="/profile">
          <a
            className={styles.nav__link}
            style={{ color: url == '/profile' ? '#0066FF' : 'inherit' }}
            onClick={() => setActive(false)}
          >
            Профиль
          </a>
        </Link>
        <Link href="/help">
          <a
            className={styles.nav__link}
            style={{ color: url == '/help' ? '#0066FF' : 'inherit' }}
            onClick={() => setActive(false)}
          >
            Помощь
          </a>
        </Link>
      </nav>
    </div>
  );
}