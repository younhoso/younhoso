import { FC, Fragment, useEffect, useState } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Arrow, Box, Divider, Flex, Icon, Space, Text } from '@/components/atoms';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  FONTSIZE_10,
  FONTSIZE_14,
  FONTSIZE_16,
  FONTSIZE_20,
  FONTSIZE_24,
  FONTSIZE_32,
} from '@/constants';

const dropDownItems = [
  {
    title: '젊음과 건강을 유지하게 하는 ‘올리브유의 비밀’ & ‘올리브유의 효능’',
    content: '내용\n내용\n\n내용',
  },
  {
    title: '젊음과 건강을 유지하게 하는 ‘올리브유의 비밀’ & ‘올리브유의 효능’',
    content: '내용\n내용\n\n내용',
  },
];

export interface OliveStoryPageTemplate {}

export const OliveStoryPageTemplate: FC<OliveStoryPageTemplate> = ({}) => {
  const [dropDownItemCollapses, setDropDownItemCollapses] = useState<boolean[]>([]);

  useEffect(() => {
    let collapses: boolean[] = [];
    for (let i = 0; i < dropDownItems.length; i++) {
      collapses.push(false);
    }
    collapses[0] = true;
    setDropDownItemCollapses(collapses);
  }, []);

  if (!dropDownItemCollapses.length) return null;

  return (
    <>
      <Box
        background="#FCFBF7"
        full={true}
        style={{
          boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.10)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Flex.RCC full={true}>
          <LinkBox href={'/story'}>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={500}>
              비비큐 이야기
            </Text>
            <Space.H3 />
          </LinkBox>
          <Space.V3 />
          <Divider.V1 color={COLOR_BLACK} style={{ height: 14 }} />
          <Space.V3 />
          <Box>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={600}>
              올리브 이야기
            </Text>
            <Space.H3 />
            <Divider.H2 color={COLOR_BLACK} style={{ marginTop: -2 }} />
          </Box>
          <Space.V3 />
          <Divider.V1 color={COLOR_BLACK} style={{ height: 14 }} />
          <Space.V3 />
          <LinkBox href={'/story/videos'}>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={500}>
              영상 콘텐츠
            </Text>
            <Space.H3 />
          </LinkBox>
          <Space.V3 />
          <Divider.V1 color={COLOR_BLACK} style={{ height: 14 }} />
          <Space.V3 />
          <LinkBox href={'/story/relay'}>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={500}>
              찾아가는 치킨릴레이 사연신청
            </Text>
            <Space.H3 />
          </LinkBox>
        </Flex.RCC>
      </Box>
      <Box background={'#F9F6EF'}>
        <Flex.CCC>
          <Space.H9 />
          <Text size={32} weight={600}>
            올리브 이야기
          </Text>
          <Space.H4 />
          <Text color={'#565043'} size={FONTSIZE_16} weight={500}>
            우리가 몰랐던 올리브유
          </Text>
          <Space.H7 />
          <Box
            padding={'35px 40px 35px 40px'}
            background={COLOR_WHITE}
            border={'#D5D0C5'}
            style={{
              position: 'relative',
              width: '666px',
              borderRadius: '24px',
              zIndex: 1,
            }}
          >
            <Flex.CCC full={true}>
              <Text color={'#93B273'} size={32} weight={700}>
                Q1.
              </Text>
              <Space.H4 />
              <Text size={FONTSIZE_20} weight={600}>
                올리브유가 일반 식용유 보다 좋다?
              </Text>
              <Space.H9 />
              <Box
                full={true}
                background={'#EFECE5'}
                border={'#D9D2C3'}
                padding={'20px 20px 28px 20px'}
                style={{
                  borderRadius: '16px 0px 16px 16px',
                  boxShadow: '0px 5px 16px 0px rgba(109, 101, 82, 0.25)',
                }}
              >
                <Text color={'#565043'} size={FONTSIZE_14} lineHeight={'1.5em'} weight={500}>
                  일반 식용유는 제조 과정에서 산화 방지제가 첨가되고, 옥수수나 콩 등의 재료를
                  고온으로 가열한 뒤 압력을 가해 기름을 짜기 때문에 이 과정에서 항산화 물질인
                  폴리페놀, 토코페롤, 셀레늄 등의 영양소가 파괴됩니다. 반면 올리브유는 올리브 열매를
                  압착해서 짜낼 뿐, 생산과정에서 열을 가하거나 정제하지 않기 때문에 영양 파괴가 없어
                  비만 방지, 항암, 노화방지 등의 효능이 유지됩니다.
                </Text>
              </Box>
              <Flex.REC full={true} style={{ marginTop: -20 }}>
                <Box
                  background={'#292A56'}
                  style={{
                    borderRadius: '16px 0px 16px 16px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                  }}
                  onClick={() => {
                    alert('click');
                  }}
                >
                  <Space.H4 />
                  <Flex.RSC full={true}>
                    <Text color={COLOR_WHITE} size={FONTSIZE_14} weight={600}>
                      다음
                    </Text>
                    <Space.V12 />
                    <Arrow.Right color={COLOR_WHITE} size={3} />
                  </Flex.RSC>
                  <Space.H4 />
                </Box>
              </Flex.REC>
            </Flex.CCC>
          </Box>
          <div
            style={{
              marginTop: -40,
              width: 606,
              height: 60,
              background: 'rgba(109, 101, 82, 0.50)',
              borderRadius: 30,
              filter: 'blur(16px)',
            }}
          ></div>
          <Flex.RSC style={{ marginTop: -15 }}>
            <div>
              <Text color={'#565043'} size={FONTSIZE_14} weight={600}>
                BBQ 올리브오일
              </Text>
              <Space.H1 />
              <Text color={'#98907E'} size={FONTSIZE_10} weight={500} lineHeight={'1.3em'}>
                100% extra virgin olive oil is used as
                <br />a raw material for frying oil
              </Text>
            </div>
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Icon src="/olive-story/olive-oil.svg" size={44} />
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Icon src="/olive-story/chicken-in-bowl.svg" size={44} />
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Icon src="/olive-story/olive-oil-typography.svg" size={150} />
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Flex.RSC>
              <Text size={FONTSIZE_14} weight={500}>
                1
              </Text>
              <Text size={FONTSIZE_14} color={'#948D7E'} weight={500}>
                &nbsp;/&nbsp;8
              </Text>
            </Flex.RSC>
          </Flex.RSC>
        </Flex.CCC>
      </Box>
      <Flex.CCC>
        <Space.H12 />
        <Text size={FONTSIZE_32} weight={600}>
          엑스트라 버진 올리브유 이야기
        </Text>
        <Space.H5 />
        <Text align="center" color="#565043" size={FONTSIZE_16} lineHeight={'1.75em'} weight={500}>
          BBQ는 예로부터 신이 내린 최고의 선물이라 찬사를 받아온 ‘엑스트라 버진 올리브유’만을
          고집합니다.
          <br />
          세상에서 가장 맛있고 건강한 치킨만을 제공하겠다는 BBQ의 건강한 고집!
          <br />
          BBQ는 올리브 오일 중에 최상급인 100% 엑스트라 버진 올리브오일을 원료로 사용하는
          올리브오일만을 사용합니다.
          <br />
          그리고 3년간의 꾸준한 연구결과, BBQ만의 후라잉 오일 황금올리브유를 탄생시켜 세상에서 단
          하나밖에 없는
          <br />
          건강하고 맛있는 치킨을 대한민국 국민치킨으로 제공하고 있습니다.
        </Text>
        <Space.H11 />
        <div style={{ width: 20, height: 2, background: '#000' }}></div>
        <Space.H11 />
        <Text size={FONTSIZE_24} weight={600}>
          엑스트라 버진 올리브유가 뭔가요?
        </Text>
        <Space.H3_5 />
        <Text
          size={FONTSIZE_16}
          weight={500}
          align="center"
          color={'#565043'}
          lineHeight={'1.75em'}
        >
          엑스트라버진 올리브 오일(EVOO)은 조리 가공하지 않고
          <br />생 오일 그대로 샐러드나 식용으로 먹는 최상등급의 올리브오일입니다.
        </Text>
        <Space.H8 />
        <div style={{ width: 950 }}>
          {dropDownItems.map((item, index, items) => {
            return (
              <Fragment key={index}>
                <DropDownItem
                  index={index + 1}
                  title={item.title}
                  content={item.content}
                  collapsed={dropDownItemCollapses[index]}
                  handleClick={() => {
                    let collapses = [...dropDownItemCollapses];
                    collapses[index] = !collapses[index];
                    setDropDownItemCollapses(collapses);
                  }}
                />
                {index + 1 < items.length ? <Space.H3 /> : null}
              </Fragment>
            );
          })}
        </div>
        <Space.H20 />
      </Flex.CCC>
    </>
  );
};

const DropDownItem = ({
  index,
  title,
  content,
  collapsed = false,
  handleClick = () => {},
}: {
  index: number;
  title: string;
  content: string;
  collapsed: boolean;
  handleClick: () => void;
}) => {
  return (
    <Box shape={'round'} border={'#D5D0C5'} style={{ overflowY: 'hidden' }}>
      <Box
        onClick={() => {
          handleClick();
        }}
      >
        <Space.H5 />
        <Flex.RSC>
          <Space.V6 />
          <Text>{('000' + index).slice(-2)}</Text>
          <Space.V4 />
          <Text style={{ flex: 1 }}>{title}</Text>
          {collapsed ? <Arrow.Up /> : <Arrow.Down />}
          <Space.V6 />
        </Flex.RSC>
        <Space.H5 />
      </Box>
      {collapsed ? (
        <div>
          <Flex.RSC>
            <Space.V6 />
            <Divider.H1 />
            <Space.V6 />
          </Flex.RSC>
          <Space.H4 />
          <Flex.RSC>
            <Space.V6 />
            <Text color={'#565043'} weight={500} size={FONTSIZE_14} lineHeight={'1.75em'}>
              {content}
            </Text>
            <Space.V6 />
          </Flex.RSC>
          <Space.H4 />
        </div>
      ) : null}
    </Box>
  );
};

const LinkBox = styled(Link)``;
