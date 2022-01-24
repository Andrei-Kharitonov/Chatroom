import { User } from '../../types/User';
import styles from './styles/Message.module.scss';

interface MessageProps {
  authorName: string,
  text: string,
  currentUser: User
}

export default function Message({ text, authorName, currentUser }: MessageProps): JSX.Element {
  if (authorName == currentUser.login) {
    return (
      <div className={styles.MyMessage}>
        <div className={styles.MyMessage__author}>
          Вы
        </div>
        <div className={styles.MyMessage__text}>{text}</div>
      </div>
    );
  } else {
    return (
      <div className={styles.message}>
        <div className={styles.message__author}>
          <div className={styles.message__authorAvatar}>
            <div></div>
          </div>
          <div className={styles.message__authorName}>
            {authorName}
          </div>
        </div>
        <div>{text}</div>
      </div>
    );
  }
}