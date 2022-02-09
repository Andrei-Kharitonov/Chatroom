import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from './styles/UserList.module.scss';
import User from './User';
import { SecurityUser, User as UserI } from '../../types/User'
import { Role } from '../../types/Roles';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/currentUserSlice';
import { RootState } from '../../store/store';


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

  async function removeUser(id: string, currentUser: UserI): Promise<void> {
    let query = confirm('Вы действительно хотите удалить этого пользователя?');

    if (query) {
      let deleteUser = await axios.delete(`http://localhost:5000/user/delete/${id}?login=${currentUser.login}&password=${currentUser.password}`);

      if (deleteUser.data) {
        setUserList(userList => userList.filter(user => user._id !== deleteUser.data._id));
      } else {
        alert('ERROR!!!');
      }
    }
  }

  async function setBan(id: string, currentUser: UserI): Promise<void> {
    let BannedUser = await axios.put(`http://localhost:5000/user/ban/${id}?login=${currentUser.login}&password=${currentUser.password}`);

    if (BannedUser.data) {
      setUserList(userList.map(user => user._id == id ? Object.assign({}, user, { banned: BannedUser.data.banned }) : user));
    }
  }

  async function setModerator(id: string, currentUser: UserI): Promise<void> {
    let NewModerator = await axios.put(`http://localhost:5000/user/set-moderator/${id}?login=${currentUser.login}&password=${currentUser.password}`);

    if (NewModerator.data) {
      setUserList(userList.map(user => user._id == id ? Object.assign({}, user, { post: NewModerator.data.post }) : user));
    }
  }

  async function setAdmin(id: string, currentUser: UserI): Promise<void> {
    let query = confirm('Вы действительно хотите передать права администратора этому пользователю?');

    if (query) {
      let newAdmin = await axios.put(`http://localhost:5000/user/transfer-admin/${id}?login=${currentUser.login}&password=${currentUser.password}`);
      let updateUser = await axios.get(`http://localhost:5000/user/get-by-login?login=${currentUser.login}&password=${currentUser.password}`);

      if (newAdmin.data) {
        dispatch(setUser(updateUser.data));
        setUserList(userList.map(user => {
          if (user._id == id) {
            return Object.assign({}, user, { post: newAdmin.data.post, banned: false });
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
                  banned={user.banned}
                  currentUser={currentUser}
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