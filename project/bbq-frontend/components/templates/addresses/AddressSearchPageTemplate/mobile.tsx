// TODO: AddressSearchFrom 컴포넌트로 교체해야함
import { FC } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Container, Flex, Icon, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import {
  FONTSIZE_11,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_17,
  FONTSIZE_18,
  PLANCK,
} from '@/constants';

import { ContentBox, Footer, Wrapper } from '../components';
import { AddressSearchPageTemplateComponentProps } from './AddressSearchPageTemplate';

export const AddressSearchPageTemplateMobile: FC<AddressSearchPageTemplateComponentProps> = ({
  address,
  roadAddress,
  detailAddress,
  reset,
  onDeatilAddressChange,
  onAddressSelected,
  onSubmit,
  ...rest
}) => {
  const router = useRouter();
  return (
    <Wrapper.Mobile>
      <Container.Mobile>
        <Flex.CSC>
          {!address ? (
            <ContentBox.Mobile>
              <Box padding={PLANCK * 4}>
                <Flex.RBC>
                  <Text size={FONTSIZE_18}>주소검색</Text>
                  <Link href={{ pathname: `/address/map`, query: router.query }}>
                    <Flex.RSC>
                      <Icon src={'pin-map-black.svg'} size={16} />
                      <Space.V2 />
                      <Text size={FONTSIZE_13}>지도에서 위치설정</Text>
                    </Flex.RSC>
                  </Link>
                </Flex.RBC>
                <Space.H4 />
                <DaumPostcodeEmbed onComplete={onAddressSelected} style={{ minHeight: 470 }} />
                <Space.H3 />
              </Box>
            </ContentBox.Mobile>
          ) : null}

          {address ? (
            <ContentBox.Mobile>
              <Box padding={PLANCK * 4}>
                <Flex.RBC>
                  <Text size={FONTSIZE_18}>상세주소 입력</Text>
                  <Link href={{ pathname: `/address/map`, query: router.query }}>
                    <Flex.RSC>
                      <Icon src={'pin-map-black.svg'} size={16} />
                      <Space.V2 />
                      <Text size={FONTSIZE_13}>지도에서 위치설정</Text>
                    </Flex.RSC>
                  </Link>
                </Flex.RBC>
                <Space.H6 />
                <Text size={FONTSIZE_18}>{roadAddress ?? address}</Text>
                {roadAddress ? (
                  <>
                    <Space.H2 />
                    <Flex.RSC>
                      <Box background="#e1e7eb" padding={PLANCK * 1.25} shape={'round'}>
                        <Text size={FONTSIZE_11} color={'#777777'}>
                          지번
                        </Text>
                      </Box>
                      <Space.V1_5 />
                      <Text size={FONTSIZE_12} color={'#777777'} lineHeight={'1.4em'}>
                        {address}
                      </Text>
                    </Flex.RSC>
                  </>
                ) : null}
                <Space.H3 />
                <Input.Mobile
                  value={detailAddress}
                  placeholder="상세주소를 입력해주세요."
                  onChange={e => {
                    onDeatilAddressChange(e.target.value);
                  }}
                />
                <Space.H4 />
                <Button.Mobile
                  disabled={!detailAddress || !detailAddress.trim().length}
                  full
                  color={'red'}
                  shape={'round'}
                  text="배송지 입력 완료"
                  onClick={() => onSubmit()}
                />
              </Box>
            </ContentBox.Mobile>
          ) : null}

          <Space.H7 />
          <Footer />
          <Space.H7 />
        </Flex.CSC>
      </Container.Mobile>
    </Wrapper.Mobile>
  );
};
