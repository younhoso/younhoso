'use client';

import { ArrowLeftIcon, MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import {
  Flex,
  Select,
  SelectItem,
  Subtitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { Fragment, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { MenuResponseData, MenuType } from '../api/menu/route';
import { OptionResponseData } from '../api/option/route';
import CustomButton from '../components/CustomButton';
import Divider from '../components/Divider';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import MenuCard from '../components/MenuCard';
import OptionCard from '../components/OptionCard';
import { getAxios } from '../lib/Axios';

export default function Menu() {
  const page = 1;
  const router = useRouter();
  const [openMenuDisclosureIndex, setMenuOpenDisclosureIndex] = useState<number>(-1);
  const [openOptionDisclosureIndex, setOptionOpenDisclosureIndex] = useState<number>(-1);
  const [filter, setFilter] = useState<{
    status: string | '';
    menu: MenuType | '';
  }>({
    status: '',
    menu: '',
  });
  const [menuName, setMenuName] = useState<string>();
  const [optionName, setOptionName] = useState<string>('');
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [menuList, setMenuList] = useState<MenuResponseData>();
  const [optionList, setOptionList] = useState<OptionResponseData>();
  const [loading, setLoading] = useState<boolean>(true);

  const getMenuData = async (type?: boolean) => {
    const result = await getAxios().get('/api/menu', {
      params: {
        page: page,
        ...(menuName && !type && { searchName: menuName }),
        ...(filter.status && { menuSaleType: filter.status }),
        ...(filter.menu && { menuType: filter.menu }),
      },
    });
    result.data.content = result.data.content.sort((a: any, b: any) => {
      return a.menuId - b.menuId;
    });

    return result;
  };

  const getOptionData = async (type?: boolean) => {
    const result = await getAxios().get('/api/option', {
      params: {
        page: page,
        ...(optionName && !type && { searchName: optionName }),
      },
    });
    result.data.content = result.data.content.sort((a: any, b: any) => {
      return a.subOptionId - b.subOptionId;
    });

    return result;
  };

  const submitSearch = async () => {
    setLoading(true);
    try {
      if (tabIndex === 0) {
        const menuDataResult = await getMenuData();
        setTabIndex(0);
        setMenuList(menuDataResult.data);
        setMenuOpenDisclosureIndex(-1);
      } else {
        const optionDataResult = await getOptionData();
        setTabIndex(1);
        setOptionList(optionDataResult.data);
        setOptionOpenDisclosureIndex(-1);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async (type?: boolean) => {
    setLoading(true);
    setMenuOpenDisclosureIndex(-1);
    setOptionOpenDisclosureIndex(-1);
    try {
      const menuDataResult = await getMenuData(type);
      setMenuList(menuDataResult.data);

      const optionDataResult = await getOptionData(type);
      setOptionList(optionDataResult.data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
    // if (!menuList) {
    //   const result = await getMenuData();
    //   setMenuList(result.data);
    // } else {
    //   if (menuList.totalPages >= page) {
    //     const result = await getMenuData();
    //     const newMenuList = menuList?.content.concat(result.data.content);
    //     setMenuList({
    //       ...result.data,
    //       content: newMenuList,
    //     });
    //   }
    // }

    // if(!optionList) {
    //   const result = await getOptionData();
    //   setOptionList(result.data);
    // } else {
    //   if (optionList.totalPages >= page) {
    //     const result = await getOptionData();
    //     const newOptionList = optionList?.content.concat(result.data.content);
    //     setOptionList({
    //       ...result.data,
    //       content: newOptionList,
    //     });
    //   }
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [filter]);

  useEffect(() => {
    setFilter({
      status: '',
      menu: '',
    });
    setMenuName('');
    setOptionName('');
    setMenuOpenDisclosureIndex(-1);
    setOptionOpenDisclosureIndex(-1);
  }, [tabIndex]);

  // const handleScroll = (e: any) => {
  //   const bottom =
  //     e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
  //   if (bottom && !loading) {
  //     setPage(page + 1);
  //   }
  // };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Flex
        flexDirection="col"
        // className="test2 overflow-scroll h-[100%]"
        // onScroll={handleScroll}
      >
        <Flex className="p-5 py-7 bg-[#E52143] relative" justifyContent="center">
          <div
            onClick={() => router.push('/')}
            className="rounded-full p-2 absolute left-[20px] cursor-pointer"
            style={{
              boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.15)',
              background: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <ArrowLeftIcon className="text-white" width={20} />
          </div>
          <Title className="text-white mx-auto text-xl">메뉴 관리</Title>
        </Flex>
        <Flex>
          <TabGroup index={tabIndex} onIndexChange={index => setTabIndex(index)}>
            <TabList className="mt-3 flex text-center mx-5 space-x-0">
              <Tab className="ui-selected:text-black ui-selected:border-black ui-selected:border-b-[4px] hover:border-b-[4px] text-center flex-1">
                메뉴
              </Tab>
              <Tab className="ui-selected:text-black ui-selected:border-black ui-selected:border-b-[4px] hover:border-b-[4px] text-center flex-1">
                옵션
              </Tab>
            </TabList>
            <div className="mb-5">
              <Flex className="px-5 mt-5 relative">
                {tabIndex == 0 ? (
                  <TextInput
                    className="w-full !rounded-full"
                    placeholder="메뉴명을 입력해주세요"
                    value={menuName}
                    onChange={e => {
                      setMenuName(e.target.value);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        submitSearch();
                      }
                    }}
                  />
                ) : (
                  <TextInput
                    className="w-full !rounded-full"
                    placeholder="옵션명을 입력해주세요"
                    value={optionName}
                    onChange={e => {
                      setOptionName(e.target.value);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        submitSearch();
                      }
                    }}
                  />
                )}
                {menuName && menuName.length > 0 && (
                  <button
                    className="p-3 h-[30px] bottom-[11px] absolute right-[80px]"
                    onClick={() => {
                      setMenuName('');
                      getData(true);
                    }}
                  >
                    <XCircleIcon width={20} height={20} />
                  </button>
                )}
                {optionName && optionName.length > 0 && (
                  <button
                    className="p-3 h-[30px] bottom-[11px] absolute right-[80px]"
                    onClick={() => {
                      setOptionName('');
                      getData(true);
                    }}
                  >
                    <XCircleIcon width={20} height={20} />
                  </button>
                )}
                <CustomButton
                  type="primary"
                  className="p-3 h-[30px] absolute right-[30px]"
                  onClick={submitSearch}
                >
                  <MagnifyingGlassIcon width={20} height={20} />
                </CustomButton>
              </Flex>
              {tabIndex === 0 ? (
                <Flex className="px-5 mt-5 gap-2" justifyContent="start">
                  <Select
                    className="[&>button]:!rounded-full w-[100px] min-w-[100px]"
                    placeholder="전체"
                    value={filter.status}
                    onChange={(value: any) => {
                      setFilter({
                        ...filter,
                        status: value,
                      });
                    }}
                  >
                    <SelectItem value={'ALL'}>전체</SelectItem>
                    <SelectItem value={'AVAILABLE'}>판매중</SelectItem>
                    <SelectItem value={'SOLD_OUT'}>품절</SelectItem>
                    <SelectItem value={'HIDDEN'}>숨김</SelectItem>
                  </Select>
                  <CustomButton
                    type={filter.menu == 'MAIN' ? 'primary' : 'secondary'}
                    className="w-[20%]"
                    onClick={() => {
                      setFilter({
                        ...filter,
                        menu: filter.menu === 'MAIN' ? '' : 'MAIN',
                      });
                    }}
                  >
                    일반메뉴
                  </CustomButton>
                  <CustomButton
                    type={filter.menu == 'SIDE' ? 'primary' : 'secondary'}
                    className="w-[20%]"
                    onClick={() => {
                      setFilter({
                        ...filter,
                        menu: filter.menu === 'SIDE' ? '' : 'SIDE',
                      });
                    }}
                  >
                    사이드
                  </CustomButton>
                  <CustomButton
                    type={filter.menu == 'ALCOHOL' ? 'primary' : 'secondary'}
                    className="w-[20%]"
                    onClick={() => {
                      setFilter({
                        ...filter,
                        menu: filter.menu === 'ALCOHOL' ? '' : 'ALCOHOL',
                      });
                    }}
                  >
                    음료/주류
                  </CustomButton>
                </Flex>
              ) : (
                <></>
              )}
            </div>
            <Divider />
            <TabPanels>
              <TabPanel className="px-5">
                {menuList && menuList.totalElements == 0 && (
                  <Flex className="h-[40vh] flex-1">
                    <Text className="text-[#8E93AD] !text-lg mx-auto">
                      찾으시는 메뉴가 없습니다
                    </Text>
                  </Flex>
                )}
                {menuList &&
                  menuList.content.map((data, index) => {
                    return (
                      <MenuCard
                        refresh={getData}
                        data={data}
                        index={index}
                        setOpenDisclosureIndex={setMenuOpenDisclosureIndex}
                        openDisclosureIndex={openMenuDisclosureIndex}
                        key={data.menuId}
                      />
                    );
                  })}
              </TabPanel>
              <TabPanel className="px-5">
                {optionList && optionList.totalElements == 0 && (
                  <Flex className="h-[40vh] flex-1">
                    <Text className="text-[#8E93AD] !text-lg mx-auto">
                      찾으시는 옵션이 없습니다
                    </Text>
                  </Flex>
                )}
                <Flex flexDirection="col" alignItems="start" className="w-full">
                  {optionList &&
                    optionList.content.map((data, index) => {
                      return (
                        <Fragment key={data.subOptionId}>
                          <Title className="mt-5">{data.subOptionName}</Title>
                          <div className="rounded-lg bg-[#EAEBEE] w-full p-3 my-3">
                            <Title className="!text-md">
                              옵션을 사용하는 메뉴 {data.relatedMenuInfoList.length}개
                            </Title>
                            <Subtitle className="!text-sm">
                              {data.relatedMenuInfoList.map((menu, index) => {
                                return (
                                  <Fragment key={menu.menuId}>
                                    {menu.menuName}
                                    {index !== data.relatedMenuInfoList.length - 1 ? ', ' : ''}
                                  </Fragment>
                                );
                              })}
                            </Subtitle>
                          </div>
                          {data.subOptionItemInfoList.map(data => (
                            <OptionCard
                              refresh={getData}
                              data={data}
                              setOpenDisclosureIndex={setOptionOpenDisclosureIndex}
                              key={data.subOptionItemId}
                              openDisclosureIndex={openOptionDisclosureIndex}
                            />
                          ))}
                        </Fragment>
                      );
                    })}
                </Flex>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Flex>
      </Flex>
      <Divider />
      <Footer />
    </>
  );
}
