// TODO: AddressSearchFrom 컴포넌트로 교체해야함
import { FC } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Container, Flex, Icon, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_12, FONTSIZE_14, FONTSIZE_15, FONTSIZE_20, PLANCK } from '@/constants';

import { ContentBox, Footer, Wrapper } from '../components';
import { AddressSearchPageTemplateMobile } from './mobile';

export interface AddressSearchPageTemplateProps {
  address?: string;
  roadAddress?: string;
  detailAddress: string;
  reset: () => void;
  onDeatilAddressChange: (value: string) => void;
  onAddressSelected: (data: any) => void;
  onSubmit: () => void;
}

export interface AddressSearchPageTemplateComponentProps extends AddressSearchPageTemplateProps {}

export const AddressSearchPageTemplate: FC<AddressSearchPageTemplateComponentProps> & {
  Mobile: FC<AddressSearchPageTemplateComponentProps>;
} = ({
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
    <Wrapper>
      <Container>
        <Container.Body>
          <Flex.CSC>
            {!address ? (
              <ContentBox style={{ minWidth: 630 }}>
                <Box padding={PLANCK * 6}>
                  <Flex.RBC>
                    <Text size={FONTSIZE_20}>주소검색</Text>
                    <Link href={{ pathname: `/address/map`, query: router.query }}>
                      <Flex.RSC>
                        <Icon src={'pin-map-black.svg'} size={20} />
                        <Space.V2 />
                        <Text size={FONTSIZE_15}>지도에서 위치설정</Text>
                      </Flex.RSC>
                    </Link>
                  </Flex.RBC>
                  <Space.H4 />
                  <DaumPostcodeEmbed onComplete={onAddressSelected} style={{ minHeight: 450 }} />
                  <Space.H3 />
                </Box>
              </ContentBox>
            ) : null}

            {address ? (
              <ContentBox style={{ minWidth: 630 }}>
                <Box padding={PLANCK * 6}>
                  <Flex.RBC>
                    <Text size={20}>상세주소 입력</Text>
                    <Link href={{ pathname: `/address/map`, query: router.query }}>
                      <Flex.RSC>
                        <Icon src={'pin-map-black.svg'} size={20} />
                        <Space.V2 />
                        <Text size={FONTSIZE_15}>지도에서 위치설정</Text>
                      </Flex.RSC>
                    </Link>
                  </Flex.RBC>
                  <Space.H8 />
                  <Text size={22}>{roadAddress ?? address}</Text>
                  {roadAddress ? (
                    <>
                      <Space.H3 />
                      <Flex.RSC>
                        <Box background="#e1e7eb" padding={PLANCK * 1.5} shape={'round'}>
                          <Text size={FONTSIZE_12} color={'#777777'}>
                            지번
                          </Text>
                        </Box>
                        <Space.V2 />
                        <Text size={FONTSIZE_14} color={'#777777'}>
                          {address}
                        </Text>
                      </Flex.RSC>
                    </>
                  ) : null}
                  <Space.H4 />
                  <Input
                    value={detailAddress}
                    placeholder="상세주소를 입력해주세요."
                    onChange={e => {
                      onDeatilAddressChange(e.target.value);
                    }}
                  />
                  <Space.H6 />
                  <Button
                    disabled={!detailAddress || !detailAddress.trim().length}
                    full
                    color={'red'}
                    shape={'round'}
                    text="배송지 입력 완료"
                    onClick={() => onSubmit()}
                  />
                </Box>
              </ContentBox>
            ) : null}
            <Space.H7 />
            <Footer />
            <Space.H7 />
          </Flex.CSC>
        </Container.Body>
      </Container>
    </Wrapper>
  );
};
AddressSearchPageTemplate.Mobile = AddressSearchPageTemplateMobile;
