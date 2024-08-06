import MyItemMobile from './mobile/MyItemMobile';
import _MyItem from './pc/MyItem';

type MyItemP = typeof _MyItem;

interface MyItemType extends MyItemP {
  Mobile: typeof MyItemMobile;
}

const MyItem = _MyItem as MyItemType;

MyItem.Mobile = MyItemMobile;

export default MyItem;
