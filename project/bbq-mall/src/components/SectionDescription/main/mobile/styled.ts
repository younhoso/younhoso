'use client';

import styled from 'styled-components';

export const SectionDescriptionMobileStyled = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-right: 20px;
  h3 {
    margin-bottom: 6px;
    font-size: ${props => props.theme.fontSizes.font18};
    font-weight: ${props => props.theme.fontWeight.bold};
    color: ${props => props.theme.colors.gray333};
  }
  p {
    line-height: 1.25;
    font-size: ${props => props.theme.fontSizes.font14};
    font-weight: ${props => props.theme.fontWeight.medium};
    color: ${props => props.theme.colors.gray999};
  }
  img {
    vertical-align: middle;
  }
  a {
    white-space: nowrap;
    color: ${props => props.theme.colors.red937};
    font-size: ${props => props.theme.fontSizes.font14};
    font-weight: ${props => props.theme.fontWeight.medium};
    line-height: 21.5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 320px) {
    p {
      ${props => props.theme.fontStyle['body04-2']}
    }
  }
`;
