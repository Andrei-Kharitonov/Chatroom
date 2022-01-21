import { useState, useEffect } from 'react';
import styles from './styles/UserList.module.scss';
import User from './User';
import { SecurityUser } from '../../types/User'

interface UserListProps {
  users: SecurityUser[]
}

export default function UserList({ users }: UserListProps): JSX.Element {
  let [active, setActive] = useState(false);

  useEffect(() => {
    setActive(active);
  }, [active]);

  if (users.length) {
    return (
      <div className={active ? styles.userList + ' ' + styles.userList_active : styles.userList}>
        <ul className={styles.userList__body}>
          {users.map(user => {
            return (
              <li key={user.id}>
                <User id={user.id} name={user.login} post={user.post} />
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
  } else {
    return (
      <div className={active ? styles.userList + ' ' + styles.userList_active : styles.userList}>
        <h3 style={{ textAlign: 'center' }}>Нет пользователей</h3>
      </div>
    );
  }
}