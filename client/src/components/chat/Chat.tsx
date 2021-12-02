import styles from './styles/Chat.module.scss';
import CreateMessage from './CreateMessage';
import Message from './Message';

export default function Chat(): JSX.Element {
  let messages = [
    {
      authorName: 'Вася',
      id: 1,
      text: 'test'
    },
    {
      authorName: 'Петя',
      id: 2,
      text: 'test 123'
    },
    {
      authorName: 'Андрей Харитонов',
      id: 3,
      //text: 'some text'
      text: 'some text 123 1234 2135 12435 dfhg wer wgh wethy sthj sth weryw the rwhyw erhgdfj dfthst herh s.'
    }
  ];

  return (
    <div className={styles.chat}>
      <ul className={styles.chat__body}>
        {messages.map(message => {
          return (
            <li className={styles.list} key={message.id}>
              <Message
                text={message.text}
                authorName={message.authorName}
              />
            </li>
          );
        })}
      </ul>
      <CreateMessage />
    </div>
  );
}