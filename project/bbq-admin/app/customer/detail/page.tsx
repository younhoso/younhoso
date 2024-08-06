'use client';

import { Disclosure, Transition } from '@headlessui/react';
import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  List,
  ListItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import FileInput, { IFileTypes } from '@/app/components/FileInput';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import VerticalDivider from '@/app/components/VerticalDivider';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import { returnMealType, returnOrderChannel, returnOrderStatus } from '@/app/utils/changeValueType';
import { formatPhoneNumber } from '@/app/utils/regExp';
import { CustomerDetailResponse } from '@/pages/api/customer/detail';
import { CustomerOrderListResponse } from '@/pages/api/customer/order/list';
import { CustomerOrderTotalResponse } from '@/pages/api/customer/order/total';
import { CustomerPointListResponse } from '@/pages/api/customer/point/list';
import { CustomerPointTotalResponse } from '@/pages/api/customer/point/total';

import CouponListModal from '../Modal/CouponList';
import OrderDetailModal from '../Modal/OrderDetail';
import PointDeductingModal from '../Modal/PointDeducting';

interface CustomerDetailCondition {
  orderDateRange: DateRangePickerValue;
  pointDateRange: DateRangePickerValue;
}

interface CustomerName {
  eCouponName: string;
}

export default function CustomerDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [data, setData] = useState<CustomerDetailResponse>({
    membershipGradeName: '',
    memberId: '',
    username: '',
    nickname: '',
    email: '',
    name: '',
    phoneNumber: '',
    birth: '',
    gender: '',
    joinAt: '',
    lastLoginAt: '',
    isActive: false,
    isIntegratedMember: false,
    smsMarketingAgreedAt: '',
    emailMarketingAgreedAt: '',
    pushMarketingAgreedAt: '',
    isSmsAgreed: false,
    isEmailAgreed: false,
    isPushAgreed: false,
  });
  const [orderTotal, setOrderTotal] = useState<CustomerOrderTotalResponse>();
  const [orderList, setOrderList] = useState<CustomerOrderListResponse>();
  const [pointTotal, setPointTotal] = useState<CustomerPointTotalResponse>();
  const [pointList, setPointList] = useState<CustomerPointListResponse>();
  const [orderPage, setOrderPage] = useState<number>(1);
  const [pointPage, setPointPage] = useState<number>(1);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<CustomerDetailCondition>({
    orderDateRange: {
      from: new Date(dayjs('2023-09-01').toDate()),
      to: new Date(),
    },
    pointDateRange: {
      from: new Date(dayjs('2023-09-01').toDate()),
      to: new Date(),
    },
  });

  const handleValueChange = (key: keyof CustomerDetailCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      if (typeof value === 'object' && value !== null) {
        return {
          ...prevSelectedValue,
          [key]: Object.assign({}, prevSelectedValue[key as keyof CustomerDetailCondition], value),
        };
      } else {
        return {
          ...prevSelectedValue,
          [key]: value,
        };
      }
    });
  };

  const handleChangeValue = (key: keyof CustomerDetailResponse, value: any) => {
    setData(prevData => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };

  const getCustomer = async () => {
    if (customerId) {
      getCustomerData();
      getCustomerOrderTotal();
      getCustomerOrderList();
      getCustomerPointTotal();
      getCustomerPointList();
    }
  };

  const getCustomerData = async () => {
    try {
      const res = await getAxios().get(`/api/customer/detail?id=${customerId}`);
      setData(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
        history.back();
      }
    }
  };
  const getCustomerOrderTotal = async () => {
    try {
      const res = await getAxios().get(`/api/customer/order/total?id=${customerId}`);
      setOrderTotal(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
        history.back();
      }
    }
  };
  const getCustomerOrderList = async () => {
    try {
      const res = await getAxios().get(`/api/customer/order/list?id=${customerId}`, {
        params: {
          page: orderPage,
          size: 20,
          startDate: dayjs(selectedValue.orderDateRange.from).format('YYYY-MM-DD'),
          endDate: dayjs(selectedValue.orderDateRange.to).format('YYYY-MM-DD'),
        },
      });
      setOrderList(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
        history.back();
      }
    }
  };
  const getCustomerPointTotal = async () => {
    try {
      const res = await getAxios().get(`/api/customer/point/total?id=${customerId}`);
      setPointTotal(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
        history.back();
      }
    }
  };
  const getCustomerPointList = async () => {
    try {
      const res = await getAxios().get(`/api/customer/point/list?id=${customerId}`, {
        params: {
          page: pointPage,
          size: 20,
          startDate: dayjs(selectedValue.pointDateRange.from).format('YYYY-MM-DD'),
          endDate: dayjs(selectedValue.pointDateRange.to).format('YYYY-MM-DD'),
        },
      });
      setPointList(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
        history.back();
      }
    }
  };

  const patchCustomerInfo = async () => {
    try {
      if (data.name.length < 2 || data.name.length > 25) {
        alert('이름은 2자 이상 25자 이내입니다.');
        setUpdateMode(true);
        return; // 유효하지 않으면 함수 종료
      }

      const phoneRegex = /^[0-9]{9,11}$/;
      if (!phoneRegex.test(data.phoneNumber)) {
        alert('휴대폰 번호 형식이 올바르지 않습니다.');
        setUpdateMode(true);
        return; // 유효하지 않으면 함수 종료
      }

      const res = await getAxios().patch(`/api/customer/detail?id=${customerId}`, {
        name: data.name,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
        history.back();
      }
    }
  };

  const update = async () => {
    setUpdateMode(!updateMode);
  };

  const deleteMember = async () => {
    try {
      const result = await getAxios().delete(`/api/customer/detail?id=${customerId}`);
      if (result.status === 200) {
        alert('삭제되었습니다.');
        history.back();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
        history.back();
      }
    }
  };

  useEffect(() => {
    if (!searchParams) return;
    const customerId = searchParams.get('id');
    setCustomerId(customerId);
  }, []);

  useEffect(() => {
    getCustomer();
  }, [customerId]);

  useEffect(() => {
    getCustomerOrderList();
  }, [orderPage]);

  useEffect(() => {
    getCustomerPointList();
  }, [pointPage]);

  const { openModal } = useModalContext();
  if (data && customerId && orderTotal && orderList && pointTotal && pointList) {
    return (
      <main className="my-6">
        <Card className="p-0">
          <div className="absolute right-0 top-[-50px]">
            {updateMode ? (
              <CustomButton
                type="secondary"
                onClick={() => (update(), patchCustomerInfo())}
                className="w-[72px] !rounded-none !bg-[#46477A] !text-[#fff] !border-transparent"
              >
                저장
              </CustomButton>
            ) : (
              <CustomButton
                type="secondary"
                onClick={() => update()}
                className="w-[72px] !rounded-none !bg-white !text-[#46477A] !border-transparent"
              >
                수정
              </CustomButton>
            )}
          </div>
          <Flex>
            <List className="mt-1 border-r p-0 mt-0">
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">
                  고객명 (휴대폰 번호)
                </Text>
                {updateMode ? (
                  <div className="pl-3 flex">
                    <TextInput
                      className="w-[160px] h-[40px] ml-1 !rounded-none"
                      value={data.name}
                      placeholder={'고객명을 입력해 주세요'}
                      onChange={e => handleChangeValue('name', e.target.value)}
                    />
                    <TextInput
                      className="w-[160px] h-[40px] ml-3 !rounded-none"
                      value={data.phoneNumber}
                      placeholder={'휴대폰 번호 입력해 주세요'}
                      onChange={e => handleChangeValue('phoneNumber', e.target.value)}
                    />
                  </div>
                ) : (
                  <Text className="ml-1 pl-3">
                    {data.name} ( {formatPhoneNumber(data.phoneNumber)} )
                  </Text>
                )}
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">회원등급</Text>
                <Text className="ml-1 pl-3">{data.membershipGradeName}</Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">아이디</Text>
                <Text className="ml-1 pl-3">{data.username}</Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">이메일</Text>
                <Text className="ml-1 pl-3">{data.email ? data.email : '-'}</Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">성별</Text>
                <Text className="ml-1 pl-3">
                  {data.gender == 'M' && '남자'}
                  {data.gender == 'F' && '여자'}
                  {data.gender == 'U' && '미응답'}
                  {!data.gender && '-'}
                </Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">생년월일</Text>
                <Text className="ml-1 pl-3">{data.birth ? data.birth : '-'}</Text>
              </ListItem>
            </List>
            <List>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">최근 로그인</Text>
                <Text className="ml-1 pl-3">{data.lastLoginAt ? data.lastLoginAt : '-'}</Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">고객 상태</Text>
                <Text className="ml-1 pl-3">{data.isActive == true ? '정상' : '탈퇴'}</Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">
                  통합아이디 전환
                </Text>
                <Text className="ml-1 pl-3">
                  {data.isIntegratedMember == true ? '완료' : '미완료'}
                </Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">
                  SMS 수신 동의일
                </Text>
                <Text className="ml-1 pl-3">
                  {data.smsMarketingAgreedAt ? data.smsMarketingAgreedAt : '-'}
                </Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">
                  이메일 수신 동의일
                </Text>
                <Text className="ml-1 pl-3">
                  {data.emailMarketingAgreedAt ? data.emailMarketingAgreedAt : '-'}
                </Text>
              </ListItem>
              <ListItem className="justify-start p-0">
                <Text className="w-[160px] p-5 border-r bg-gray-100 text-center">
                  푸시알림 수신 동의일
                </Text>
                <Text className="ml-1 pl-3">
                  {data.pushMarketingAgreedAt ? data.pushMarketingAgreedAt : '-'}
                </Text>
              </ListItem>
            </List>
          </Flex>
        </Card>
        <CustomButton
          type="secondary"
          onClick={() => deleteMember()}
          className="w-[160px] h-[48px] !rounded-none !bg-[#E52143] !text-[#fff] !border-transparent mt-[20px]"
        >
          회원 삭제
        </CustomButton>

        <div className="border-t border-[#CDCED2] mt-[24px]"></div>

        <Card className="p-0 mt-[24px]">
          <Flex className="border-b p-5" justifyContent="start">
            <Title className="border-r mr-2 pr-2 ml-5">주문 이력</Title>
            <Title className="text-emerald-500">
              총 {orderTotal.totalOrderCount.toLocaleString()}건 (총 주문금액{' '}
              {orderTotal.totalOrderAmount.toLocaleString()}원)
            </Title>
          </Flex>
          <div className="px-10 pb-5 border-b">
            <Flex flexDirection="col">
              <Flex justifyContent="start" className="border-b py-3 gap-5">
                <Text className="w-[100px]">기간 설정</Text>
                <DateRangePicker
                  className="w-[300px] ml-10"
                  value={selectedValue.orderDateRange}
                  onValueChange={value => handleValueChange('orderDateRange', value)}
                  enableSelect={false}
                  locale={ko}
                  placeholder="기간 선택"
                />
              </Flex>
            </Flex>
            <CustomButton type="secondary" className="mt-5" onClick={() => getCustomerOrderList()}>
              위 조건으로 검색
            </CustomButton>
          </div>
          <div className="px-10 py-5">
            <Title>Total {orderList.totalElements.toLocaleString()}</Title>

            <Table className="p-0 mt-5">
              <TableHead className="bg-gray-100 border ">
                <TableRow className="border">
                  <TableHeaderCell className="text-center">주문 채널</TableHeaderCell>
                  <TableHeaderCell className="text-center">주문 번호</TableHeaderCell>
                  <TableHeaderCell className="text-center">주문 메뉴</TableHeaderCell>
                  <TableHeaderCell className="text-center">주문 방법</TableHeaderCell>
                  <TableHeaderCell className="text-center">구매 금액</TableHeaderCell>
                  <TableHeaderCell className="text-center">결제 금액</TableHeaderCell>
                  <TableHeaderCell className="text-center">주문 시간</TableHeaderCell>
                  <TableHeaderCell className="text-center">주문 상태</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody className="border-b">
                {orderList.content.map(item => {
                  return (
                    <TableRow
                      key={item.id}
                      // onClick={() =>
                      //   openModal(
                      //     '주문상세',
                      //     '주문번호 BBQ54216123123123',
                      //     <OrderDetailModal />
                      //   )
                      // }
                      className="border hover:bg-gray-100 cursor-pointer"
                    >
                      <TableCell>{returnOrderChannel(item.orderChannel)}</TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.orderMenuTitle}</TableCell>
                      <TableCell>{returnMealType(item.mealType)}</TableCell>
                      <TableCell>{item.orderAmount.toLocaleString()}원</TableCell>
                      <TableCell>{item.payAmount.toLocaleString()}원</TableCell>
                      <TableCell>{item.payedAt}</TableCell>
                      <TableCell>{returnOrderStatus(item.orderStatus, item.mealType)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <CustomPagination
              activePage={orderPage}
              perPage={20}
              totalItemsCount={orderList.totalElements}
              handlePageChange={value => setOrderPage(value)}
            />
          </div>
        </Card>
        <Card className="p-0 mt-5">
          <Flex className="border-b p-5" justifyContent="start">
            <Title className=" border-r mr-2 pr-2 ml-5">포인트 내역</Title>
            <Title className="text-emerald-500">
              보유 포인트 : {pointTotal.currentPoint.toLocaleString()}p
            </Title>
          </Flex>
          <div className="px-10 pb-5 border-b">
            <Flex flexDirection="col">
              <Flex justifyContent="start" className="border-b py-3 gap-5">
                <Text className="w-[100px]">기간 설정</Text>
                <DateRangePicker
                  className="w-[300px] ml-10"
                  value={selectedValue.pointDateRange}
                  onValueChange={value => handleValueChange('pointDateRange', value)}
                  enableSelect={false}
                  locale={ko}
                  placeholder="기간 선택"
                />
              </Flex>
            </Flex>
            <CustomButton type="secondary" className="mt-5" onClick={() => getCustomerPointList()}>
              위 조건으로 검색
            </CustomButton>
          </div>
          <div className="px-10 py-5">
            <Flex>
              <Flex justifyContent="between" className="gap-2">
                <Title>Total {pointList.totalElements.toLocaleString()}</Title>
                <CustomButton
                  onClick={() =>
                    openModal(
                      '포인트 적립/차감',
                      '',
                      <PointDeductingModal id={customerId} />,
                      value => value == true && getCustomerPointList(),
                    )
                  }
                  type="secondary"
                >
                  포인트 적립/차감
                </CustomButton>
              </Flex>
            </Flex>

            <Table className="p-0 mt-5">
              <TableHead className="bg-gray-100 border ">
                <TableRow className="border">
                  <TableHeaderCell className="text-center">사용 일자</TableHeaderCell>
                  <TableHeaderCell className="text-center">설명</TableHeaderCell>
                  <TableHeaderCell className="text-center">적립/차감 포인트</TableHeaderCell>
                  <TableHeaderCell className="text-center">잔여 포인트</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody className="border-b">
                {pointList.content.map(item => {
                  return (
                    <TableRow className="border hover:bg-gray-100" key={item.id}>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        {item.deltaPoint > 0 ? (
                          <Text className="text-emerald-500">{item.deltaPoint} P</Text>
                        ) : (
                          <Text className="text-red-500">{item.deltaPoint} P</Text>
                        )}{' '}
                      </TableCell>
                      <TableCell>{item.currentPoint} P</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <CustomPagination
              activePage={pointPage}
              perPage={20}
              totalItemsCount={pointList.totalElements}
              handlePageChange={value => setPointPage(value)}
            />
          </div>
        </Card>
      </main>
    );
  }
}
