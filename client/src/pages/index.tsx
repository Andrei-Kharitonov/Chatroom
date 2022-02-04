import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../components/chat/Chat';
import CreateMessage from '../components/chat/CreateMessage';
import UserList from '../components/chat/UserList';
import { RootState } from '../store/store';
import { Message } from '../types/Message';
import { SecurityUser } from '../types/User';
import styles from '../styles/Main.module.scss';

interface MainPageProps {
  users: SecurityUser[],
  messages: Message[]
}

function Main({ users, messages }: MainPageProps): JSX.Element {
  let currentUser = useSelector((state: RootState) => state.user.currentUser);
  let [messageList, setMessageList] = useState(messages);

  async function addMessage(text: string, currentUserId: string): Promise<void> {
    let newMessage = await axios.post('http://localhost:5000/message/create', {
      text,
      authorId: currentUserId
    });

    setMessageList([...messageList, newMessage.data]);
  }

  async function removeMessage(id: string): Promise<void> {
    let queryDel = confirm('Вы действительно хотите удалить это сообщение?');

    if (queryDel) {
      let delMessage = await axios.delete(`http://localhost:5000/message/delete/${id}?login=${currentUser.login}&password=${currentUser.password}`);

      if (delMessage.data) {
        setMessageList(messageList.filter(message => message._id != id));
      }
    }
  }

  function getAuthorName(authorId: string): string {
    let name = '';

    users.map(user => {
      if (user._id == authorId) {
        name = user.login;
      }
    });

    return name;
  }

  return (
    <div className="main-container">
      <UserList users={users} currentUser={currentUser} />
      <div className={styles.chat}>
        <Chat messages={messageList} getName={getAuthorName} removeMessage={removeMessage} />
        <CreateMessage currentUser={currentUser} newMessageFunc={addMessage} />
      </div>
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