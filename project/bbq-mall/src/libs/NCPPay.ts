import { PaymentBody } from '@/types';

interface SetNCPPayConfiguration {
  clientId: string;
  confirmUrl: string;
  platform: string;
  accessToken?: string;
}

export default class NCPPayService {
  setConfiguration(setting: SetNCPPayConfiguration) {
    return window.NCPPay.setConfiguration(setting);
  }

  reservation(body: PaymentBody, callback?: (res: any) => void) {
    window.NCPPay.reservation(body, callback);
  }
}
