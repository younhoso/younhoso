import styled from 'styled-components';

export const MobileReviewLayoutStyled = styled.div`
  .tab-wrapper {
    display: flex;
    padding: 0 16px;
    background-color: white;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    transform: translateY(-11px);
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
  }

  &.not-webview {
    .tab-wrapper {
      top: 60px !important;
    }
  }
`;
