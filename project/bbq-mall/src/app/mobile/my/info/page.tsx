'use client';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Divider from '@/components/Divider';
import { myItemList } from '@/components/MyCategory/main/pc/MyCategory';
import MyItem from '@/components/MyItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';
import { myInfoPageInitialData } from '@/constant/myInfoPageRelated';
import { useGetInquiryList } from '@/hooks/api/useGetInquiryList';
import { useHandleWebview } from '@/hooks/useHandleWebview';
import { customAxios } from '@/libs/customAxios';
import { MobileMyInfoPageStyled } from '@/styles/pageStyled/mobile/mobileMyInfoPageStyled';
import { MyData, TotalCount } from '@/types';

const MobileMyInfo = () => {
  const router = useRouter();
  const inquiryList = useGetInquiryList(PLATFORMLIST.MOBILE_WEB);
  const { handleLogout } = useHandleWebview();

  const { data: myData } = useQuery({
    queryKey: ['/profile'],
    queryFn: async ({ queryKey: [key] }) => {
      const res = await customAxios(PLATFORMLIST.MOBILE_WEB).get<MyData>(key);
      const memberGrade = MEMBER_GRADE_IMAGE_LIST[res.data.memberGradeName];

      return { ...res, memberGrade };
    },
  });

  const { data: briefData } = useQuery({
    queryKey: ['/brief-info'],
    queryFn: async () => {
      const { data: point } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<{
        totalAvailableAmt: number;
      }>('/profile/accumulations/summary');
      const { data: coupon } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<{
        usableCouponCnt: number;
      }>('/coupons/summary', {
        params: { hasTotalCount: true },
      });
      const { data: like } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCount>(
        '/profile/like-products',
        { params: { hasTotalCount: true } },
      );

      return {
        point: { ...myInfoPageInitialData.point, value: point.totalAvailableAmt },
        coupon: { ...myInfoPageInitialData.coupon, value: coupon.usableCouponCnt },
        like: { ...myInfoPageInitialData.like, value: like.totalCount },
      };
    },
    initialData: myInfoPageInitialData,
  });

  return (
    <MobileMyInfoPageStyled>
      <div className="mobile-my-page-info">
        <div className="my-page-brief">
          <div>
            <Image
              src={myData?.memberGrade?.image ?? MEMBER_GRADE_IMAGE_LIST.WELCOME.image}
              width={58}
              height={62}
              alt="profile"
            />
            <div>
              <p>
                <span>{myData?.data.memberName}</span> 님은
              </p>
              <p>
                <span>{myData?.data.memberGradeName}</span> 등급입니다.
              </p>
            </div>
          </div>
          <p onClick={() => router.push('/my/membership')}>멤버십 등급</p>
        </div>
        <div className="my-page-info">
          {Object.values(briefData).map(v => (
            <div
              key={v.label}
              onClick={() => {
                'onClick' in v ? v.onClick?.() : router.push(v.linkTo);
              }}
            >
              <Image src={v.image} width={24} height={24} alt={v.label} />
              <div>{v.label}</div>
              <p>
                {v.value}
                {v.unit}
              </p>
            </div>
          ))}
        </div>
      </div>
      {myItemList.map(v => (
        <div key={v.label}>
          <Divider.Mobile />
          {v.children
            .filter(v => !v.inVisible)
            .map(k => (
              <MyItem.Mobile
                key={k.label}
                label={k.label}
                onClick={() => (k.onClickInMobile ? k.onClickInMobile?.() : router.push(k.linkTo))}
              />
            ))}
        </div>
      ))}
      <Divider.Mobile />
      <div>
        {inquiryList.map(v => (
          <MyItem.Mobile
            key={v.name}
            label={v.name}
            onClick={() =>
              'onClick' in v ? v.onClick?.() : router.push(`/help/${'boardNo' in v && v.boardNo}`)
            }
          />
        ))}
      </div>
      <Divider.Mobile />
      <MyItem.Mobile label="로그아웃" onClick={handleLogout} />
    </MobileMyInfoPageStyled>
  );
};

export default MobileMyInfo;
