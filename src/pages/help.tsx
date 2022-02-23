import Link from 'next/dist/client/link';
import styles from '../client/styles/HelpPage.module.scss';

export default function Help(): JSX.Element {
  return (
    <div className="content-container">
      <h2 className="title">Помощь</h2>
      <div className={styles.section}>
        <h3 className={styles.section__title}>Начало</h3>
        <p className={styles.section__text}>
          <span>Регистрация:&nbsp;</span>
          Чтобы начать работать с Chatroom, необходимо&nbsp;
          <Link href='/sign-up'>
            <a className='link'>создать аккаунт</a>
          </Link>
          &nbsp;или&nbsp;
          <Link href='/sign-in'>
            <a className='link'>войти в уже существующий</a>
          </Link>
          .
        </p>
        <p className={styles.section__text}><span>Отправка сообщений:&nbsp;</span>Чтобы отправить сообщение напечатайте текст в поле и/или выберети фото, а затем нажмите кнопку "отправить" или клавишу "Enter".</p>
        <p className={styles.section__text}><span>Отправка картинок:&nbsp;</span>Чтобы отправить картинку нажмите на кнопку "Выбрать фото" и выберите изображение, а затем нажмите кнопку "отправить" или клавишу "Enter".</p>
        <p className={styles.section__text}><span>Редактирование профиля:&nbsp;</span>Чтобы изменить свой логин, пароль или аватар перейдите на страницу "Профиль" и измените те данные, которые хотите поменять, а затем нажмите кнопку "Сохранить изменения".</p>
      </div>
      <div className={styles.section}>
        <h3 className={styles.section__title}>Роли пользователей</h3>
        <p className={styles.section__text}><span>User:&nbsp;</span>может читать и писать сообщения в чате, удалять свои сообщения.</p>
        <p className={styles.section__text}><span>Moderator:&nbsp;</span>может все тоже, что и user, плюс: удалять любые сообщения, блокировать пользователей (кроме администратора и других модераторов).</p>
        <p className={styles.section__text}><span>Admin:&nbsp;</span>может все тоже, что и moderator, плюс: удалять пользователей, блокировать любых пользователей, выдавать права модератора, передать право администратора другому пользователю. Администратором может быть только один пользователь.</p>
        <p className={styles.section__text}><span>Заблокированый пользователь:&nbsp;</span>Заблокированные пользователи отмечаются красным цветом в списке и не могут отправлять сообщения. Блокировать и разблокировать пользователей может только Admin или Moderator.</p>
      </div>
    </div>
  );
}