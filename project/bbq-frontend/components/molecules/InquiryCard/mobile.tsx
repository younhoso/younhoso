// TODO: 다듬어야함
import { FC, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { Box, Divider, Flex, Space, Text } from '@/components/atoms';
import { COLOR_GREEN, COLOR_RED, FONTSIZE_11, FONTSIZE_12, FONTSIZE_14, PLANCK } from '@/constants';

import { INITIAL_MAX_HEIGHT, InquiryCardComponentProps } from './InquiryCard';

export const InquiryCardMobile: FC<InquiryCardComponentProps> = ({ qna }) => {
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
      <Box padding={PLANCK * 3}>
        <Text size={FONTSIZE_14}>{qna.content}</Text>
        <Space.H2 />
        <Flex.RBC>
          <Text size={FONTSIZE_11} color={'#777777'}>
            {qna.createdAt}
          </Text>
          {qna.adminAnswer ? (
            <Text size={FONTSIZE_11} color={COLOR_GREEN}>
              답변완료
            </Text>
          ) : (
            <Text size={FONTSIZE_12} color={COLOR_RED}>
              답변대기
            </Text>
          )}
        </Flex.RBC>
      </Box>
      <Divider />
      {qna.adminAnswer && (
        <MypageInquiryCardBody maxHeight={collapsed ? 0 : maxHeight} ref={bodyRef}>
          <MypageInquiryCardBodyInnerBox>
            <Flex.RBC>
              <Text color={COLOR_GREEN} size={FONTSIZE_12}>
                답변
              </Text>
              <Text size={FONTSIZE_12} color={'#777777'}>
                {qna.answeredAt}
              </Text>
            </Flex.RBC>
            <Space.H2 />
            <div
              style={{
                whiteSpace: 'normal',
                wordBreak: 'break-all',
                lineHeight: '1.4em',
                fontSize: '13px',
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

const MypageInquiryCard = styled.div<{ collapsed: boolean }>`
  border: 1px solid #dddddd;
  border-bottom: 0;
  margin-bottom: 15px;
  cursor: pointer;
  ${props =>
    !props.collapsed &&
    `
    border-bottom: 1px solid #dddddd;
  `}
`;

const MypageInquiryCardBody = styled.div<{ maxHeight: number }>`
  clear: both;
  overflow: hidden;
  height: 100%;
  transition: max-height 0.5s;
  max-height: ${props => `${props.maxHeight}px`};
`;

const MypageInquiryCardBodyInnerBox = styled.div`
  padding: 15px;
`;
