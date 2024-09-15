import styles from './Avatar.module.css';
import defaultAvatarImage from '../assets/default-avatar.svg';

function Avatar({ className, size = 'medium', src, alt, ...props }) {
  return (
    <img
      className={`${styles.Avatar} ${styles[size]} ${className}`}
      src={src || defaultAvatarImage}
      alt={alt}
      {...props}
    />
  );
}

export default Avatar;
