import Link from 'next/link'
import axios from 'axios';
import styles from '../styles/AuthPage.module.scss';
import Auth from '../components/auth/auth';
import { User } from '../types/User';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/currentUserSlice';

export default function SignUp(): JSX.Element {
  let dispatch = useDispatch();

  async function createUser(name: string, pwd: string): Promise<User | void> {
    let response = await axios.post('http://localhost:5000/user/create', {
      login: name,
      password: pwd
    });

    if (!response.data) {
      alert("Такое имя уже существует. Выберети другое.");
    } else {
      dispatch(setUser(response.data));
      return response.data;
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