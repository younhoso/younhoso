import { add } from './add';
import { delete_ } from './delete';
import { get } from './get';
import { getList } from './getList';
import { modify } from './modify';
import { convertAddressWithCoordinates } from './utils/convertAddressWithCoordinates';
import { convertCoordinatesWithAddress } from './utils/convertCoordinatesWithAddress';

export const AccountAddressAPI = {
  add,
  delete: delete_,
  modify,
  get,
  getList,
  utils: {
    convertAddressWithCoordinates,
    convertCoordinatesWithAddress,
  },
};
