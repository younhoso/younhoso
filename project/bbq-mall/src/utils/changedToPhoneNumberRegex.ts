export const phoneNumberRegex = /^\d{3}-?\d{4}-?\d{4}$/;

export const onlyNumberRegex = /[^\d]+/g;

export const changedToPhoneNumberRegex = (value: string) => {
  return value.replace(onlyNumberRegex, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};
