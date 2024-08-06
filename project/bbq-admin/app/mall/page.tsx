'use client';

import { Card, Flex, Subtitle, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

import Image from 'next/image';

import SouthKorea from '@svg-maps/south-korea';

import { changeCityNameToKorean, changeMapData } from '@/app/utils/changeValueType';
import { FamilyDashboardResponse } from '@/pages/api/family/dashboard';
import { FamilyLocationResponse } from '@/pages/api/family/location';

import CustomCircularProgressbar from '../components/CustomCircularProgressbar';
import CustomComparedText from '../components/CustomComparedText';
import Loading from '../components/Loading';
import { useModalContext } from '../components/Modal';
import VerticalDivider from '../components/VerticalDivider';
import { getAxios } from '../lib/Axios';

export default function MallPage() {
  const [data, setData] = useState<FamilyDashboardResponse>();
  const [selectedLocation, setSelectedLocation] = useState<string>('SEOUL');
  const [selectedData, setSelectedData] = useState<FamilyLocationResponse>();

  const getData = async () => {
    const result = await getAxios().get<FamilyDashboardResponse>('/api/family/dashboard');
    setData(result.data);
  };

  const getSelectedData = async () => {
    const result = await getAxios().get<FamilyLocationResponse>('/api/family/location', {
      params: {
        location: selectedLocation,
      },
    });
    setSelectedData(result.data);
  };

  useEffect(() => {
    getData();
    getSelectedData();
  }, []);

  useEffect(() => {
    getSelectedData();
  }, [selectedLocation]);

  if (data) {
    return (
      <main className="pb-10">
        <Card className="border-b-none p-3">
          <Flex>
            <Flex justifyContent="start" className="gap-5 border-r">
              <Image
                src="/images/ic_mall_bbq_family.png"
                width={150}
                height={95}
                alt={'bbq_family'}
                className="mx-5"
              />
              <Flex flexDirection="col" className="w-[50%]">
                <Flex justifyContent="start" alignItems="center">
                  <Text className="text-xl mr-2 self-end">총</Text>
                  <Text className="!text-4xl font-bold">
                    {data.familyDashboardInfo.totalCount.toLocaleString()}
                  </Text>
                  <Text className="text-xl self-end">개소</Text>
                  {/* <Text className="text-xl self-end">(85%)</Text> */}
                </Flex>
                <CustomComparedText
                  today={data.familyDashboardInfo.totalCount}
                  yesterday={data.familyDashboardInfo.yesterdayTotalCount}
                  text={'전일 대비'}
                />
              </Flex>
            </Flex>
            <Flex>
              <Flex justifyContent="start" className="gap-5 ml-5">
                <div className="w-[100px]">
                  <CustomCircularProgressbar
                    value={data.familyDashboardInfo.openNowCount}
                    total={data.familyDashboardInfo.totalCount}
                    style={{
                      pathColor: '#00c9b5',
                      textColor: '#46477a',
                      trailColor: '#dedee7',
                    }}
                  />
                </div>
                <Flex flexDirection="col" alignItems="start" justifyContent="start">
                  <Text className="!text-lg">현재 오픈 패밀리</Text>
                  <Flex justifyContent="start" alignItems="end">
                    <Text className="!text-3xl">
                      {data.familyDashboardInfo.openNowCount.toLocaleString()}
                    </Text>
                    <Text className="!text-lg">개소</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex justifyContent="start" className="gap-5 border-l pl-5">
                <div className="w-[100px]">
                  <CustomCircularProgressbar
                    value={data.familyDashboardInfo.notOpenNowCount}
                    total={data.familyDashboardInfo.totalCount}
                    style={{
                      pathColor: '#46477a',
                      textColor: '#46477a',
                      trailColor: '#dedee7',
                    }}
                  />
                </div>
                <Flex flexDirection="col" alignItems="start" justifyContent="start">
                  <Text className="!text-lg">현재 미오픈 패밀리</Text>
                  <Flex justifyContent="start" alignItems="end">
                    <Text className="!text-3xl">
                      {data.familyDashboardInfo.notOpenNowCount.toLocaleString()}
                    </Text>
                    <Text className="!text-lg">개소</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card className="p-0 !border-t-0">
          <Flex>
            <Flex className="p-8 w-[50%] h-[70vh] overflow-scroll">
              <div className="w-[200px]">
                <Flex justifyContent="start" className="gap-2 leading-2 border-b pb-3 mb-3">
                  <Subtitle className="w-[100px]">전체</Subtitle>
                  <Text className="font-bold">
                    {data.familyDashboardInfo.totalCount.toLocaleString()}
                  </Text>
                </Flex>
                {data.familyDashboardByAreaList.map(item => {
                  return (
                    <Flex
                      key={item.addressState}
                      justifyContent="start"
                      className="gap-3 leading-lg my-1"
                    >
                      <Subtitle className="w-[100px]">
                        {changeCityNameToKorean(item.addressState)}
                      </Subtitle>
                      <Text className="font-bold">{item.addressStateCount}</Text>
                    </Flex>
                  );
                })}
              </div>
              <SVGMap
                className="svg-map !h-[60vh]"
                map={SouthKorea}
                onLocationClick={e => setSelectedLocation(changeMapData(e.target.ariaLabel))}
              />
            </Flex>
            {selectedData && (
              <Flex
                justifyContent="start"
                flexDirection="col"
                className="w-[50%] h-[70vh] border-l"
              >
                <Card
                  className="!border-y-0 !border-l-0 !border-r-0"
                  style={{
                    background:
                      'repeating-linear-gradient(-45deg, #f0f0f4, #f0f0f4 5px, white 5px, white 10px)',
                  }}
                >
                  <Flex justifyContent="start" alignItems="end" className="w-full">
                    <Title className="!text-4xl whitespace-pre">
                      {changeCityNameToKorean(selectedLocation)}
                    </Title>
                    <VerticalDivider height={38} className="mx-3" />
                    <Title className="!text-4xl">
                      {selectedData?.familyDashboardAreaInfo.totalCount.toLocaleString()}
                    </Title>
                    <Text className="!text-2xl whitespace-pre mr-5">개소</Text>
                  </Flex>
                </Card>
                <Card className="!border-r-0 !border-l-0 p-0">
                  <Flex>
                    <Flex justifyContent="start" className="gap-5 ml-5 p-3 px-0 border-r">
                      <div className="w-[100px]">
                        <CustomCircularProgressbar
                          value={selectedData.familyDashboardAreaInfo.openNowCount}
                          total={selectedData.familyDashboardAreaInfo.totalCount}
                          style={{
                            pathColor: '#00c9b5',
                            textColor: '#46477a',
                            trailColor: '#dedee7',
                          }}
                        />
                      </div>
                      <Flex flexDirection="col" alignItems="start" justifyContent="start">
                        <Text className="!text-lg">오픈 패밀리</Text>
                        <Flex justifyContent="start" alignItems="end">
                          <Text className="!text-3xl">
                            {selectedData.familyDashboardAreaInfo.openNowCount.toLocaleString()}
                          </Text>
                          <Text className="!text-lg">개소</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex justifyContent="start" className="gap-5 ml-5 p-3 px-0">
                      <div className="w-[100px]">
                        <CustomCircularProgressbar
                          value={selectedData.familyDashboardAreaInfo.notOpenNowCount}
                          total={selectedData.familyDashboardAreaInfo.totalCount}
                          style={{
                            pathColor: '#46477a',
                            textColor: '#46477a',
                            trailColor: '#dedee7',
                          }}
                        />
                      </div>
                      <Flex flexDirection="col" alignItems="start" justifyContent="start">
                        <Text className="!text-lg">미오픈 패밀리</Text>
                        <Flex justifyContent="start" alignItems="end">
                          <Text className="!text-3xl">
                            {selectedData.familyDashboardAreaInfo.notOpenNowCount}
                          </Text>
                          <Text className="!text-lg">개소</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
                <Flex alignItems="start" className="overflow-scroll">
                  <Flex
                    className="w-full border-t-0 p-5 self-stretch h-[450px]"
                    flexDirection="col"
                    justifyContent="start"
                    alignItems="start"
                  >
                    <Title>매장 종류별 점포 수</Title>
                    <Flex flexDirection="col" alignItems="start" className="gap-5 ml-2 mt-5">
                      {selectedData.familyDashboardByTypeList.map((item, i) => {
                        return (
                          <Flex justifyContent="start" key={item.familyType}>
                            <Text className="mr-3">{i + 1}</Text>
                            <Text className="w-[100px]">{item.familyType}</Text>
                            <Text className="font-bold">
                              {item.familyTypeCount.toLocaleString()}개
                            </Text>
                          </Flex>
                        );
                      })}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Card>
      </main>
    );
  }
}
