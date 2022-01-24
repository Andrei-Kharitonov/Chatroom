import axios from 'axios';
import Chat from '../components/chat/Chat';
import { Message } from '../types/Message';
import { SecurityUser } from '../types/User';

interface MainPageProps {
  users: SecurityUser[],
  messages: Message[]
}

function Main({ users, messages }: MainPageProps): JSX.Element {
  return (
    <Chat users={users} messages={messages} />
  );
}

export async function getServerSideProps() {
  let resUsers = await axios.get('http://localhost:5000/user/get-all');
  let resMessages = await axios.get('http://localhost:5000/message/get-all');
  let users: SecurityUser[] = resUsers.data;
  let messages: Message[] = resMessages.data;

  return {
    props: { users, messages }
  }
}

export default Main;