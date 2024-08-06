import axios from '@/axios';
import { objectToQueryString } from '@/utils';

type Params = {
  coordinates: {
    lng: number; // 경도
    lat: number; // 위도
  };
};

type Response = {
  address: string;
  roadAddress: string;
};

export const convertCoordinatesWithAddress = async ({
  coordinates: { lng, lat },
}: Params): Promise<Response> => {
  const { data } = await axios.get(
    `/api/account/address/local-api/coord-to-address${objectToQueryString({
      lng,
      lat,
    })}`,
  );

  return data;
};
