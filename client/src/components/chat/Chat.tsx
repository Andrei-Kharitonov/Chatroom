import styles from './styles/Chat.module.scss';
import Message from './Message';
import { Message as MessageI } from '../../types/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ChatProps {
  messages: MessageI[],
  getName: Function,
  removeMessage: Function
}

export default function Chat({ messages, getName, removeMessage }: ChatProps): JSX.Element {
  let currentUser = useSelector((state: RootState) => state.user.currentUser);
  let isRegistred = useSelector((state: RootState) => state.user.isRegistred);

  if (messages.length && isRegistred) {
    return (
      <ul className={styles.chat__body}>
        {messages.map(message => {
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
    );
  } else if (!isRegistred) {
    return (
      <h3 style={{ textAlign: 'center' }}>Войдите в аккаунт чтобы увидеть сообщения.</h3>
    );
  } else {
    return (
      <h3 style={{ textAlign: 'center' }}>Нет сообщений.</h3>
    );
  }
}