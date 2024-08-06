'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import {
  Card,
  Flex,
  Grid,
  ProgressBar,
  Select,
  SelectItem,
  Subtitle,
  Text,
  Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

import Image from 'next/image';
import Link from 'next/link';

import axios from 'axios';

import { MenuBest } from '@/pages/api/menu/menubest';
import { MenuSale } from '@/pages/api/menu/menusale';
import { MenuTotalCount } from '@/pages/api/menu/menutotalcount';

import VerticalDivider from '../components/VerticalDivider';
import { getAxios } from '../lib/Axios';
import Loading from '../loading';

interface MenuPageCondition {
  menuRevenuePerPage: string;
  menuRevenueRecent: string;
  menuRevenueSort: string;
  menuRevenueAlways: string[];
}

export default function MenuPage() {
  const [selectedValue, setSelectedValue] = useState<MenuPageCondition>({
    menuRevenuePerPage: '10',
    menuRevenueRecent: '30',
    menuRevenueSort: 'revenue_desc',
    menuRevenueAlways: ['menuRevenueAlways'],
  });

  const handleValueChange = (key: keyof MenuPageCondition, value: string | object | number[]) => {
    setSelectedValue(prevSelectedValue => {
      if (typeof value === 'object' && value !== null) {
        return {
          ...prevSelectedValue,
          [key]: Object.assign({}, prevSelectedValue[key as keyof MenuPageCondition], value),
        };
      } else {
        return {
          ...prevSelectedValue,
          [key]: value,
        };
      }
    });
  };

  const [menuTotalCountData, setTotalCount] = useState<MenuTotalCount>();
  const [menuSaleData, setMenuSale] = useState<MenuSale[]>();
  const [menuBestData, setMenuBest] = useState<MenuBest[]>();

  const getMenuTotalCount = async () => {
    const res = await getAxios().get('/api/menu/menutotalcount');
    setTotalCount(res.data);
  };

  const getMenuSale = async () => {
    const res = await getAxios().get('/api/menu/menusale', {
      params: {
        priorDays: selectedValue.menuRevenueRecent,
        limit: selectedValue.menuRevenuePerPage,
      },
    });
    setMenuSale(res.data);
  };

  const getMenuBest = async () => {
    const res = await getAxios().get('/api/menu/menubest');
    setMenuBest(res.data);
  };

  useEffect(() => {
    getMenuSale();
  }, [selectedValue]);

  useEffect(() => {
    getMenuBest();
    getMenuTotalCount();
  }, []);

  return (
    <main>
      <Flex>
        <Card className="h-[150px] flex flex-row p-3 !border-r-0">
          <div className="text-center mt-3 ml-3 w-auto">
            <Text className="!text-xl font-bold whitespace-pre">BBQ Menu</Text>
            <Text>management</Text>
          </div>
          <Image
            className="ml-auto mr-3"
            alt="chicken_logo"
            src="/images/ic_menu_chicken_logo.png"
            width={100}
            height={30}
          />
        </Card>
        <Card className="flex flex-col h-[150px] justify-center !border-r-0">
          <Title>총 메뉴</Title>
          <div className="self-end mt-5">
            <Text className="!text-3xl inline">
              {menuTotalCountData?.totalMenuCount.toLocaleString()}
            </Text>
            <Text className="!text-xl inline">개</Text>
          </div>
        </Card>
        <Card className="flex flex-col h-[150px] justify-center !border-r-0">
          <div>
            <Title>최고 매출 메뉴</Title>
            <Subtitle className="text-sm">(최근 1개월 기준)</Subtitle>
          </div>
          <Text className="!text-3xl inline self-end mt-5">
            {menuBestData && menuBestData[0]?.menuName}
          </Text>
        </Card>
        {/* <Card className="flex flex-col h-[150px] justify-center !border-r-0">
      <div>
        <Title>최고 인기 상품</Title>
        <Subtitle className="text-sm">
          (최근 1개월간 주문 비율 상승률 1위)
        </Subtitle>
      </div>
      <Text className="!text-3xl inline self-end mt-5">바삭갈릭</Text>
    </Card> */}
        <Card className="flex flex-row h-[150px] justify-center items-center">
          <Link href="/menu/register" className="flex">
            <PlusCircleIcon className="w-[30px] mr-3" />
            <Title className="text-3xl">메뉴 등록</Title>
          </Link>
        </Card>
      </Flex>
      <Card className="mt-5 !border-b-0">
        <Flex justifyContent="start" className="gap-3">
          <Title>메뉴별 매출추이</Title>
          <Text>상위</Text>
          <Select
            className="w-[80px] min-w-[80px]"
            value={selectedValue.menuRevenuePerPage}
            onChange={value => handleValueChange('menuRevenuePerPage', value)}
          >
            <SelectItem value={'10'}>10개</SelectItem>
            <SelectItem value={'20'}>20개</SelectItem>
            <SelectItem value={'50'}>50개</SelectItem>
            <SelectItem value={'100'}>100개</SelectItem>
          </Select>
          <Text>까지</Text>
          <VerticalDivider height={20} />
          <Text>최근</Text>
          <Select
            className="w-[80px] min-w-[80px]"
            value={selectedValue.menuRevenueRecent}
            onChange={value => handleValueChange('menuRevenueRecent', value)}
          >
            <SelectItem value={'30'}>30일</SelectItem>
            <SelectItem value={'60'}>60일</SelectItem>
          </Select>
          {/* <Text>건</Text> */}
          {/* <Select className="w-[90px] min-w-[90px]" value={selectedValue.menuRevenueSort}  onChange={(value) => handleValueChange('menuRevenueSort', value)}>
        <SelectItem value={'1'}>매출순</SelectItem>
      </Select> */}
          {/* <Text>순으로</Text>
      <Button className="h-[20px] bg-blue-900 border-blue-900 hover:bg-blue-900 hover:border-blue-900 mr-3">
        확인
      </Button> */}
          {/* <CheckboxGroup
            value={selectedValue.menuRevenueAlways}
            onChange={(value) => {
              setSelectedValue({
                ...selectedValue,
                ...{ menuRevenueAlways: value }
              });
            }}
          >
            <Checkbox value="favorite" label="항상 이 정렬로 보기" />
          </CheckboxGroup> */}
          <Text className="ml-auto">⚠ ‘%’는 전체 매출 대비 비율 입니다.</Text>
        </Flex>
      </Card>
      <Card>
        <Flex flexDirection="col" className="gap-5">
          {menuSaleData &&
            menuSaleData.map(item => {
              return (
                <Flex className="text-left" key={item.menuId}>
                  <Text className="w-[400px]">
                    {item.menuName} (
                    {((item.totalOrderCount / item.totalMenuSaleCount) * 100).toFixed(2)}
                    %)
                  </Text>
                  <ProgressBar
                    color={'emerald'}
                    value={(item.totalOrderCount / item.totalMenuSaleCount) * 100}
                    className="mt-2"
                  />
                </Flex>
              );
            })}
        </Flex>
      </Card>
      <Card className="p-0 mt-5">
        <Flex className="border-b p-3">
          <Text className="text-2xl">베스트메뉴 ({menuBestData?.length})</Text>
        </Flex>
        <Flex alignItems="stretch">
          {/* <div className="w-1/3 p-0 border-r">
        <Flex className="border-b p-5">
          <Title>대표메뉴(10)</Title>
          <Text>⚠최근 1개월 기준</Text>
        </Flex>
        <Flex className="p-5">
          <div className="w-[140px]">
            <CircularProgressbar
              value={66}
              text={`${66}%`}
              styles={buildStyles({
                pathColor: '#01c8b4',
                textColor: '#46477a',
                trailColor: '#dedee7'
              })}
            />
          </div>
          <Flex flexDirection="col">
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
          </Flex>
        </Flex>
      </div> */}
          <div className="w-full p-10">
            <Grid numItemsSm={5} numItemsLg={5} className="gap-5">
              {menuBestData &&
                menuBestData.map(item => {
                  return (
                    <Flex className="text-center p-1" flexDirection="col" key={item.menuId}>
                      {item.menuImageUrl == '' ? (
                        <img
                          src="/images/ic_menu_dummy_chicken.png"
                          width={150}
                          height={150}
                          className="mx-auto mb-3 border"
                        />
                      ) : (
                        <img
                          alt="image"
                          src={item.menuImageUrl}
                          width={150}
                          height={150}
                          className="mx-auto mb-3 border"
                        />
                      )}
                      <Text>{item.menuName}</Text>
                      {/* <div>
                  <Text className="!text-4xl inline font-medium">12.43</Text>
                  <Text className="inline !text-2xl">(1위)</Text>
                </div> */}
                      <Text className="text-xs">
                        주문건수 {item.totalOrderCount.toLocaleString()} 건
                      </Text>
                      <Text className="text-xs">
                        매출액 : {item.totalOrderPrice.toLocaleString()} 원
                      </Text>
                    </Flex>
                  );
                })}
            </Grid>
          </div>
        </Flex>
      </Card>
      {/* <Card className="p-0 mt-5">
    <Flex alignItems="stretch">
      <div className="w-1/3 p-0 border-r">
        <Flex className="border-b p-5">
          <Title>추천메뉴(10)</Title>
          <Text>⚠최근 1개월 기준</Text>
        </Flex>
        <Flex className="p-5">
          <div className="w-[140px]">
            <CircularProgressbar
              value={66}
              text={`${66}%`}
              styles={buildStyles({
                pathColor: '#01c8b4',
                textColor: '#46477a',
                trailColor: '#dedee7'
              })}
            />
          </div>
          <Flex flexDirection="col">
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
          </Flex>
        </Flex>
      </div>
      <div className="w-full p-10">
        <Grid numItemsSm={4} numItemsLg={4} className="gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
            return (
              <Flex className="text-center p-3" flexDirection='col'>
                <Image
                  alt="dummy"
                  src="/images/ic_menu_dummy_chicken.png"
                  width={150}
                  height={150}
                  className="mx-auto mb-3 border"
                />
                <Text>황금올리브치킨</Text>
                <ComparedText
                  up={true}
                  text="전월 대비"
                  value="1.8%"
                  direction="row"
                  className="w-auto my-2 text-center"
                />
                <div>
                  <Text className="!text-4xl inline">12.43</Text>
                  <Text className="inline !text-2xl">(1위)</Text>
                </div>
                <Text>주문건수 236,594건 (2위)</Text>
                <Text>매출액 : 356억 1,298만원 (1위)</Text>
              </Flex>
            );
          })}
        </Grid>
      </div>
    </Flex>
  </Card>
  <Card className="p-0 mt-5 mb-10">
    <Flex alignItems="stretch">
      <div className="w-1/3 p-0 border-r">
        <Flex className="border-b p-5">
          <Title>신메뉴(10)</Title>
          <Text>⚠최근 1개월 기준</Text>
        </Flex>
        <Flex className="p-5">
          <div className="w-[140px]">
            <CircularProgressbar
              value={66}
              text={`${66}%`}
              styles={buildStyles({
                pathColor: '#01c8b4',
                textColor: '#46477a',
                trailColor: '#dedee7'
              })}
            />
          </div>
          <Flex flexDirection="col">
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
            <div>
              <CheckCircleIcon className="w-[15px] mr-1 text-emerald-500 inline" />
              <Text className="inline">대표메뉴 매출 점유율 : 47%</Text>
            </div>
          </Flex>
        </Flex>
      </div>
      <div className="w-full p-10">
        <Grid numItemsSm={4} numItemsLg={4} className="gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
            return (
              <Flex className="text-center p-3" flexDirection='col'> 
                <Image
                  alt="dummy"
                  src="/images/ic_menu_dummy_chicken.png"
                  width={150}
                  height={150}
                  className="mx-auto mb-3 border"
                />
                <Text>황금올리브치킨</Text>
                <ComparedText
                  up={true}
                  text="전월 대비"
                  value="1.8%"
                  direction="row"
                  className="w-auto my-2 text-center"
                />
                <div>
                  <Text className="!text-4xl inline">12.43</Text>
                  <Text className="inline !text-2xl">(1위)</Text>
                </div>
                <Text>주문건수 236,594건 (2위)</Text>
                <Text>매출액 : 356억 1,298만원 (1위)</Text>
              </Flex>
            );
          })}
        </Grid>
      </div>
    </Flex>
  </Card> */}
    </main>
  );
}
