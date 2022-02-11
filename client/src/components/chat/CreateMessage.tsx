import { FormEvent, useState } from 'react';
import styles from './styles/CreateMessage.module.scss';
import { User } from '../../types/User';

interface CreateMessageProps {
  currentUser: User,
  addMessage: (text: string, authorId: string) => Promise<void>
}

export default function CreateMessage({ currentUser, addMessage }: CreateMessageProps): JSX.Element {
  let [value, setValue] = useState('');
  let [disabled, setDisabled] = useState(false);

  async function formHandler(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setDisabled(true);

    await addMessage(value, currentUser._id);
    setDisabled(false);
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
          placeholder={currentUser.banned ? 'Вы были заблокированы!' : 'Написать сообщение...'}
          type="text"
          value={value}
          disabled={currentUser.banned || disabled}
          onChange={e => setValue(e.target.value)}
        />
        <button
          className={styles.createMessage__send}
          type="submit"
          disabled={currentUser.banned || disabled}
        >
          ОТПРАВИТЬ
        </button>
      </form>
    </div>
  );
}