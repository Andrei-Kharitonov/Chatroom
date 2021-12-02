import { useState, useEffect } from 'react';
import styles from './styles/User.module.scss';

interface UserProps {
  name: string,
  post: string
}

export default function User({ name, post }: UserProps): JSX.Element {
  let [active, setActive] = useState(false);
  let avatarImg = false;

  return (
    <div className={styles.user}>
      <div className={styles.user__body} onClick={() => setActive(false)}>
        <div
          className={styles.user__avatar}
          style={{ background: avatarImg ? '' : '#c4c4c4' }}
        >
          {avatarImg ? <img src="#" alt="avatar" /> : ''}
        </div>
        <div className={styles.user__info}>
          <div className={styles.user__name}>
            {name}
          </div>
          <div className={styles.user__post}>
            {post}
          </div>
        </div>
      </div>
      <div className={styles.user__options}>
        <div
          className={styles.user__optionsIcon}
          onClick={() => setActive(!active)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={active ? styles.user__optionsList_active : styles.user__optionsList}>
          <div className={styles.user__option}>Заблокировать</div>
          <div className={styles.user__option}>Разблокировать</div>
        </div>
      </div>
    </div>
  );
}