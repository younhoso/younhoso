import { FC } from 'react';

import { Arrow, Container, Flex, Icon, Image, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_BLACK, FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberIntegrateVerifyWithCIPageTemplateComponentProps } from './MemberIntegrateVerifyWithCIPageTemplate';

export const MemberIntegrateVerifyWithCIPageTemplateMobile: FC<
  MemberIntegrateVerifyWithCIPageTemplateComponentProps
> = ({ handleVerifyButtonClick, handleBackButtonClick }) => {
  return (
    <Wrapper.Mobile>
      <Container.Mobile>
        <Container.Mobile.Body>
          <Flex.CSC>
            <TabBox.Mobile>
              <Flex.RBC>
                <Flex.RSC>
                  <Image src={'symbols/logo-red-background.svg'} width={42} />
                  <Space.V2 />
                  <Text size={FONTSIZE_20}>본인 인증</Text>
                </Flex.RSC>
                <Arrow
                  tail
                  direction="left"
                  size={4}
                  onClick={() => handleBackButtonClick()}
                  style={{ cursor: 'pointer' }}
                />
              </Flex.RBC>
              <Space.H6 />
              <Text color={COLOR_BLACK} align="center" lineHeight={'1.25em'}>
                기존 계정 통합을 위해
                <br />
                휴대폰 인증을 진행해 주세요.
              </Text>
              <Space.H5 />
              <Button.Mobile
                full
                text="확인"
                color="red"
                shape={'round'}
                style={{ height: 51 }}
                onClick={() => handleVerifyButtonClick()}
              />
            </TabBox.Mobile>
            <Space.H4 />
            <Footer.Mobile />
            <Space.H7 />
          </Flex.CSC>
        </Container.Mobile.Body>
      </Container.Mobile>
    </Wrapper.Mobile>
  );
};
