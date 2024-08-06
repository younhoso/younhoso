export type FindAccountMemberUsernameAPIParams = {
  name: string;
  phoneNumber: string;
  authCode: string;
};

export type FindAccountMemberUsernameAPIResponse = {
  username: string;
  token: string;
  isAlreadyIntegratedMember: string;
};
