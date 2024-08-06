'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Badge, Flex, Text } from '@tremor/react';

import { getAxios } from '../lib/Axios';
import { returnMenuSaleType, returnMenuSaleTypeColor } from '../utils/ChangeValueType';
import Alert from './Alert';
import CustomButton from './CustomButton';
import { useModalContext } from './Modal';

interface OptionCardProps {
  refresh: () => void;
  data: any;
  openDisclosureIndex: number;
  setOpenDisclosureIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function OptionCard(props: OptionCardProps) {
  const { openModal } = useModalContext();
  const { refresh, data, openDisclosureIndex, setOpenDisclosureIndex } = props;

  const handleDisclosureButtonClick = (index: number) => {
    setOpenDisclosureIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  const optionSoldOut = () => {
    openModal(
      '상태 변경',
      <Flex justifyContent="center" className="gap-2">
        <Badge className="bg-[#B92C35] text-white font-normal">품절</Badge>
        {data.subOptionSaleType == 'SOLD_OUT' ? '해제하시겠습니까?' : '처리하시겠습니까?'}
      </Flex>,
      async () => {
        await getAxios().patch(
          '/api/option',
          {
            optionId: data.subOptionItemId,
            subOptionSaleType: data.subOptionSaleType == 'SOLD_OUT' ? 'AVAILABLE' : 'SOLD_OUT',
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          },
        );
        refresh();
      },
    );
  };

  return (
    <div className="border-b py-5 w-full">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="w-full"
              onClick={() => handleDisclosureButtonClick(data.subOptionItemId)}
            >
              <Flex justifyContent="start" className="gap-2">
                <Flex
                  flexDirection="col"
                  className="ml-3"
                  justifyContent="start"
                  alignItems="start"
                >
                  <Text className="text-left">{data.subOptionItemName}</Text>
                  <Text>{data.addPrice}원</Text>
                </Flex>
                <Badge
                  className={`bg-[${returnMenuSaleTypeColor(
                    data.subOptionSaleType,
                  )}] text-white font-normal`}
                >
                  {returnMenuSaleType(data.subOptionSaleType)}
                </Badge>
                <Flex className="border-[#B6B8C8] border-[1px] rounded-xl py-1 bg-[#F6F6F6] px-[5px] w-auto">
                  {openDisclosureIndex == data.subOptionItemId ? (
                    <ChevronUpIcon width={20} />
                  ) : (
                    <ChevronDownIcon width={20} />
                  )}
                </Flex>
              </Flex>
            </Disclosure.Button>
            <Transition
              show={openDisclosureIndex === data.subOptionItemId}
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
                    onClick={optionSoldOut}
                    type={data.subOptionSaleType == 'SOLD_OUT' ? 'tertiary' : 'secondary'}
                    className="flex-1"
                  >
                    품절 {data.subOptionSaleType == 'SOLD_OUT' ? '해제' : ''}
                  </CustomButton>
                </Flex>
                <Alert
                  type={data.subOptionSaleType}
                  endAt={data.endAt}
                  subOptionItemId={data.subOptionItemId}
                />
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
