import { Role } from '../../types/Roles';
import { User } from '../../types/User';
import MessageText from './MessageText';
import styles from './styles/Message.module.scss';

interface MessageProps {
  text: string,
  date: Date,
  id: string,
  removeMessage: (id: string) => Promise<void>,
  authorName: string,
  avatar: string,
  currentUser: User
}

export default function Message({ text, date, id, removeMessage, avatar, authorName, currentUser }: MessageProps): JSX.Element {
  if (authorName == currentUser.login) {
    return (
      <div className={styles.MyMessage}>
        <div className={styles.messageHeader}>
          <div className={styles.deleteBtn} onClick={() => removeMessage(id)}>&#10006;</div>
          <div className={styles.MyMessage__author}>
            Вы
          </div>
        </div>
        <div className={styles.text}>
          <MessageText text={text} />
        </div>
        <div className={styles.date}>{new Date(date).toLocaleString()}</div>
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
        <div className={styles.text}>
          <MessageText text={text} />
        </div>
        <div className={styles.date}>{new Date(date).toLocaleString()}</div>
      </div>
    );
  }
}