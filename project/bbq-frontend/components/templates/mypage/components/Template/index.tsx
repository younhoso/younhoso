import { FC, ReactNode, useMemo } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Container, Flex, Icon, Space, Text } from '@/components/atoms';
import { COLOR_PRIMARY, FONTSIZE_16, FONTSIZE_20, MYPAGES, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';

import { TemplateMobile } from './mobile';

export interface TemplateProps {
  title?: string;
  button?: ReactNode | ReactNode[];
}

export interface TemplateComponentProps extends TemplateProps {
  children?: ReactNode | ReactNode[];
}

export const Template: FC<TemplateComponentProps> & {
  Mobile: FC<TemplateComponentProps>;
} = ({ title, button, children }) => {
  const { route } = useRouter();
  const { member } = useAuth();

  const filteredPages = useMemo(() => {
    if (member) {
      return MYPAGES;
    } else {
      return MYPAGES.filter(page => !page.memberOnly);
    }
  }, [member]);

  return (
    <>
      <Space.H4 />
      <Container>
        <Container.Body>
          <Flex.RSS layout="1 auto">
            <ContentBox>
              {title || button ? (
                <>
                  <Flex.RBC>
                    {title && <Text size={FONTSIZE_20}>{title}</Text>}
                    {button ? button : null}
                  </Flex.RBC>
                  <Space.H10 />
                </>
              ) : null}
              {children}
            </ContentBox>
            <Space.V1 />
          </Flex.RSS>
        </Container.Body>
        <Container.Sidebar>
          <Flex.RSS full layout="auto 1">
            <Space.V2_5 />
            <div style={{ position: 'relative', height: '100%' }}>
              <Flex.CSS>
                <Space.H3 />
                <Text size={FONTSIZE_20}>마이 페이지</Text>
                <Space.H6 />
                <Flex.CSS gap={PLANCK * 4.5}>
                  {filteredPages.map((page, index) => {
                    return (
                      <Link key={index} href={page.href}>
                        <Flex.RSC>
                          <div style={{ width: PLANCK * 7 }}>
                            <Icon
                              src={route == page.href ? page.activeIconUrl : page.inactiveIconUrl}
                              size={22 * (page.iconSizeRatio ?? 1)}
                              style={{
                                left: 11 - 11 * (page.iconSizeRatio ?? 1),
                              }}
                            />
                          </div>
                          <Text
                            color={route == page.href ? COLOR_PRIMARY : '#777777'}
                            size={FONTSIZE_16}
                          >
                            {member ? page.text : page.guestText ?? page.text}
                          </Text>
                        </Flex.RSC>
                      </Link>
                    );
                  })}
                </Flex.CSS>
              </Flex.CSS>
            </div>
          </Flex.RSS>
        </Container.Sidebar>
      </Container>
    </>
  );
};
Template.Mobile = TemplateMobile;

const ContentBox = styled.div`
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #c8cde0;
  background-color: #fff;
  width: 100%;
  padding: ${PLANCK * 6}px;
  min-height: 100vh;
`;
