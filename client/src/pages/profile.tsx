import axios from 'axios';
import Router from 'next/router';
import { FormEvent, useState } from 'react';
import styles from '../styles/ProfilePage.module.scss';
import { Role } from '../types/Roles';
import { User } from '../types/User';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setDefaultUser } from '../store/userSlice';
import { RootState } from '../store/store';

export default function Profile(): JSX.Element {
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.user.currentUser);
  let isRegistred = useSelector((state: RootState) => state.user.isRegistred);
  let [newName, setNewName] = useState(user.login);
  let [newPwd, setNewPwd] = useState(user.password);

  async function updateAccount(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (newName.length > 25) {
      alert("Слишком длинное имя!");
      return;
    }

    let newUser = await axios.put(`http://localhost:5000/user/update?login=${user.login}&password=${user.password}`, {
      login: newName,
      password: newPwd
    });

    if (newUser.data) {
      dispatch(setUser(newUser.data));
      Router.push('/');
    } else {
      alert("Такое имя уже занято! Попробуйте другое.")
    }
  }

  function exitAccount(): void {
    dispatch(setDefaultUser());
    Router.push('/sign-in');
  }

  async function removeAccount(user: User): Promise<void> {
    let queryDel = confirm(`
      Вы действительно хотите удалить свой аккаунт без возможности восстановления?
      ${user.post == Role.Admin ? 'Права Администратора будут переданы другому случайному пользователю!' : ''}
    `);

    if (queryDel) {
      let deleteUser = await axios.delete(`http://localhost:5000/user/delete-account?id=${user._id}&login=${user.login}&password=${user.password}`);

      if (deleteUser.data) {
        dispatch(setDefaultUser());
        Router.push('/sign-up');
      } else {
        alert('ERROR!!!');
      }
    }
  }

  return (
    <div className="content-container">
      <h2 className="title">Ваш профиль</h2>
      <form className={styles.body} onSubmit={updateAccount}>
        <div className={styles.userAvatar}>
          <div className={styles.avatarImg}></div>
          <div className={styles.inputImg}>
            <input type="file" disabled={!isRegistred} />
            <label className="btn">Выбрать фото</label>
          </div>

        </div>
        <div className={styles.userInfo}>
          <input
            className={styles.userInput}
            value={newName}
            placeholder="Имя"
            disabled={!isRegistred}
            onChange={e => setNewName(e.target.value)}
          />
          <input
            className={styles.userInput}
            value={newPwd}
            placeholder="Пароль"
            disabled={!isRegistred}
            onChange={e => setNewPwd(e.target.value)}
          />
          <div className={styles.userPost}>
            Post: {user.post[0].toUpperCase() + user.post.slice(1)}
          </div>
        </div>
        <button
          className="btn"
          type="submit"
          disabled={!isRegistred || (user.login === newName || !newName.length) && user.password == newPwd || newPwd.length < 6}>
          Сохранить изменения
        </button>
      </form>
      <button
        className={"btn " + styles.btnExit}
        onClick={() => exitAccount()}
        disabled={!user._id.length}>
        Выйти из аккаунта
      </button>
      <button
        className={"btn " + styles.btnDelete}
        onClick={() => removeAccount(user)}
        disabled={!isRegistred}>
        Удалить аккаунт
      </button>
    </div>
  );
}