import { FC, useCallback, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

import { Box, Flex, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_12, FONTSIZE_14, PLANCK } from '@/constants';

export interface AddressSearchFormProps {
  handleSubmit: ({
    address,
    roadAddress,
    detailAddress,
  }: {
    address: string;
    roadAddress: string;
    detailAddress: string;
  }) => void;
}

export interface AddressSearchFormComponentProps extends AddressSearchFormProps {}

export const AddressSearchForm: FC<AddressSearchFormComponentProps> = ({ handleSubmit }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [roadAddress, setRoadAddress] = useState<string | undefined>(undefined);
  const [detailAddress, setDetailAddress] = useState<string>('');

  const onDeatilAddressChange = useCallback((value: string) => {
    setDetailAddress(value);
  }, []);

  const onAddressSelected = useCallback((data: any) => {
    setAddress(
      data.jibunAddress && data.jibunAddress.length ? data.jibunAddress : data.autoJibunAddress,
    );
    setRoadAddress(data.roadAddress);
  }, []);

  const handleSubmitButtonClick = useCallback(() => {
    handleSubmit({
      address: address ?? '',
      roadAddress: roadAddress ?? '',
      detailAddress,
    });
  }, [address, roadAddress, detailAddress]);

  return (
    <div>
      {!address ? (
        <Box>
          <DaumPostcodeEmbed onComplete={onAddressSelected} style={{ minHeight: 450 }} />
          <Space.H3 />
        </Box>
      ) : null}
      {address ? (
        <Box>
          <Text size={22}>{roadAddress ?? address}</Text>
          {roadAddress ? (
            <>
              <Space.H3 />
              <Flex.RSC>
                <Box background="#e1e7eb" padding={PLANCK * 1.5} shape={'round'}>
                  <Text size={FONTSIZE_12} color={'#777777'}>
                    지번
                  </Text>
                </Box>
                <Space.V2 />
                <Text size={FONTSIZE_14} color={'#777777'}>
                  {address}
                </Text>
              </Flex.RSC>
            </>
          ) : null}
          <Space.H4 />
          <Input
            value={detailAddress}
            placeholder="상세주소를 입력해주세요."
            onChange={e => {
              onDeatilAddressChange(e.target.value);
            }}
          />
          <Space.H6 />
          <Button
            disabled={!address || !roadAddress || !detailAddress}
            full
            color={'red'}
            shape={'round'}
            text="입력 완료"
            onClick={() => handleSubmitButtonClick()}
          />
        </Box>
      ) : null}
    </div>
  );
};
