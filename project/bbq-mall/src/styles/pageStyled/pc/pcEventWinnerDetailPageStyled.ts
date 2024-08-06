'use client';

import styled from 'styled-components';

export const PcEventWinnerDetailPageStyled = styled.div`
  .winnerdetail-title-inner {
    padding: 24px 0;
    border-top: 2px solid ${props => props.theme.colors.gray999};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
  .winnerdetail-title {
    ${props => props.theme.fontStyle['body01-2']};
    margin-bottom: 12px;
  }
  .winnerdetail-description {
    padding-top: 40px;
    padding-bottom: 60px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
  .ymdt-inner {
    display: flex;
    align-items: center;
    .ymdt {
      margin-left: 10px;
    }
  }
  .button-link-inner {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 40px;
  }
`;
