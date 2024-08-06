'use client';

import { ArrowRightIcon, XCircleIcon } from '@heroicons/react/24/outline';
import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import axios, { isAxiosError } from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';

import CouponProductSelect from '../Modal/CouponProductSelect';
import CouponProductSelectDeprecated from '../Modal/CouponProductSelect_deprecated';

const Editor = dynamic(() => import('../../components/Editor'), { ssr: false });

registerLocale('ko', ko);

export type UsableDayOfWeeks =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

interface CouponRegisterCondition {
  discountAmount: string;
  isActive: string;
  couponName: string;
  description: string;
  benefitType: string;
  dateRange: any;
  mealTypes: string[];
  offerCount: string;
  maxIssuePerMember: string;
  maxIssuePerMemberDay: string;
  usableDayOfWeeks: string[];
  membershipGrades: string[];
  usableStartsTime?: Date;
  usableEndsTime?: Date;
  requiredProductList: {
    id: string;
    menuName: string;
  }[];
  benefitProductList?: {
    menuId: string;
    menuName: string;
    subOptionItemIdSet: string[];
  };
  issuanceType: string;
  couponCategory: string;
  flatDiscountMinAmount: string;
  discountRate: string;
  rateDiscountMinAmount: string;
  rateDiscountMaxDiscountAmount: string;
  deliveryFeeMinAmount: string;
  deliveryFeeMaxDiscountAmount: string;
  benefitProductMinAmount: string;
  issuerName: string;
}

