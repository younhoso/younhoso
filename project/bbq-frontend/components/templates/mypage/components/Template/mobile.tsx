import { FC, useEffect, useMemo, useRef } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Box, Flex, Icon, Space, Text } from '@/components/atoms';
import { COLOR_PRIMARY, FONTSIZE_13, FONTSIZE_18, MYPAGES, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';

import { TemplateComponentProps } from '.';

export const TemplateMobile: FC<TemplateComponentProps> = ({ title, button, children }) => {
  const { route } = useRouter();
  const { member } = useAuth();
  const filteredPages = useMemo(() => {
    if (member) {
      return MYPAGES;
    } else {
      return MYPAGES.filter(page => !page.memberOnly);
    }
  }, [member]);

  const tabsScrollBoxRef = useRef<HTMLDivElement>(null);
  const selectedPageRef = useRef<HTMLDivElement>(null);

  const selectedPage = useMemo(() => {
    return MYPAGES.find(page => route.replaceAll('/[id]', '') === page.href);
  }, [route]);

  useEffect(() => {
    if (!tabsScrollBoxRef.current) return;
    if (!selectedPageRef.current) return;

    const container = tabsScrollBoxRef.current;
    const item = selectedPageRef.current;

    container.scrollLeft = Math.max(
      container.scrollLeft,
      item.getBoundingClientRect().left -
        container.getBoundingClientRect().left -
        container.clientWidth / 2,
    );
  }, [tabsScrollBoxRef, selectedPageRef]);

  return (
    <>
      <Space.H4 />
      <Flex.RSS full layout="auto 1">
        <Space.V3 />
        <Text size={FONTSIZE_18}>마이 페이지</Text>
      </Flex.RSS>
      <Space.H4 />
      <Tabs>
        <TabsScrollBox ref={tabsScrollBoxRef}>
          {filteredPages.map((page, index) => (
            <div key={index} ref={page.key === selectedPage?.key ? selectedPageRef : null}>
              <Link key={index} href={page.href}>
                <Box
                  background={'rgba(255,255,255,0.97)'}
                  border="lightgray"
                  padding={`${PLANCK * 2}px`}
                  style={{ borderRight: 'none' }}
                >
                  <Flex.RSC>
                    <Icon
                      src={
                        page.key === selectedPage?.key ? page.activeIconUrl : page.inactiveIconUrl
                      }
                      size={20}
                    />
                    <Space.V1 />
                    <Text
                      color={page.key === selectedPage?.key ? COLOR_PRIMARY : '#777777'}
                      size={FONTSIZE_13}
                    >
                      {member ? page.text : page.guestText ?? page.text}
                    </Text>
                  </Flex.RSC>
                </Box>
              </Link>
            </div>
          ))}
        </TabsScrollBox>
      </Tabs>
      <Box padding={PLANCK * 3}>
        <Flex.RSS layout="1 auto">
          <ContentBox>
            {title || button ? (
              <>
                <Flex.RBC>
                  {title && <Text size={FONTSIZE_18}>{title}</Text>}
                  {button ? button : null}
                </Flex.RBC>
                <Space.H6 />
              </>
            ) : null}
            {children}
          </ContentBox>
          <Space.V1 />
        </Flex.RSS>
      </Box>
    </>
  );
};

const ContentBox = styled.div`
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #c8cde0;
  background-color: #fff;
  width: 100%;
  padding: ${PLANCK * 4}px;
`;

const Tabs = styled.div`
  position: relative;
  width: 100%;
  height: 47px;
  margin-bottom: -1px;
`;

const TabsScrollBox = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  border-bottom: 0;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  & > * {
    height: 100%;
    display: inline-flex;
  }
`;
