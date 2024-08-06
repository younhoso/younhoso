import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const CategoryInfoStyle = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (max-width: 500px) {
  }

  & .toastui-editor-contents {
    max-width: 900px;
    margin: 5rem auto;
    padding: 1rem;
    font-size: 18px;
    font-weight: normal;
  }

  .toastui-editor-contents img {
    width: 100%;
  }
  .toastui-editor-contents p {
    text-align: center;
  }

  .blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-shadow: 0 0 20px black;
    font-size: 1.5rem;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s all;

    &.show {
      visibility: visible;
      opacity: 1;
    }
  }
  .loadSpin {
    border: 5px solid hsla(185, 100%, 62%, 0.2);
    border-top-color: #3cefff;
    border-radius: 50%;
    width: 3em;
    height: 3em;
    animation: spin 1s linear infinite;
  }
`;
