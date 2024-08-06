import { FC, ReactNode, useState } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Box, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_13, PLANCK } from '@/constants';
import { useQueryParams } from '@/hooks';
import { GetMenuRecommendListAPIResponse } from '@/types';

export interface RecommendMenusCardProps {
  data: GetMenuRecommendListAPIResponse;
}

export interface RecommendMenusCardComponentProps extends RecommendMenusCardProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const RecommendMenusCard: FC<RecommendMenusCardComponentProps> = props => {
  const { keepParams } = useQueryParams();
  const { data, className, children, ...rest } = props;

  const [index, setIndex] = useState<number>(1);

  const count = data[0].menuItemList.length;
  const maxPage = Math.ceil(count / 2);
  const card1Index = ((index - 1) * 2) % count;
  const card2Index = ((index - 1) * 2 + 1) % count;

  return (
    <Wrapper>
      <Head>
        <HeadTitleText>{data[0].categoryName}</HeadTitleText>
        <PageNumber>
          <b>{index}</b> / {maxPage}
        </PageNumber>
        <HeadButtons>
          <HeadPrevButton
            onClick={() => setIndex(index - 1 <= 0 ? maxPage : index - 1)}
          ></HeadPrevButton>
          <HeadNextButton
            onClick={() => setIndex(index + 1 > maxPage ? 1 : index + 1)}
          ></HeadNextButton>
        </HeadButtons>
      </Head>
      <Body>
        <Cards>
          <Card href={keepParams(`/products/${data[0].menuItemList[card1Index].menuId}`)}>
            <Box full={true} shape="round" style={{ overflow: 'hidden' }} border="#e5e5e5">
              <Image
                src={data[0].menuItemList[card1Index].menuImageUrl}
                width={'100%'}
                height={'100%'}
                backgroundPosition={'center'}
                backgroundSize={'cover'}
              />
            </Box>
            <Space.H2 />
            <Text size={FONTSIZE_13}>{data[0].menuItemList[card1Index].menuName}</Text>
            <Space.H2 />
            <Text size={FONTSIZE_13}>
              {`${data[0].menuItemList[card1Index].menuPrice.toLocaleString()}원`}
            </Text>
          </Card>
          <Card
            href={keepParams(`/products/${data[0].menuItemList[card2Index].menuId}`)}
            style={
              card1Index > card2Index
                ? { opacity: 0, visibility: 'hidden', pointerEvents: 'none' }
                : {}
            }
          >
            <Box full={true} shape="round" style={{ overflow: 'hidden' }} border="#e5e5e5">
              <Image
                src={data[0].menuItemList[card2Index].menuImageUrl}
                width={'100%'}
                height={'100%'}
                backgroundPosition={'center'}
                backgroundSize={'cover'}
              />
            </Box>
            <Space.H2 />
            <Text size={FONTSIZE_13}>{data[0].menuItemList[card2Index].menuName}</Text>
            <Space.H2 />
            <Text size={FONTSIZE_13}>
              {`${data[0].menuItemList[card2Index].menuPrice.toLocaleString()}원`}
            </Text>
          </Card>
        </Cards>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${PLANCK * 3}px;
  box-sizing: border-box;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
`;

const HeadTitleText = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: left;
  color: #281d19;
`;

const PageNumber = styled.div`
  &,
  & > * {
    font-size: 12px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1em;
    letter-spacing: normal;
    text-align: right;
    color: #8e93ad;
  }

  & > b {
    color: #000;
  }
`;

const HeadButtons = styled.div`
  margin-left: ${PLANCK * 3}px;
  display: flex;
  border: solid 1px #e8eaf0;
  height: 22px;
  border-radius: 3px;
  overflow: hidden;
`;

const HeadPrevButton = styled.div`
  position: relative;
  width: 22px;
  height: 100%;
  background-color: #f5f6f7;
  cursor: pointer;

  &::after {
    cursor: pointer;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    border: solid #000;
    border-width: 0 1.5px 1.5px 0;
    display: inline-block;
    padding: 2px;
    transform: translate(-40%, -50%) rotate(135deg);
  }
`;

const HeadNextButton = styled(HeadPrevButton)`
  border-left: 1px solid #e8eaf0;

  &::after {
    transform: translate(-60%, -50%) rotate(-45deg);
  }
`;

const Body = styled.div`
  margin-top: ${PLANCK * 2}px;
`;

const Cards = styled.div`
  display: flex;

  & > *:not(:nth-child(1)) {
    margin-left: ${PLANCK * 3}px;
  }
`;

const Card = styled(Link)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
`;
