import { FormEvent, useState } from 'react';
import styles from '../styles/CreateMessage.module.scss';

export default function CreateMessage(): JSX.Element {
  let [value, setValue] = useState('');

  function formHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(value);

    setValue('');
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