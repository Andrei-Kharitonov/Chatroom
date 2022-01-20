import { useState, useEffect } from 'react';
import Link from 'next/dist/client/link';
import styles from './styles/CurrentUser.module.scss';
import { User } from '../../types/User';

export default function CurrentUser(): JSX.Element {
  let avatarImg: boolean = false;
  let [url, setUrl] = useState('');
  let [user, setUser] = useState({
    login: 'Anonim',
    post: 'none'
  });

  useEffect(() => {
    let localStorageData: User | null = JSON.parse(localStorage.getItem('user')!);

    if (localStorageData) {
      setUser(localStorageData);
    }
  }, [url]);

  useEffect(() => {
    setUrl(window.location.pathname);
  });

  return (
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
            <a>{user.login}</a>
          </Link>
        </div>
        <div className={styles.user__post}>
          {user.post[0].toUpperCase() + user.post.slice(1)}
        </div>
      </div>
    </div>
  );
}