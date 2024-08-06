import { FC, ReactNode, createContext, useContext, useState } from 'react';

import { Dim } from '@/components/atoms';
import { IframePopup } from '@/components/molecules';
import { useMounted } from '@/hooks';
import { parseApiError } from '@/utils';

export interface CIModalProps {}

export interface CIModalComponentProps extends CIModalProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export interface CIModalContextType {
  visible: boolean;
  openCIModal: (params: {
    onSuccess: ({ ciToken }: { ciToken: string }) => any;
    onCancel?: () => any;
    onError?: ({ error }: { error: Error }) => any;
  }) => void;
  closeCIModal: (params?: { ciToken?: string }) => void;
  key: number;
}

export const CIModalContext = createContext<CIModalContextType | undefined>(undefined);

export const useCIModal = () => {
  const context = useContext(CIModalContext);
  if (!context) {
    throw new Error('useCIModal must be used within a CIModalProvider');
  }
  return context;
};

export const CIModalProvider = ({ children }: { children: ReactNode }) => {
  const [key, setKey] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [onSuccess, setOnSuccess] = useState<
    (({ ciToken }: { ciToken: string }) => any) | null | undefined
  >(undefined);
  const [onCancel, setOnCancel] = useState<(() => any) | null | undefined>(undefined);
  const [onError, setOnError] = useState<(({ error }: { error: Error }) => any) | null | undefined>(
    undefined,
  );

  const openCIModal = ({
    onSuccess,
    onCancel,
    onError,
  }: {
    onSuccess: ({ ciToken }: { ciToken: string }) => any;
    onCancel?: () => any;
    onError?: ({ error }: { error: Error }) => any;
  }) => {
    setKey(prev => prev + 1);
    setOnSuccess(() => onSuccess);
    if (onCancel) {
      setOnCancel(() => onCancel);
    }
    if (onError) {
      setOnError(() => onError);
    }
    setVisible(true);
  };

  const closeCIModal = (params?: { ciToken?: string; error?: Error }) => {
    if (params && params.error) {
      if (onError) {
        onError({ error: params.error });
      } else {
        alert(parseApiError(params.error).message);
      }
    } else {
      if (params && params.ciToken) {
        onSuccess && onSuccess({ ciToken: params.ciToken });
      } else {
        onCancel && onCancel();
      }
    }
    setVisible(false);
  };

  return (
    <CIModalContext.Provider value={{ visible, openCIModal, closeCIModal, key }}>
      {children}
    </CIModalContext.Provider>
  );
};

export const CIModal: FC<CIModalComponentProps> = props => {
  const { className, children, ...rest } = props;

  const { visible, closeCIModal, key } = useCIModal();

  const mounted = useMounted();
  if (!mounted) return null;

  if (!visible) return null;

  return (
    <>
      <Dim opacity={0.5} />
      <IframePopup
        key={key}
        handleCloseButtonClick={() => {
          closeCIModal();
        }}
        url={`${process.env.NEXT_PUBLIC_CI_READY_ENDPOINT}?phoneNumber=&verifyType=REGISTER_CI_VERIFY`}
        messageHandler={async (event: MessageEvent<any>) => {
          try {
            if (!visible) return;
            if (!event.data) return;
            if (typeof event.data !== 'string') return;
            const data: string = event.data;
            if (!data.startsWith('@@cicallback@@$')) return;

            const { token, verifyType } = JSON.parse(data.split('@@cicallback@@$')[1]);
            if (!token || !verifyType) return;

            try {
              closeCIModal({ ciToken: token });
            } catch (err) {
              console.error(err);
              alert(parseApiError(err).message);
            }
          } catch (err) {
            console.error(err);
            alert((err as any).message);
          }
        }}
      />
    </>
  );
};
