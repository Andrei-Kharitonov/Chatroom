import { useEffect, useState } from 'react';
import { Role } from '../../types/Roles';
import { User as UserI } from '../../types/User';
import styles from './styles/User.module.scss';

interface UserProps {
  id: string,
  name: string,
  post: string,
  banned: boolean,
  currentUser: UserI
  setBan: Function,
  setModerator: Function,
  setAdmin: Function,
  removeUser: Function
}

export default function User({ id, name, post, banned, currentUser, setBan, setModerator, setAdmin, removeUser }: UserProps): JSX.Element {
  let [active, setActive] = useState(false);
  let [colorName, setColorName] = useState('inherit');
  let avatarImg = false;

  useEffect(() => {
    if (banned) {
      setColorName('#ff2222');
    } else if (currentUser._id == id) {
      setColorName('rgb(0, 102, 255)')
    } else {
      setColorName('inherit')
    }
  });

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
          <div className={styles.user__name} style={{ color: colorName }}>
            {currentUser._id == id ? `${name} (Вы)` : name}
          </div>
          <div className={styles.user__post}>
            {post[0].toUpperCase() + post.slice(1)}
          </div>
        </div>
      </div>
      {(currentUser._id != id && (currentUser.post == Role.Admin || (currentUser.post == Role.Moderator && post == Role.User)))
        ? <div className={styles.user__options}>
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
            <div className={styles.user__option} onClick={() => setBan(id, currentUser)}>
              {banned ? 'Разблокировать' : 'Заблокировать'}
            </div>
            {currentUser.post == Role.Admin
              ? <>
                <div className={styles.user__option} onClick={() => setModerator(id, currentUser)}>
                  {post == Role.Moderator ? 'Забрать права модератора' : 'Выдать права модератора'}
                </div>
                <div className={styles.user__option} onClick={() => setAdmin(id, currentUser)}>
                  Передать права админа
                </div>
                <div className={styles.user__option} onClick={() => removeUser(id, currentUser)}>
                  Удалить
                </div>
              </>
              : ''}
          </div>
        </div>
        : ''
      }
    </div >
  );
}