import styles from './Button.module.css';

function Button({
  className = '',
  appearance = 'primary',
  children,
  as: AsComponent,
  ...rest
}) {
  if (AsComponent) {
    return (
      <AsComponent
        className={`${styles.Button} ${styles[appearance]} ${className}`}
        {...rest}
      >
        {children}
      </AsComponent>
    );
  }

  return (
    <button
      className={`${styles.Button} ${styles[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
