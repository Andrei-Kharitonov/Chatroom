import { useEffect, useState } from 'react';
import styles from './styles/Chat.module.scss';
import Message from './Message';
import { Message as MessageI } from '../../types/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreateMessage from './CreateMessage';
import axios from 'axios';
import Link from 'next/link';

interface ChatProps {
  messages: MessageI[],
  getName: Function
}

export default function Chat({ messages, getName }: ChatProps): JSX.Element {
  let [messageList, setMessageList] = useState(messages);
  let currentUser = useSelector((state: RootState) => state.currentUser.currentUser);
  let isRegistred = useSelector((state: RootState) => state.currentUser.isRegistred);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  useEffect(() => {
    let chat = document.querySelector('#chat');

    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  }, [messageList.length]);

  async function addMessage(text: string, currentUserId: string): Promise<void> {
    let newMessage = await axios.post('http://localhost:5000/message/create', {
      text,
      authorId: currentUserId
    });

    setMessageList([...messageList, newMessage.data]);
    let chat = document.querySelector('#chat');
    chat!.scrollTop = chat!.scrollHeight;
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

  if (messages.length && isRegistred) {
    return (
      <div className={styles.chat}>
        <ul className={styles.chat__body} id="chat">
          {messageList.map(message => {
            return (
              <li className={styles.list} key={message._id}>
                <Message
                  text={message.text}
                  date={message.date}
                  id={message._id}
                  removeMessage={removeMessage}
                  authorName={getName(message.authorId)}
                  currentUser={currentUser}
                />
              </li>
            );
          })}
        </ul>
        <CreateMessage currentUser={currentUser} newMessageFunc={addMessage} />
      </div>
    );
  } else if (!isRegistred) {
    return (
      <div className={styles.chat}>
        <h3 style={{ textAlign: 'center' }}>
          <Link href='/sign-in'>
            <a>Войдите в аккаунт</a>
          </Link>
          &nbsp;чтобы увидеть сообщения.
        </h3>
      </div>
    );
  } else {
    return (
      <div className={styles.chat}>
        <h3 style={{ textAlign: 'center' }}>Нет сообщений.</h3>
        <CreateMessage currentUser={currentUser} newMessageFunc={addMessage} />
      </div>
    );
  }
}