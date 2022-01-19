import { FormEvent, useState } from 'react';
import Router from 'next/router'
import axios from 'axios';
import styles from './styles/auth.module.scss';

interface AuthProps {
  btnText: string,
  move: string
}

export default function Auth({ btnText, move }: AuthProps): JSX.Element {
  let [name, setName] = useState('');
  let [pwd, setPwd] = useState('');

  function formHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pwd.length < 6 || name.length <= 0) return null;

    axios.post(`http://localhost:5000/user/${move}`, {
      login: name,
      password: pwd
    })
      .then(response => {
        if (!response.data) {
          alert("Такое имя уже существует. Выберети другое.")
        } else {
          Router.push('/');
        }
      })
      .catch(error => {
        alert("ERROR! " + error);
      });
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