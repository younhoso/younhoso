export const validatePassword = (value: string) => {
  // 8자 이상
  if (value.length < 8) {
    return false;
  }

  // 영어 글자 포함
  if (!/[a-zA-Z]/.test(value)) {
    return false;
  }

  // 특수문자 글자 포함
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
    return false;
  }

  return true;
};
