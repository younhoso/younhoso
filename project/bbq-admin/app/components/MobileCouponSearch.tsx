import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Card, Flex, Text, TextInput } from '@tremor/react';

import { MenuListCondition } from '../coupon/mobile-coupon/page';
import CustomButton from './CustomButton';
import { Radiobox, RadioboxGroup } from './Radiobox';

interface SearchProps {
  handleSearch: () => void;
  handleValueChange: (key: keyof MenuListCondition, value: any) => void;
  selectedValue: MenuListCondition;
}

export default function MobileCouponSearch({
  handleSearch,
  handleValueChange,
  selectedValue,
}: SearchProps) {
  return (
    <Card>
      <Flex flexDirection="col">
        <Flex>
          <TextInput
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            onChange={e => handleValueChange('mobileCouponNo', e.target.value)}
            className="w-[900px] self-start !rounded-none"
            icon={MagnifyingGlassIcon}
            placeholder="쿠폰 번호로 검색"
          />
        </Flex>
        <div className="flex justify-start w-full h-[70px] items-center gap-10 mt-5 border-b border-t mb-[20px] ">
          <Text className="min-w-[80px] w-[160px] text-center">쿠폰 형태</Text>
          <RadioboxGroup
            value={selectedValue.mobileCouponType}
            onChange={value => handleValueChange('mobileCouponType', value)}
          >
            <Radiobox value="ECOUPON" label="E-쿠폰" className="text-[#46477A]" />
            <Radiobox value="VOUCHER" label="지류상품권" className="text-[#46477A]" />
          </RadioboxGroup>
        </div>
        <CustomButton
          type="secondary"
          className="w-[200px] h-[48px] self-start !rounded-none !bg-[#46477A]"
          onClick={handleSearch}
        >
          쿠폰번호로 검색
        </CustomButton>
      </Flex>
    </Card>
  );
}
