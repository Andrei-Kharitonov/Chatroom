import axios from 'axios';
import Chat from '../components/chat/Chat';
import UserList from '../components/chat/UserList';
import { SecurityUser } from '../types/User';

interface MainPageProps {
  users: SecurityUser[]
}

function Main({ users }: MainPageProps): JSX.Element {
  return (
    <div className="main-container">
      <UserList users={users} />
      <Chat />
    </div>
  );
}

export async function getServerSideProps() {
  let res = await axios.get('http://localhost:5000/user/get-all');
  let users: SecurityUser[] = res.data;

  return {
    props: { users }
  }
}

export default Main;