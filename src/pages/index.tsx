import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../client/components/chat/Chat';
import UserList from '../client/components/chat/UserList';
import { RootState } from '../client/store/store';
import { Message } from '../client/types/Message';
import { SecurityUser } from '../client/types/User';
import { UserAPI } from '../client/api/userApi'
import { MessageAPI } from '../client/api/messageApi';

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

  function getAuthorData(authorId: string): { name: string, avatar: string } {
    let userData = {
      name: 'none',
      avatar: ''
    }

    userList.map(user => {
      if (user._id == authorId) {
        userData.name = user.login;
        userData.avatar = user.avatar;
      }
    });

    return userData;
  }

  return (
    <div className="main-container">
      <UserList users={userList} />
      <Chat messages={messageList} getAuthorData={getAuthorData} />
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