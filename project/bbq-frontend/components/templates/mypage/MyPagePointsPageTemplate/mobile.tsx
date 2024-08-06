import { FC } from 'react';

import styled from 'styled-components';

import { Arrow, Divider, Flex, Icon, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_RED, FONTSIZE_13, FONTSIZE_14, FONTSIZE_15, FONTSIZE_16, PLANCK } from '@/constants';

import { Template } from '../components';
import { MyPagePointsPageTemplateComponentProps } from './MyPagePointsPageTemplate';

export const MyPagePointsPageTemplateMobile: FC<MyPagePointsPageTemplateComponentProps> = ({
  totalCount,
  points,
  currentPointValue,
  handleShowMoreButtonClick,
}) => {
  return (
    <Template.Mobile title="나의 포인트">
      <Flex.RSC full>
        <div style={{ backgroundColor: '#e0e6ed', borderRadius: '50%' }}>
          <Icon src="bike-with-folded-point.svg" size={36}></Icon>
        </div>
        <Space.V4 />
        <Text size={FONTSIZE_16}>나의 포인트</Text>
        <Space.V1_5 />
        <Text size={FONTSIZE_16} color={COLOR_RED}>
          {(currentPointValue ?? 0).toLocaleString()}p
        </Text>
      </Flex.RSC>
      <Space.H7 />
      <TabTable>
        <TabTableContent>
          <Text size={FONTSIZE_14}>Total {totalCount}</Text>
          <Space.H3 />
          <Divider length={2} color="#000000" />
          <TabTableContentTable>
            <thead>
              <tr>
                <th>적립내용</th>
                <th>날짜</th>
                <th>사용내역</th>
                <th>남은 포인트</th>
              </tr>
            </thead>
            <tbody>
              {points.map(point => {
                return (
                  <tr key={point.id}>
                    <td>{point.description}</td>
                    <td>{point.createdAt}</td>
                    <td className={point.deltaPoint >= 0 ? 'plus' : 'minus'}>
                      ({point.deltaPoint >= 0 ? '+' : '-'}) {point.deltaPoint.toLocaleString()}p
                    </td>
                    <td className="minus">{point.currentPoint.toLocaleString()}p</td>
                  </tr>
                );
              })}
            </tbody>
          </TabTableContentTable>
        </TabTableContent>
        <Space.H6 />
        {totalCount > points.length ? (
          <>
            <Flex.RCC full={true}>
              <Button.Mobile
                onClick={() => handleShowMoreButtonClick()}
                color="#f5f6f7"
                borderColor="#e8eaf0"
                shape="round"
                text={
                  <Flex.RSC>
                    <Text color="#302d46" size={FONTSIZE_13}>
                      포인트 더보기
                    </Text>
                    <Space.V2 />
                    <Arrow.Down size={2} thickness={1.5} color="#302d46" />
                  </Flex.RSC>
                }
              />
            </Flex.RCC>
            <Space.H12 />
          </>
        ) : null}
      </TabTable>
    </Template.Mobile>
  );
};

const TabTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const TabTableContent = styled.div`
  width: 100%;
  min-height: 480px;
`;

const TabTableContentTable = styled.table`
  width: 100%;

  text-align: center;
  margin: 0 auto;
  border-collapse: collapse;
  thead {
    tr > th {
      padding: 10px 0;
      font-size: 12px;
    }
  }
  tbody {
    border-top: 1px solid #dddddd;
    tr > td {
      padding: 10px 0;
      border-bottom: 1px solid #dddddd;
      font-weight: 500;
      color: #777777;
      font-size: 12px;

      &.plus {
        color: #2cb86b;
      }
      &.minus {
        color: #e52143;
      }
    }
  }
`;
