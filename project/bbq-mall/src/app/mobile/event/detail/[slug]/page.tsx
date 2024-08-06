'use client';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import dayjs from 'dayjs';

import ButtonLink from '@/components/ButtonLink';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import Label from '@/components/Label';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { MebershipData, membershipDetail } from '@/constant/membershipInEvent';
import { customAxios } from '@/libs/customAxios';
import { MobileEventDetailSlugPageStyled } from '@/styles/pageStyled/mobile/mobileEventDetailSlugPageStyled';

type ParamsProps = {
  params: {
    slug: string;
  };
};

const ENDYMDT = '2099.12.31';

const MobileEventDetailSlug = ({ params: { slug } }: ParamsProps) => {
  const routerPathName = usePathname();
  const { data: detail, isPending } = useQuery({
    queryKey: [`/display/events/${slug}`],
    queryFn: async ({ queryKey: [key] }) => {
      if (slug === '0') {
        return membershipDetail;
      }
      const { data } = await customAxios(PLATFORMLIST.PC).get<MebershipData>(key);

      return data;
    },
  });

  return (
    <MobileEventDetailSlugPageStyled>
      <Header.Mobile
        title={routerPathName.includes('detail') ? '진행중인 이벤트' : '이벤트'}
        hideBorderBottom={true}
      />
      <Divider.Mobile />
      {isPending ? (
        <Loading.Mobile />
      ) : (
        <div className="event-container">
          <div className="event-sub-inner">
            <p className="event-sub-title">{detail?.label}</p>
            <div className="event-period">
              <Label.Mobile className="label">이벤트 기간</Label.Mobile>
              {dayjs(detail?.endYmdt).format('YYYY.MM.DD') === ENDYMDT ? (
                <p>별도 공지시까지</p>
              ) : (
                <>
                  <p>{dayjs(detail?.startYmdt).format('YYYY.MM.DD')}</p> -
                  <p>{dayjs(detail?.endYmdt).format('YYYY.MM.DD')}</p>
                </>
              )}
            </div>
          </div>
          {detail?.top.mobile.url && (
            <div className="event-content-inner">
              <Image
                alt={detail?.label || '이벤트 상세정보'}
                src={
                  detail?.top.mobile.url.startsWith('//')
                    ? 'https:' + detail?.top.mobile.url
                    : detail?.top.mobile.url
                }
                width={1000}
                height={500}
                layout="responsive"
                sizes="100vw"
                priority={true}
              />
            </div>
          )}

          <div className="button-link-inner">
            <ButtonLink className="border-gray">
              <Link href={'/event/all'}>목록</Link>
            </ButtonLink>
          </div>
        </div>
      )}
    </MobileEventDetailSlugPageStyled>
  );
};

export default MobileEventDetailSlug;
