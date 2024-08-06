// TODO: 다듬어야함
import React, { FC, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { Divider, Space, Text } from '@/components/atoms';
import { COLOR_GRAY, COLOR_GREEN, COLOR_RED } from '@/constants';
import { QNA } from '@/types';

import { InquiryCardMobile } from './mobile';

export interface InquiryCardProps {
  qna: QNA;
}

export interface InquiryCardComponentProps extends InquiryCardProps {
  className?: string;
  [x: string]: any;
}

export const INITIAL_MAX_HEIGHT = 10000;

export const InquiryCard: FC<InquiryCardComponentProps> & {
  Mobile: FC<InquiryCardComponentProps>;
} = ({ qna }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [maxHeight, setMaxHeight] = useState<number>(INITIAL_MAX_HEIGHT);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current && !isFirstRender) {
      if (maxHeight > bodyRef.current.scrollHeight && maxHeight !== INITIAL_MAX_HEIGHT) {
        return;
      }
      setMaxHeight(bodyRef.current.scrollHeight);
    }
    if (!collapsed && isFirstRender) {
      setIsFirstRender(false);
    }
  }, [collapsed, isFirstRender]);

  return (
    <MypageInquiryCard
      collapsed={collapsed}
      onClick={() => qna.adminAnswer && setCollapsed(!collapsed)}
    >
      <MypageInquiryCardHeader>
        <Text>{qna.content}</Text>
        <MypageInquiryCardHeaderRight>
          <Text color={'#777777'}>{qna.createdAt}</Text>
          {qna.adminAnswer ? (
            <Text color={COLOR_GREEN}>답변완료</Text>
          ) : (
            <Text color={COLOR_RED}>답변대기</Text>
          )}
        </MypageInquiryCardHeaderRight>
      </MypageInquiryCardHeader>
      <Divider />
      {qna.adminAnswer && (
        <MypageInquiryCardBody maxHeight={collapsed ? 0 : maxHeight} ref={bodyRef}>
          <MypageInquiryCardBodyInnerBox>
            <Text color={COLOR_GREEN} size={14} inline>
              답변
            </Text>
            <CustomDivider length={1} direction="v" inline />
            <Text size={14} color={'#777777'} inline>
              {qna.answeredAt}
            </Text>
            <Space.H2 />
            <div
              style={{
                whiteSpace: 'normal',
                wordBreak: 'break-all',
              }}
            >
              {qna.adminAnswer}
            </div>
          </MypageInquiryCardBodyInnerBox>
        </MypageInquiryCardBody>
      )}
    </MypageInquiryCard>
  );
};
InquiryCard.Mobile = InquiryCardMobile;

const MypageInquiryCard = styled.div<{ collapsed: boolean }>`
  border: 1px solid #dddddd;
  border-bottom: 0;
  margin-bottom: 20px;
  cursor: pointer;
  ${props =>
    !props.collapsed &&
    `
    border-bottom: 1px solid #dddddd;
  `}
`;
const MypageInquiryCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const MypageInquiryCardHeaderRight = styled.div`
  display: flex;
  gap: 30px;
`;
const MypageInquiryCardBody = styled.div<{ maxHeight: number }>`
  clear: both;
  overflow: hidden;
  height: 100%;
  transition: max-height 0.5s;
  max-height: ${props => `${props.maxHeight}px`};
`;

const MypageInquiryCardBodyInnerBox = styled.div`
  padding: 30px;
`;

const CustomDivider = styled(Divider)`
  margin: 0 5px;
  height: 15px;
  position: relative;
  top: 3px;
`;
