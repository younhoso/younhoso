import { onlyNumberRegex } from './changedToPhoneNumberRegex';

export const changeCompanyRegex = (value: string) => {
  return value.replace(onlyNumberRegex, '').replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
};
