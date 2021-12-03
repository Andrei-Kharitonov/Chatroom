import { FormEvent, useState } from 'react';
import axios from 'axios';
import styles from './styles/CreateMessage.module.scss';

export default function CreateMessage(): JSX.Element {
  let [value, setValue] = useState('');

  function formHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios.post('http://localhost:3000/create', {
      text: value
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className={styles.createMessage}>
      <form
        className={styles.createMessage__form}
        onSubmit={formHandler}
      >
        <input
          className={styles.createMessage__input}
          placeholder="Написать сообщение..."
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button className={styles.createMessage__send} type="submit">ОТПРАВИТЬ</button>
      </form>
    </div>
  );
}