import Link from 'next/link'
import styles from '../styles/AuthPage.module.scss';
import Auth from "../components/auth/auth";
import { User } from '../types/User';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/currentUserSlice';
import { UserAPI } from '../api/userApi';

export default function SignIn(): JSX.Element {
  let dispatch = useDispatch();

  async function getUser(login: string, password: string): Promise<User | void> {
    let user = await UserAPI.getByLogin(login, password);

    if (!user) {
      alert("Неверно указано имя пользователя или пароль")
    } else {
      dispatch(setUser(user));
      return user;
    }
  }

  return (
    <div className={styles.container}>
      <h2 className="title">
        Войти в аккаунт
      </h2>
      <Auth btnText="Войти в систему" getUser={getUser} />
      <p className={styles.text}>
        <Link href="/sign-up">
          <a>
            Создайте аккаунт
          </a>
        </Link>
        <span>, если его нет.</span>
      </p>
    </div>
  );
}