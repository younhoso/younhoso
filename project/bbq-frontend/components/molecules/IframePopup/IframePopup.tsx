import { FC, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Flex, Icon, Space, Text } from '@/components/atoms';

export interface IframePopupProps {
  title?: string;
  url: string;
  messageHandler?: (data: any) => void;
  handleCloseButtonClick: () => void;
}

export interface IframePopupComponentProps extends IframePopupProps {
  className?: string;
  [x: string]: any;
}

export const INITIAL_MAX_HEIGHT = 10000;

export const IframePopup: FC<IframePopupComponentProps> = ({
  title = '본인 인증',
  url,
  messageHandler,
  handleCloseButtonClick,
}) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!messageHandler) return;
    if (!iframeRef || !iframeRef.current) return;

    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [iframeRef, messageHandler]);

  return (
    <Container>
      <Header>
        <Flex.RSC>
          <Space.V3 />
          <Text>{title}</Text>
        </Flex.RSC>
        <Flex.RSC>
          <CloseButton onClick={handleCloseButtonClick}>
            <Icon src="close-black.svg" size={16} />
          </CloseButton>
          <Space.V1_5 />
        </Flex.RSC>
      </Header>
      <Iframe src={url} ref={iframeRef}></Iframe>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 55px;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  cursor: pointer;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: calc(100% - 55px);
  border: none !important;
`;
