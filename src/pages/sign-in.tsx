import Link from 'next/link'
import styles from '../client/styles/authPage.module.scss';
import Auth from "../client/components/auth/auth";
import { User } from '../client/types/User';
import { useDispatch } from 'react-redux';
import { setUser } from '../client/store/currentUserSlice';
import { UserAPI } from '../client/api/userApi';

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
          <a className='link'>
            Создайте аккаунт
          </a>
        </Link>
        <span>, если его нет.</span>
      </p>
    </div>
  );
}