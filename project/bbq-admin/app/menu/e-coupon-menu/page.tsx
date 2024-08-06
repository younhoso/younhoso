'use client';

import { Button, Card, Flex, TextInput, Title } from '@tremor/react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { isAxiosError } from 'axios';

import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';

interface MenuEcoupon {
  isActive: string;
  eCouponName: string;
  eCouponSalesPrice: string;
  eCouponAddPrice: string;
  foodTech: string;
  solbi: string;
  isEcouponOnlyMenu: string;
}

export default function MenuEcouponPage() {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<MenuEcoupon>({
    isActive: 'true',
    eCouponName: '',
    eCouponSalesPrice: '',
    eCouponAddPrice: '',
    foodTech: '',
    solbi: '',
    isEcouponOnlyMenu: 'true',
  });

  const handleValueChange = (key: keyof MenuEcoupon, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const registerEcoupon = async () => {
    if (!selectedValue.eCouponName) {
      alert('E-쿠폰명을 입력해 주세요.');
      return;
    }

    if (!selectedValue.eCouponSalesPrice) {
      alert('E-쿠폰 판매가를 등록해 주세요.');
      return;
    }

    if (
      !(
        Number(selectedValue.eCouponSalesPrice) >= 1000 &&
        Number(selectedValue.eCouponSalesPrice) % 100 === 0
      )
    ) {
      alert('E-쿠폰 판매가는 100원 단위로만 입력 가능합니다.');
      return;
    }

    if (!selectedValue.eCouponAddPrice) {
      alert('제주 및 도서 산간지역 추가 금액을 등록해 주세요.');
      return;
    }

    if (!(Number(selectedValue.eCouponAddPrice) % 100 === 0)) {
      alert('산간지방 추가 요금은 100원 단위로만 입력 가능합니다.');
      return;
    }

    if (!selectedValue.foodTech) {
      alert('푸드테크 POS 코드을 등록해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'eCouponInfo',
      JSON.stringify({
        isActive: selectedValue.isActive === 'true' ? true : false,
        menuName: selectedValue.eCouponName,
        menuPrice: Number(selectedValue.eCouponSalesPrice),
        addPrice: Number(selectedValue.eCouponAddPrice),
        posCodeFoodTech: selectedValue.foodTech,
        posCodeSolbi: selectedValue.solbi,
        isEcouponOnlyMenu: true,
      }),
    );

    try {
      const result = await getAxios().post<MenuEcoupon[]>('/api/menu/e-coupon-menu', formData);

      if (result.status === 200) {
        alert('E-쿠폰 등록이 완료되었습니다.');
        setSelectedValue(selectedValue);
        router.push('/menu/list');
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  return (
    <>
      <Card className="p-5 !border-tremor-border-grayED2">
        <p className="!text-sm/[17px] text-tremor-content-emphasis">
          * 표시는 필수입력 항목입니다.
        </p>
      </Card>
      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">활성 상태 *</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start">
          <Flex justifyContent="start" className="gap-10">
            <RadioboxGroup
              disabled={false}
              value={selectedValue.isActive}
              onChange={value => handleValueChange('isActive', value)}
            >
              <Radiobox className="!text-sm/[14px] text-[#46477A]" value={'true'} label="활성화" />
              <Radiobox
                className="!text-sm/[14px] text-[#46477A]"
                value={'false'}
                label="비활성화"
              />
            </RadioboxGroup>
          </Flex>
        </Flex>
      </Card>
      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">E-쿠폰명 *</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" alignItems="start" flexDirection="col">
          <TextInput
            className="!w-[720px] !rounded-none shadow-transparent"
            placeholder="E-쿠폰 메뉴명을 입력해 주세요"
            value={selectedValue.eCouponName}
            onChange={e => handleValueChange('eCouponName', e.target.value)}
          />
        </Flex>
      </Card>
      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">E-쿠폰 판매가 *</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="center" flexDirection="col" alignItems="start">
          <Flex className="w-[350px]">
            <TextInput
              className="!rounded-none border-r-0 shadow-transparent"
              placeholder="E-쿠폰 판매가를 입력해 주세요"
              value={selectedValue.eCouponSalesPrice}
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  alert('숫자만 입력 가능합니다.');
                  return;
                }
                handleValueChange('eCouponSalesPrice', e.target.value);
              }}
            />
            <p className="border py-2 px-5 text-sm won">원</p>
          </Flex>
          <p className="text-xs text-red-500 mt-2 font-[600]">
            * E-쿠폰 판매가는 1,000원부터 100원 단위로 입력 가능합니다.
          </p>
        </Flex>
      </Card>
      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">
            제주 및 도서 산간지역
            <br /> 추가 금액 *
          </Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" flexDirection="col" alignItems="start">
          <Flex className="w-[350px]">
            <TextInput
              className="!rounded-none border-r-0 shadow-transparent"
              placeholder="추가 금액을 입력해 주세요"
              value={selectedValue.eCouponAddPrice}
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  alert('숫자만 입력 가능합니다.');
                  return;
                }
                handleValueChange('eCouponAddPrice', e.target.value);
              }}
            />
            <p className="border py-2 px-5 text-sm won">원</p>
          </Flex>
          <p className="text-xs text-red-500 mt-2 font-[600]">
            * 제주 및 도서산간 지역에서 사용할 경우 추가되는 금액을 입력해 주세요.
          </p>
        </Flex>
      </Card>
      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">POS 코드</Title>
        </Flex>

        <Flex justifyContent="start" flexDirection="col" alignItems="start">
          <div className="w-full">
            <Card className="flex flex-row p-0 !border-0">
              <Flex
                className="border-r py-5  flex-1 bg-tremor-background-muted"
                justifyContent="center"
              >
                <Title className="w-[180px] !text-sm/[17px] text-center">푸드테크 POS 코드*</Title>
              </Flex>

              <Flex
                className="ml-3 p-5"
                justifyContent="start"
                flexDirection="col"
                alignItems="start"
              >
                <Flex className="!w-[640px]">
                  <TextInput
                    className="!rounded-none shadow-transparent"
                    placeholder="푸드테크 POS 코드를 입력해 주세요"
                    value={selectedValue.foodTech}
                    onChange={e => {
                      if (isNaN(Number(e.target.value))) {
                        alert('숫자만 입력 가능합니다.');
                        return;
                      }
                      handleValueChange('foodTech', e.target.value);
                    }}
                  />
                </Flex>
                <p className="text-xs text-red-500 mt-2 font-[600]">
                  * POS 코드는 숫자만 입력해 주세요.
                </p>
              </Flex>
            </Card>
          </div>
          <div className="w-full">
            <Card className="flex flex-row p-0 border-t-2 !border-b-0 !border-l-0 !border-r-0 !border-tremor-border-grayED2">
              <Flex
                className="border-r py-5  flex-1 bg-tremor-background-muted"
                justifyContent="center"
              >
                <Title className="w-[180px] !text-sm/[17px] text-center">솔비 POS 코드</Title>
              </Flex>

              <Flex
                className="ml-3 p-5"
                justifyContent="start"
                flexDirection="col"
                alignItems="start"
              >
                <Flex className="!w-[640px]">
                  <TextInput
                    className="w-full !rounded-none shadow-transparent"
                    placeholder="솔비 POS 코드를 입력해 주세요"
                    value={selectedValue.solbi}
                    onChange={e => {
                      if (isNaN(Number(e.target.value))) {
                        alert('숫자만 입력 가능합니다.');
                        return;
                      }
                      handleValueChange('solbi', e.target.value);
                    }}
                  />
                </Flex>
                <p className="text-xs text-red-500 mt-2 font-[600]">
                  * POS 코드는 숫자만 입력해 주세요.
                </p>
              </Flex>
            </Card>
          </div>
        </Flex>
      </Card>
      <Flex justifyContent="end" className="py-5">
        <Button
          onClick={() => router.back()}
          className="bg-white !border-tremor-border-grayED2 hover:bg-white text-gray-500 w-[160px] h-[50px] !rounded-none"
        >
          취소
        </Button>
        <Button
          className="bg-tremor-content-emphasis border-none ml-3 hover:bg-gray-700 text-white w-[160px] h-[50px] !rounded-none"
          onClick={registerEcoupon}
        >
          등록완료
        </Button>
      </Flex>
    </>
  );
}
