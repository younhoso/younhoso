import MainProductCardMobile from './mobile/MainProductCardMobile';
import _MainProductCard from './pc/MainProductCard';

type MainProductCardP = typeof _MainProductCard;

interface MainProductCardType extends MainProductCardP {
  Mobile: typeof MainProductCardMobile;
}

const MainProductCard = _MainProductCard as MainProductCardType;

MainProductCard.Mobile = MainProductCardMobile;

export default MainProductCard;
