import React, { createContext, useContext, useState } from 'react';
import checkImage from '../assets/check.svg';
import useIsMounted from '../hooks/useIsMounted';
import styles from './ToasterProvider.module.css';

const ICONS = {
  info: checkImage,
  warn: null,
};

function Toast({ type, message, onClick }) {
  const isMounted = useIsMounted(100);
  const icon = ICONS[type];
  const className = `${styles.Toast} ${styles[type]} ${
    isMounted ? styles.mounted : ''
  }`;

  return (
    <div className={className} onClick={onClick}>
      {icon && <img className={styles.Icon} src={icon} alt={type} />}
      {message}
    </div>
  );
}

const ToasterContext = createContext();

function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast(type, message) {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
    return newToast;
  }

  function removeToast(id) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  function toaster(type, message) {
    const newToast = addToast(type, message);
    setTimeout(() => removeToast(newToast.id), 2000);
  }

  return (
    <ToasterContext.Provider value={{ toaster }}>
      {children}
      <div className={styles.ToastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

export function useToaster() {
  const { toaster } = useContext(ToasterContext);
  if (!toaster) {
    throw new Error('ToastContext 안에서만 사용할 수 있습니다.');
  }
  return toaster;
}

export default ToasterProvider;
