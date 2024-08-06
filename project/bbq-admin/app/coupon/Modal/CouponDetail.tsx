import { Flex, List, ListItem, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import { returnCouponBenefitType, returnCouponCategory } from '@/app/utils/changeValueType';
import { ContentEntity } from '@/pages/api/coupon/membership';

export default function CouponDetail({ id }: { id: number }) {
  const [data, setData] = useState<any>();
  const { closeModal, openModal } = useModalContext();
  const router = useRouter();

  const getData = async () => {
    const res = await getAxios().get(`/api/coupon/${id.toString()}`);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) return <div className="w-[40vw]"></div>;
  return (
    <div className="w-[40vw]">
      <Flex flexDirection="col">
        <Image src="/images/ic_coupon_coupon_dummy.png" width={400} height={142} alt="dummy" />

        <Title className="!text-4xl my-5">{data?.couponName}</Title>

        <Flex className="border-y-2 border-gray-950">
          <List className="mt-1 border-r-2 border-gray-950 p-0 mt-0">
            <ListItem className="justify-start p-2 h-[52px] mt-1">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>{returnCouponBenefitType(data.benefitType)} :</Text>
              <Text className="ml-1">
                {data.benefitType === 'RATE_DISCOUNT' && data?.discountRate?.toLocaleString() + '%'}
                {data.benefitType === 'FLAT_DISCOUNT' &&
                  data?.discountAmount?.toLocaleString() + '원'}
                {data.benefitType === 'PRODUCT' && data?.benefitProductInfo.menuName}
                {data.benefitType === 'DELIVERY_FEE' &&
                  '최대 ' + data?.maxDiscountAmount?.toLocaleString() + '원'}
              </Text>
            </ListItem>
            <ListItem className="justify-start p-2 h-[52px]">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>쿠폰 종류 :</Text>
              <Text className="ml-1">{returnCouponCategory(data?.couponCategory)}</Text>
            </ListItem>
            <ListItem className="justify-start p-2 h-[52px]">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>최소주문금액 :</Text>
              <Text className="ml-1">{data?.minAmount?.toLocaleString()}원</Text>
            </ListItem>
          </List>
          <List className="mt-1">
            <ListItem className="justify-start p-2 h-[52px]">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>발행기간 :</Text>
              <Text className="ml-1">
                {data?.useStartsAt} ~<br /> {data?.useEndsAt}
              </Text>
            </ListItem>
            <ListItem className="justify-start p-2 h-[52px]">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>발급자 :</Text>
              <Text className="ml-1">{data?.issuerName}</Text>
            </ListItem>
            {data.benefitType === 'RATE_DISCOUNT' && (
              <ListItem className="justify-start p-2 h-[52px]">
                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                <Text>최대할인금액 :</Text>
                <Text className="ml-1">{data?.maxDiscountAmount?.toLocaleString()}원</Text>
              </ListItem>
            )}
          </List>
        </Flex>
        {/* <div className="self-start p-2 border-b-2 w-full border-black min-h-[100px] overflow-scroll">
          <Text className="inline text-emerald-500 mr-1 font-bold">·</Text>
          <Text className="inline">사용여부 :</Text>
          <Text className="inline ml-1">
            첫 회원 가입시 주문앱에서 30,000원 이상 주문시 10%원 할인 (최대
            5,000원 할인)
          </Text>
        </div> */}
      </Flex>
      <Flex justifyContent="center" className="p-5">
        <CustomButton type="quaternary" className="w-[200px] mx-3 mt-3" onClick={closeModal}>
          <Flex className="text-gray-500">
            <Title className="inline">확인</Title>
          </Flex>
        </CustomButton>
        <CustomButton
          type="secondary"
          className="w-[200px] mx-3 mt-3"
          onClick={() => {
            closeModal();
            router.push(`/coupon/edit?id=${data.id}`);
          }}
        >
          <Title className="inline text-white">쿠폰 수정</Title>
        </CustomButton>
      </Flex>
    </div>
  );
}
