function Card({ className = "", ...rest }) {
  return <div className={`${className}`} {...rest} />;
}

function CardFooter({ className = "", ...rest }) {
  return <div className={`${className}`} {...rest} />;
}

Card.Footer = CardFooter;

export default Card;
