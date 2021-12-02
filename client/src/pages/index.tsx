import Chat from '../components/chat/Chat';
import UserList from '../components/chat/UserList';

export default function Home(): JSX.Element {
  return (
    <div className="main-container">
      <UserList />
      <Chat />
    </div>
  );
}