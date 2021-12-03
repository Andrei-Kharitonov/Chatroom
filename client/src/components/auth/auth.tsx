import { FormEvent, useState } from 'react';
import styles from './styles/auth.module.scss';

interface AuthProps {
  btnText: string,
}

export default function Auth({ btnText }: AuthProps): JSX.Element {
  let [name, setName] = useState('');
  let [pwd, setPwd] = useState('');

  function formHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(name);
    console.log(pwd);
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