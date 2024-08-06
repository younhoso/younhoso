'use client';

import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
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

import dynamic from 'next/dynamic';

import { ko } from 'date-fns/locale';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import VerticalDivider from '@/app/components/VerticalDivider';
import { getDateFromPast } from '@/utils/getDateFromPast';

import CouponProductSelect from '../Modal/CouponProductSelect';

const Editor = dynamic(() => import('../../components/Editor'), { ssr: false });

interface CouponRegisterCondition {
  discountPrice: string;
  discountPriceProductType: string;
  couponType: {
    publisher: 'all' | 'order' | 'mall';
    type?: 'general' | 'event';
    range?: 'all' | 'birthday' | 'download' | 'custom';
  };
  restrictSetting: {
    dateRange: DateRangePickerValue;
    quantityLimit: string;
    minOrderPrice: string;
    maxDiscountPrice: string;
    availableGrade: string[];
    pointReuse: string;
    couponReuse: string;
  };
  targetSelect: {
    type: 'all' | 'join' | 'birthday' | 'event';
    joinSearch?: {
      dateRange: DateRangePickerValue;
      dateRangeType: string;
    };
    birthdaySearch?: {
      dateRange: DateRangePickerValue;
      dateRangeType: string;
    };
    eventSearch?: string;
  };
  table: {
    tableCheckAll: string[];
    tableCheckList: string[];
    tablePerPage: string;
    tableSearchString: string;
  };
}

