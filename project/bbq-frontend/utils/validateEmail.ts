// 이메일 주소 형식을 검사하는 정규식
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const validateEmail = (value: string) => {
  return emailPattern.test(value);
};
