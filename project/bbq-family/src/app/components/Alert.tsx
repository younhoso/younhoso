'use client';

import { Button, Flex, Text } from '@tremor/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface AlertProps {
  detail?: boolean;
  menuId?: number;
  subOptionItemId?: number;
  endAt?: string;
  type: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Alert({
  detail,
  menuId,
  subOptionItemId,
  endAt,
  type,
  className,
  children,
  ...rest
}: AlertProps) {
  const router = useRouter();

  const goToEnd = () => {
    if (menuId) {
      router.push(`/menu/end?menuId=${menuId}`);
    } else if (subOptionItemId) {
      router.push(`/menu/end?subOptionItemId=${subOptionItemId}`);
    }
  };
  const AlertTypesReturn = ({
    detail,
    menuId,
    subOptionItemId,
    type,
    endAt,
  }: {
    detail?: boolean;
    menuId?: number;
    subOptionItemId?: number;
    type: string;
    endAt?: string;
  }) => {
    if (detail) {
      return (
        <Flex justifyContent="start" className="p-3 px-5 bg-[#E521431A] gap-3 rounded-lg mt-5">
          <Image src="/images/ic_cancel.png" alt="hidden" width={24} height={24} />
          {endAt ? (
            <Flex flexDirection="col" className="w-auto" alignItems="start">
              <Text className="text-[#B92C35]">{dayjs().format('YYYY.MM.DD(ddd)')}</Text>
              <Text className="text-[#B92C35]">{dayjs().format('A hh:mm 까지 품절')}</Text>
            </Flex>
          ) : (
            <Text className="text-[#B92C35]">메뉴가 품절 처리되었습니다.</Text>
          )}
        </Flex>
      );
    }
    switch (type) {
      case 'SOLD_OUT':
        return (
          <Flex justifyContent="start" className="p-3 px-5 bg-[#E521431A] gap-3 rounded-lg mt-5">
            <Image src="/images/ic_cancel.png" alt="hidden" width={24} height={24} />
            {endAt ? (
              <Flex flexDirection="col" className="w-auto" alignItems="start">
                <Text className="text-[#B92C35]">{dayjs().format('YYYY.MM.DD(ddd)')}</Text>
                <Text className="text-[#B92C35]">{dayjs().format('A hh:mm 까지 품절')}</Text>
              </Flex>
            ) : (
              <Text className="text-[#B92C35]">메뉴가 품절 처리되었습니다.</Text>
            )}
            {/* <button className="!text-sm font-bold text-[#B92C35] underline cursor-pointer ml-auto" onClick={goToEnd}>기간 설정</button> */}
          </Flex>
        );
      case 'HIDDEN':
        return (
          <Flex justifyContent="start" className="p-3 px-5 bg-[#B6B8C833] gap-2 rounded-lg mt-5">
            <Image src="/images/ic_hidden.png" alt="hidden" width={24} height={24} />
            <Text className="text-[#666666CC]">메뉴가 숨김 처리되었습니다.</Text>
          </Flex>
        );
      default:
        return <></>;
    }
  };

  return (
    <AlertTypesReturn
      detail={detail}
      type={type}
      endAt={endAt}
      menuId={menuId}
      subOptionItemId={subOptionItemId}
    />
  );
}
