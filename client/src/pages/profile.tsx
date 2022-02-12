import Router from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '../styles/ProfilePage.module.scss';
import { Role } from '../types/Roles';
import { User } from '../types/User';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setDefaultUser } from '../store/currentUserSlice';
import { RootState } from '../store/store';
import { UserAPI } from '../api/userApi';

export default function Profile(): JSX.Element {
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.currentUser.currentUser);
  let isRegistred = useSelector((state: RootState) => state.currentUser.isRegistred);
  let [newName, setNewName] = useState(user.login);
  let [newPwd, setNewPwd] = useState(user.password);
  let [avatar, setAvatar] = useState<FormData>();
  let [isNewAvatar, setIsNewAvatar] = useState(false);
  let [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    setNewName(user.login);
    setNewPwd(user.password);
    setAvatarUrl(UserAPI.getAvatarPaht(user.avatarPath) ?? '');
  }, [isRegistred]);

  async function changeAvatar(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    let file = e.target.files ? e.target.files[0] : null;

    if (file) {
      let formData = new FormData();
      let reader = new FileReader();

      formData.append("image", file);

      reader.onloadend = () => setAvatarUrl(reader.result as string);
      reader.readAsDataURL(file);

      setAvatar(formData);
      setIsNewAvatar(true);
    }
  }

  async function updateAccount(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (newName.length > 25) {
      alert("Слишком длинное имя!");
      return;
    }

    let updateData = {
      login: newName,
      password: newPwd
    }

    if (avatar && avatarUrl != user.avatarPath) {
      await UserAPI.uploadAvatar(user.login, user.password, user.avatarPath, avatar);
      setIsNewAvatar(false);
    }
    let updatedUser = await UserAPI.update(user.login, user.password, updateData);

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
            {avatarUrl ? <img className={styles.avatar__img} src={avatarUrl} /> : ''}
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