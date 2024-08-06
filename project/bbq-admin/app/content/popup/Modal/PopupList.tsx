import { Button, Flex, Text } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import dayjs, { Dayjs } from 'dayjs';

import CustomRadiobox from '@/app/components/CustomRadiobox';
import { useModalContext } from '@/app/components/Modal';
import { getAxios } from '@/app/lib/Axios';
import { Content } from '@/pages/api/content/event';
import { DataListResponse } from '@/pages/api/delivery/content/event';

export interface Mainbanner {
  page: string;
  size: string;
  isActive: string;
  startsAt: string | number | Date | Dayjs | null;
  endsAt: string | number | Date | Dayjs | null;
}

export interface MainbannerListCondition {
  paramsData: Mainbanner;
  setDataContent: (value: number) => void;
}

export default function PopupList({ paramsData, setDataContent }: MainbannerListCondition) {
  const { closeModal } = useModalContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [data, setData] = useState<DataListResponse>();
  const param = {
    page: paramsData.page,
    size: paramsData.size,
    isActive: paramsData.isActive,
    startsAt: dayjs(paramsData.startsAt).format('YYYY-MM-DD HH:mm:ss'),
    endsAt: dayjs(paramsData.endsAt).format('YYYY-MM-DD HH:mm:ss'),
  }

  const [mainbannerSelected, setMainbannerSelected] = useState(0);

  const clickIndex = (index: number) => {
    if (index == selectedIndex) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(index);
    }
  };

  const getData = async () => {
    const result = await getAxios().get<DataListResponse>('/api/delivery/content/event', {
      params: param,
    });
    setData(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-[500px] h-[600px] overflow-auto border-t-[1px] border-b-[1px] border-[#46477A]">
        {data?.content.map(item => {
          return (
            <Flex flexDirection="col" justifyContent="start" className="w-full" key={item.id}>
              <div
                className={`transition mt-5 w-full p-3 border-b overflow-hidden cursor-pointer h-auto`}
              >
                <Flex justifyContent="start" className="mb-2">
                  <Flex justifyContent="start" className="w-auto gap-5 flex-wrap flex">
                    <CustomRadiobox
                      id={item.id}
                      checked={mainbannerSelected === item.id}
                      onChange={value => setMainbannerSelected(value)}
                    >
                      <Flex
                        justifyContent="start"
                        className="h-[104px] overflow-hidden gap-4"
                        onClick={() => {
                          item.id && clickIndex(item.id);
                        }}
                      >
                        <Image
                          alt={'file-' + item.title}
                          src={item.thumbnailImageUrl}
                          width={200}
                          height={200}
                        />
                        <div>
                          <Text>{item.title}</Text>
                          <Text>
                            {item.startDate} ~ {item.endDate}
                          </Text>
                        </div>
                      </Flex>
                    </CustomRadiobox>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          );
        })}

        <Flex justifyContent="end" className="p-5 bg-[#f6f7fb]">
          <Button
            onClick={() => closeModal()}
            className="bg-white !border-tremor-border-grayED2 hover:bg-white text-gray-500 w-[160px] h-[50px] !rounded-none"
          >
            취소
          </Button>
          <Button
            onClick={() => {
              setDataContent(mainbannerSelected);
              closeModal();
            }}
            className="bg-tremor-content-emphasis border-none ml-3 hover:bg-gray-700 text-white w-[160px] h-[50px] !rounded-none"
          >
            선택 완료
          </Button>
        </Flex>
      </div>
    </>
  );
}
