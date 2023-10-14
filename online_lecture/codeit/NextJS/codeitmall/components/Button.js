import styles from './Button.module.css';

export default function Button({ className = '', as, ...props }) {
  return <button className={`${styles.button} ${className}`} {...props} />;
}
