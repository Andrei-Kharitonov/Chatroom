import styles from './styles/Chat.module.scss';
import UserList from './UserList';
import CreateMessage from './CreateMessage';
import Message from './Message';
import { SecurityUser, User } from '../../types/User';
import { Message as MessageI } from '../../types/Message';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ChatProps {
  users: SecurityUser[],
  messages: MessageI[]
}

export default function Chat({ users, messages }: ChatProps): JSX.Element {
  let [messageList, setMessageList] = useState(messages);
  let [currentUser, setCurrentUser] = useState({
    _id: '',
    login: '',
    password: '',
    post: 'none',
    banned: true
  });

  useEffect(() => {
    let localStorageData: User | null = JSON.parse(localStorage.getItem('user')!);

    if (localStorageData) {
      setCurrentUser(localStorageData);
    }
  }, []);

  async function addMessage(text: string, currentUserId: string): Promise<void> {
    let newMessage = await axios.post('http://localhost:5000/message/create', {
      text,
      authorId: currentUserId
    });

    setMessageList([...messageList, newMessage.data]);
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
      <UserList users={users} />
      <div className={styles.chat}>
        {messageList.length
          ? <ul className={styles.chat__body}>
            {messageList.map(message => {
              return (
                <li className={styles.list} key={message._id}>
                  <Message
                    text={message.text}
                    authorName={getAuthorName(message.authorId)}
                    currentUser={currentUser}
                  />
                </li>
              );
            })}
          </ul>
          : <h3 style={{ textAlign: 'center' }}>Нет сообщений.</h3>}
        <CreateMessage currentUser={currentUser} newMessageFunc={addMessage} />
      </div>
    </div>
  );
}