import styles from './Label.module.css';

function Label({ className = '', children, ...rest }) {
  return (
    <label className={`${styles.Label} ${className}`} {...rest}>
      {children}
    </label>
  );
};

export default Label;
