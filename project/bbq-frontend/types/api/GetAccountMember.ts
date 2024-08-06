export type GetAccountMemberAPIResponse = {
  memberId: string;
  username: string;
  name: string;
  phoneNumber: string;
  email?: string;
  birth?: string;
  gender?: string;
  smsMarketingAgreedAt?: string;
  emailMarketingAgreedAt?: string;
  pushMarketingAgreedAt?: string;
  isMemberCiRegistered?: boolean;
  isOldPasswordRequired?: boolean;
};
