import CardMobile from './mobile/CardMobile';
import _Card from './pc/Card';

type CardP = typeof _Card;

interface CardType extends CardP {
  Mobile: typeof CardMobile;
}

const Card = _Card as CardType;

Card.Mobile = CardMobile;

export default Card;
