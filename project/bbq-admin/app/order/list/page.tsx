'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
} from '@tremor/react';
import { useEffect, useState } from 'react';

import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import {
  returnMealType,
  returnOrderChannel,
  returnOrderStatus,
  returnPaymentMethod,
} from '@/app/utils/changeValueType';
import { createExcelDownloadUrl } from '@/app/utils/createExcelDownloadUrl';
import { phoneRegex } from '@/app/utils/regExp';
import { OrderListResponse } from '@/pages/api/order/list';
import { getDateFromPast } from '@/utils/getDateFromPast';

import OrderDetail from '../Modal/OrderDetail';

type priceRange = number[];

export interface OrderListCondition {
  search?: string;
  dateRange: DateRangePickerValue;
  dateRangeType: string;
  mealType: string;
  paymentType: string;
  paymentMethod: string;
  orderStatus: string[];
  orderProcessStatus: string;
  priceRange: priceRange;
}

export default function OrderPage() {
  const { openModal } = useModalContext();

  const [data, setData] = useState<OrderListResponse>();

  const [page, setPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState<OrderListCondition>({
    search: '',
    dateRange: {
      from: new Date(dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    },
    dateRangeType: 'all',
    mealType: '',
    paymentType: '',
    paymentMethod: '',
    orderStatus: [
      'PAY_COMPLETED',
      'PAY_FAILED',
      'NOTIFIED',
      'COOKING',
      'IN_DELIVERY',
      'COMPLETED',
      'CANCEL_CONFIRMED',
    ],
    orderProcessStatus: '',
    priceRange: [0, 2000000],
  });

  const initSelectedParams = (selectedValue: OrderListCondition) => {
    let search = selectedValue.search;
    // searchName이 핸드폰 번호 형식이면 '-'을 제거
    if (search && phoneRegex.test(search)) {
      search = search.replace(/-/g, '');
    }

    return {
      params: {
        page: page,
        limit: 20,
        searchName: search,
        startDate: dayjs(selectedValue.dateRange.from).format('YYYY-MM-DD'),
        endDate: dayjs(selectedValue.dateRange.to).format('YYYY-MM-DD'),
        mealType: selectedValue.mealType,
        orderStatus: selectedValue.orderStatus.join(','),
        orderAmountStart: selectedValue.priceRange[0],
        orderAmountEnd: selectedValue.priceRange[1],
      },
    };
  };

  const getData = async () => {
    const result = await getAxios().get('/api/order/list', {
      ...initSelectedParams(selectedValue),
    });
    setData(result.data);
  };

  const handleSearch = async () => {
    await getData();
    setPage(1);
  };

  const handleValueChange = (key: keyof OrderListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    getData();
  }, [page]);

  if (data) {
    return (
      <>
        <main className="pb-10">
          <Card>
            <Flex flexDirection="col">
              <Flex>
                <TextInput
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  onChange={e => handleValueChange('search', e.target.value)}
                  className="w-[900px] self-start"
                  icon={MagnifyingGlassIcon}
                  placeholder="주문번호, 주문메뉴, 패밀리점명, 주문자명, 주문자 연락처 (검색어 구분은 콤마','로 구분 | 예. 황금올리브,홍길동,패밀리타운점)"
                />
              </Flex>
              <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
                <Text className="w-[80px]">기간설정</Text>
                <DateRangePicker
                  placeholder="기간 설정"
                  className="w-[260px]"
                  value={{
                    from: selectedValue.dateRange.from,
                    to: selectedValue.dateRange.to,
                  }}
                  onValueChange={value => {
                    handleValueChange('dateRange', value);
                    handleValueChange('dateRangeType', 'all');
                  }}
                  enableSelect={false}
                  locale={ko}
                />
                <RadioboxGroup
                  value={selectedValue.dateRangeType}
                  onChange={value => {
                    handleValueChange('dateRangeType', value);
                    handleValueChange(
                      'dateRange',
                      getDateFromPast({
                        type: value.split('_')[0],
                        value: parseInt(value.split('_')[1]),
                      }),
                    );
                  }}
                >
                  <Radiobox value="all" label="전체" />
                  <Radiobox value="d_0" label="오늘" />
                  <Radiobox value="w_1" label="일주일" />
                  <Radiobox value="m_1" label="한달" />
                  <Radiobox value="m_6" label="6개월" />
                  <Radiobox value="y_1" label="1년" />
                </RadioboxGroup>
              </Flex>
              <Flex justifyContent="start" className="gap-10 mt-3 border-b pb-3">
                <Text className="w-[80px]">상태</Text>
                <RadioboxGroup
                  value={selectedValue.mealType}
                  onChange={value => handleValueChange('mealType', value)}
                >
                  <Radiobox value="" label="전체" />
                  <Radiobox value="DELIVERY" label="배달" />
                  <Radiobox value="TAKEOUT" label="포장" />
                </RadioboxGroup>
              </Flex>
              <Flex justifyContent="start" className="gap-10 mt-3 border-b pb-3">
                <Text className="w-[80px]">주문상태</Text>
                <CheckboxGroup
                  className="gap-5"
                  value={selectedValue.orderStatus}
                  onChange={value => handleValueChange('orderStatus', value)}
                >
                  <Checkbox value="PAY_COMPLETED" label="결제완료" />
                  <Checkbox value="PAY_FAILED" label="결제실패" />
                  <Checkbox value="PAY_WAITING" label="결제대기" />
                  <Checkbox value="NOTIFIED" label="주문접수" />
                  <Checkbox value="COOKING" label="조리중" />
                  <Checkbox value="IN_DELIVERY" label="배달중" />
                  <Checkbox value="COMPLETED" label="완료" />
                  <Checkbox value="CANCEL_CONFIRMED" label="취소완료" />
                </CheckboxGroup>
              </Flex>
              <Flex justifyContent="start" className="gap-10 mt-3 pb-3">
                <Text className="w-[80px]">판매금액</Text>
                <Flex flexDirection="col" alignItems="start" className="ml-4">
                  <Slider
                    step={500}
                    min={0}
                    max={2000000}
                    onAfterChange={value => handleValueChange('priceRange', value)}
                    defaultValue={[0, 2000000]}
                    style={{
                      width: 500,
                    }}
                    trackStyle={{
                      backgroundColor: '#fe4a51',
                    }}
                    handleStyle={{
                      backgroundColor: '#46477a',
                      borderColor: '#46477a',
                      opacity: 1,
                    }}
                    range
                  />
                  <Flex className="w-[500px]">
                    <Text>{selectedValue.priceRange[0].toLocaleString()} 원 부터</Text>
                    <Text>{selectedValue.priceRange[1].toLocaleString()} 원 까지</Text>
                  </Flex>
                </Flex>
              </Flex>
              <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
                위 조건으로 검색
              </CustomButton>
            </Flex>
          </Card>
          <div className="flex justify-between items-center">
            <Text className="mt-10 mb-5">Total {data.totalElements.toLocaleString()}</Text>
            <CustomButton
              className="w-[138px] h-[40px] !bg-[#46477A] !text-[#fff]"
              onClick={() => {
                if (
                  dayjs(selectedValue.dateRange.from).format('YYYY-MM-DD') !==
                  dayjs(selectedValue.dateRange.to).format('YYYY-MM-DD')
                ) {
                  alert(
                    `주문 목록은 일일 기준으로만 다운로드 가능합니다. 캘린더에서 동일한 날짜를 두 번 클릭하여 엑셀 파일을 다운로드하세요.`,
                  );
                  return;
                }
                window.open(
                  `/api/order/excel?${createExcelDownloadUrl(selectedValue, initSelectedParams)}`,
                  '_blank',
                );
              }}
              type="secondary"
            >
              엑셀 다운로드
            </CustomButton>
          </div>
          <Table className="border-b">
            <TableHead className="bg-gray-100 border">
              <TableRow className="border">
                <TableHeaderCell>주문번호</TableHeaderCell>
                <TableHeaderCell>주문메뉴</TableHeaderCell>
                <TableHeaderCell>패밀리점명</TableHeaderCell>
                <TableHeaderCell>상태</TableHeaderCell>
                <TableHeaderCell>주문채널</TableHeaderCell>
                <TableHeaderCell>결제일자</TableHeaderCell>
                <TableHeaderCell>주문자명</TableHeaderCell>
                <TableHeaderCell>결제 방법</TableHeaderCell>
                <TableHeaderCell>판매금액(원)</TableHeaderCell>
                <TableHeaderCell>결제금액(원)</TableHeaderCell>
                <TableHeaderCell>주문상태</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.content &&
                data.content.map(data => {
                  return (
                    <TableRow
                      key={data.id}
                      className="border hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        openModal(
                          '주문정보',
                          `주문번호 ${data.id}`,
                          <OrderDetail id={data.id} />,
                          () => getData(),
                        )
                      }
                    >
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.orderMenuTitle}</TableCell>
                      <TableCell>{data.familyName}</TableCell>
                      <TableCell>{returnMealType(data.mealType)}</TableCell>
                      <TableCell>{returnOrderChannel(data.orderChannel)}</TableCell>
                      <TableCell>{data.createdAt}</TableCell>
                      <TableCell>{data.memberName}</TableCell>
                      <TableCell>{returnPaymentMethod(data.paymentMethod)}</TableCell>
                      <TableCell>{data.orderAmount.toLocaleString()}</TableCell>
                      <TableCell>{data.payAmount.toLocaleString()}</TableCell>
                      <TableCell>{returnOrderStatus(data.orderStatus, data.mealType)}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <CustomPagination
            activePage={page}
            perPage={20}
            totalItemsCount={data.totalElements}
            handlePageChange={value => setPage(value)}
          />
        </main>
      </>
    );
  }
}
