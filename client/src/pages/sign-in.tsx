import Link from 'next/link'
import axios from 'axios';
import styles from '../styles/AuthPage.module.scss';
import Auth from "../components/auth/auth";
import { User } from '../types/User';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/currentUserSlice';

export default function SignIn(): JSX.Element {
  let dispatch = useDispatch();

  async function getUser(name: string, pwd: string): Promise<User | void> {
    let response = await axios.get(`http://localhost:5000/user/get-by-login?login=${name}&password=${pwd}`);

    if (!response.data) {
      alert("Неверно указано имя пользователя или пароль")
    } else {
      dispatch(setUser(response.data));
      return response.data;
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