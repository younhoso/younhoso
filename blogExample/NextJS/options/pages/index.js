import Options from '@/components/options';
import { useProductOptionStateContext } from '@/context/useProductOptionStateContext';
import { getCustomMultiLevelOptions } from '@/lib/getOptions';

export default function Home() {
  const { selectorOptions, originOption } = useProductOptionStateContext();
  const uniqueLabels = getCustomMultiLevelOptions(originOption.multiLevelOptions);
  
  return (
    <>
      <Options combinedObjects={uniqueLabels}  />
    </>
  )
}
