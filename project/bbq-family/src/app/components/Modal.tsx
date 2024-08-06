'use client';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Flex, Text } from '@tremor/react';
import { Fragment, ReactNode, createContext, useContext, useState } from 'react';

import Image from 'next/image';

import CustomButton from './CustomButton';

interface ModalContextProps {
  isOpen: boolean;
  openModal: (title: string, body: React.ReactNode, onConfirm?: () => void) => void;
  closeModal: () => void;
  onConfirm?: () => void;
  modalStyle?: string;
}

const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  onConfirm: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    body: React.ReactNode;
    onConfirm?: () => void;
  }>({
    title: '',
    body: null,
    onConfirm: () => {},
  });

  const openModal = (title: string, body: React.ReactNode, onConfirm?: () => void) => {
    setIsOpen(true);
    setModalContent({ title, body, onConfirm });
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent({ title: '', body: null });
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
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
              <div className="inline-block align-bottom bg-white rounded-xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[90vw] min-w-[300px]">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-start justify-between align-center">
                    {modalContent.title != '' && (
                      <Flex justifyContent="center" className="gap-2 mb-2 border-b pb-3">
                        <Dialog.Title
                          as="h3"
                          className="text-md font-medium leading-6 text-gray-900"
                        >
                          {modalContent.title}
                        </Dialog.Title>
                        <img
                          alt="close"
                          src="/images/ic_modal_close.png"
                          width={28}
                          height={28}
                          className="cursor-pointer absolute right-[15px]"
                          onClick={closeModal}
                          onMouseOver={e => {
                            e.currentTarget.src = '/images/ic_modal_close.png';
                          }}
                          onMouseOut={e => {
                            e.currentTarget.src = '/images/ic_modal_close.png';
                          }}
                        />
                      </Flex>
                    )}
                  </div>
                  <div className="mt-3 text-center">{modalContent.body}</div>
                  <Flex className="gap-3 mt-5">
                    <CustomButton type={'secondary'} className="flex-1" onClick={closeModal}>
                      취소
                    </CustomButton>
                    <CustomButton
                      type={'primary'}
                      className="flex-1"
                      onClick={() => {
                        if (modalContent.onConfirm) {
                          modalContent.onConfirm();
                        }
                        closeModal();
                      }}
                    >
                      확인
                    </CustomButton>
                  </Flex>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </ModalContext.Provider>
  );
};
