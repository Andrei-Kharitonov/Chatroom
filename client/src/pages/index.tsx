import Chat from '../components/Chat';
import UserList from '../components/UserList';
import styles from '../styles/index.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className={styles.main__container}>
      <UserList />
      <Chat />
    </div>
  );
}