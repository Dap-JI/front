type LinkifyTextProps = {
  text: string;
};

const LinkifyText = ({ text }: LinkifyTextProps) => {
  // URL을 감지하는 정규식
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // 텍스트를 링크로 변환하는 함수
  const linkify = (text: string) => {
    return text.split(urlRegex).map((part, index) => {
      // 정규식에 맞는 부분을 링크로 변환
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      // 나머지 텍스트는 그대로 반환
      return part;
    });
  };

  return <div>{linkify(text)}</div>;
};

export default LinkifyText;
