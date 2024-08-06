'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Imagefill from '@/components/Imagefill';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Event } from '@/types/Event';

import { EventRenderStyled } from './styled';

export interface EventRenderProps {
  className?: string;
  item: Event;
  startYmdt: string;
  endYmdt: string;
  currentTime: string;
  href?: string;
}

const EventRender = ({
  className,
  item,
  startYmdt,
  endYmdt,
  currentTime,
  href = '/event/detail/',
}: EventRenderProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const isEventIng = item.startYmdt <= currentTime && item.endYmdt >= currentTime;

  return (
    <EventRenderStyled className={clsx('EventRender', className)}>
      {isEventIng ? (
        <Link href={href + item.eventNo}>
          <Imagefill key={item.label} className={'event-ongoing'}>
            <Image
              src={
                item.pcImageUrl &&
                `${item.pcImageUrl.startsWith('//') ? 'https:' : ''}` + item.pcImageUrl
              }
              alt={item.label}
              fill
              sizes="100vw"
              priority
            />
          </Imagefill>
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
              item.pcImageUrl &&
              `${item.pcImageUrl.startsWith('//') ? 'https:' : ''}` + item.pcImageUrl
            }
            alt={item.label}
            fill
            sizes="100vw"
            priority
          />
        </Imagefill>
      )}
    </EventRenderStyled>
  );
};

export default EventRender;
