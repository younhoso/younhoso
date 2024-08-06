import { FC } from 'react';

import { useRouter } from 'next/router';

import { Container, Flex, Image, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_GRAY, FONTSIZE_14, FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberIntegrateCompletePageTemplateMobile } from './mobile';

export interface MemberIntegrateCompletePageTemplateProps {}

export interface MemberIntegrateCompletePageTemplateComponentProps
  extends MemberIntegrateCompletePageTemplateProps {}

export const MemberIntegrateCompletePageTemplate: FC<MemberIntegrateCompletePageTemplateComponentProps> & {
  Mobile: FC<MemberIntegrateCompletePageTemplateComponentProps>;
} = ({ ...rest }) => {
  const router = useRouter();
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
                  <Text size={FONTSIZE_20}>계정 알림</Text>
                </Flex.RSC>
              </Flex.RBC>
              <Space.H6 />
              <Text full={true} align="center">
                이제 BBQ에 빠져보시죠!
              </Text>
              <Space.H3_5 />
              <Text
                full={true}
                align="center"
                color={COLOR_GRAY}
                size={FONTSIZE_14}
                lineHeight={'1.5em'}
              >
                고객님의 계정 통합이 끝났어요.
                <br />
                지금부터 BBQ의 다양한 서비스와 혜택을
                <br />
                통합앱에서 누려보세요!
              </Text>
              <Space.H5 />
              <Flex.RCC full={true}>
                <Image
                  src="/member/integrate/welcome.png"
                  width={'70%'}
                  style={{ transform: 'translateX(16%)' }}
                />
              </Flex.RCC>
              <Space.H5 />
              <Button
                full
                text="네 좋아요!"
                color="red"
                shape={'round'}
                style={{ height: 51 }}
                onClick={() => {
                  router.push('/');
                }}
              />
            </TabBox>
            <Space.H7 />
            <Footer />
          </Flex.CSC>
        </Container.Body>
      </Container>
    </Wrapper>
  );
};
MemberIntegrateCompletePageTemplate.Mobile = MemberIntegrateCompletePageTemplateMobile;
