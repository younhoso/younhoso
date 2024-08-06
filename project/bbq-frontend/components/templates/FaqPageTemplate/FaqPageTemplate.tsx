import { FC, Fragment, useState } from 'react';

import styled from 'styled-components';

import {
  Container,
  Divider,
  Flex,
  Icon,
  Pagination as PaginationComponent,
  Space,
  Tab,
  Text,
} from '@/components/atoms';
import { Sidebar } from '@/components/organisms';
import { COLOR_PRIMARY, FONTSIZE_14, FONTSIZE_16, FONTSIZE_18, PLANCK } from '@/constants';
import { FAQ, Pagination } from '@/types';
import { highlightPatterns } from '@/utils';

import { FaqPageTemplateMobile } from './mobile';

export interface FaqPageTemplateProps {
  page: number;
  setPage: (value: number) => void;
  categories: {
    value: string;
    name: string;
  }[];
  category: string;
  setKeywords: (value: string[]) => void;
  setCategory: (value: string) => void;
  keywords: string[];
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  handleSearch: () => void;
  data: Pagination<FAQ>;
}

export interface FaqPageTemplateComponentProps extends FaqPageTemplateProps {}

export const FaqPageTemplate: FC<FaqPageTemplateComponentProps> & {
  Mobile: FC<FaqPageTemplateComponentProps>;
} = ({
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
    <div>
      <Container>
        <Container.Body>
          <Space.H3 />
          <div>
            <Tab
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
              <Flex.CCC full padding={`0 ${PLANCK * 10}px`}>
                <InputWrapper>
                  <Icon src={'reading-glasses-black-line.svg'} size={34} />
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
                <Space.H4 />
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
                  <Text size={FONTSIZE_18} color={'#777777'}>
                    자주 묻는 질문으로 빠른 답변을 찾아보세요
                  </Text>
                )}
                <Space.H8 />
                <Flex.RCC full>
                  {categories.map((item, index) => {
                    const selected = (category ?? '') === (item.value ?? '');
                    return (
                      <Fragment key={item.value}>
                        {index !== 0 && (
                          <>
                            <Space.V2_5 />
                            <Divider.V1 color="#777777" />
                            <Space.V2_5 />
                          </>
                        )}
                        <Text
                          onClick={() => {
                            setCategory(item.value);
                          }}
                          key={index}
                          size={FONTSIZE_16}
                          weight={selected ? 700 : undefined}
                          decoration={selected ? 'underline' : undefined}
                          style={!selected ? { cursor: 'pointer' } : { pointerEvents: 'none' }}
                        >
                          {item.name}
                        </Text>
                      </Fragment>
                    );
                  })}
                </Flex.RCC>
                <Space.H8 />
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
                            style={{ cursor: 'pointer' }}
                          >
                            <PostItemTag>Q</PostItemTag>
                            <div
                              style={{
                                fontSize: 16,
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
                                <Space.H2 />
                                <div
                                  style={{
                                    fontSize: `${FONTSIZE_14}px`,
                                    fontWeight: 600,
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
                <Space.H8 />
                <PaginationComponent
                  currentPage={page}
                  totalPageCount={data.totalPages}
                  onPageButtonClick={page => {
                    setPage(page);
                  }}
                />
              </Flex.CCC>
              <Space.H8 />
            </Tab>
          </div>
        </Container.Body>
        <Container.Sidebar>
          <Sidebar />
        </Container.Sidebar>
      </Container>
    </div>
  );
};
FaqPageTemplate.Mobile = FaqPageTemplateMobile;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  width: 500px;
  padding: 0 ${PLANCK * 2}px 0 ${PLANCK * 2}px;
  border-bottom: solid 2px #000000;

  & > *:not(:nth-child(1)) {
    margin-left: ${PLANCK * 4}px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0;
  margin: 0;
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 24px;
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
  cursor: pointer;
  border-radius: 9999px;
  background-color: #eee;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${PLANCK * 2}px 0 ${PLANCK * 6}px;
`;

const TagIcon = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: black;
  width: ${PLANCK * 4}px;
  height: ${PLANCK * 4}px;
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
  width: ${PLANCK * 8}px;
  height: ${PLANCK * 8}px;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: center;
  color: ${({ color }) => (color ? color : '#000')};
`;
