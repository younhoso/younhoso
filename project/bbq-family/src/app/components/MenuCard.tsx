'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Badge, Flex, Text } from '@tremor/react';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { MenuResponseData } from '../api/menu/route';
import { getAxios } from '../lib/Axios';
import { ArrayElement } from '../types/arrayElement';
import { returnMenuSaleType, returnMenuSaleTypeColor } from '../utils/ChangeValueType';
import Alert from './Alert';
import CustomButton from './CustomButton';
import { useModalContext } from './Modal';

interface MenuCardProps {
  refresh: () => void;
  data: ArrayElement<MenuResponseData['content']>;
  index: number;
  openDisclosureIndex: number;
  setOpenDisclosureIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function MenuCard({
  refresh,
  data: _data,
  index,
  openDisclosureIndex,
  setOpenDisclosureIndex,
}: MenuCardProps) {
  const [data, setData] = useState(_data);
  const { openModal } = useModalContext();
  const router = useRouter();

  const handleDisclosureButtonClick = (index: number) => {
    setOpenDisclosureIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  const productSoldOut = () => {
    openModal(
      '상태 변경',
      <Flex justifyContent="center" className="gap-2">
        <Badge className="bg-[#B92C35] text-white font-normal">품절</Badge>
        <Text className="text-lg text-black">
          {data.menuSaleType == 'SOLD_OUT' ? '해제하시겠습니까?' : '처리하시겠습니까?'}
        </Text>
      </Flex>,
      async () => {
        await getAxios().patch(
          '/api/menu',
          {
            menuId: data.menuId,
            menuSaleType: data.menuSaleType == 'SOLD_OUT' ? 'AVAILABLE' : 'SOLD_OUT',
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          },
        );
        setData(prev => ({
          ...prev,
          menuSaleType: data.menuSaleType == 'SOLD_OUT' ? 'AVAILABLE' : 'SOLD_OUT',
        }));
        // refresh();
      },
    );
  };

  const productHidden = () => {
    openModal(
      '상태 변경',
      <Flex justifyContent="center" className="gap-2">
        <Badge className="bg-[#666666] text-white font-normal">숨김</Badge>
        <Text className="text-lg text-black">
          {data.menuSaleType == 'HIDDEN' ? '해제하시겠습니까?' : '처리하시겠습니까?'}
        </Text>
      </Flex>,
      async () => {
        await getAxios().patch(
          '/api/menu',
          {
            menuId: data.menuId,
            menuSaleType: data.menuSaleType == 'HIDDEN' ? 'AVAILABLE' : 'HIDDEN',
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          },
        );
        setData(prev => ({
          ...prev,
          menuSaleType: data.menuSaleType == 'HIDDEN' ? 'AVAILABLE' : 'HIDDEN',
        }));
        // refresh();
      },
    );
  };

  return (
    <div className="border-b py-5">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              onClick={() => handleDisclosureButtonClick(index)}
              className="w-full"
            >
              <Flex justifyContent="start" className="gap-2">
                {data.menuImage && (
                  <Image
                    alt="menu_image"
                    src={data.menuImage}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                )}
                <Flex
                  flexDirection="col"
                  className="ml-3"
                  justifyContent="start"
                  alignItems="start"
                >
                  <Text className="text-left">{data.menuName}</Text>
                  <Text>{Number(data.menuPrice).toLocaleString()}원</Text>
                  <p
                    className="!text-[#8E93AD] underline !text-sm"
                    onClick={e => {
                      e.preventDefault();
                      router.push(`/menu/detail?menuId=${data.menuId}`);
                    }}
                  >
                    메뉴정보
                  </p>
                </Flex>
                <Badge
                  className={`bg-[${returnMenuSaleTypeColor(
                    data.menuSaleType,
                  )}] text-white font-normal`}
                >
                  {returnMenuSaleType(data.menuSaleType)}
                </Badge>
                <Flex className="border-[#B6B8C8] border-[1px] rounded-xl py-1 bg-[#F6F6F6] px-[5px] w-auto">
                  {openDisclosureIndex == index ? (
                    <ChevronUpIcon width={20} />
                  ) : (
                    <ChevronDownIcon width={20} />
                  )}
                </Flex>
              </Flex>
            </Disclosure.Button>
            <Transition
              show={openDisclosureIndex === index}
              className="overflow-hidden"
              enter="transition transition-[max-height] duration-400 ease-in"
              enterFrom="transform max-h-0"
              enterTo="transform max-h-screen"
              leave="transition transition-[max-height] duration-400 ease-out"
              leaveFrom="transform max-h-screen"
              leaveTo="transform max-h-0"
            >
              <Disclosure.Panel static>
                <Flex className="gap-3 mt-3">
                  <CustomButton
                    onClick={productSoldOut}
                    type={data.menuSaleType == 'SOLD_OUT' ? 'tertiary' : 'secondary'}
                    className="flex-1"
                  >
                    품절 {data.menuSaleType == 'SOLD_OUT' ? '해제' : ''}
                  </CustomButton>
                  <CustomButton
                    onClick={productHidden}
                    type={data.menuSaleType == 'HIDDEN' ? 'tertiary' : 'secondary'}
                    className="flex-1"
                  >
                    숨김 {data.menuSaleType == 'HIDDEN' ? '해제' : ''}
                  </CustomButton>
                </Flex>
                <Alert type={data.menuSaleType} endAt={data.endAt} menuId={data.menuId} />
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
