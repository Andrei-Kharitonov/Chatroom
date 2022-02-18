import Link from 'next/link'
import styles from '../client/styles/authPage.module.scss';
import Auth from '../client/components/auth/auth';
import { User } from '../client/types/User';
import { useDispatch } from 'react-redux';
import { setUser } from '../client/store/currentUserSlice';
import { UserAPI } from '../client/api/userApi';

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
          <a className='link'>
            Войдите в аккаунт
          </a>
        </Link>
        <span>, если он есть.</span>
      </p>
    </div>
  );
}