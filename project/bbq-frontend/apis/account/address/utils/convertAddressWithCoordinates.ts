import axios from '@/axios';
import { objectToQueryString } from '@/utils';

type Params = {
  address: string;
};

type Response = {
  longitude: number;
  latitude: number;
};

export const convertAddressWithCoordinates = async ({ address }: Params): Promise<Response> => {
  const { data } = await axios.get(
    `/api/account/address/local-api/address-to-coord${objectToQueryString({
      address: address,
    })}`,
  );

  return data;
};
