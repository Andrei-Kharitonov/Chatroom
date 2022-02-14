import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserAPI } from '../../api/userApi';
import { RootState } from '../../store/store';
import { Role } from '../../types/Roles';
import styles from './styles/User.module.scss';

interface UserProps {
  id: string,
  name: string,
  avatarPath: string,
  post: string,
  banned: boolean,
  setBan: (id: string) => Promise<void>,
  setModerator: (id: string) => Promise<void>,
  setAdmin: (id: string) => Promise<void>,
  removeUser: (id: string) => Promise<void>
}

export default function User({ id, name, avatarPath, post, banned, setBan, setModerator, setAdmin, removeUser }: UserProps): JSX.Element {
  let [active, setActive] = useState(false);
  let [colorName, setColorName] = useState('inherit');
  let [avatarUrl, setAvatarUrl] = useState('');
  let currentUser = useSelector((state: RootState) => state.currentUser.currentUser);

  useEffect(() => {
    if (banned) {
      setColorName('#ff2222');
    } else if (currentUser._id == id) {
      setColorName('rgb(0, 102, 255)')
    } else {
      setColorName('inherit')
    }
  });

  useEffect(() => {
    setAvatarUrl(UserAPI.getAvatarPaht(avatarPath) ?? '');
  }, [avatarPath]);

  return (
    <div className={styles.user}>
      <div className={styles.user__body}>
        <div className={styles.user__avatar}>
          {avatarUrl.length ? <img className={styles.user__avatar__img} src={avatarUrl} /> : ''}
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
      {(currentUser._id != id && !currentUser.banned && (currentUser.post == Role.Admin || (currentUser.post == Role.Moderator && post == Role.User)))
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
            <div className={styles.user__option} onClick={() => setBan(id)}>
              {banned ? 'Разблокировать' : 'Заблокировать'}
            </div>
            {currentUser.post == Role.Admin
              ? <>
                <div className={styles.user__option} onClick={() => setModerator(id)}>
                  {post == Role.Moderator ? 'Забрать права модератора' : 'Выдать права модератора'}
                </div>
                <div className={styles.user__option} onClick={() => setAdmin(id)}>
                  Передать права админа
                </div>
                <div className={styles.user__option} onClick={() => removeUser(id)}>
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