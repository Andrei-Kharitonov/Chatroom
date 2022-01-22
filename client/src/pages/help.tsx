import Link from 'next/dist/client/link';
import styles from '../styles/HelpPage.module.scss';

export default function Help(): JSX.Element {
  return (
    <div className="content-container">
      <h2 className="title">Помощь</h2>
      <div className={styles.section}>
        <h3 className={styles.section__title}>Начало</h3>
        <p className={styles.section__text}>
          Чтобы начать работать с Chatroom, необходимо&nbsp;
          <Link href='/sign-up'>
            <a>создать аккаунт</a>
          </Link>
          &nbsp;или&nbsp;
          <Link href='/sign-in'>
            <a>войти в уже существующий.</a>
          </Link>
        </p>
      </div>
      <div className={styles.section}>
        <h3 className={styles.section__title}>Роли пользователей</h3>
        <p className={styles.section__text}><span>User:&nbsp;</span>может читать и писать сообщения в чате, удалять свои сообщения.</p>
        <p className={styles.section__text}><span>Moderator:&nbsp;</span>может все тоже, что и user, плюс: удалять любые сообщения, блокировать пользователей (за исключением администратора и других модераторов).</p>
        <p className={styles.section__text}><span>Admin:&nbsp;</span>может все тоже, что и moderator, плюс: выдавать права модератора, передать право администратора другому пользователю. Администратором может быть только один пользователь.</p>
      </div>
    </div>
  );
}