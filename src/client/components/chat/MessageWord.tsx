interface MessageTextProps {
  word: string
}

export default function MessageWord({ word }: MessageTextProps): JSX.Element {
  if (word.match(/^(https?:\/\/)(www\.)?\S+\.\S+/)) {
    return <><a className="link" href={word} target="_blank">{word}</a> </>;
  } else if (word.match(/^www\.\w+\.\w+/)) {
    return <><a className="link" href={`https://${word}`} target="_blank">{word}</a> </>;
  } else {
    return <>{word + ' '}</>;
  }
}