export function selectClose<T extends HTMLElement>(target: T, onClose: () => void) {
  let startX: number;
  let currentX: number;
  let startY: number; // 터치 시작 지점의 Y 좌표
  let currentY: number; // 현재 터치 위치의 Y 좌표
  let initialTranslateY: number; // 초기 translateY 값
  let dir: string | null = null;

  const touchStart = (e: TouchEvent) => {
    // 터치 시작 시 X, Y 좌표 저장
    [startX, startY] = [e.touches[0].clientX, e.touches[0].clientY];
    [currentX, currentY] = [startX, startY];
    initialTranslateY = 0; // 초기 translateY 값 저장
  };

  const touchMove = (e: TouchEvent) => {
    currentX = e.touches[0].clientX; // 터치 이동 중 X 좌표 업데이트
    currentY = e.touches[0].clientY; // 터치 이동 중 Y 좌표 업데이트

    const deltaX = currentX - startX; // 이동 거리 계산
    const deltaY = currentY - startY;
    // 세로 스와이프일 때만 함께 움직이도록 처리
    if (Math.abs(deltaY) > 10 && dir !== 'horizontal') {
      dir = 'vertical'; // 세로 스크롤 중 가로 스와이프 중복 방지
      e.preventDefault(); // 스크롤 방지
      const move = initialTranslateY + deltaY;
      target.style.transition = '0s';
      target.style.transform = `translateY(${move < 0 ? 0 : move}px)`; // 요소 위치 변경
    }

    if (Math.abs(deltaX) > 10 && dir === null) {
      dir = 'horizontal';
    }
  };

  const touchEnd = () => {
    const deltaY = currentY - startY; // 이동 거리 계산
    target.style.transition = '0.15s';

    // 세로 스와이프일 때만 처리
    if (Math.abs(deltaY) > 100 && deltaY > 0 && dir === 'vertical') {
      target.style.transform = `translateY(70vh)`;
      onClose();
    } else {
      // 요소 위치 초기화
      target.style.transform = `translateY(${initialTranslateY}px)`;
    }

    dir = null;
  };

  return { touchStart, touchMove, touchEnd };
}
