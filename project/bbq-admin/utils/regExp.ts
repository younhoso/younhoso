export const formatPhoneNumber = (input: string): string => {
  // 숫자만 추출
  const numbers = input.replace(/\D/g, '');

  // 추출된 숫자가 11자리가 아니면 에러 메시지 반환
  if (numbers.length !== 11) {
    return '유효하지 않은 번호입니다. 번호는 11자리 숫자여야 합니다.';
  }

  // 정규 표현식을 사용하여 형식에 맞게 변환
  const formatted = numbers.replace(/^\d{2,3}-\d{3,4}-\d{4}$/, '$1-$2-$3');
  return formatted;
};
