import { AccountAddressAPI } from './address';
import { AccountMemberAPI } from './member';
import { AccountPointAPI } from './point';
import { AccountVerficationAPI } from './verification';

export const AccountAPI = {
  Member: AccountMemberAPI,
  Address: AccountAddressAPI,
  Point: AccountPointAPI,
  Verification: AccountVerficationAPI,
};
