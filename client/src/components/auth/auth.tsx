import { FormEvent, useState } from 'react';
import Router from 'next/router'
import styles from './styles/auth.module.scss';
import { User } from '../../types/User';

interface AuthProps {
  btnText: string,
  getUser: (login: string, password: string) => Promise<User | void>
}

export default function Auth({ btnText, getUser }: AuthProps): JSX.Element {
  let [login, setLogin] = useState('');
  let [pwd, setPwd] = useState('');

  async function formHandler(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    let user = await getUser(login, pwd);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      Router.push('/');
    }
  }

  return (
    <div className="content-container">
      <form onSubmit={formHandler}>
        <input
          className={styles.input}
          type="text"
          placeholder="Введите имя (уникальное)"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Введите пароль (не короче 6)"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
        />
        <button
          className="btn"
          type="submit"
          disabled={login.length == 0 || pwd.length < 6}>
          {btnText}
        </button>
      </form>
    </div>
  );
}