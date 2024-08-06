import { Dialog } from '@headlessui/react';
import React from 'react';

interface CustomCardProps {
  onClose: () => void;
  isOpen: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
}

const CustomModal = (props: CustomCardProps) => {
  const { title, children, onClose, isOpen } = props;
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <Dialog.Title>{title}</Dialog.Title>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CustomModal;
