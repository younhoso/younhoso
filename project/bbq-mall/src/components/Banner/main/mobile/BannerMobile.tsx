'use client';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';

import gift from '@/assets/images/event/gift.png';
import EventRender from '@/components/EventRender';
import Nodata from '@/components/Nodata';
import { Event } from '@/types/Event';
import { eventsDivision } from '@/utils/dataCustom';

import { BannerMobileStyled } from './styled';

export interface BannerMobileProps {
  className?: string;
  error: unknown | undefined;
  data: Event[] | undefined;
  href?: string;
}

const BannerMobile = ({ className, error, data, href }: BannerMobileProps) => {
  if (error) {
    return <div className="event-error">오류가 발생했습니다</div>;
  }

  if (!data) {
    return (
      <Nodata.Mobile className="event-nodata">
        <>
          <Image alt={'선물 아이콘'} src={gift} width={48} height={48} priority={true} />
          <p>진행 중인 이벤트가 없습니다.</p>
        </>
      </Nodata.Mobile>
    );
  }

  const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const [ongoingEvents, endedEvents] = eventsDivision(data, currentTime);

  return (
    <BannerMobileStyled className={clsx('BannerMobile', className)}>
      {ongoingEvents.map(item => {
        const startYmdt = dayjs(item.startYmdt).format('YYYY.MM.DD');
        const endYmdt = dayjs(item.endYmdt).format('YYYY.MM.DD');
        return (
          <EventRender.Mobile
            key={item.eventNo}
            item={item}
            startYmdt={startYmdt}
            endYmdt={endYmdt}
            currentTime={currentTime}
            href={href}
          />
        );
      })}

      {endedEvents.map(item => {
        const startYmdt = dayjs(item.startYmdt).format('YYYY.MM.DD');
        const endYmdt = dayjs(item.endYmdt).format('YYYY.MM.DD');
        return (
          <EventRender.Mobile
            key={item.eventNo}
            item={item}
            startYmdt={startYmdt}
            endYmdt={endYmdt}
            currentTime={currentTime}
          />
        );
      })}
    </BannerMobileStyled>
  );
};

export default BannerMobile;
