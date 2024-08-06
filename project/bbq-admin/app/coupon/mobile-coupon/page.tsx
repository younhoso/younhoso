'use client';

import { useState } from 'react';

import { isAxiosError } from 'axios';

import MobileCouponSearch from '@/app/components/MobileCouponSearch';
import MobileCouponTable from '@/app/components/MobileCouponTable';
import Title from '@/app/components/Title';
import { getAxios } from '@/app/lib/Axios';

export interface MobileCoupon {
  couponType: string;
  couponNo: string;
  couponId: number;
  couponName: string;
  couponPrice: number;
  startDate: string;
  endDate: string;
  isUsed: boolean;
  familyName: string;
  branchId: string;
  approvalNumber: string;
  useStatusName: string;
}

export interface MenuListCondition {
  mobileCouponNo: string;
  mobileCouponType: string;
}

export default function MobileCouponPage() {
  const [data, setData] = useState<MobileCoupon>();
  const [selectedValue, setSelectedValue] = useState<MenuListCondition>({
    mobileCouponNo: '',
    mobileCouponType: 'ECOUPON',
  });

  const handleValueChange = (key: keyof MenuListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const validationCheck = () => {
    if (!selectedValue.mobileCouponNo) {
      alert('모바일 쿠폰 번호를 입력해 주세요');
      return false;
    }
    if (!selectedValue.mobileCouponType) {
      alert('모바일 쿠폰 종류를 설정해 주세요.');
      return false;
    }
    return true;
  };

  const getData = async () => {
    if (!validationCheck()) {
      return;
    }

    try {
      const result = await getAxios().get<MobileCoupon>('/api/coupon/mobilecoupon', {
        params: {
          mobileCouponNo: selectedValue.mobileCouponNo,
          mobileCouponType: selectedValue.mobileCouponType,
        },
      });
      setData(result.data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        alert(error.response?.data.message);
      } else if (isAxiosError(error) && error.response?.status === 500) {
        alert('서버에서 오류가 발생했습니다.');
      }
    }
  };

  const handleCancel = async () => {
    try {
      const result = await getAxios().post<MobileCoupon>('/api/coupon/mobilecoupon', {
        mobileCouponNo: selectedValue.mobileCouponNo,
        mobileCouponType: selectedValue.mobileCouponType,
      });
      {
        result && alert('정상 취소되었습니다');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert(error);
      }
    }
  };

  return (
    <div className={'mobileCouponPage'}>
      <Title className={`text-[#46477A] bg-[#fff] border py-[20px] px-[24px] mb-[16px]`}>
        <p>
          * 자사앱 주문건은 &apos;주문 관리&apos; 내 해당 주문건에서 &apos;주문 취소&apos;를
          수행하시면 취소됩니다. 주문 취소 수행 후에도 취소되지 않았을 경우에만 사용해 주세요.
        </p>
      </Title>
      <MobileCouponSearch
        handleSearch={() => getData()}
        handleValueChange={handleValueChange}
        selectedValue={selectedValue}
      />
      <MobileCouponTable
        handleCancel={() => handleCancel()}
        className={`mt-[20px] border-[#CDCED2] border-t`}
        data={data}
      />
    </div>
  );
}
