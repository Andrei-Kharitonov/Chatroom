import axios from 'axios';
import Link from 'next/link'
import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../styles/ProfilePage.module.scss';
import { Role } from '../types/Roles';
import { User } from '../types/User';

export default function Profile(): JSX.Element {
  let [user, setUser] = useState({
    _id: '',
    login: '',
    password: '',
    post: '',
    banned: false
  });
  let [newName, setNewName] = useState(user.login);
  let [newPwd, setNewPwd] = useState(user.password);

  useEffect(() => {
    let localStorageData: User | null = JSON.parse(localStorage.getItem('user')!);

    if (localStorageData) {
      setUser(localStorageData);
      setNewName(localStorageData.login);
      setNewPwd(localStorageData.password!);
    }
  }, []);

  async function formHandler(event: FormEvent<HTMLFormElement>): Promise<void | null> {
    event.preventDefault();
    if (newName.length > 25) {
      alert("Слишком длинное имя!");
      return null;
    }

    let newUser = await axios.put(`http://localhost:5000/user/update/?login=${user.login}&password=${user.password}`, {
      login: newName,
      password: newPwd
    });

    if (newUser.data) {
      localStorage.setItem('user', JSON.stringify(newUser.data));
      Router.push('/');
    } else {
      alert("Такое имя уже занято! Попробуйте другое.")
    }
  }

  function exitAccount(): void {
    localStorage.removeItem('user');
    Router.push('/sign-in');
  }

  async function removeAccount(user: User): Promise<void> {
    let queryDel = confirm(`
      Вы действительно хотите удалить свой аккаунт без возможности восстановления?
      ${user.post == Role.Admin ? 'Права Администратора будут переданы другому случайному пользователю!' : ''}
      `);

    if (queryDel) {
      let deleteUser = await axios.delete(`http://localhost:5000/user/delete-account/?id=${user._id}&login=${user.login}&password=${user.password}`);

      if (deleteUser.data) {
        localStorage.removeItem('user');
        Router.push('/sign-up');
      } else {
        alert('ERROR!!!');
      }
    }
  }

  return (
    <div className="content-container">
      <h2 className="title">Ваш профиль</h2>
      <form className={styles.body} onSubmit={formHandler}>
        <div className={styles.userAvatar}>
          <div className={styles.avatarImg}></div>
          <div className={styles.inputImg}>
            <input type="file" />
            <label className="btn">Выбрать фото</label>
          </div>

        </div>
        <div className={styles.userInfo}>
          <input
            className={styles.userInput}
            value={newName}
            placeholder="Имя"
            onChange={e => setNewName(e.target.value)}
          />
          <input
            className={styles.userInput}
            value={newPwd}
            placeholder="Пароль"
            onChange={e => setNewPwd(e.target.value)}
          />
          <div className={styles.userPost}>
            {user.post.length ? user.post[0].toUpperCase() + user.post.slice(1) : 'Post'}
          </div>
        </div>
        <button
          className="btn"
          type="submit"
          disabled={!user._id.length || (user.login === newName || !newName.length) && user.password == newPwd || newPwd.length < 6}>
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
        disabled={!user._id.length}>
        Удалить аккаунт
      </button>
    </div>
  );
}