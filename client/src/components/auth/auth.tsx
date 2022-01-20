import { FormEvent, useState } from 'react';
import Router from 'next/router'
import styles from './styles/auth.module.scss';

interface AuthProps {
  btnText: string,
  move: Function
}

export default function Auth({ btnText, move }: AuthProps): JSX.Element {
  let [name, setName] = useState('');
  let [pwd, setPwd] = useState('');

  async function formHandler(event: FormEvent<HTMLFormElement>): Promise<void | null> {
    event.preventDefault();
    if (pwd.length < 6 || name.length <= 0) return null;

    let user = await move(name, pwd);
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
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Введите пароль (не короче 6)"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
        />
        <button className="btn" type="submit">
          {btnText}
        </button>
      </form>
    </div>
  );
}