import Options from '@/components/options';
import { useProductOptionStateContext } from '@/context/useProductOptionStateContext';
import { getCustomMultiLevelOptions } from '@/lib/getOptions';

export default function Home() {
  const { originOption, selected, selectOptionNo, handleChange } = useProductOptionStateContext();
  const multiLevelOptions = getCustomMultiLevelOptions(originOption.multiLevelOptions);

  return (
    <>
      <Options multiLevelOptions={multiLevelOptions} selected={selected} selectOptionNo={selectOptionNo} handleChange={handleChange}/>
    </>
  )
}
