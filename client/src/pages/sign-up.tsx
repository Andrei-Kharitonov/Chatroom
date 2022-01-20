import Link from 'next/link'
import axios from 'axios';
import styles from '../styles/authPage.module.scss';
import Auth from '../components/auth/auth';
import { User } from '../types/User';

export default function SignUp(): JSX.Element {
  async function createUser(name: string, pwd: string): Promise<void | User> {
    let response = await axios.post('http://localhost:5000/user/create', {
      login: name,
      password: pwd
    });

    if (!response.data) {
      alert("Такое имя уже существует. Выберети другое.");
    } else {
      return response.data;
    }
  }

  return (
    <div className={styles.container}>
      <h2 className="title">
        Создать аккаунт
      </h2>
      <Auth btnText="Зарегистрироваться" move={createUser} />
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