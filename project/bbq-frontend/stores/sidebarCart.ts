import { atom } from 'recoil';

import { Menu, MenuSubOption } from '@/types';
import { copyDeep, getLocalStorageItem } from '@/utils';

import { useRecoilStateWithLocalStorage } from './utils';

const KEY = `sidebarCartState`; //`sidebarCartState/${v1()}`,

const defaultValue = {
  items: [],
};

type Data = {
  items: {
    quantity: number;
    menu: Menu;
    options: MenuSubOption[];
    selectedOptionItemIds: number[];
  }[];
};

export const sidebarCartState = atom<Data>({
  key: KEY,
  default: getLocalStorageItem(KEY) ?? defaultValue,
});

export const useSidebarCart = () => {
  const [data, setData] = useRecoilStateWithLocalStorage(sidebarCartState);

  const reset = () => {
    setData(defaultValue);
  };

  const addItem = (data: {
    quantity: number;
    menu: Menu;
    options: MenuSubOption[];
    selectedOptionItemIds: number[];
  }) => {
    setData(prev => copyDeep(Object.assign({}, prev, { items: [...prev.items, data] })));
  };

  const removeItem = ({ index }: { index: number }) => {
    setData(prev =>
      copyDeep(
        Object.assign({}, prev, {
          items: prev.items.filter((_, _index) => {
            return _index !== index;
          }),
        }),
      ),
    );
  };

  const changeQuantity = ({ index, quantity }: { index: number; quantity: number }) => {
    setData(prev =>
      copyDeep(
        Object.assign({}, prev, {
          items: prev.items.map((item, _index) => {
            if (_index === index) {
              return copyDeep(Object.assign({}, item, { quantity }));
            } else {
              return item;
            }
          }),
        }),
      ),
    );
  };

  return {
    data,
    reset,
    addItem,
    removeItem,
    changeQuantity,
  };
};
