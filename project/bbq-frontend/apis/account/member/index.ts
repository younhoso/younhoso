import { AccountMemberCIAPI } from './CI';
import { checkUsername } from './checkUsername';
import { connectOAuth } from './connectOAuth';
import { connectOAuthWithCI } from './connectOAuthWithCI';
import { findUsername } from './findUsername';
import { findUsernameWithCI } from './findUsernameWithCI';
import { get } from './get';
import { getDeliveryInfo } from './getDeliveryInfo';
import { getGrade } from './getGrade';
import { initFindAndChangePassword } from './initFindAndChangePassword';
import { initFindAndChangePasswordWithCI } from './initFindAndChangePasswordWithCI';
import { initRegistration } from './initRegistration';
import { initRegistrationWithCI } from './initRegistrationWithCI';
import { modify } from './modify';
import { modifyMarketingAgreementsWithRegistrationToken } from './modifyMarketingAgreementsWithRegistrationToken';
import { modifyPassword } from './modifyPassword';
import { modifyPhoneNumber } from './modifyPhoneNumber';
import { processFindAndChangePassword } from './processFindAndChangePassword';
import { processRegistration } from './processRegistration';
import { processRegistrationWithCI } from './processRegistrationWithCI';
import { resign } from './resign';

export const AccountMemberAPI = {
  CI: AccountMemberCIAPI,
  get,
  getGrade,
  getDeliveryInfo,
  modify,
  modifyPassword,
  modifyPhoneNumber,
  modifyMarketingAgreementsWithRegistrationToken,
  resign,
  findUsername,
  findUsernameWithCI,
  checkUsername,
  connectOAuth,
  connectOAuthWithCI,
  initRegistration,
  initRegistrationWithCI,
  processRegistration,
  processRegistrationWithCI,
  initFindAndChangePassword,
  initFindAndChangePasswordWithCI,
  processFindAndChangePassword,
};
