import { useState, useEffect } from 'react';
import styles from './styles/UserList.module.scss';
import User from './User';
import { SecurityUser, User as UserI } from '../../types/User'
import axios from 'axios';

interface UserListProps {
  users: SecurityUser[]
}

export default function UserList({ users }: UserListProps): JSX.Element {
  let [active, setActive] = useState(false);
  let [userList, setUserList] = useState(users);
  let [currentUser, setCurrentUser] = useState({
    _id: '1',
    login: 'Anonim',
    password: '000000',
    post: 'none',
    banned: false
  });

  useEffect(() => {
    let localStorageData: UserI | null = JSON.parse(localStorage.getItem('user')!);

    if (localStorageData) {
      setCurrentUser(localStorageData);
    }
  }, []);

  useEffect(() => {
    setActive(active);
  }, [active]);

  async function removeUser(id: string, currentUser: UserI): Promise<void> {
    let queryDel = confirm('Вы действительно хотите удалить этого пользователя?');

    if (queryDel) {
      let deleteUser = await axios.delete(`http://localhost:5000/user/delete/${id}/?login=${currentUser.login}&password=${currentUser.password}`);

      if (deleteUser.data) {
        setUserList(userList => userList.filter(user => user.id !== deleteUser.data._id));
      } else {
        alert('У Вас недостаточно прав!');
      }
    }
  }

  if (userList.length) {
    return (
      <div className={active ? styles.userList + ' ' + styles.userList_active : styles.userList}>
        <ul className={styles.userList__body}>
          {userList.map(user => {
            return (
              <li key={user.id}>
                <User
                  id={user.id}
                  name={user.login}
                  post={user.post}
                  currentUser={currentUser}
                  removeUser={removeUser}
                />
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
        <h3 style={{ width: '100%', textAlign: 'center' }}>Нет пользователей</h3>
        <div
          className={styles.userList__icon}
          onClick={() => setActive(!active)}
        >
          &raquo;
        </div>
      </div>
    );
  }
}