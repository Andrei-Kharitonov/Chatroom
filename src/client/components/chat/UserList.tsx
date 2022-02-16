import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles/UserList.module.scss';
import User from './User';
import { SecurityUser } from '../../types/User'
import { Role } from '../../types/Roles';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/currentUserSlice';
import { RootState } from '../../store/store';
import { UserAPI } from '../../api/userApi';


interface UserListProps {
  users: SecurityUser[],
}

export default function UserList({ users }: UserListProps): JSX.Element {
  let [active, setActive] = useState(false);
  let [userList, setUserList] = useState(users);
  let currentUser = useSelector((state: RootState) => state.currentUser.currentUser);
  let dispatch = useDispatch();

  useEffect(() => {
    setUserList(users);
  }, [users]);

  useEffect(() => {
    setActive(active);
  }, [active]);

  async function removeUser(id: string): Promise<void> {
    let query = confirm('Вы действительно хотите удалить этого пользователя?');

    if (query) {
      let deleteUser = await UserAPI.delete(id, currentUser.login, currentUser.password);

      if (deleteUser) {
        setUserList(userList => userList.filter(user => user._id !== deleteUser!._id));
      } else {
        alert('ERROR!!!');
      }
    }
  }

  async function setBan(id: string): Promise<void> {
    let BannedUser = await UserAPI.setBan(id, currentUser.login, currentUser.password);

    if (BannedUser) {
      setUserList(userList.map(user => user._id == id ? Object.assign({}, user, { banned: BannedUser!.banned }) : user));
    }
  }

  async function setModerator(id: string): Promise<void> {
    let NewModerator = await UserAPI.giveModerator(id, currentUser.login, currentUser.password);

    if (NewModerator) {
      setUserList(userList.map(user => user._id == id ? Object.assign({}, user, { post: NewModerator!.post }) : user));
    }
  }

  async function setAdmin(id: string): Promise<void> {
    let query = confirm('Вы действительно хотите передать права администратора этому пользователю?');

    if (query) {
      let newAdmin = await UserAPI.transferAdmin(id, currentUser.login, currentUser.password);
      let updatedUser = await UserAPI.getByLogin(currentUser.login, currentUser.password);

      if (newAdmin) {
        dispatch(setUser(updatedUser));
        setUserList(userList.map(user => {
          if (user._id == id) {
            return Object.assign({}, user, { post: newAdmin!.post, banned: false });
          } else if (user._id == currentUser._id) {
            return Object.assign({}, user, { post: Role.Moderator });
          } else {
            return user;
          }
        }));
      }
    }
  }

  if (userList.length) {
    return (
      <div className={active ? styles.userList + ' ' + styles.userList_active : styles.userList}>
        <ul className={styles.userList__body}>
          {userList.map(user => {
            return (
              <li key={user._id}>
                <User
                  id={user._id}
                  name={user.login}
                  post={user.post}
                  avatar={user.avatar}
                  banned={user.banned}
                  setBan={setBan}
                  setModerator={setModerator}
                  setAdmin={setAdmin}
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
        <h3 style={{ width: '100%', textAlign: 'center' }}>
          Нет пользователей.<br />
          <Link href='/sign-up'>
            <a>&nbsp;Создайте аккаунт&nbsp;</a>
          </Link>
          и получите права Администратора.
        </h3>
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