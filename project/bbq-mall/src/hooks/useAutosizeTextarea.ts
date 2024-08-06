import { RefObject, useEffect, useRef } from 'react';

const useAutosizeTextArea = (value: string) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef?.current, value]);

  return textAreaRef;
};

export default useAutosizeTextArea;
