export const comma = (num: number) => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

export const uncomma = (str: String) => {
  return str.replace(/[^-.\d]/g, '');
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
    return 'Invalid phone number';
  }

  let formattedNumber: string = phoneNumber;

  if (phoneNumber.length === 10) {
    formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  } else if (phoneNumber.length === 11) {
    formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  return formattedNumber;
};

export const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
