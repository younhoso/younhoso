'use client';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';

import clsx from 'clsx';

import chicken from '@/assets/images/my/chicken-with-many-chickens.png';
import Loading from '@/components/Loading';
import ProductInquiryItem from '@/components/ProductInquiryItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { MobileMyInquiryPageStyled } from '@/styles/pageStyled/mobile/mobileMyInquiryPageStyled';
import { ProductInquiry, TotalCountWithItems } from '@/types';

const MobileMyInquiry = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ['/profile/product-inquiries'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<ProductInquiry>>(key, {
        params: { hasTotalCount: true, startYmd: '2000-01-01' },
      }),
  });

  return (
    <MobileMyInquiryPageStyled className={clsx((!data?.data.totalCount || isPending) && 'no-item')}>
      {isPending ? (
        <Loading.Mobile />
      ) : !data?.data.totalCount ? (
        <>
          작성하신 상품 문의가 없습니다.
          <Image src={chicken} width={221} height={132} alt="no-item" />
        </>
      ) : (
        <div className="inquiry-item-wrpper">
          {data.data.items.map(v => (
            <ProductInquiryItem.Mobile data={v} key={v.inquiryNo} refetch={refetch} />
          ))}
        </div>
      )}
    </MobileMyInquiryPageStyled>
  );
};

export default MobileMyInquiry;
