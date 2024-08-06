import axios from '@/axios';

type Params = {
  branchId: string;
};

type Response = {
  additionalFeeAreaList: {
    id: number;
    legalDongId: string;
    legalDongName: string;
    administrativeDongId: string;
    administrativeDongName: string;
    additionalDeliveryFee: number;
  }[];
  deliveryFeeRangeList: {
    rangeMinPrice: number;
    rangeMaxPrice: number;
    deliveryFee: number;
  }[];
};

export const get = async ({ branchId }: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/family/${branchId}/delivery-info`);

  return data;
};
