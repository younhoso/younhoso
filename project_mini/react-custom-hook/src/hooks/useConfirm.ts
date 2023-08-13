const useConfirm = (
  message: string = '',
  onConfirm: () => void,
  onCancel: () => void
) => {
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};

export default useConfirm;
