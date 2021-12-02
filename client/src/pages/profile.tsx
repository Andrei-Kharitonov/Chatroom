import { useState } from 'react';
import styles from '../styles/Profile.module.scss'

interface ProfileProps {
  name: string,
  post: string
}

export default function Profile({ name, post }: ProfileProps): JSX.Element {
  let [newName, setNewName] = useState(name = 'Андрей Харитонов');

  function formHandler(event: any) {
    event.preventDefault();
    console.log(newName);
  }

  return (
    <div className={styles.container}>
      <h2 className="title">Ваш профиль</h2>
      <form className={styles.body} onSubmit={formHandler}>
        <div className={styles.userAvatar}></div>
        <div className={styles.userInfo}>
          <input
            className={styles.userName}
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <div className={styles.userPost}>{post = 'Admin'}</div>
        </div>
        <button className="btn" type="submit">Сохранить</button>
      </form>
    </div>
  );
}