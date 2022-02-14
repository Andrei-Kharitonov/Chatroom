import { UserAPI } from '../../api/userApi';
import { Role } from '../../types/Roles';
import { User } from '../../types/User';
import styles from './styles/Message.module.scss';

interface MessageProps {
  text: string,
  date: Date,
  id: string,
  removeMessage: (id: string) => Promise<void>,
  authorName: string,
  avatarUrl: string,
  currentUser: User
}

export default function Message({ text, date, id, removeMessage, avatarUrl, authorName, currentUser }: MessageProps): JSX.Element {
  if (authorName == currentUser.login) {
    return (
      <div className={styles.MyMessage}>
        <div className={styles.messageHeader}>
          <div className={styles.deleteBtn} onClick={() => removeMessage(id)} data-title="Удалить">&#10006;</div>
          <div className={styles.MyMessage__author}>
            Вы
          </div>
        </div>
        <p className={styles.text}>{text}</p>
        <div className={styles.date}>{new Date(date).toLocaleTimeString() + ', ' + new Date(date).toLocaleDateString()}</div>
      </div>
    );
  } else {
    return (
      <div className={styles.message}>
        <div className={styles.message__author}>
          <div className={styles.message__authorAvatar}>
            {avatarUrl.length ? <img className={styles.message__authorAvatar__img} src={UserAPI.getAvatarPaht(avatarUrl)!} /> : ''}
          </div>
          <div className={styles.messageHeader}>
            <div className={styles.message__authorName}>
              {authorName}
            </div>
            {currentUser.post == Role.Admin || currentUser.post == Role.Moderator
              ? <div className={styles.deleteBtn} onClick={() => removeMessage(id)} data-title="Удалить">&#10006;</div>
              : ''}
          </div>
        </div>
        <p className={styles.text}>{text}</p>
        <div className={styles.date}>{new Date(date).toLocaleTimeString() + ', ' + new Date(date).toLocaleDateString()}</div>
      </div>
    );
  }
}