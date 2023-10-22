import { useEffect, useState } from 'react';
import Options from '@/components/options';
import { useProductOptionStateContext } from '@/context/useProductOptionStateContext';
import { getCustomFlatOptions, getCustomMultiLevelOptions } from '@/lib/getOptions';

export default function Home() {
  const [selectOptionNo, setSelectOptionNo] = useState(0);
  const { originOption, selected, handleChange } = useProductOptionStateContext();
  const multiLevelOptions = getCustomMultiLevelOptions(originOption.multiLevelOptions);

  useEffect(() => {
    const combinedString = Object.values(selected).join('|');
    const optionNo = getCustomFlatOptions(originOption.flatOptions, combinedString);
    if(optionNo){
      setSelectOptionNo(optionNo)
    }

  }, [selected]);

  return (
    <>
      <Options multiLevelOptions={multiLevelOptions} selected={selected} selectOptionNo={selectOptionNo} handleChange={handleChange}/>
    </>
  )
}
