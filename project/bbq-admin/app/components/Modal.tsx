'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Flex, Text } from '@tremor/react';
import { Fragment, ReactNode, createContext, useContext, useState } from 'react';

import VerticalDivider from './VerticalDivider';

interface ModalContextProps {
  isOpen: boolean;
  openModal: (
    title: string,
    subTitle: string,
    body: React.ReactNode,
    handleCloseModal?: (value?: any) => void,
  ) => void;
  closeModal: (value?: any) => void;
  modalStyle?: string;
}

const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    subTitle: string;
    body: React.ReactNode;
    handleCloseModal?: (value?: any) => void;
  }>({
    title: '',
    subTitle: '',
    body: null,
    handleCloseModal: (value?: any) => {},
  });

  const openModal = (
    title: string,
    subTitle: string,
    body: React.ReactNode,
    handleCloseModal?: (value?: any) => void,
  ) => {
    setIsOpen(true);
    setModalContent({ title, subTitle, body, handleCloseModal });
  };

  const closeModal = (value?: any) => {
    setIsOpen(false);
    if (modalContent.handleCloseModal) {
      modalContent.handleCloseModal(value);
    }
    setModalContent({
      title: '',
      subTitle: '',
      body: null,
      handleCloseModal: () => {},
    });
  };

  const closeModalWithoutData = () => {
    setIsOpen(false);
    setModalContent({
      title: '',
      subTitle: '',
      body: null,
      handleCloseModal: () => {},
    });
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-[101] overflow-y-auto" onClose={closeModal}>
          <div className="flex items-center justify-center align-center min-h-screen px-4 pt-4 pb-20 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                onClick={closeModalWithoutData}
                className="fixed inset-0 bg-black opacity-30"
              />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[90vw]">
                <img
                  alt="close"
                  src="/images/ic_modal_close.png"
                  width={50}
                  height={50}
                  className="cursor-pointer absolute -top-4 -right-4"
                  onClick={closeModalWithoutData}
                  onMouseOver={e => {
                    e.currentTarget.src = '/images/ic_modal_close_hover.png';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.src = '/images/ic_modal_close.png';
                  }}
                />
                <div className="bg-tremor-background-muted px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-start justify-between align-center">
                    {modalContent.title != '' && (
                      <Flex justifyContent="start" className="gap-2 mb-2">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {modalContent.title}
                        </Dialog.Title>
                        {modalContent?.subTitle != '' && <VerticalDivider height={20} />}
                        <Dialog.Description className={'self-end'}>
                          <Text>{modalContent.subTitle}</Text>
                        </Dialog.Description>
                      </Flex>
                    )}
                  </div>
                  <div className="mt-3">{modalContent.body}</div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </ModalContext.Provider>
  );
};
