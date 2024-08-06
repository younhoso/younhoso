import { FC, ReactNode, createContext, useContext, useState } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Dim, Space, Text } from '@/components/atoms';
import { FONTSIZE_20, PLANCK } from '@/constants';
import { useMounted } from '@/hooks';

export interface ModalProps {}

export interface ModalComponentProps extends ModalProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export interface ModalContextType {
  title: string;
  body: ReactNode | ReactNode[] | string;
  visible: boolean;
  maxWidth?: number;
  openModal: (params: {
    title: string;
    body: ReactNode | ReactNode[] | string;
    onClose?: () => any;
    maxWidth?: number;
  }) => void;
  closeModal: () => void;
  key: number;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string>('');
  const [key, setKey] = useState<number>(0);
  const [body, setBody] = useState<ReactNode | ReactNode[] | string>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [onClose, setOnClose] = useState<(() => any) | null | undefined>(undefined);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  const openModal = ({
    title,
    body,
    onClose,
    maxWidth,
  }: {
    title: string;
    body: ReactNode | ReactNode[] | string;
    onClose?: () => any;
    maxWidth?: number;
  }) => {
    setKey(prev => prev + 1);
    setTitle(title ?? '');
    setBody(body ?? '');
    setOnClose(() => onClose);
    setMaxWidth(maxWidth);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    onClose && onClose();
  };

  return (
    <ModalContext.Provider value={{ title, body, visible, openModal, closeModal, maxWidth, key }}>
      {children}
    </ModalContext.Provider>
  );
};

export const Modal: FC<ModalComponentProps> = props => {
  const { className, children, ...rest } = props;

  const { title, visible, body, closeModal, key, maxWidth } = useModal();

  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <>
      <Dim opacity={visible ? 0.5 : 0} />
      <Container
        className={classNames(className)}
        {...rest}
        visible={visible}
        custommaxwidth={maxWidth}
      >
        <Head>
          <Space.V4 />
          <TitleText weight={700} size={FONTSIZE_20}>
            {title}
          </TitleText>
          <Space.V4 />
          <CloseButton
            onClick={() => {
              closeModal();
            }}
          >
            <CloseButtonIcon />
          </CloseButton>
          <Space.V1 />
        </Head>
        <Body key={key}>{body}</Body>
      </Container>
    </>
  );
};

const Container = styled.div<{ visible: boolean; custommaxwidth?: number }>`
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 360px;
  width: calc(100vw - 40px);
  max-width: ${({ custommaxwidth }) => custommaxwidth ?? 440}px;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  border: 1px solid #dddddd;
  z-index: 20;
  overflow: hidden;
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  ${props =>
    props.visible
      ? `opacity: 1;`
      : `
      opacity: 0;
      pointer-events:none;
      transform: translate(-50%, calc(-50% + ${PLANCK * 2}px));
      `}
`;

const Head = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  height: ${PLANCK * 10}px;
  border-bottom: 1px solid #dddddd;
`;

const TitleText = styled(Text)`
  flex: 1;
`;

const CloseButton = styled.div`
  position: relative;
  cursor: pointer;
  width: ${PLANCK * 10}px;
  height: ${PLANCK * 10}px;
`;

const CloseButtonIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(245, 245, 240);
  background: linear-gradient(180deg, rgba(245, 245, 240, 1) 0%, rgba(218, 218, 224, 1) 100%);
  border-radius: 50%;
  width: ${PLANCK * 6}px;
  height: ${PLANCK * 6}px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 0 0 3px rgba(255, 255, 255, 0.4),
    0 3px 3px rgba(0, 0, 0, 0.2);

  &::before,
  &::after {
    content: '';
    clear: both;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 55%;
    height: 3px;
    background-color: #4e4a69;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
`;

const Body = styled.div`
  clear: both;
  background-color: white;
  padding: ${PLANCK * 4}px;
  max-height: 75vh;
  overflow-y: auto;
`;
