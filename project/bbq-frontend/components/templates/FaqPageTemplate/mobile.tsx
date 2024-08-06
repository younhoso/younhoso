import { FC, Fragment, useState } from 'react';

import styled from 'styled-components';

import {
  Container,
  Divider,
  Flex,
  Grid,
  Icon,
  Pagination,
  Space,
  Tab,
  Text,
} from '@/components/atoms';
import { COLOR_PRIMARY, FONTSIZE_13, FONTSIZE_14, FONTSIZE_15, PLANCK } from '@/constants';
import { highlightPatterns } from '@/utils';

import { FaqPageTemplateComponentProps } from './FaqPageTemplate';

export const FaqPageTemplateMobile: FC<FaqPageTemplateComponentProps> = ({
  page,
  setPage,
  categories,
  category,
  setCategory,
  keywords,
  setKeywords,
  searchInputValue,
  setSearchInputValue,
  handleSearch,
  data,
}) => {
  const [collpasedData, setCollpasedData] = useState<{
    [key: number]: boolean;
  }>({});

  return (
    <Container.Mobile>
      <Tab.Mobile
        items={[
          {
            title: '자주하는 질문',
            selected: true,
            href: '/faq',
          },
          {
            title: '문의사항',
            selected: false,
            href: '/mypage/inquiry',
          },
          {
            title: '공지사항',
            selected: false,
            href: '/notices',
          },
        ]}
      >
        <Container.Mobile.Body>
          <Flex.CCC full>
            <InputWrapper>
              <Icon src={'reading-glasses-black-line.svg'} size={24} />
              <Input
                placeholder="검색어를 입력하세요"
                value={searchInputValue}
                onChange={e => {
                  setSearchInputValue(e.target.value);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </InputWrapper>
            <Space.H3 />
            {keywords && keywords.length > 0 ? (
              <Flex.RCC gap={PLANCK * 2}>
                {keywords &&
                  keywords.map((keyword, index) => (
                    <Tag
                      key={index}
                      onClick={() => {
                        let copied = [...keywords];
                        copied.splice(index, 1);
                        setSearchInputValue(copied.join(' '));
                        setKeywords(copied);
                      }}
                    >
                      <TagIcon />
                      <Text size={FONTSIZE_14}>{keyword}</Text>
                    </Tag>
                  ))}
              </Flex.RCC>
            ) : (
              <Text size={FONTSIZE_14} color={'#777777'}>
                자주 묻는 질문으로 빠른 답변을 찾아보세요
              </Text>
            )}
            <Space.H6 />

            <Grid full columnCount={4} gap={PLANCK * 3}>
              {categories.map((item, index) => {
                const selected = (category ?? '') === (item.value ?? '');
                return (
                  <Fragment key={item.value}>
                    <Text
                      onClick={() => {
                        setCategory(item.value);
                      }}
                      key={index}
                      size={FONTSIZE_15}
                      weight={selected ? 700 : undefined}
                      decoration={selected ? 'underline' : undefined}
                      style={!selected ? { cursor: 'pointer' } : { pointerEvents: 'none' }}
                    >
                      {item.name}
                    </Text>
                  </Fragment>
                );
              })}
            </Grid>
            <Space.H6 />

            <Flex.CSS full>
              {data.content.map((faq, index) => {
                return (
                  <>
                    {index == 0 && (
                      <>
                        <Divider.H1 />
                      </>
                    )}
                    <Space.H1 />
                    <Flex.CSS full key={index}>
                      <Flex.RSC
                        full
                        layout="auto 1"
                        onClick={() => {
                          setCollpasedData({
                            ...collpasedData,
                            ...{ [index]: !collpasedData[index] },
                          });
                        }}
                      >
                        <PostItemTag>Q</PostItemTag>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            lineHeight: '1em',
                            marginTop: '3px',
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: highlightPatterns({
                                text: faq.title,
                                patterns: keywords,
                              }).replace(/\n/g, '<br>'),
                            }}
                          />
                        </div>
                      </Flex.RSC>
                      {collpasedData[index] ? (
                        <Flex.RSS full layout="auto 1">
                          <PostItemTag color={COLOR_PRIMARY}>A</PostItemTag>
                          <div>
                            <Space.H1 />
                            <div
                              style={{
                                fontSize: `${FONTSIZE_13}px`,
                                lineHeight: '1.5em',
                                color: '#777777',
                              }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: highlightPatterns({
                                    text: faq.content,
                                    patterns: keywords,
                                  }).replace(/\n/g, '<br>'),
                                }}
                              />
                            </div>
                            <Space.H3 />
                          </div>
                        </Flex.RSS>
                      ) : null}
                    </Flex.CSS>
                    <Space.H1 />
                    <Divider.H1 />
                  </>
                );
              })}
            </Flex.CSS>
            <Space.H4 />
            <Pagination.Mobile currentPage={30} totalPageCount={200} />
          </Flex.CCC>
        </Container.Mobile.Body>
      </Tab.Mobile>
    </Container.Mobile>
  );
};

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
  padding: 0 ${PLANCK * 2}px 0 ${PLANCK * 2}px;
  border-bottom: solid 2px #000000;

  & > *:not(:nth-child(1)) {
    margin-left: ${PLANCK * 3}px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0;
  margin: 0;
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: 500;

  &:focus {
    outline-width: 0;
    outline: none;
  }

  ::placeholder {
    color: #cccfde;
  }
`;

const Tag = styled.div`
  position: relative;
  border-radius: 9999px;
  background-color: #eee;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${PLANCK * 2}px 0 ${PLANCK * 5}px;
`;

const TagIcon = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: black;
  width: ${PLANCK * 3}px;
  height: ${PLANCK * 3}px;
  left: 4px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 50%;
    height: 1px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
`;

const PostItemTag = styled.div<{ color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${PLANCK * 6}px;
  height: ${PLANCK * 6}px;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: center;
  color: ${({ color }) => (color ? color : '#000')};
`;
