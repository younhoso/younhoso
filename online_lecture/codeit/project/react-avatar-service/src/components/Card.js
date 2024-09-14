import styles from './Card.module.css';

function Card({ className = '', children, onClick }) {
  return (
    <div className={`${styles.Card} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
