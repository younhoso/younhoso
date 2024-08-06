import { FC } from 'react';

import { Arrow, Container, Flex, Icon, Image, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_BLACK, FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberFindUsernameSuccessPageTemplateMobile } from './mobile';

export interface MemberFindUsernameSuccessPageTemplateProps {
  username: string;
  handleConfirmButtonClick: () => void;
  handleResetPasswordButtonClick: () => void;
  handleBackButtonClick: () => void;
}

export interface MemberFindUsernameSuccessPageTemplateComponentProps
  extends MemberFindUsernameSuccessPageTemplateProps {}

export const MemberFindUsernameSuccessPageTemplate: FC<MemberFindUsernameSuccessPageTemplateComponentProps> & {
  Mobile: FC<MemberFindUsernameSuccessPageTemplateComponentProps>;
} = ({
  username,
  handleConfirmButtonClick,
  handleResetPasswordButtonClick,
  handleBackButtonClick,
}) => {
  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Flex.CSC>
            <TabBox>
              <Flex.RBC>
                <Flex.RSC>
                  <Image src={'symbols/logo-red-background.svg'} width={42} />
                  <Space.V2 />
                  <Text size={FONTSIZE_20}>아이디·비밀번호 찾기</Text>
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
              <Flex.RCC>
                <Text color={COLOR_BLACK} align="center" lineHeight={'1.25em'}>
                  입력하신 정보와
                  <br />
                  일치하는 아이디입니다.
                </Text>
              </Flex.RCC>
              <Space.H5 />
              <Input
                disabled={true}
                showClearButton={true}
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2_5 />
                    <Icon src={'human-circle-graypurple.svg'} size={22} />
                    <Space.V0_5 />
                  </Flex.RCC>
                }
                placeholder={'계정'}
                value={username}
                onChange={e => {}}
              />
              <Space.H8 />
              <Button
                full
                text="확인"
                color="red"
                shape={'round'}
                style={{ height: 51 }}
                onClick={() => handleConfirmButtonClick()}
              />
              <Space.H2 />
              <Button
                full
                text="비밀번호 재설정"
                color="lightgray"
                shape={'round'}
                style={{ height: 51 }}
                onClick={() => handleResetPasswordButtonClick()}
              />
            </TabBox>
            <Space.H7 />
            <Footer />
            <Space.H7 />
          </Flex.CSC>
        </Container.Body>
      </Container>
    </Wrapper>
  );
};

MemberFindUsernameSuccessPageTemplate.Mobile = MemberFindUsernameSuccessPageTemplateMobile;
