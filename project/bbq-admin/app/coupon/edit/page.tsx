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
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import axios, { isAxiosError } from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { CouponDetailResponse } from '@/pages/api/coupon/[...id]';

import CouponProductSelect from '../Modal/CouponProductSelect';
import CouponProductSelectDeprecated from '../Modal/CouponProductSelect_deprecated';

const Editor = dynamic(() => import('../../components/Editor'), { ssr: false });

registerLocale('ko', ko);

export type UsableDayOfWeeks =
  | 'all'
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
  dateRange?: DateRangePickerValue;
  mealTypes: string[];
  offerCount: string;
  maxIssuePerMember: string;
  maxIssuePerMemberDay: string;
  usableDayOfWeeks: UsableDayOfWeeks[];
  membershipGrades: string[];
  usableStartsTime?: Date;
  usableEndsTime?: Date;
  requiredProductList:
    | {
        id: string;
        menuName: string;
      }[]
    | [];

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
}

export default function CouponModifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModalContext();
  const [data, setData] = useState<CouponDetailResponse>();
  const [selectedValue, setSelectedValue] = useState<CouponRegisterCondition>({
    isActive: '',
    couponName: '',
    description: '',
    benefitType: '',
    dateRange: {
      from: new Date(),
      to: new Date(),
    },
    mealTypes: [],
    offerCount: '0',
    maxIssuePerMember: '0',
    maxIssuePerMemberDay: '0',
    usableDayOfWeeks: [],
    membershipGrades: [],
    usableStartsTime: undefined,
    usableEndsTime: undefined,
    requiredProductList: [],
    benefitProductList: undefined,
    issuanceType: '',
    couponCategory: '',
    discountAmount: '0',
    flatDiscountMinAmount: '0',
    discountRate: '0',
    rateDiscountMinAmount: '0',
    rateDiscountMaxDiscountAmount: '0',
    deliveryFeeMinAmount: '0',
    deliveryFeeMaxDiscountAmount: '0',
    benefitProductMinAmount: '0',
  });

  const handleValueChange = (
    key: keyof CouponRegisterCondition,
    value: string | object | number[],
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
    if (
      selectedValue.benefitType === 'DELIVERY_FEE' &&
      (selectedValue.mealTypes.length !== 1 || !selectedValue.mealTypes.includes('DELIVERY'))
    ) {
      alert('배달비 할인은 [배달] 주문 시에만 가능합니다. 다른 주문 타입은 해제해 주세요.');
      return false;
    }
    if (selectedValue.mealTypes.every(mealType => !mealType)) {
      alert('주문 타입을 선택해 주세요.');
      return false;
    }
    return true;
  };

  const editCoupon = async () => {
    try {
      if (!searchParams) return;

      if (!validationCheck()) {
        return;
      }

      const couponId = searchParams.get('id');

      const result = await getAxios().patch(`/api/coupon/membership/${couponId}`, {
        ...data,
        couponName: selectedValue.couponName,
        description: selectedValue.description,
        isActive: selectedValue.isActive == 'true' ? true : false,
        issuanceType: selectedValue.issuanceType == '' ? null : selectedValue.issuanceType,
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
          selectedValue.membershipGrades[0] == 'all'
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
          selectedValue.usableDayOfWeeks[0] == 'all'
            ? ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
            : selectedValue.usableDayOfWeeks,
        usableStartsTime: dayjs(selectedValue.usableStartsTime).format('HH:mm'),
        usableEndsTime: dayjs(selectedValue.usableEndsTime).format('HH:mm'),
        requiredProductList:
          selectedValue.requiredProductList.length > 0
            ? selectedValue.requiredProductList.map(item => parseInt(item.id))
            : [],
        issuerType: 'HQ',
        issuerName: '테스트',
      });
      if (result.status == 200) {
        alert('쿠폰이 수정되었습니다.');
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

  const getCouponData = async (id: string) => {
    const result = await getAxios().get(`/api/coupon/membership/${id}`);
    const { data } = result;
    setData(data);
    setSelectedValue({
      couponName: data.couponName,
      description: data.description,
      isActive: data.isActive == true ? 'true' : 'false',
      issuanceType: data.issuanceType,
      couponCategory: data.couponCategory,
      benefitType: data.benefitType,
      benefitProductList: data.benefitProductInfo,
      mealTypes: data.mealTypes,
      membershipGrades:
        data.membershipGrades.length > 0
          ? data.membershipGrades.map((item: number) => item.toString())
          : [],
      offerCount: data.offerCount && data.offerCount.toString(),
      dateRange: {
        from: dayjs(data.offerStartsAt).toDate(),
        to: dayjs(data.offerEndsAt).toDate(),
      },
      maxIssuePerMember: data.maxIssuePerMember && data.maxIssuePerMember.toString(),
      maxIssuePerMemberDay: data.maxIssuePerMemberDay && data.maxIssuePerMemberDay.toString(),
      usableDayOfWeeks: data.usableDayOfWeeks,
      usableStartsTime: dayjs()
        .set('hour', data.usableStartsTime.split(':')[0])
        .set('minute', data.usableStartsTime.split(':')[1])
        .toDate(),
      usableEndsTime: dayjs()
        .set('hour', data.usableEndsTime.split(':')[0])
        .set('minute', data.usableEndsTime.split(':')[1])
        .toDate(),
      requiredProductList: data.requiredProductList.map((item: any) => {
        return {
          id: item.menuId.toString(),
          menuName: item.menuName,
        };
      }),
      discountAmount: data.discountAmount && data.discountAmount.toString(),
      discountRate: data.discountRate && data.discountRate.toString(),
      flatDiscountMinAmount: data.benefitType === 'FLAT_DISCOUNT' ? data.minAmount.toString() : '0',
      rateDiscountMinAmount: data.benefitType === 'RATE_DISCOUNT' ? data.minAmount.toString() : '0',
      rateDiscountMaxDiscountAmount:
        data.benefitType === 'RATE_DISCOUNT' ? data.maxDiscountAmount.toString() : '0',
      deliveryFeeMinAmount: data.benefitType === 'DELIVERY_FEE' ? data.minAmount.toString() : '0',
      deliveryFeeMaxDiscountAmount:
        data.benefitType === 'DELIVERY_FEE' ? data.maxDiscountAmount.toString() : '0',
      benefitProductMinAmount: data.benefitType === 'PRODUCT' ? data.minAmount.toString() : '0',
    });
  };

  useEffect(() => {
    if (!searchParams) return;

    const couponId = searchParams.get('id');

    if (couponId) {
      getCouponData(couponId);
    } else {
      alert('잘못된 접근입니다.');
      router.push('/coupon/list');
    }
  }, [searchParams]);

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
              <Radiobox disabled={true} value={'MEMBERSHIP_GRADE'} label="멤버십등급" />
              <Radiobox disabled={true} value={'NEW_MEMBER_JOINED'} label="신규가입" />
              <Radiobox disabled={true} value={'BIRTH'} label="생일축하" />
              <Radiobox disabled={true} value={'MARKETING_AGREEMENT'} label="마케팅 동의" />
              <Radiobox disabled={true} value={'DEFAULT'} label="일반" />
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
                <Checkbox disabled={true} value={'all'} label="전체" />
                <Checkbox disabled={true} value={'1'} label="WELCOME" />
                <Checkbox disabled={true} value={'2'} label="치빡이" />
                <Checkbox disabled={true} value={'3'} label="BIP" />
                <Checkbox disabled={true} value={'4'} label="BBIP" />
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
                <Radiobox disabled={true} value={'PUBLIC'} label="공개형" />
                <Radiobox disabled={true} value={'PRIVATE'} label="개인형" />
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
            placeholder="쿠폰명을 입력해주세요."
            value={selectedValue.couponName}
            onChange={e => handleValueChange('couponName', e.target.value)}
          />
          <textarea
            value={selectedValue.description}
            placeholder="쿠폰 부연 설명"
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
              <Radiobox disabled={true} value={'FLAT_DISCOUNT'} label="정액할인" />
            </RadioboxGroup>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={true}
                className="ml-5 w-[300px] !rounded-r-none !border-r-0"
                placeholder="할인 금액"
                value={selectedValue.discountAmount}
                onChange={e => handleValueChange('discountAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={true}
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
              <Radiobox disabled={true} value={'RATE_DISCOUNT'} label="정률할인" />
            </RadioboxGroup>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={true}
                className="ml-5 w-[300px] !rounded-r-none !border-r-0"
                placeholder="할인 금액"
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
                placeholder="최대 주문 금액"
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
              <Radiobox disabled={true} value={'DELIVERY_FEE'} label="배달비 할인" />
            </RadioboxGroup>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={true}
                className="ml-5 w-[300px] !rounded-r-none !border-r-0"
                placeholder="최대 할인 배달비 금액"
                value={selectedValue.deliveryFeeMaxDiscountAmount}
                onChange={e => handleValueChange('deliveryFeeMaxDiscountAmount', e.target.value)}
              />
              <Text className="rounded-r border p-2 px-3">원</Text>
            </Flex>
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={true}
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
              <Radiobox disabled={true} value={'PRODUCT'} label="메뉴증정" />
            </RadioboxGroup>
            <CustomButton
              disable={true}
              type="tertiary"
              className="ml-5"
              onClick={() =>
                openModal('증정 메뉴 선택', '', <CouponProductSelect />, value =>
                  handleValueChange('benefitProductList', value),
                )
              }
            >
              증정 메뉴 선택
            </CustomButton>
            {selectedValue.benefitType == 'PRODUCT' && selectedValue.benefitProductList && (
              <Flex justifyContent="start" className="w-auto mx-3">
                <Text className="text-emerald-500 mr-1">+</Text>
                <Text>{selectedValue.benefitProductList.menuName}</Text>
              </Flex>
            )}
            <Flex justifyContent="start" className="w-auto">
              <TextInput
                disabled={true}
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

      {/* <Card className="p-0 mt-5">
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
          </Card>*/}

      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>발행 기간 설정</Title>
        </div>

        <Flex className="ml-3 p-5" justifyContent="start">
          <Text>기간 설정</Text>
          <DateRangePicker
            disabled={false}
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
        <CustomButton type="secondary" className="ml-3 w-[200px] h-[50px]" onClick={editCoupon}>
          수정완료
        </CustomButton>
      </Flex>
    </>
  );
}
