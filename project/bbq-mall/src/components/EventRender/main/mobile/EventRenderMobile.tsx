'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Imagefill from '@/components/Imagefill';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Event } from '@/types/Event';

import { EventRenderMobileStyled } from './styled';

export interface EventRenderMobileProps {
  className?: string;
  item: Event;
  startYmdt: string;
  endYmdt: string;
  currentTime: string;
  href?: string;
}

const EventRenderMobile = ({
  className,
  item,
  startYmdt,
  endYmdt,
  currentTime,
  href = '/event/detail/',
}: EventRenderMobileProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const isEventIng = item.startYmdt <= currentTime && item.endYmdt >= currentTime;

  return (
    <EventRenderMobileStyled className={clsx('EventRenderMobile', className)}>
      {isEventIng ? (
        <Link href={href + item.eventNo}>
          <Imagefill.Mobile key={item.label} className={'event-ongoing'}>
            <Image
              src={
                item.mobileimageUrl &&
                `${item.mobileimageUrl.startsWith('//') ? 'https:' : ''}` + item.mobileimageUrl
              }
              alt={item.label}
              fill
              sizes="100vw"
              priority
            />
          </Imagefill.Mobile>
        </Link>
      ) : (
        <Imagefill
          key={item.label}
          className={'event-end'}
          onClick={
            isEventIng
              ? undefined
              : async () => {
                  setConfirmModalOpen({
                    open: true,
                    content: '해당 이벤트는 종료된 이벤트입니다.',
                    onOk: resetOpenConfirm,
                  });
                }
          }
        >
          <div className="event-end-txt">
            {!isEventIng && (
              <>
                <p className="title">이벤트 종료</p>
                <p className="end-data">
                  {startYmdt} - {endYmdt}
                </p>
              </>
            )}
          </div>

          <Image
            src={
              item.mobileimageUrl &&
              `${item.mobileimageUrl.startsWith('//') ? 'https:' : ''}` + item.mobileimageUrl
            }
            alt={item.label}
            fill
            sizes="100vw"
            priority
          />
        </Imagefill>
      )}
    </EventRenderMobileStyled>
  );
};

export default EventRenderMobile;
