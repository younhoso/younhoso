import { useEffect, useState } from 'react';

export interface CheckboxListProps {
  disabled?: boolean;
  label?: string;
  value: unknown;
}

export const useHandleCheckbox = (
  checkboxList: (any & Pick<CheckboxListProps, 'value'>)[],
  defaultCheckAll?: boolean,
  isLoading?: boolean,
) => {
  const defaultChecked = defaultCheckAll ? checkboxList.map(v => v.value) : [];
  const [indeterminate, setIndeterminate] = useState(defaultCheckAll ?? false);
  const [checkAll, setCheckAll] = useState(defaultCheckAll ?? false);
  const [checkedList, setCheckedList] = useState<unknown[]>(defaultChecked);

  const onChangeCheckbox = (value: unknown) => {
    const array = checkedList.includes(value)
      ? checkedList.filter(v => v !== value)
      : [...checkedList, value];
    setCheckedList(array);
    setCheckAll(array.length === checkboxList.length);
    setIndeterminate(!!array.length && array.length !== checkboxList.length);
  };

  const onClickCheckAll = () => {
    setCheckAll(!checkAll);
    setIndeterminate(false);
    setCheckedList(checkAll ? [] : checkboxList.map(v => v.value));
  };

  const refetch = (deletedList: unknown[]) => {
    setCheckedList(checkedList.filter(v => !deletedList.includes(v)));
  };

  useEffect(() => {
    if (!isLoading) {
      setCheckedList(defaultChecked);
    }
  }, [isLoading]);

  return {
    indeterminate,
    checkAll,
    onClickCheckAll,
    onChangeCheckbox,
    checkedList,
    refetch,
  };
};
