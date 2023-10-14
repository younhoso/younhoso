import styles from './Container.module.css';

export default function Container({ className = '', page = false, children }) {
  const classNames = `${styles.container} ${
    page ? styles.page : ''
  } ${className}`;
  return <div className={classNames}>{children}</div>;
}
