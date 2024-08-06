import { FC } from 'react';

import { useRouter } from 'next/router';

import { Box, Container, Divider, Flex, Image, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_12, FONTSIZE_16, PLANCK } from '@/constants';

import { ContentBox, Footer, Wrapper } from '../components';
import { AddressPermissionPageTemplateComponentProps } from './AddressPermissionPageTemplate';

export const AddressPermissionPageTemplateMobile: FC<
  AddressPermissionPageTemplateComponentProps
> = ({ ...rest }) => {
  const router = useRouter();

  return (
    <Wrapper.Mobile>
      <Container.Mobile>
        <Flex.CSC>
          <ContentBox.Mobile>
            <Flex.CSS layout="1 1">
              <Image
                src="address/permission/background.jpg"
                backgroundPosition="center right"
                backgroundSize="cover"
                height="90%"
              />
              <div>
                <Box padding={PLANCK * 6}>
                  <Image src="symbols/logo-black.svg" width={56} />
                  <Space.H2 />
                  <Text size={FONTSIZE_16} lineHeight={'1.4em'}>
                    고객님의 편리한 BBQ 이용을 위해 아래 접근권한의 허용이 필요합니다.
                  </Text>
                  <Space.H3 />
                  <Divider />
                  <Space.H3 />
                  <Text size={FONTSIZE_12} weight={800}>
                    위치 (선택)
                  </Text>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={'#777777'}>
                    현재위치 자동수신
                  </Text>
                  <Space.H4 />
                  <Text size={FONTSIZE_12} weight={800}>
                    연락처 (선택)
                  </Text>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={'#777777'}>
                    전화주문 시 패밀리명 노출, 선물하기 시 연락처 목록 불러오기
                  </Text>
                  <Space.H4 />
                  <Text size={FONTSIZE_12} weight={800}>
                    카메라 (선택)
                  </Text>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={'#777777'}>
                    사진 리뷰 및 프로필 설정 시 사진 촬영, 쿠폰 등록 시 QR코드 스캔
                  </Text>
                  <Space.H4 />
                  <Text size={FONTSIZE_12} weight={800}>
                    사진 (선택)
                  </Text>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={'#777777'}>
                    사진 리뷰 및 프로필 설정 시, 쿠폰 이미지 등록 시 불러오기
                  </Text>
                  <Space.H3 />
                  <Divider />
                  <Space.H3 />
                  <Text size={FONTSIZE_12} color={'#333333'} lineHeight={'1.4em'}>
                    위 접근권한은 고객님께 더 나은 서비스를 제공하기 위해 사용됩니다. 허용에
                    동의하지 않으셔도 BBQ를 이용하실 수 있습니다.
                  </Text>
                  <Space.H3 />
                  <Button.Mobile
                    onClick={() =>
                      router.push({
                        pathname: '/address/permission/agree',
                        query: router.query,
                      })
                    }
                    full
                    size={'big'}
                    text={'다음'}
                    color={'red'}
                    shape={'round'}
                  />
                </Box>
              </div>
            </Flex.CSS>
          </ContentBox.Mobile>
          <Space.H7 />
          <Footer />
          <Space.H7 />
        </Flex.CSC>
      </Container.Mobile>
    </Wrapper.Mobile>
  );
};
