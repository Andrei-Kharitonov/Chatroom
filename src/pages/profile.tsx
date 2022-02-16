import Router from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '../client/styles/ProfilePage.module.scss';
import { Role } from '../client/types/Roles';
import { User } from '../client/types/User';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setDefaultUser } from '../client/store/currentUserSlice';
import { RootState } from '../client/store/store';
import { UserAPI } from '../client/api/userApi';

export default function Profile(): JSX.Element {
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.currentUser.currentUser);
  let isRegistred = useSelector((state: RootState) => state.currentUser.isRegistred);
  let [newName, setNewName] = useState(user.login);
  let [newPwd, setNewPwd] = useState(user.password);
  let [isNewAvatar, setIsNewAvatar] = useState(false);
  let [avatar, setAvatar] = useState('');

  useEffect(() => {
    setNewName(user.login);
    setNewPwd(user.password);
    setAvatar(user.avatar ?? '');
  }, [isRegistred]);

  async function changeAvatar(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    let file = e.target.files ? e.target.files[0] : null;

    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        if (new Blob([reader.result]).size < 1571864) {
          setAvatar(reader.result as string);
        } else {
          alert('Слишком большой файл. Выберети файл не больше 1.5 Mb!');
        }

      }
      reader.readAsDataURL(file);

      setIsNewAvatar(true);
    }
  }

  async function updateAccount(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (newName.length > 25) {
      alert("Слишком длинное имя!");
      return;
    }

    let updatedUser = await UserAPI.update(user.login, user.password, {
      login: newName,
      password: newPwd,
      avatar
    });

    if (updatedUser) {
      dispatch(setUser(updatedUser));
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
      let deleteUser = await UserAPI.deleteAccount(user._id, user.login, user.password);

      if (deleteUser) {
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
          <div className={styles.avatar}>
            {avatar.length ? <img className={styles.avatar__img} src={avatar} /> : ''}
          </div>
          <div className={styles.inputImg}>
            <input type="file" accept="image/*" disabled={!isRegistred} onChange={changeAvatar} />
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
          disabled={!isRegistred || !isNewAvatar && (user.login == newName || !newName.length) && user.password == newPwd || newPwd.length < 6}>
          Сохранить изменения
        </button>
      </form>
      <button
        className={"btn " + styles.btnExit}
        onClick={() => exitAccount()}
        disabled={!isRegistred}>
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