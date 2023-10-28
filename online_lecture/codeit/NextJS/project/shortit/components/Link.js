import styles from './Link.module.css';
import BaseLink from 'next/link';

const VARIANTS = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export default function Link({
  className = '',
  variant,
  as: AsComponent,
  ...rest
}) {
  const classNames = `${styles.link} ${VARIANTS[variant] ?? ''} ${className}`;

  if (AsComponent) {
    return <AsComponent className={classNames} {...rest} />;
  }

  return <BaseLink className={classNames} {...rest} />;
}
