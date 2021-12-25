import styles from './styles/Message.module.scss';

interface MessageProps {
  authorName: string,
  text: string,
}

export default function Message({ text, authorName }: MessageProps): JSX.Element {
  if (authorName == 'Андрей Харитонов') {
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
        <div className={styles.message__text}>{text}</div>
      </div>
    );
  }
}