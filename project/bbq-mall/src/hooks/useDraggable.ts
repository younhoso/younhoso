import { MouseEvent, RefObject, useEffect, useState } from 'react';

type DragState = {
  isDragging: boolean;
  isPopup: boolean;
  startPosition: { x: number; y: number } | null;
  currentPosition: { x: number; y: number } | null;
};

const initialDragState: DragState = {
  isDragging: false,
  isPopup: false,
  startPosition: null,
  currentPosition: null,
};

export const useDraggable = (
  target: RefObject<HTMLElement>,
  elementBox: RefObject<HTMLElement>,
) => {
  const [dragState, setDragState] = useState<DragState>(initialDragState);
  const [move, setMove] = useState(0);

  const handleIsPopup = (e: MouseEvent<HTMLDivElement>) => {
    // 배경화면을 클릭하면 사라지는 함수
    if (e.target === e.currentTarget) {
      setDragState(initialDragState);
      // 요소 위치 초기화
      elementBox.current && (elementBox.current.style.transform = `translateY(100%)`);
    }
  };

  const touchStart = (e: TouchEvent) => {
    setDragState({
      isDragging: true,
      isPopup: true,
      startPosition: { x: e.touches[0].clientX, y: e.touches[0].clientY },
      currentPosition: dragState.currentPosition,
    });
  };

  const touchMove = (e: TouchEvent) => {
    if (!dragState.isDragging) return;
    setDragState({
      ...dragState,
      currentPosition: { x: e.touches[0].clientX, y: e.touches[0].clientY },
    });

    if (dragState.isDragging && dragState.startPosition && dragState.currentPosition) {
      const deltaY = dragState.currentPosition.y - dragState.startPosition.y;
      if (Math.abs(deltaY) > 10 && elementBox.current) {
        setMove(deltaY);
        elementBox.current.style.transition = '0s';
        elementBox.current.style.transform = `translateY(${move < 0 ? 0 : move}px)`;
      }

      if (Math.abs(deltaY) > 100 && elementBox.current) {
        elementBox.current.style.transition = '0.15s';
        elementBox.current.style.transform = `translateY(100%)`;
      }
    }
  };

  const touchEnd = () => {
    const { startPosition, currentPosition } = dragState;
    if (startPosition && currentPosition) {
      const deltaY = currentPosition?.y - startPosition.y;
      const shouldMoveElement = Math.abs(deltaY) > 100;

      elementBox.current &&
        (elementBox.current.style.transform = `translateY(${shouldMoveElement ? '100%' : `${0}px`})`);

      if (shouldMoveElement) {
        setDragState({
          ...dragState,
          isPopup: false,
        });
      }
    }
  };

  useEffect(() => {
    const element = target.current;
    if (element) {
      element.addEventListener('touchstart', touchStart);
      element.addEventListener('touchmove', touchMove);
      element.addEventListener('touchend', touchEnd);
      return () => {
        element.removeEventListener('touchstart', touchStart);
        element.removeEventListener('touchmove', touchMove);
        element.removeEventListener('touchend', touchEnd);
      };
    }
  }, [target, touchStart, touchMove, touchEnd]);

  return { ...dragState, setDragState, handleIsPopup };
};
