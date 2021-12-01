import { useState, useEffect } from 'react';
import styles from '../styles/UserList.module.scss';
import User from './User';

export default function UserList(): JSX.Element {
  let [active, setActive] = useState(false);
  let users = [
    {
      name: 'Вася',
      post: 'User',
      id: 1
    },
    {
      name: 'Петя',
      post: 'Moderator',
      id: 2
    },
    {
      name: 'Дима',
      post: 'User',
      id: 3
    },
    {
      name: 'Андрей Харитонов',
      post: 'Admin',
      id: 4
    },
    {
      name: 'Саша',
      post: 'User',
      id: 5
    }
  ];

  useEffect(() => {
    setActive(active);
  }, [active]);

  return (
    <div className={active ? styles.userList + ' ' + styles.userList_active : styles.userList}>
      <ul className={styles.userList__body}>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <User name={user.name} post={user.post} />
            </li>
          );
        })}
      </ul>
      <div
        className={styles.userList__icon}
        onClick={() => setActive(!active)}
      >
        &raquo;
      </div>
    </div>
  );
}