export default function CouponRegisterPage() {
  const { openModal } = useModalContext();
  const [selectedValue, setSelectedValue] = useState<CouponRegisterCondition>({
    discountPrice: '',
    discountPriceProductType: 'all',
    couponType: {
      publisher: 'all',
    },
    restrictSetting: {
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      quantityLimit: '',
      minOrderPrice: '',
      maxDiscountPrice: '',
      availableGrade: [],
      pointReuse: '',
      couponReuse: '',
    },
    targetSelect: {
      type: 'all',
    },
    table: {
      tableCheckAll: [],
      tableCheckList: [],
      tablePerPage: '20',
      tableSearchString: '',
    },
  });

  const handleValueChange = (
    key: keyof CouponRegisterCondition,
    value: string | object | number[],
  ) => {
    setSelectedValue(prevSelectedValue => {
      if (typeof value === 'object' && value !== null) {
        return {
          ...prevSelectedValue,
          [key]: Object.assign({}, prevSelectedValue[key as keyof CouponRegisterCondition], value),
        };
      } else {
        return {
          ...prevSelectedValue,
          [key]: value,
        };
      }
    });
  };

  return (
    <>
      <Card className="p-0">
        <div className="border-b p-5">
          <Title>할인금액</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start">
          <Flex justifyContent="start" className="gap-1 w-[400px] mr-10">
            <TextInput
              placeholder="할인가 입력"
              value={selectedValue.discountPrice}
              onChange={e => handleValueChange('discountPrice', e.target.value)}
            />
            <Text>원</Text>
          </Flex>
          <Flex justifyContent="start" className="gap-10">
            <RadioboxGroup
              value={selectedValue.discountPriceProductType}
              onChange={value => handleValueChange('discountPriceProductType', value)}
            >
              <Radiobox value={'all'} label="전체 상품" />
              <Radiobox value={'partial'} label="조건 상품" />
            </RadioboxGroup>
          </Flex>
        </Flex>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>쿠폰 종류 설정</Title>
        </div>

        <div className="p-5">
          <Flex justifyContent="start" className="py-5">
            <Text className="w-[80px] self-start">사용처</Text>
            <Flex justifyContent="start" className="gap-10">
              <RadioboxGroup
                value={selectedValue.couponType.publisher}
                onChange={value => handleValueChange('couponType', { publisher: value })}
              >
                <Radiobox value={'all'} label="전체" />
                <Radiobox value={'app'} label="주문앱" />
                <Radiobox value={'mall'} label="자사몰" />
              </RadioboxGroup>
            </Flex>
          </Flex>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>제한설정</Title>
        </div>
        <div className="p-5">
          <Flex justifyContent="start" className="gap-10 p-3 border-b pt-0">
            <Text className="min-w-[150px]">기한 설정</Text>
            <DateRangePicker
              className="w-[300px]"
              value={selectedValue.restrictSetting.dateRange}
              onValueChange={value => handleValueChange('restrictSetting', { dateRange: value })}
              enableSelect={false}
              locale={ko}
            />
          </Flex>
          <Flex justifyContent="start" className="gap-10 p-3 border-b">
            <Text className="min-w-[150px]">수량 제한</Text>
            <div>
              <TextInput
                className="w-[300px] inline-block"
                placeholder="수량"
                value={selectedValue.restrictSetting.quantityLimit}
                onChange={e =>
                  handleValueChange('restrictSetting', {
                    quantityLimit: e.target.value,
                  })
                }
              />
              <Text className="ml-2 inline-block">개</Text>
            </div>
          </Flex>
          <Flex justifyContent="start" className="gap-10 p-3 border-b">
            <Text className="min-w-[150px]">최소 주문 금액</Text>
            <div>
              <TextInput
                className="w-[300px] inline-block"
                placeholder="수량"
                value={selectedValue.restrictSetting.minOrderPrice}
                onChange={e =>
                  handleValueChange('restrictSetting', {
                    minOrderPrice: e.target.value,
                  })
                }
              />
              <Text className="ml-2 inline-block">원</Text>
            </div>
          </Flex>
          <Flex justifyContent="start" className="gap-10 p-3 border-b">
            <Text className="min-w-[150px]">최대 할인 금액</Text>
            <div>
              <TextInput
                className="w-[300px] inline-block"
                placeholder="수량"
                value={selectedValue.restrictSetting.maxDiscountPrice}
                onChange={e =>
                  handleValueChange('restrictSetting', {
                    maxDiscountPrice: e.target.value,
                  })
                }
              />
              <Text className="ml-2 inline-block">원</Text>
            </div>
          </Flex>
          <Flex justifyContent="start" className="gap-10 p-3 border-b">
            <Text className="min-w-[150px]">사용가능등급</Text>
            <Flex justifyContent="start">
              <CheckboxGroup
                value={selectedValue.restrictSetting.availableGrade}
                onChange={value =>
                  handleValueChange('restrictSetting', {
                    availableGrade: value,
                  })
                }
                className="gap-10"
              >
                <Checkbox value={'all'} label="전체" />
                <Checkbox value={'egg'} label="에그" />
                <Checkbox value={'oly'} label="올리" />
                <Checkbox value={'chiki'} label="치키" />
                <Checkbox value={'chipak'} label="치빡이" />
              </CheckboxGroup>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="gap-10 p-3 border-b">
            <Text className="min-w-[150px]">포인트 중복 사용 여부</Text>
            <Flex justifyContent="start" className="gap-10">
              <RadioboxGroup
                value={selectedValue.restrictSetting.pointReuse}
                onChange={value => handleValueChange('restrictSetting', { pointReuse: value })}
              >
                <Radiobox value={'Y'} label="가능" />
                <Radiobox value={'N'} label="불가능" />
              </RadioboxGroup>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="gap-10 p-3 pb-0">
            <Text className="min-w-[150px]">중복 쿠폰 여부</Text>
            <Flex justifyContent="start" className="gap-10">
              <RadioboxGroup
                value={selectedValue.restrictSetting.couponReuse}
                onChange={value => handleValueChange('restrictSetting', { couponReuse: value })}
              >
                <Radiobox value={'Y'} label="가능" />
                <Radiobox value={'N'} label="불가능" />
              </RadioboxGroup>
            </Flex>
          </Flex>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>제한설정</Title>
        </div>
        <div className="ml-5">
          <Flex className="py-5 border-b">
            <RadioboxGroup
              value={selectedValue.targetSelect.type}
              onChange={value => handleValueChange('targetSelect', { type: value })}
            >
              <Radiobox value={'all'} label="전체" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent="start" className="py-5 border-b gap-5">
            <RadioboxGroup
              value={selectedValue.targetSelect.type}
              onChange={value => handleValueChange('targetSelect', { type: value })}
            >
              <Radiobox value={'join'} label="가입일 검색" />
            </RadioboxGroup>
            <DateRangePicker
              disabled={selectedValue.targetSelect.type !== 'join'}
              className="w-[300px]"
              value={selectedValue.targetSelect.joinSearch?.dateRange}
              onValueChange={value =>
                handleValueChange('targetSelect', {
                  joinSearch: { dateRange: value },
                })
              }
              enableSelect={false}
              locale={ko}
              placeholder="기간 선택"
            />
            <RadioboxGroup
              disabled={selectedValue.targetSelect.type !== 'join'}
              value={selectedValue.targetSelect.joinSearch?.dateRangeType || ''}
              onChange={value => {
                handleValueChange('targetSelect', {
                  joinSearch: { dateRangeType: value },
                });
                handleValueChange('targetSelect', {
                  joinSearch: {
                    dateRange: getDateFromPast({
                      type: value.split('_')[0],
                      value: parseInt(value.split('_')[1]),
                    }),
                  },
                });
              }}
            >
              <Radiobox value={'m_1'} label="최근 1개월" />
              <Radiobox value={'m_6'} label="최근 6개월" />
              <Radiobox value={'y_1'} label="최근 1년" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent="start" className="py-5 border-b gap-5">
            <RadioboxGroup
              value={selectedValue.targetSelect.type}
              onChange={value => handleValueChange('targetSelect', { type: value })}
            >
              <Radiobox value={'birthday'} label="생일자 검색" />
            </RadioboxGroup>

            <DateRangePicker
              className="w-[300px]"
              disabled={selectedValue.targetSelect.type !== 'birthday'}
              value={selectedValue.targetSelect.birthdaySearch?.dateRange}
              onValueChange={value => {
                handleValueChange('targetSelect', {
                  birthdaySearch: { dateRange: value },
                });
                handleValueChange('targetSelect', {
                  birthdaySearch: { dateRangeType: '' },
                });
              }}
              enableSelect={false}
              locale={ko}
              placeholder="기간 선택"
            />
            <Select
              disabled={selectedValue.targetSelect.type !== 'birthday'}
              className="w-[100px]"
              placeholder="월 선택"
              value={selectedValue.targetSelect.birthdaySearch?.dateRangeType}
              onChange={value => {
                handleValueChange('targetSelect', {
                  birthdaySearch: { dateRangeType: value },
                });
                handleValueChange('targetSelect', {
                  birthdaySearch: {
                    dateRange: {
                      from: null,
                      to: null,
                    },
                  },
                });
              }}
            >
              {Array(12)
                .fill(0)
                .map((_, month) => {
                  return (
                    <SelectItem value={(month + 1).toString()} key={month}>
                      {month + 1}월
                    </SelectItem>
                  );
                })}
            </Select>
            <Text>생일자만</Text>
            <CustomButton type="tertiary">보기</CustomButton>
          </Flex>
          <Flex justifyContent="start" className="py-5 border-b mb-5 gap-5">
            <RadioboxGroup
              value={selectedValue.targetSelect.type}
              onChange={value => handleValueChange('targetSelect', { type: value })}
            >
              <Radiobox value={'event'} label="이벤트 참여자" />
            </RadioboxGroup>
            <Select
              disabled={selectedValue.targetSelect.type !== 'event'}
              className="w-[400px]"
              placeholder="이벤트명"
              value={selectedValue.targetSelect.eventSearch}
              onChange={value => {
                handleValueChange('targetSelect', {
                  eventSearch: value,
                });
              }}
            >
              {Array(12)
                .fill(0)
                .map((_, month) => {
                  return (
                    <SelectItem key={month} value={(month + 1).toString()}>
                      이벤트 1
                    </SelectItem>
                  );
                })}
            </Select>
          </Flex>
          <CustomButton type="secondary" className="mb-5 w-[200px]">
            위 조건으로 검색
          </CustomButton>
        </div>
      </Card>
      <Card className="!border-t-0">
        <Flex className="mb-5" justifyContent="start">
          <Flex className="self-start gap-5 mr-auto" justifyContent="start">
            <Text>전체</Text>
            <CheckboxGroup
              value={selectedValue.table.tableCheckAll}
              onChange={value => {
                handleValueChange('table', {
                  tableCheckAll: value,
                });
                handleValueChange('table', {
                  tableCheckList: value,
                });
              }}
            >
              <Checkbox value={'all'} label="검색 전체 선택" />
            </CheckboxGroup>
            <CustomButton
              onClick={() => openModal('', '', <CouponProductSelect />)}
              type={'tertiary'}
            >
              선택 대상자 적용
            </CustomButton>
          </Flex>
          <Flex className="self-end ml-auto gap-3" justifyContent="end">
            <Text>Total 56,642</Text>
            <Select
              className="w-[100px]"
              placeholder="보기"
              value={selectedValue.table.tablePerPage}
              onChange={value => {
                handleValueChange('table', {
                  tablePerPage: value,
                });
              }}
            >
              <SelectItem value="20">20개씩 보기</SelectItem>
              <SelectItem value="40">40개씩 보기</SelectItem>
            </Select>
            <TextInput
              className="w-[300px]"
              placeholder="아이디, 이름, 메일, 연락처 검색"
              value={selectedValue.table.tableSearchString}
              onChange={e =>
                handleValueChange('table', {
                  tableSearchString: e.target.value,
                })
              }
            />
          </Flex>
        </Flex>
        <Table className="border-b">
          <TableHead className="bg-gray-100 border">
            <TableRow className="border">
              <TableHeaderCell>
                <CheckboxGroup
                  table={true}
                  value={selectedValue.table.tableCheckList}
                  onChange={value =>
                    handleValueChange('table', {
                      tableCheckList: value,
                    })
                  }
                >
                  <Checkbox value={'all'} />
                </CheckboxGroup>
              </TableHeaderCell>
              <TableHeaderCell>번호</TableHeaderCell>
              <TableHeaderCell>아이디</TableHeaderCell>
              <TableHeaderCell>가입일</TableHeaderCell>
              <TableHeaderCell>연락처</TableHeaderCell>
              <TableHeaderCell>등급</TableHeaderCell>
              <TableHeaderCell>이메일</TableHeaderCell>
              <TableHeaderCell>주소</TableHeaderCell>
              <TableHeaderCell>보유 포인트</TableHeaderCell>
              <TableHeaderCell>보유 쿠폰</TableHeaderCell>
              <TableHeaderCell>마케팅 수신 여부</TableHeaderCell>
              <TableHeaderCell>주문건수</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array(10)
              .fill(0)
              .map((data, index) => {
                return (
                  <TableRow className="border hover:bg-gray-100" key={index}>
                    <TableCell>
                      <CheckboxGroup
                        table={true}
                        value={selectedValue.table.tableCheckList}
                        onChange={value =>
                          handleValueChange('table', {
                            tableCheckList: value,
                          })
                        }
                      >
                        <Checkbox value={data.toString()} />
                      </CheckboxGroup>
                    </TableCell>
                    <TableCell>128</TableCell>
                    <TableCell>userId001</TableCell>
                    <TableCell>2023.09.01</TableCell>
                    <TableCell>010-1234-5678</TableCell>
                    <TableCell>에그</TableCell>
                    <TableCell>userId001@gmail.com</TableCell>
                    <TableCell>서울 서초구 송파동</TableCell>
                    <TableCell>5,426p</TableCell>
                    <TableCell>
                      <Flex className="gap-2">
                        <Text>주문</Text>
                        <Text className="text-emerald-500">6</Text>
                        <VerticalDivider height={10} />
                        <Text>몰</Text>
                        <Text className="text-red-500">2</Text>
                      </Flex>
                    </TableCell>
                    <TableCell>동의</TableCell>
                    <TableCell>5</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* <Pagination /> */}
      </Card>

      <Flex justifyContent="center" className="p-5">
        <CustomButton type="tertiary" className="w-[200px] h-[50px]">
          취소
        </CustomButton>
        <CustomButton type="secondary" className="ml-3 w-[200px] h-[50px]">
          등록완료
        </CustomButton>
      </Flex>
    </>
  );
}
