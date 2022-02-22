import { ChangeEvent, FormEvent, useState } from 'react';
import Compressor from 'compressorjs';
import styles from './styles/CreateMessage.module.scss';
import { User } from '../../types/User';

interface CreateMessageProps {
  currentUser: User,
  addMessage: (text: string, image: string, authorId: string) => Promise<void>
}

export default function CreateMessage({ currentUser, addMessage }: CreateMessageProps): JSX.Element {
  let [text, setText] = useState('');
  let [image, setImage] = useState('');
  let [disabled, setDisabled] = useState(false);

  async function formHandler(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setDisabled(true);

    await addMessage(text, image, currentUser._id);
    setDisabled(false);
    setText('');
    setImage('');
  }

  function changeImage(event: ChangeEvent<HTMLInputElement>): void {
    let file = event.target.files ? event.target.files[0] : null;

    if (!file) {
      return;
    }

    new Compressor(file, {
      quality: 0.5,

      success(result: File) {
        let reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = () => setImage(reader.result as string);
      },
      error(err) {
        alert('Ошибка при загрузке файла! ' + err.message);
      }
    });
  }

  return (
    <div className={styles.createMessage}>
      <form
        className={styles.createMessage__form}
        onSubmit={formHandler}
      >
        <div className={styles.textContainer}>
          <input
            className={styles.createMessage__input}
            placeholder={currentUser.banned ? 'Вы были заблокированы!' : 'Написать сообщение...'}
            type="text"
            value={text}
            disabled={currentUser.banned || disabled}
            onChange={e => setText(e.target.value)}
          />
          <button
            className={styles.createMessage__send}
            type="submit"
            disabled={currentUser.banned || !text.length && !image.length || disabled}
          >
            ОТПРАВИТЬ
          </button>
        </div>
        <div className={!currentUser.banned ? styles.inputImg : styles.inputImg + ' ' + styles.inputImg_disabled}>
          <div className={styles.fileInput}>
            <input type="file" accept="image/*" disabled={currentUser.banned} onChange={changeImage} />
            <label className="btn">Выбрать фото</label>
          </div>
          <div className={styles.imgSelected} style={{ color: image.length ? '#00a152' : 'inherit' }}>
            {image.length ? 'Выбрано' : 'Не выбрано'}
          </div>
        </div>
      </form>
    </div>
  );
}