import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Flex, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { getAxios } from '@/app/lib/Axios';
import { OptionResponse } from '@/pages/api/menu/option';

export default function OptionList({ checked, type }: { checked: any; type: number }) {
  const { closeModal } = useModalContext();
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [data, setData] = useState<OptionResponse[]>();
  const [checkList, setCheckList] = useState<OptionResponse[]>();

  const getData = async () => {
    const result = await getAxios().get('/api/menu/option-active', {
      params: {
        requiredType: type,
      },
    });
    setData(result.data);
  };

  const clickIndex = (index: number) => {
    if (index == selectedIndex) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(index);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const checkList = data.filter(item => {
        if (item.id) return selected.includes(item.id.toString());
      });
      setCheckList(checkList);
    }
  }, [selected]);

  useEffect(() => {
    if (checked) {
      setSelected(checked.map((item: any) => item.id.toString()));
      setCheckList(checked);
    }
  }, [checked]);

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <div className="w-[500px] h-[500px] pb-[50px] overflow-scroll">
      <Title>Total {data.length}</Title>

      {data.map(item => {
        return (
          <Flex flexDirection="col" justifyContent="start" className="w-full" key={item.id}>
            <div
              className={`transition mt-5 bg-white w-full p-3 border overflow-hidden cursor-pointer
        ${selectedIndex == item.id ? 'h-auto' : 'h-[44px]'}`}
            >
              <Flex justifyContent="start" className="mb-2">
                <CheckboxGroup
                  value={selected}
                  onChange={value => {
                    setSelected(value);
                  }}
                >
                  {item.id && <Checkbox value={item.id.toString()} label="" />}
                </CheckboxGroup>
                <Flex
                  onClick={() => {
                    item.id && clickIndex(item.id);
                  }}
                >
                  <Text>{item.subOptionTitle}</Text>
                  {selectedIndex == item.id ? (
                    <ChevronUpIcon className="ml-auto" width={15} />
                  ) : (
                    <ChevronDownIcon className="ml-auto" width={15} />
                  )}
                </Flex>
              </Flex>

              <Flex flexDirection="col" className="gap-2">
                {item.subOptionItems.map(subOption => {
                  return (
                    <Flex justifyContent="start" className="ml-10" key={subOption.id}>
                      <ArrowRightIcon width={15} />
                      <Text className="w-[200px] ml-3">{subOption.itemTitle}</Text>
                      <Text>{subOption.addPrice}원 추가</Text>
                    </Flex>
                  );
                })}
              </Flex>
            </div>
          </Flex>
        );
      })}
      <div className="border-t left-0 fixed bottom-0 w-full bg-white p-3 mx-auto text-center">
        <CustomButton
          onClick={() => {
            closeModal(checkList);
          }}
          className="w-[200px]"
          type={'secondary'}
        >
          <Flex>
            <Text className="text-white mr-1">{type == 0 ? '선택옵션' : '필수옵션'} </Text>
            <Text className="text-emerald-500">{selected.length}개</Text>
            <Text className="text-white ml-1">가져오기</Text>
          </Flex>
        </CustomButton>
      </div>
    </div>
  );
}
