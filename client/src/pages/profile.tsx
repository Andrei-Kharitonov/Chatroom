import axios from 'axios';
import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../styles/ProfilePage.module.scss';
import { User } from '../types/User';

export default function Profile(): JSX.Element {
  let [user, setUser] = useState({
    _id: '1',
    login: 'Anonim',
    password: '000000',
    post: 'none',
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

    if (newName.length <= 0) {
      alert("Введите имя!");
      return null;
    } if (newPwd.length < 6) {
      alert("Слишком короткий пароль!");
      return null;
    } if (newName.length > 25) {
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
      alert("Неверно введены данные!")
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
            {user.post[0].toUpperCase() + user.post.slice(1)}
          </div>
        </div>
        <button className="btn" type="submit">Сохранить</button>
      </form>
    </div>
  );
}