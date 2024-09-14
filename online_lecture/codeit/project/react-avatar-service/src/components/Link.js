import styles from './Link.module.css';
import { Link as BaseLink } from 'react-router-dom';

function Link({ className = '', appearance = 'primary', children, ...rest }) {
  return (
    <BaseLink
      className={`${styles.Link} ${styles[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </BaseLink>
  );
}

export default Link;
