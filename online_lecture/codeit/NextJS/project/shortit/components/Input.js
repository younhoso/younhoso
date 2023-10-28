import { forwardRef } from 'react';
import styles from './Input.module.css';

export default forwardRef(function Input(
  { className = '', variant, ...rest },
  ref
) {
  const classNames = `${styles.input} ${className}`;
  return <input className={classNames} {...rest} ref={ref} />;
});
