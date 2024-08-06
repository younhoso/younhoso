'use client';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import Link from 'next/link';

import dayjs from 'dayjs';

import ButtonLink from '@/components/ButtonLink';
import Imagefill from '@/components/Imagefill';
import Label from '@/components/Label';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { MebershipData, membershipDetail } from '@/constant/membershipInEvent';
import { customAxios } from '@/libs/customAxios';
import { PcEventDetailSlugPageStyled } from '@/styles/pageStyled/pc/pcEventDetailSlugPageStyled';

type ParamsProps = {
  params: {
    slug: string;
  };
};

const ENDYMDT = '2099.12.31';

const PcEventDetailSlug = ({ params: { slug } }: ParamsProps) => {
  const { data: detail, isPending: isLoadingEvent } = useQuery({
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
    <PcEventDetailSlugPageStyled>
      <h2 className="event-title">이벤트</h2>
      {isLoadingEvent ? (
        <Loading differ="94px" />
      ) : (
        <>
          <div className="event-sub-inner">
            <p className="event-sub-title">{detail?.label}</p>
            <div className="event-period">
              <Label className="label">이벤트 기간</Label>
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
          <div className="event-content-inner">
            {detail?.top.pc.url && (
              <Imagefill>
                <Image
                  alt={detail?.label || '이벤트 상세정보'}
                  src={
                    detail?.top.pc.url.startsWith('//')
                      ? 'https:' + detail?.top.pc.url
                      : detail?.top.pc.url
                  }
                  sizes="100vw"
                  fill
                  priority={true}
                />
              </Imagefill>
            )}
          </div>
          <div className="event-footer">
            <ButtonLink className="event-detail">
              <Link href={`/event`}>목록 보기</Link>
            </ButtonLink>
          </div>
        </>
      )}
    </PcEventDetailSlugPageStyled>
  );
};

export default PcEventDetailSlug;
