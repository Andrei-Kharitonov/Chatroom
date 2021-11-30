import { useState, useEffect } from 'react';
import styles from '../styles/UserList.module.scss';

export default function UserList(): JSX.Element {
  let [active, setActive] = useState(false);

  useEffect(() => {
    setActive(active);
  }, [active])

  return (
    <div className={styles.userList}>
      <div
        className={active ? styles.userList__icon_active : styles.userList__icon}
        onClick={() => setActive(!active)}
      >
        <span>&raquo;</span>
      </div>
      <div className={active ? styles.userList__body_active : styles.userList__body}>
        <span>user list</span>
      </div>
    </div>
  );
}