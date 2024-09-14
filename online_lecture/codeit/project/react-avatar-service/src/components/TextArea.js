import styles from './TextArea.module.css';

function TextArea({ className = '', children, ...rest }) {
  return (
    <textarea className={`${styles.TextArea} ${className}`} {...rest}>
      {children}
    </textarea>
  );
}

export default TextArea;
