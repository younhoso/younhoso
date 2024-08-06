'use client';

import styled from 'styled-components';

export const NodataMobileStyled = styled.div`
  min-height: 80vh;
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${props => props.theme.colors.graybbb};
  font-size: 15px;
  font-weight: 500;
  &.event-nodata {
    min-height: 50vh;
  }
  &.categories-nodata {
    min-height: 50vh;
  }
  &.review-nodata {
    min-height: 20vh;
    color: ${props => props.theme.colors.graybbb};
    border-top: 1px solid ${props => props.theme.colors.grayada};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    ${props => props.theme.fontStyle['body03-2']};
    margin: 0 16px;
  }
  &.qna-nodata {
    min-height: 20vh;
    ${props => props.theme.fontStyle['body03-2']};
    color: ${props => props.theme.colors.graybbb};
  }
`;
