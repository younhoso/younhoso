import { atom } from 'recoil';

import { ConfirmModalProps } from '@/components/ConfirmModal/main/pc/ConfirmModal';

export const confirmModalOpenStore = atom<ConfirmModalProps>({
  key: 'confirmModalOpen',
  default: {
    open: false,
    content: '',
    onOk: undefined,
    onCancel: undefined,
    onOkText: undefined,
    onCancelText: undefined,
  },
});
