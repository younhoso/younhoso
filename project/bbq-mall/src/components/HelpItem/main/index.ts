import HelpItemMobile from './mobile/HelpItemMobile';
import _HelpItem from './pc/HelpItem';

type HelpItemP = typeof _HelpItem;

interface HelpItemType extends HelpItemP {
  Mobile: typeof HelpItemMobile;
}

const HelpItem = _HelpItem as HelpItemType;

HelpItem.Mobile = HelpItemMobile;

export default HelpItem;
