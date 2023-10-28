import styles from './Card.module.css';

function Card({ className, ...rest }) {
  return <div className={`${className} ${styles.card}`} {...rest} />;
}

function CardFooter({ className, ...rest }) {
  return <div className={`${className} ${styles.cardFooter}`} {...rest} />;
}

Card.Footer = CardFooter;

export default Card;