export default function CouponRegisterPage() {
  const router = useRouter();
  const { openModal } = useModalContext();
  const [selectedValue, setSelectedValue] = useState<CouponRegisterCondition>({
    isActive: '',
    couponName: '',
    description: '',
    benefitType: '',
    dateRange: {
      from: new Date(),
      to: new Date(dayjs(new Date()).add(1, 'week').toDate()),
    },
    mealTypes: [],
    offerCount: '',
    maxIssuePerMember: '',
    maxIssuePerMemberDay: '',
    usableDayOfWeeks: [],
    membershipGrades: [],
    usableStartsTime: dayjs(new Date()).set('hour', 0).set('minute', 0).toDate(),
    usableEndsTime: dayjs(new Date()).set('hour', 23).set('minute', 59).toDate(),
    requiredProductList: [],
    benefitProductList: undefined,
    issuanceType: '',
    couponCategory: '',
    discountAmount: '',
    flatDiscountMinAmount: '',
    discountRate: '',
    rateDiscountMinAmount: '',
    rateDiscountMaxDiscountAmount: '',
    deliveryFeeMinAmount: '',
    deliveryFeeMaxDiscountAmount: '',
    benefitProductMinAmount: '',
    issuerName: '',
  });

  const getAdminName = async () => {
    const session = await getSession();
    handleValueChange('issuerName', session?.adminUserInfo?.name || '');
  };

  const handleValueChange = (
    key: keyof CouponRegisterCondition,
    value: string | object | number[] | Date,
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const validationCheck = () => {
    if (!selectedValue.isActive) {
      alert('쿠폰 상태를 설정해주세요.');
      return false;
    }
    if (!selectedValue.couponCategory) {
      alert('쿠폰 종류를 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.couponCategory === 'MEMBERSHIP_GRADE' &&
      selectedValue.membershipGrades.length == 0
    ) {
      alert('멤버십 등급을 선택해 주세요.');
      return false;
    }
    if (selectedValue.couponCategory === 'DEFAULT' && !selectedValue.issuanceType) {
      alert('일반 쿠폰 유형을 선택해 주세요.');
      return false;
    }
    if (!selectedValue.couponName) {
      alert('쿠폰함에 표시될 쿠폰 이름을 입력해 주세요.');
      return false;
    }
    if (!selectedValue.description) {
      alert('쿠폰 사용 안내를 입력해 주세요.');
      return false;
    }
    if (!selectedValue.benefitType) {
      alert('쿠폰 혜택 타입을 입력해 주세요.');
      return false;
    }
    if (!selectedValue.issuerName) {
      alert('발급자 이름을 입력해 주세요.');
      return false;
    }
    if (selectedValue.benefitType === 'FLAT_DISCOUNT' && !selectedValue.discountAmount) {
      alert('정액 할인 금액을 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.benefitType === 'FLAT_DISCOUNT' &&
      !Number.isInteger(selectedValue.discountAmount) &&
      Number(selectedValue.discountAmount) < 0
    ) {
      alert('정액 할인 금액은 0이상의 숫자만 입력 가능합니다.');
      return false;
    }
    if (selectedValue.benefitType === 'FLAT_DISCOUNT' && !selectedValue.flatDiscountMinAmount) {
      alert('정액 최소 주문 금액을 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.benefitType === 'FLAT_DISCOUNT' &&
      !Number.isInteger(selectedValue.flatDiscountMinAmount) &&
      Number(selectedValue.flatDiscountMinAmount) < 0
    ) {
      alert('정액 할인의 최소 주문 금액은 0이상의 숫자만 입력 가능합니다.');
      return false;
    }
    if (
      selectedValue.benefitType === 'FLAT_DISCOUNT' &&
      Number(selectedValue.flatDiscountMinAmount) < Number(selectedValue.discountAmount)
    ) {
      alert('정액 할인의 최소 주문 금액은 할인 금액보다 작을 수 없습니다.');
      return false;
    }
    if (selectedValue.benefitType === 'RATE_DISCOUNT' && !selectedValue.discountRate) {
      alert('정률 할인률을 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.benefitType === 'RATE_DISCOUNT' &&
      !Number.isInteger(selectedValue.discountRate) &&
      (Number(selectedValue.discountRate) < 0 || Number(selectedValue.discountRate) > 100)
    ) {
      alert('정률 할인률은 1 ~ 100%만 가능합니다.');
      return false;
    }
    if (selectedValue.benefitType === 'RATE_DISCOUNT' && !selectedValue.rateDiscountMinAmount) {
      alert('정률 할인의 최소 주문 금액을 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.benefitType === 'RATE_DISCOUNT' &&
      !selectedValue.rateDiscountMaxDiscountAmount
    ) {
      alert('정률 할인의 최대 주문 금액을 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.benefitType === 'RATE_DISCOUNT' &&
      Number(selectedValue.rateDiscountMinAmount) <
        Number(selectedValue.rateDiscountMaxDiscountAmount)
    ) {
      alert('정률 할인의 최소 주문 금액은 최대 할인 금액보다 작을 수 없습니다.');
      return false;
    }
    if (
      selectedValue.benefitType === 'DELIVERY_FEE' &&
      !selectedValue.deliveryFeeMaxDiscountAmount
    ) {
      alert('배달비 할인의 최대 할인 배달비 금액을 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.benefitType === 'DELIVERY_FEE' &&
      parseInt(selectedValue.deliveryFeeMaxDiscountAmount) % 100 !== 0
    ) {
      alert('배달비 할인의 최대 할인 배달비 금액은 100원 단위로 입력해 주세요.');
      return false;
    }
    if (selectedValue.benefitType === 'DELIVERY_FEE' && !selectedValue.deliveryFeeMinAmount) {
      alert('배달비 할인의 최소 주문 금액을 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.benefitType === 'DELIVERY_FEE' &&
      parseInt(selectedValue.deliveryFeeMinAmount) < parseInt(selectedValue.deliveryFeeMaxDiscountAmount)
    ) {
      alert('배달비 할인 금액이 최소 주문 금액보다 큽니다.');
      return false;
    }
    if (selectedValue.benefitType === 'DELIVERY_FEE' && 
      (selectedValue.mealTypes.length !== 1 || 
        !selectedValue.mealTypes.includes("DELIVERY"))) {
      alert('배달비 할인은 [배달] 주문 시에만 가능합니다. 다른 주문 타입은 해제해 주세요.');
      return false;
    }
    if (selectedValue.benefitType === 'PRODUCT' && selectedValue.benefitProductList === undefined) {
      alert('증정 메뉴를 선택해 주세요.');
      return false;
    }
    if (selectedValue.benefitType === 'PRODUCT' && !selectedValue.benefitProductMinAmount) {
      alert('최소 주문 금액을 입력해 주세요.');
      return false;
    }
    if (
      selectedValue.benefitType === 'PRODUCT' &&
      !Number.isInteger(selectedValue.benefitProductMinAmount) &&
      Number(selectedValue.benefitProductMinAmount) < 0
    ) {
      alert('메뉴증정의 최소 주문 금액은 0보다 큰 숫자만 입력 가능합니다.');
      return false;
    }
    if (Object.keys(selectedValue.dateRange).length === 0) {
      alert('쿠폰 발급 가능 기간을 입력해 주세요.');
      return false;
    }
    if (
      Object.keys(selectedValue.dateRange).length > 0 &&
      selectedValue.dateRange.from === undefined
    ) {
      alert('쿠폰 발급 가능 시작 시각을 입력해 주세요.');
      return false;
    }
    if (selectedValue.dateRange && selectedValue.dateRange.to === undefined) {
      alert('쿠폰 발급 가능 종료 시각을 입력해 주세요.');
      return false;
    }
    if (selectedValue.mealTypes.every(mealType => !mealType)) {
      alert('주문 타입을 선택해 주세요.');
      return false;
    }
    if (!selectedValue.offerCount) {
      alert('쿠폰 발급 가능 매수를 입력해 주세요.');
      return false;
    }
    if (!selectedValue.maxIssuePerMember) {
      alert('개인별 총 발급 가능 횟수를 입력해 주세요.');
      return false;
    }
    if (!selectedValue.maxIssuePerMemberDay) {
      alert('개인별 1일 당 발급 가능 횟수를 입력해 주세요.');
      return false;
    }
    if (Number(selectedValue.offerCount) < 0) {
      alert('발급 매수는 0보다 큰 숫자만 입력 가능합니다.');
      return false;
    }
    if (Number(selectedValue.maxIssuePerMember) < 0) {
      alert('개인별 총 발급 가능 횟수는 0보다 큰 숫자만 입력 가능합니다.');
      return false;
    }
    if (Number(selectedValue.maxIssuePerMemberDay) < 0) {
      alert('개인별 1인당 발급 가능 횟수는 0보다 큰 숫자만 입력 가능합니다.');
      return false;
    }
    if (Number(selectedValue.offerCount) < Number(selectedValue.maxIssuePerMember)) {
      alert('쿠폰 발급 매수는 개인별 발급 가능 횟수보다 크거나 같아야 합니다.');
      return false;
    }
    if (Number(selectedValue.maxIssuePerMember) < Number(selectedValue.maxIssuePerMemberDay)) {
      alert('개인별 발급 가능 횟수는 개인별 1일당 발급 가능 횟수보다 크거나 같아야 합니다.');
      return false;
    }
    if (selectedValue.usableDayOfWeeks.every(days => !days)) {
      alert('쿠폰 사용 가능 요일 목록을 입력해 주세요.');
      return false;
    }
    if (selectedValue.usableStartsTime === undefined) {
      alert('매일 사용 가능 시작 시각을 입력해 주세요.');
      return false;
    }
    if (selectedValue.usableEndsTime === undefined) {
      alert('매일 사용 가능 종료 시각을 입력해 주세요.');
      return false;
    }
    return true;
  };

  const registerCoupon = async () => {
    try {
      if (!validationCheck()) {
        return;
      }

      const result = await getAxios().post('/api/coupon/membership', {
        couponName: selectedValue.couponName,
        description: selectedValue.description,
        isActive: selectedValue.isActive === 'true' ? true : false,
        issuanceType: selectedValue.issuanceType === '' ? null : selectedValue.issuanceType,
        couponCategory: selectedValue.couponCategory,
        benefitType: selectedValue.benefitType,
        discountAmount: parseInt(selectedValue.discountAmount),
        discountRate: parseInt(selectedValue.discountRate),
        maxDiscountAmount:
          selectedValue.benefitType === 'RATE_DISCOUNT'
            ? parseInt(selectedValue.rateDiscountMaxDiscountAmount)
            : selectedValue.benefitType === 'DELIVERY_FEE'
              ? parseInt(selectedValue.deliveryFeeMaxDiscountAmount)
              : 0,
        minAmount:
          selectedValue.benefitType === 'FLAT_DISCOUNT'
            ? parseInt(selectedValue.flatDiscountMinAmount)
            : selectedValue.benefitType === 'RATE_DISCOUNT'
              ? parseInt(selectedValue.rateDiscountMinAmount)
              : selectedValue.benefitType === 'PRODUCT'
                ? parseInt(selectedValue.benefitProductMinAmount)
                : selectedValue.benefitType === 'DELIVERY_FEE'
                  ? parseInt(selectedValue.deliveryFeeMinAmount)
                  : 0,
        benefitProductInfo: selectedValue.benefitProductList && {
          menuId: parseInt(selectedValue.benefitProductList.menuId),
          subOptionItemIdSet:
            selectedValue.benefitProductList.subOptionItemIdSet.length > 0
              ? selectedValue.benefitProductList.subOptionItemIdSet
              : [],
        },
        mealTypes: selectedValue.mealTypes,
        membershipGrades:
          selectedValue.membershipGrades && selectedValue.membershipGrades[0] === 'all'
            ? [1, 2, 3, 4]
            : selectedValue.membershipGrades.map(item => parseInt(item)),
        offerCount: parseInt(selectedValue.offerCount),
        offerStartsAt: selectedValue.dateRange?.from
          ? dayjs(selectedValue.dateRange?.from).format('YYYY-MM-DD 00:00:00')
          : null,
        offerEndsAt: selectedValue.dateRange?.to
          ? dayjs(selectedValue.dateRange?.to).format('YYYY-MM-DD 23:59:59')
          : null,
        maxIssuePerMember: parseInt(selectedValue.maxIssuePerMember),
        maxIssuePerMemberDay: parseInt(selectedValue.maxIssuePerMemberDay),
        usableDayOfWeeks:
          selectedValue.usableDayOfWeeks[0] === 'all'
            ? ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
            : selectedValue.usableDayOfWeeks,
        usableStartsTime: selectedValue.usableStartsTime
          ? dayjs(selectedValue.usableStartsTime).format('HH:mm')
          : null,
        usableEndsTime: selectedValue.usableEndsTime
          ? dayjs(selectedValue.usableEndsTime).format('HH:mm')
          : null,
        requiredProductList:
          selectedValue.requiredProductList.length > 0
            ? selectedValue.requiredProductList.map(item => parseInt(item.id))
            : [],
        issuerType: 'HQ',
        issuerName: selectedValue.issuerName,
      });
      if (result.status === 200) {
        alert('쿠폰이 등록되었습니다.');
        router.push('/coupon/list');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert(error);
      }
    }
  };
  useEffect(() => {
    getAdminName();
  }, []);

  return (
    <>
      <Card className="p-0">
        <div className="border-b p-5">
          <Title>쿠폰 상태 설정</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start">
          <Flex justifyContent="start" className="gap-10">
            <RadioboxGroup
              value={selectedValue.isActive}
              onChange={value => handleValueChange('isActive', value)}
            >
              <Radiobox value={'true'} label="활성화" />
              <Radiobox value={'false'} label="비활성화" />
            </RadioboxGroup>
          </Flex>
        </Flex>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>쿠폰 종류 설정</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start" flexDirection="col">
          <Flex justifyContent="start" className="gap-5 pb-3">
            <Text className="w-[100px]">쿠폰 종류</Text>
            <RadioboxGroup
              value={selectedValue.couponCategory}
              onChange={value => handleValueChange('couponCategory', value)}
            >
              <Radiobox value={'MEMBERSHIP_GRADE'} label="멤버십등급" />
              <Radiobox value={'NEW_MEMBER_JOINED'} label="신규가입" />
              <Radiobox value={'BIRTH'} label="생일축하" />
              <Radiobox value={'MARKETING_AGREEMENT'} label="마케팅 동의" />
              <Radiobox value={'DEFAULT'} label="일반" />
            </RadioboxGroup>
          </Flex>
          {selectedValue.couponCategory == 'MEMBERSHIP_GRADE' && (
            <Flex justifyContent="start" className="gap-5 border-t pt-3">
              <Text className="w-[100px]">멤버십등급</Text>
              <CheckboxGroup
                className="gap-5"
                value={selectedValue.membershipGrades}
                onChange={value => handleValueChange('membershipGrades', value)}
              >
                <Checkbox value={'all'} label="전체" />
                <Checkbox value={'1'} label="WELCOME" />
                <Checkbox value={'2'} label="치빡이" />
                <Checkbox value={'3'} label="BIP" />
                <Checkbox value={'4'} label="BBIP" />
              </CheckboxGroup>
            </Flex>
          )}
          {selectedValue.couponCategory == 'DEFAULT' && (
            <Flex justifyContent="start" className="gap-5 border-t pt-3">
              <Text className="w-[100px]">쿠폰 유형</Text>
              <RadioboxGroup
                value={selectedValue.issuanceType}
                onChange={value => handleValueChange('issuanceType', value)}
              >
                <Radiobox value={'PUBLIC'} label="공개형" />
                <Radiobox value={'PRIVATE'} label="개인형" />
              </RadioboxGroup>
            </Flex>
          )}
        </Flex>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>쿠폰명 입력</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start" flexDirection="col">
          <TextInput
            placeholder="쿠폰명을 입력해 주세요."
            value={selectedValue.couponName}
            onChange={e => handleValueChange('couponName', e.target.value)}
          />
          <textarea
            value={selectedValue.description}
            placeholder="쿠폰 사용 안내 내용을 입력해 주세요."
            className="mt-3 border p-3 rounded-md w-full !text-sm"
            rows={5}
            onChange={e => {
              handleValueChange('description', e.target.value);
            }}
          ></textarea>
        </Flex>
      </Card>

      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>할인금액 설정</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start" flexDirection="col">
          <Flex justifyContent="start" className="border-b py-5">
            <RadioboxGroup
              value={selectedValue.benefitType}
              onChange={value => handleValueChange('benefitType', value)}
            >
              <Radiobox value={'FLAT_DISCOUNT'} label="정액할인" />
            </RadioboxGroup>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={selectedValue.benefitType !== 'FLAT_DISCOUNT'}
                className="ml-5 w-[300px] !rounded-r-none !border-r-0"
                placeholder="할인 금액"
                value={selectedValue.discountAmount}
                onChange={e => handleValueChange('discountAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={selectedValue.benefitType !== 'FLAT_DISCOUNT'}
                className="ml-5 w-[100px] !rounded-r-none !border-r-0"
                placeholder="최소 주문 금액"
                value={selectedValue.flatDiscountMinAmount}
                onChange={e => handleValueChange('flatDiscountMinAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="border-b py-5">
            <RadioboxGroup
              value={selectedValue.benefitType}
              onChange={value => handleValueChange('benefitType', value)}
            >
              <Radiobox value={'RATE_DISCOUNT'} label="정률할인" />
            </RadioboxGroup>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={selectedValue.benefitType !== 'RATE_DISCOUNT'}
                className="ml-5 w-[300px] !rounded-r-none !border-r-0"
                placeholder="할인률"
                value={selectedValue.discountRate}
                onChange={e => handleValueChange('discountRate', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">%</Text>
            </Flex>

            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={selectedValue.benefitType !== 'RATE_DISCOUNT'}
                className="ml-5 w-[100px] !rounded-r-none !border-r-0"
                placeholder="최소 주문 금액"
                value={selectedValue.rateDiscountMinAmount}
                onChange={e => handleValueChange('rateDiscountMinAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>

            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={selectedValue.benefitType !== 'RATE_DISCOUNT'}
                className="ml-5 w-[100px] !rounded-r-none !border-r-0"
                placeholder="최대 할인 금액"
                value={selectedValue.rateDiscountMaxDiscountAmount}
                onChange={e => handleValueChange('rateDiscountMaxDiscountAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="border-b py-5">
            <RadioboxGroup
              value={selectedValue.benefitType}
              onChange={value => handleValueChange('benefitType', value)}
            >
              <Radiobox value={'DELIVERY_FEE'} label="배달비 할인" />
            </RadioboxGroup>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={selectedValue.benefitType !== 'DELIVERY_FEE'}
                className="ml-5 w-[300px] !rounded-r-none !border-r-0"
                placeholder="최대 할인 배달비 금액"
                value={selectedValue.deliveryFeeMaxDiscountAmount}
                onChange={e => handleValueChange('deliveryFeeMaxDiscountAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={selectedValue.benefitType !== 'DELIVERY_FEE'}
                className="ml-5 w-[100px] !rounded-r-none !border-r-0"
                placeholder="최소 주문 금액"
                value={selectedValue.deliveryFeeMinAmount}
                onChange={e => handleValueChange('deliveryFeeMinAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="py-5">
            <RadioboxGroup
              value={selectedValue.benefitType}
              onChange={value => handleValueChange('benefitType', value)}
            >
              <Radiobox value={'PRODUCT'} label="메뉴증정" />
            </RadioboxGroup>
            <CustomButton
              disable={selectedValue.benefitType !== 'PRODUCT'}
              type="tertiary"
              className="ml-5"
              onClick={() =>
                openModal(
                  '증정 메뉴 선택',
                  '',
                  <CouponProductSelect />,
                  value => value.menuId && handleValueChange('benefitProductList', value),
                )
              }
            >
              증정 메뉴 선택
            </CustomButton>
            {selectedValue.benefitType == 'PRODUCT' && selectedValue.benefitProductList && (
              <Flex justifyContent="start" className="w-auto mx-3">
                <Text className="text-emerald-500 mr-1">+</Text>
                <Text>{selectedValue.benefitProductList.menuName}</Text>
                <div
                  className="cursor-pointer ml-1"
                  onClick={() => handleValueChange('benefitProductList', '')}
                >
                  <XCircleIcon width={20} />
                </div>
              </Flex>
            )}
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={selectedValue.benefitType !== 'PRODUCT'}
                className="ml-5 w-[100px] !rounded-r-none !border-r-0"
                placeholder="최소 주문 금액"
                value={selectedValue.benefitProductMinAmount}
                onChange={e => handleValueChange('benefitProductMinAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {/*
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>쿠폰 종류 설정</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start" flexDirection="col">
          <Flex justifyContent="start" className="pb-3 gap-5">
            <Text className="w-[100px]">발급 종류</Text>
            <RadioboxGroup
              value={selectedValue.issuanceType}
              onChange={(value) => handleValueChange('issuanceType', value)}
            >
              <Radiobox value={'PUBLIC'} label="개인형" />
              <Radiobox value={'PRIVATE'} label="공개형" />
            </RadioboxGroup>
          </Flex>
          {selectedValue.issuanceType == 'PUBLIC' && (
            <Flex justifyContent="start" className="gap-5 border-t pt-3">
              <div className="w-[100px]"></div>
              <ArrowRightIcon width={15} />
              <Text>개인형 쿠폰</Text>
              <RadioboxGroup
                value={selectedValue.couponCategory}
                onChange={(value) => handleValueChange('couponCategory', value)}
              >
                <Radiobox value={'DEFAULT'} label="디폴트" />
                <Radiobox value={'MEMBERSHIP_GRADE'} label="맴버쉽등급" />
                <Radiobox value={'NEW_MEMBER_JOINED'} label="가입축하" />
                <Radiobox value={'BIRTH'} label="생일" />
                <Radiobox
                  value={'MARKETING_AGREEMENT'}
                  label="마케팅 수신동의"
                />
              </RadioboxGroup>
            </Flex>
          )}
        </Flex>
      </Card> */}

      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>발행 기간 설정</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start">
          <Text>기간 설정</Text>
          <DateRangePicker
            className="w-full ml-5"
            enableSelect={false}
            locale={ko}
            placeholder="기간 선택"
            value={selectedValue.dateRange}
            onValueChange={value => {
              handleValueChange('dateRange', value);
            }}
          />
        </Flex>
      </Card>

      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>쿠폰 옵션</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start" flexDirection="col">
          <Flex justifyContent="start" className="border-b pb-3">
            <Text className="w-[200px]">주문 타입</Text>
            <CheckboxGroup
              value={selectedValue.mealTypes}
              onChange={value => handleValueChange('mealTypes', value)}
            >
              <Checkbox className="mr-5" value={'DELIVERY'} label="배달" />
              <Checkbox className="mr-5" value={'TAKEOUT'} label="포장" />
            </CheckboxGroup>
          </Flex>
          <Flex justifyContent="start" className="py-3 border-b">
            <Text className="w-[200px]">발급 매수</Text>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                className="w-[100px] !rounded-r-none !border-r-0"
                placeholder=""
                value={selectedValue.offerCount}
                onChange={e => handleValueChange('offerCount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">개</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="py-3 border-b">
            <Text className="w-[200px]">개인별 발급 가능 횟수</Text>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                className="w-[100px] !rounded-r-none !border-r-0"
                placeholder=""
                value={selectedValue.maxIssuePerMember}
                onChange={e => handleValueChange('maxIssuePerMember', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">개</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="py-3 border-b">
            <Text className="w-[200px]">개인별 1일당 발급 가능 횟수</Text>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                className="w-[100px] !rounded-r-none !border-r-0"
                placeholder=""
                value={selectedValue.maxIssuePerMemberDay}
                onChange={e => handleValueChange('maxIssuePerMemberDay', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">개</Text>
            </Flex>
          </Flex>
          {/* <Flex justifyContent="start" className="border-b py-3">
            <Text className="w-[200px]">사용가능 맴버십 등급</Text>
            <CheckboxGroup
              value={selectedValue.membershipGrades}
              onChange={(value) => handleValueChange('membershipGrades', value)}
            >
              <Checkbox className="mr-5" value={'1'} label="에그" />
              <Checkbox className="mr-5" value={'2'} label="올리" />
              <Checkbox className="mr-5" value={'3'} label="치키" />
              <Checkbox className="mr-5" value={'4'} label="치밖이" />
            </CheckboxGroup>
          </Flex> */}
          <Flex justifyContent="start" className="border-b py-3">
            <Text className="w-[200px]">쿠폰사용 가능 요일</Text>
            <CheckboxGroup
              value={selectedValue.usableDayOfWeeks}
              onChange={value => handleValueChange('usableDayOfWeeks', value)}
            >
              <Checkbox className="mr-5" value={'all'} label="전체" />
              <Checkbox className="mr-5" value={'MONDAY'} label="월" />
              <Checkbox className="mr-5" value={'TUESDAY'} label="화" />
              <Checkbox className="mr-5" value={'WEDNESDAY'} label="수" />
              <Checkbox className="mr-5" value={'THURSDAY'} label="목" />
              <Checkbox className="mr-5" value={'FRIDAY'} label="금" />
              <Checkbox className="mr-5" value={'SATURDAY'} label="토" />
              <Checkbox className="mr-5" value={'SUNDAY'} label="일" />
            </CheckboxGroup>
          </Flex>
          <Flex justifyContent="start" className="border-b py-3">
            <Text className="w-[200px]">사용 가능 시간</Text>
            <DatePicker
              className="w-[100px]"
              placeholderText="시작 시간"
              selected={selectedValue.usableStartsTime}
              onChange={date => {
                date &&
                  setSelectedValue(prev => ({
                    ...prev,
                    usableStartsTime: date,
                  }));
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="시간"
              dateFormat="HH:mm a"
              locale={ko}
            />
            {/* <TextInput
              className="w-[100px] mr-3"
              placeholder="HH:MM"
              value={selectedValue.usableStartsTime}
              onChange={(e) =>
                handleValueChange('usableStartsTime', e.target.value)
              }
            />{' '} */}
            <Text className="mr-5">~</Text>
            <DatePicker
              placeholderText="종료 시간"
              className="w-[100px]"
              selected={selectedValue.usableEndsTime}
              onChange={date => {
                date &&
                  setSelectedValue(prev => ({
                    ...prev,
                    usableEndsTime: date,
                  }));
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="시간"
              dateFormat="HH:mm a"
              locale={ko}
            />
          </Flex>
          <Flex justifyContent="start" className="py-3">
            <Text className="w-[200px]">조건 상품 설정</Text>
            <CustomButton
              className="mr-5"
              type="tertiary"
              onClick={() =>
                openModal('조건 상품 선택', '', <CouponProductSelectDeprecated />, value =>
                  handleValueChange('requiredProductList', value),
                )
              }
            >
              조건 상품선택
            </CustomButton>
            {selectedValue.requiredProductList.length > 0 &&
              selectedValue.requiredProductList.map(item => {
                return (
                  <Flex justifyContent="start" className="w-auto mx-3" key={item.id}>
                    <Text className="text-emerald-500 mr-1">+</Text>
                    <Text>{item.menuName}</Text>
                    <div
                      className="cursor-pointer ml-1"
                      onClick={() =>
                        handleValueChange(
                          'requiredProductList',
                          selectedValue.requiredProductList.filter(i => i.id !== item.id),
                        )
                      }
                    >
                      <XCircleIcon width={20} />
                    </div>
                  </Flex>
                );
              })}
          </Flex>
        </Flex>
      </Card>

      <Flex justifyContent="center" className="p-5">
        <CustomButton type="tertiary" className="w-[200px] h-[50px]" onClick={() => router.back()}>
          취소
        </CustomButton>
        <CustomButton type="secondary" className="ml-3 w-[200px] h-[50px]" onClick={registerCoupon}>
          등록완료
        </CustomButton>
      </Flex>
    </>
  );
}
