interface MessageTextProps {
  text: string
}

export default function MessageText({ text }: MessageTextProps): JSX.Element {
  return (
    <>{
      text.split(' ').map(word => {
        if (word.match(/^(https?:\/\/)(www\.)?\S+\.\w+/)) {
          return <><a className="link" href={word} target="_blank">{word}</a> </>;
        } else if (word.match(/^www\.\S+\.\w+/)) {
          return <><a className="link" href={`https://${word}`} target="_blank">{word}</a> </>;
        } else {
          return <>{word + ' '}</>;
        }
      })
    }</>
  );
}