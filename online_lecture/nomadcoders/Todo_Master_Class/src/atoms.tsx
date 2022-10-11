import { atom, selector } from 'recoil';

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE"
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO
})

const localStorageEffect = (key: string) => ({setSelf, onSet}: any) => {
  const savedValue = localStorage.getItem(key);
  // setSelf => 원자 값을 설정하거나 재설정하기 위한 콜백.
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  // onSet => 원자 값의 변경 사항을 구독합니다.
  onSet((newValue: any, _: any, isReset: boolean) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [localStorageEffect('toDo')],
});

export const toDoSelector = selector({ //selector가 toDos랑 category를 받아서 맞는 category에 따라서 toDo를 분류해줍니다.
  key: "toDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  }
});