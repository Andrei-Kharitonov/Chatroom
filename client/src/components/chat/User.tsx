import axios from 'axios';
import { useEffect, useState } from 'react';
import { User as UserI } from '../../types/User';
import styles from './styles/User.module.scss';

interface UserProps {
  id: string
  name: string,
  post: string
}

export default function User({ id, name, post }: UserProps): JSX.Element {
  let [active, setActive] = useState(false);
  let [currentUser, setCurrentUser] = useState({
    _id: '1',
    login: 'Anonim',
    password: '000000',
    post: 'none'
  })
  let avatarImg = false;

  useEffect(() => {
    currentUser = JSON.parse(localStorage.getItem('user')!);
  });

  function removeUser(id: string): void {
    axios.delete(`http://localhost:5000/user/delete/${id}/?login=${currentUser.login}&password=${currentUser.password}`);
  }

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
          <div className={styles.user__name}>
            {name}
          </div>
          <div className={styles.user__post}>
            {post[0].toUpperCase() + post.slice(1)}
          </div>
        </div>
      </div>
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
          <div className={styles.user__option} onClick={() => removeUser(id)}>
            Удалить
          </div>
        </div>
      </div>
    </div>
  );
}