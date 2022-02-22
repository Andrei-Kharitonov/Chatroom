import { useState } from 'react';
import { Role } from '../../types/Roles';
import { User } from '../../types/User';
import MessageText from './MessageText';
import Modal from './Modal';
import styles from './styles/Message.module.scss';

interface MessageProps {
  text: string,
  image: string,
  date: number,
  id: string,
  removeMessage: (id: string) => Promise<void>,
  authorName: string,
  avatar: string,
  currentUser: User
}

interface MessageBodyProps {
  text: string,
  image: string,
  date: number
}

export default function Message({ text, image, date, id, removeMessage, avatar, authorName, currentUser }: MessageProps): JSX.Element {
  if (authorName == currentUser.login) {
    return (
      <div className={styles.MyMessage}>
        <div className={styles.messageHeader}>
          <div className={styles.deleteBtn} onClick={() => removeMessage(id)}>&#10006;</div>
          <div className={styles.MyMessage__author}>
            Вы
          </div>
        </div>
        <MessageBody text={text} image={image} date={date} />
      </div>
    );
  } else {
    return (
      <div className={styles.message}>
        <div className={styles.message__author}>
          <div className={styles.message__authorAvatar}>
            {avatar.length ? <img className={styles.message__authorAvatar__img} src={avatar} /> : ''}
          </div>
          <div className={styles.messageHeader}>
            <div className={styles.message__authorName}>
              {authorName}
            </div>
            {currentUser.post == Role.Admin || currentUser.post == Role.Moderator
              ? <div className={styles.deleteBtn} onClick={() => removeMessage(id)}>&#10006;</div>
              : ''}
          </div>
        </div>
        <MessageBody text={text} image={image} date={date} />
      </div>
    );
  }
}

function MessageBody({ text, image, date }: MessageBodyProps): JSX.Element {
  let [modalActive, setModalActive] = useState(false);
  let dateString = new Date(date).toLocaleTimeString().slice(0, 5) + ', ' + new Date(date).toLocaleDateString();

  function onModalClose() {
    setModalActive(false);
  }

  return (
    <>
      <div className={styles.text}>
        <MessageText text={text} />
      </div>
      {image.length ?
        <div className={styles.image} onClick={() => setModalActive(true)}>
          <img className={styles.image__img} src={image} />
        </div> : ''}
      <div className={styles.date}>{dateString}</div>
      <Modal visible={modalActive} image={image} onClose={onModalClose} />
    </>
  );
}