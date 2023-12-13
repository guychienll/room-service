import { MouseEvent, useRef, useState } from 'react';

export function useLongPress(ms = 1000) {
  let timer = useRef<NodeJS.Timeout | undefined>(undefined).current;
  const [isLongPressing, setIsLongPressing] = useState(false);

  return {
    onMouseDown: (e: MouseEvent) => {
      e.preventDefault();
      timer = setTimeout(() => {
        setIsLongPressing(true);
      }, ms);
    },
    onMouseUp: () => {
      clearTimeout(timer);
      setIsLongPressing(false);
    },
    isLongPressing,
  };
}
