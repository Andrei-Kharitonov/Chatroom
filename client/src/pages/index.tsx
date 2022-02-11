import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../components/chat/Chat';
import UserList from '../components/chat/UserList';
import { RootState } from '../store/store';
import { Message } from '../types/Message';
import { SecurityUser } from '../types/User';
import { UserAPI } from '../api/userApi'
import { MessageAPI } from '../api/messageApi';

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
        let updatedUsers = await UserAPI.getAll();
        let updatedMessages = await MessageAPI.getAll();

        if (updatedUsers && updatedMessages) {
          setUserList(updatedUsers);
          setMessageList(updatedMessages);
        } else {
          alert('NETWORK ERROR!');
        }
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
  let users = await UserAPI.getAll();
  let messages = await MessageAPI.getAll();

  return {
    props: { users, messages }
  }
}

export default Main;