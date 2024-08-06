'use client';

import styled from 'styled-components';

export const NodataStyled = styled.div`
  min-height: 40vh;
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${props => props.theme.colors.graybbb};
  ${props => props.theme.fontStyle['body02-5']}
  &.event-nodata {
    min-height: 25vh;
  }
  &.categories-nodata {
    min-height: 25vh;
  }
  &.review-nodata {
    min-height: 20vh;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
  &.qna-nodata {
    min-height: 20vh;
    border-top: 1px solid ${props => props.theme.colors.gray999};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
  &.progressStatus-end-nodata {
    min-height: 25vh;
  }
`;
