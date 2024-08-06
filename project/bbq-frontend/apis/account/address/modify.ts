import axios from '@/axios';

type Params = {
  id: number;
  deliveryName: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
};

type Response = true;

export const modify = async (params: Params): Promise<Response> => {
  await axios.patch(`/api/account/address/${params.id}`, {
    ...(params => {
      const obj = JSON.parse(JSON.stringify(params));
      delete obj['id'];
      return obj;
    })(params),
  });

  return true;
};
