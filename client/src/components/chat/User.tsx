import { useState } from 'react';
import { User as UserI } from '../../types/User';
import styles from './styles/User.module.scss';

interface UserProps {
  id: string,
  name: string,
  post: string,
  currentUser: UserI
  removeUser: Function
}

export default function User({ id, name, post, currentUser, removeUser }: UserProps): JSX.Element {
  let [active, setActive] = useState(false);
  let avatarImg = false;

  return (
    <div className={styles.user}>
      <div className={styles.user__body}>
        <div
          className={styles.user__avatar}
          style={{ background: avatarImg ? '' : '#c4c4c4' }}
        >
          {avatarImg ? <img src="#" alt="avatar" /> : ''}
        </div>
        <div className={styles.user__info}>
          <div className={styles.user__name} style={{ color: currentUser._id == id ? 'rgb(0, 102, 255)' : 'inherit' }}>
            {currentUser._id == id ? `${name} (Вы)` : name}
          </div>
          <div className={styles.user__post}>
            {post[0].toUpperCase() + post.slice(1)}
          </div>
        </div>
      </div>
      {currentUser._id != id ?
        <div className={styles.user__options}>
          <div
            className={styles.user__optionsIcon}
            onMouseOver={() => setActive(true)}
            onMouseOut={() => {
              let optionIsHover = document.querySelector("." + styles.user__optionsList_active + ":hover");

              if (!optionIsHover) {
                setActive(false);
              }
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className={active ? styles.user__optionsList_active : styles.user__optionsList}
            onMouseOver={() => setActive(true)}
            onMouseOut={() => setActive(false)}
          >
            <div className={styles.user__option}>
              Заблокировать
            </div>
            <div className={styles.user__option}>
              Разблокировать
            </div>
            <div className={styles.user__option}>
              Выдать права модератора
            </div>
            <div className={styles.user__option}>
              Передать права админа
            </div>
            <div className={styles.user__option} onClick={() => removeUser(id, currentUser)}>
              Удалить
            </div>
          </div>
        </div>
        : ''}
    </div>
  );
}