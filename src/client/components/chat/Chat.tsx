import { useEffect, useState } from 'react';
import styles from './styles/Chat.module.scss';
import Message from './Message';
import { Message as MessageI } from '../../types/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreateMessage from './CreateMessage';
import Link from 'next/link';
import { MessageAPI } from '../../api/messageApi';

interface ChatProps {
  messages: MessageI[],
  getAuthorData: (authorId: string) => { name: string, avatar: string }
}

export default function Chat({ messages, getAuthorData }: ChatProps): JSX.Element {
  let [messageList, setMessageList] = useState(messages);
  let currentUser = useSelector((state: RootState) => state.currentUser.currentUser);
  let isRegistred = useSelector((state: RootState) => state.currentUser.isRegistred);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  useEffect(() => {
    scrollChat();
  }, [messageList.length, isRegistred]);

  function scrollChat(): void {
    let chat = document.querySelector('#chat');

    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  }

  async function addMessage(text: string, currentUserId: string): Promise<void> {
    let newMessage = await MessageAPI.create(text, currentUserId);

    setMessageList([...messageList, newMessage]);
    scrollChat();
  }

  async function removeMessage(id: string): Promise<void> {
    let queryDel = confirm('Вы действительно хотите удалить это сообщение?');

    if (queryDel) {
      let delMessage = await MessageAPI.delete(id, currentUser.login, currentUser.password);

      if (delMessage) {
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
                  authorName={getAuthorData(message.authorId).name}
                  avatar={getAuthorData(message.authorId).avatar}
                  currentUser={currentUser}
                />
              </li>
            );
          })}
        </ul>
        <CreateMessage currentUser={currentUser} addMessage={addMessage} />
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
        <CreateMessage currentUser={currentUser} addMessage={addMessage} />
      </div>
    );
  }
}