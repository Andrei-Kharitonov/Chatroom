import Link from 'next/link'
import styles from '../styles/AuthPage.module.scss';
import Auth from '../components/auth/auth';
import { User } from '../types/User';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/currentUserSlice';
import { UserAPI } from '../api/userApi';

export default function SignUp(): JSX.Element {
  let dispatch = useDispatch();

  async function createUser(login: string, password: string): Promise<User | void> {
    let user = await UserAPI.create(login, password);

    if (!user) {
      alert("Такое имя уже существует. Выберети другое.");
    } else {
      dispatch(setUser(user));
      return user;
    }
  }

  return (
    <div className={styles.container}>
      <h2 className="title">
        Создать аккаунт
      </h2>
      <Auth btnText="Зарегистрироваться" getUser={createUser} />
      <p className={styles.text}>
        <Link href="/sign-in">
          <a>
            Войдите в аккаунт
          </a>
        </Link>
        <span>, если он есть.</span>
      </p>
    </div>
  );
}