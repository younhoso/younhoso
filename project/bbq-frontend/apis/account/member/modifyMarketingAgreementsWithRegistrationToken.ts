import axios from '@/axios';

type Params = {
  token: string;
  agreements: {
    smsMarketing: boolean;
    emailMarketing: boolean;
    pushMarketing: boolean;
  };
};

type Response = void;

export const modifyMarketingAgreementsWithRegistrationToken = async ({
  token,
  agreements: { smsMarketing, emailMarketing, pushMarketing },
}: Params): Promise<Response> => {
  await axios.patch(`/api/account/member/register/marketing-info`, {
    token,
    smsMarketingAgreed: smsMarketing,
    emailMarketingAgreed: emailMarketing,
    pushMarketingAgreed: pushMarketing,
  });
};
