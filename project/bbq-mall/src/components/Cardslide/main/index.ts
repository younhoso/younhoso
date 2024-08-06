import CardslideMobile from './mobile/CardslideMobile';
import _Cardslide from './pc/Cardslide';

type CardslideP = typeof _Cardslide;

interface CardslideType extends CardslideP {
  Mobile: typeof CardslideMobile;
}

const Cardslide = _Cardslide as CardslideType;

Cardslide.Mobile = CardslideMobile;

export default Cardslide;
