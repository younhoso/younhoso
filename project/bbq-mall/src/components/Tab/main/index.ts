import TabMobile from './mobile/TabMobile';
import _Tab from './pc/Tab';

type TabP = typeof _Tab;

interface TabType extends TabP {
  Mobile: typeof TabMobile;
}

const Tab = _Tab as TabType;

Tab.Mobile = TabMobile;

export default Tab;
