'use client';

import DaumPostcodeEmbed from 'react-daum-postcode';

import { useRouter } from 'next/navigation';

import {
  DaumBody,
  handleDaumPostComplete,
} from '@/components/AddressAddModal/main/pc/AddressAddModal';
import { theme } from '@/provider/CustomThemeProvider';
import { MobileMyAddressSearchPageStyled } from '@/styles/pageStyled/mobile/mobileMyAddressSearchPageStyled';
import { getObjectBeParams } from '@/utils/getObjectBeParams';

const MobileMyAddressSearch = () => {
  const router = useRouter();

  const handleComplete = (data: DaumBody) => {
    const res = handleDaumPostComplete(data);
    const toUrlString = getObjectBeParams(res, true);
    router.push('/my/address/edit/add' + toUrlString);
  };

  return (
    <MobileMyAddressSearchPageStyled>
      <DaumPostcodeEmbed
        style={{ width: '100%', height: `calc(100vh - ${theme.sizes.mobileHeaderHeight} - 10px)` }}
        onComplete={handleComplete}
        autoClose={false}
      />
    </MobileMyAddressSearchPageStyled>
  );
};

export default MobileMyAddressSearch;
