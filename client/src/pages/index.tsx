import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../components/chat/Chat';
import UserList from '../components/chat/UserList';
import { RootState } from '../store/store';
import { Message } from '../types/Message';
import { SecurityUser } from '../types/User';

interface MainPageProps {
  users: SecurityUser[],
  messages: Message[]
}

function Main({ users, messages }: MainPageProps): JSX.Element {
  let [userList, setUserList] = useState(users);
  let [messageList, setMessageList] = useState(messages);
  let isRegistred = useSelector((state: RootState) => state.currentUser.isRegistred);

  useEffect(() => {
    if (isRegistred) {
      let update = setInterval(async () => {
        let updateUsers = await axios.get('http://localhost:5000/user/get-all');
        let updateMessages = await axios.get('http://localhost:5000/message/get-all');

        setUserList(updateUsers.data);
        setMessageList(updateMessages.data);
      }, 2000);

      return () => clearInterval(update);
    }
  }, [isRegistred]);

  function getAuthorName(authorId: string): string {
    let name = 'none';

    userList.map(user => {
      if (user._id == authorId) {
        name = user.login;
      }
    });

    return name;
  }

  return (
    <div className="main-container">
      <UserList users={userList} />
      <Chat messages={messageList} getName={getAuthorName} />
    </div>
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