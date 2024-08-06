import { Box, CheckBox, Divider, Flex, Image, RadioBox, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import {
  COLOR_PRIMARY,
  COLOR_RED,
  COLOR_WHITE,
  FONTSIZE_14,
  FONTSIZE_16,
  FONTSIZE_20,
  FONTSIZE_24,
  FONTSIZE_30,
  PLANCK,
} from '@/constants';

export const ApplyCouponPopup = () => {
  return (
    <Flex.CSS full>
      <Box padding={PLANCK * 3}>
        <CheckBox label={'최대할인 자동적용'} checked={false} onClick={() => {}} />
        <Space.H3 />
        <Box full border="lightgray" padding={PLANCK * 1.5} shape="round">
          <Flex.RSC full layout="auto auto 1">
            <Image src={''} backgroundPosition="center" backgroundSize="cover" width={70} />
            <Space.V4 />
            <Flex.CSS full>
              <Text size={FONTSIZE_20}>황금올리브치킨™</Text>
              <Space.H2 />
              <Text size={FONTSIZE_20}>2개 40,000원</Text>
            </Flex.CSS>
          </Flex.RSC>
        </Box>
        <Space.H8 />
        <Flex.CSS full gap={PLANCK * 4}>
          <Flex.RSS layout="auto auto 1 auto 4">
            <RadioBox checked={true} onClick={() => {}} />
            <Space.V2 />
            <Text size={FONTSIZE_20}>3,000원</Text>
            <Space.V6 />
            <Text
              size={FONTSIZE_20}
              color={'#777777'}
              lineHeight={'1.5em'}
              style={{ position: 'relative', maxWidth: 320, top: -5 }}
            >
              플래티넘 회원만 드리는 3,000원 할인쿠폰 3만원 이상구매시 (~04/30)
            </Text>
          </Flex.RSS>
          <Flex.RSS layout="auto auto 1 auto 4">
            <RadioBox checked={false} onClick={() => {}} />
            <Space.V2 />
            <Text size={FONTSIZE_20}>5% 할인</Text>
            <Space.V6 />
            <Text
              size={FONTSIZE_20}
              color={'#777777'}
              lineHeight={'1.5em'}
              style={{ position: 'relative', maxWidth: 320, top: -5 }}
            >
              플래티넘 회원만 드리는 3,000원 할인쿠폰 3만원 이상구매시 (~04/30)
            </Text>
          </Flex.RSS>
        </Flex.CSS>
        <Space.H6 />
        <Divider />
        <Space.H6 />
        <Text size={FONTSIZE_20}>중복 할인</Text>
        <Space.H6 />
        <Flex.CSS full gap={PLANCK * 4}>
          <Flex.RSS layout="auto auto 1 auto 4">
            <RadioBox checked={false} onClick={() => {}} />
            <Space.V2 />
            <Text size={FONTSIZE_20}>2,000원</Text>
            <Space.V6 />
            <Text
              size={FONTSIZE_20}
              color={'#777777'}
              lineHeight={'1.5em'}
              style={{ position: 'relative', maxWidth: 320, top: -5 }}
            >
              플래티넘 회원만 드리는 3,000원 할인쿠폰 3만원 이상구매시 (~04/30)
            </Text>
          </Flex.RSS>
        </Flex.CSS>
        <Space.H6 />
        <Divider />
        <Space.H6 />
        <Flex.RCC full layout="1 1 1 1 1">
          <Flex.CCC>
            <Text size={FONTSIZE_16} color={'#777777'}>
              상품가격
            </Text>
            <Space.H2 />
            <Text size={FONTSIZE_20} color={'#777777'}>
              40,000
            </Text>
          </Flex.CCC>
          <Flex.CCC>
            <Box
              border={'#dddddd'}
              background={'#d7d7d7'}
              shape={'circle'}
              style={{ width: PLANCK * 6, height: PLANCK * 6 }}
            >
              <Flex.RCC full>
                <Text
                  size={FONTSIZE_24}
                  color={COLOR_WHITE}
                  style={{ position: 'relative', top: -1.5 }}
                >
                  -
                </Text>
              </Flex.RCC>
            </Box>
          </Flex.CCC>
          <Flex.CCC>
            <Text size={FONTSIZE_16} color={'#777777'}>
              상품가격
            </Text>
            <Space.H2 />
            <Text size={FONTSIZE_20} color={COLOR_PRIMARY}>
              3,000
            </Text>
          </Flex.CCC>
          <Flex.CCC>
            <Box
              border={'#dddddd'}
              background={'#d7d7d7'}
              shape={'circle'}
              style={{ width: PLANCK * 6, height: PLANCK * 6 }}
            >
              <Flex.RCC full>
                <Text
                  size={FONTSIZE_24}
                  color={COLOR_WHITE}
                  style={{ position: 'relative', top: -1.5 }}
                >
                  =
                </Text>
              </Flex.RCC>
            </Box>
          </Flex.CCC>
          <Flex.CCC>
            <Text size={FONTSIZE_16}>상품가격</Text>
            <Space.H2 />
            <Text size={FONTSIZE_20}>37,000</Text>
          </Flex.CCC>
        </Flex.RCC>
        <Space.H6 />
        <Button full text="쿠폰 적용하기" color="red" shape={'round'} />
      </Box>
    </Flex.CSS>
  );
};
