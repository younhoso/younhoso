'use clinet';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button, Divider, Flex, Select, SelectItem, Text, TextInput, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

import { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import CustomNumberInput from '@/app/components/CustomNumberInput';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';

export interface FamilyRegisterCondition {
  familyName: string;
  ownerName: string;
  address: string;
  tel: string;
  phoneNumber: string;
  defaultDeliveryFee: string;
  isOnlineOrderAvailable: string;
  isUseDanalPayment: string;
  isUsePaycoPayment: string;
  isUsePayCoinPayment: string;
  isUseKakaoPayment: string;
  isUseNaverPayment: string;
  isUseTossPayment: string;
  isUseUbPayment: string;
  isUseSgPayment: string;
  danalPayment: DanalPayment;
  paycoPayment: PaycoPayment;
  payCoinPayment: Payment;
  naverPayment: Payment;
  kakaoPayment: Payment;
  tossPayment: TossPayment;
  sgPayment: SgPayment;
  ubPayment: Payment;
  deliveryFeeByAddresses: DeliveryFeeByAddresses[] | [];
}

export interface DeliveryFeeByAddresses {
  legalDongId: string;
  legalDongName: string;
  administrativeDongId: string;
  administrativeDongName: string;
  additionalDeliveryFee: string;
}

export interface DanalPayment {
  cpId: string;
  scpId: string;
}

export interface Payment {
  cpId: string;
}

export interface PaycoPayment {
  sellerKey: string;
  cpId: string;
  itemCd: string;
}

export interface SgPayment {
  merchantKey: string;
}

export interface TossPayment {
  clientKey: string;
  secretKey: string;
}

export default function FamilyRegister({ branchId }: { branchId: string }) {
  const { openModal, closeModal } = useModalContext();
  const initalDeliveryFeebyAddresses = {
    disabled: false,
    cityName: [],
    stateName: [],
    dongName: [],
    additionalDeliveryFee: '',
    selectedCityName: '',
    selectedStateName: '',
    selectedAdministrativeDongId: '',
    selectedAdministrativeDongName: '',
    selectedDongId: '',
    selectedDongName: '',
  };
  const [tempDeliveryFeeByAddresses, setTempDeliveryFeeByAddresses] = useState<
    {
      disabled: boolean;
      stateName: {
        stateName: string;
      }[];
      cityName: {
        cityName: string;
        stateName: string;
      }[];
      dongName: {
        administrativeDongId: string;
        administrativeDongName: string;
        legalDongId: string;
        legalDongName: string;
      }[];
      additionalDeliveryFee: string;
      selectedCityName: string | any;
      selectedStateName: string | any;
      selectedAdministrativeDongId: string | any;
      selectedAdministrativeDongName: string | any;
      selectedDongId: string | any;
      selectedDongName: string | any;
    }[]
  >([initalDeliveryFeebyAddresses]);
  const [addressMode, setAddressMode] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<FamilyRegisterCondition>({
    familyName: '',
    ownerName: '',
    address: '',
    tel: '',
    phoneNumber: '',
    defaultDeliveryFee: '',
    isOnlineOrderAvailable: 'Y',
    isUseDanalPayment: 'Y',
    isUsePaycoPayment: 'Y',
    isUsePayCoinPayment: 'Y',
    isUseKakaoPayment: 'Y',
    isUseNaverPayment: 'Y',
    isUseTossPayment: 'Y',
    isUseUbPayment: 'Y',
    isUseSgPayment: 'Y',
    danalPayment: {
      cpId: '',
      scpId: '',
    },
    paycoPayment: {
      sellerKey: '',
      cpId: '',
      itemCd: '',
    },
    payCoinPayment: {
      cpId: '',
    },
    naverPayment: {
      cpId: '',
    },
    kakaoPayment: {
      cpId: '',
    },
    tossPayment: {
      clientKey: '',
      secretKey: '',
    },
    sgPayment: {
      merchantKey: '',
    },
    ubPayment: {
      cpId: '',
    },
    deliveryFeeByAddresses: [
      {
        additionalDeliveryFee: '',
        administrativeDongId: '',
        administrativeDongName: '',
        legalDongId: '',
        legalDongName: '',
      },
    ],
  });

  const handleValueChange = (
    key: keyof FamilyRegisterCondition,
    value: string | object | number[],
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const handleAddressChange = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    handleValueChange('address', fullAddress);
    setAddressMode(false);
  };

  const submitData = async () => {
    try {
      const result = await getAxios().patch('/api/family/' + branchId, {
        familyName: selectedValue.familyName,
        ownerName: selectedValue.ownerName,
        address: selectedValue.address,
        tel: selectedValue.tel,
        phoneNumber: selectedValue.phoneNumber,
        defaultDeliveryFee: parseInt(selectedValue.defaultDeliveryFee),
        isOnlineOrderAvailable: selectedValue.isOnlineOrderAvailable === 'Y',
        isUseDanalPayment: selectedValue.isUseDanalPayment === 'Y',
        isUsePaycoPayment: selectedValue.isUsePaycoPayment === 'Y',
        isUsePayCoinPayment: selectedValue.isUsePayCoinPayment === 'Y',
        isUseKakaoPayment: selectedValue.isUseKakaoPayment === 'Y',
        isUseNaverPayment: selectedValue.isUseNaverPayment === 'Y',
        isUseTossPayment: selectedValue.isUseTossPayment === 'Y',
        isUseUbPayment: selectedValue.isUseUbPayment === 'Y',
        isUseSgPayment: selectedValue.isUseSgPayment === 'Y',
        danalPayment: {
          cpId: selectedValue.danalPayment.cpId,
          scpId: selectedValue.danalPayment.scpId,
        },
        paycoPayment: {
          sellerKey: selectedValue.paycoPayment.sellerKey,
          cpId: selectedValue.paycoPayment.cpId,
          itemCd: selectedValue.paycoPayment.itemCd,
        },
        payCoinPayment: {
          cpId: selectedValue.payCoinPayment.cpId,
        },
        naverPayment: {
          cpId: selectedValue.naverPayment.cpId,
        },
        kakaoPayment: {
          cpId: selectedValue.kakaoPayment.cpId,
        },
        tossPayment: {
          clientKey: selectedValue.tossPayment.clientKey,
          secretKey: selectedValue.tossPayment.secretKey,
        },
        sgPayment: {
          merchantKey: selectedValue.sgPayment.merchantKey,
        },
        ubPayment: {
          cpId: selectedValue.ubPayment.cpId,
        },
        deliveryFeeByAddresses: tempDeliveryFeeByAddresses
          .map(data => {
            if (
              data.additionalDeliveryFee != null &&
              data.selectedAdministrativeDongId != '' &&
              data.selectedAdministrativeDongName != '' &&
              data.selectedDongId != '' &&
              data.selectedDongName != ''
            ) {
              return {
                additionalDeliveryFee: parseInt(data.additionalDeliveryFee),
                administrativeDongId: data.selectedAdministrativeDongId,
                administrativeDongName: data.selectedAdministrativeDongName,
                legalDongId: data.selectedDongId,
                legalDongName: data.selectedDongName,
              };
            }
          })
          .filter(data => data != null),
      });
      if (result.status === 200) {
        alert('저장되었습니다.');
        closeModal();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const getAddressState = async (index: number) => {
    const result = await getAxios().get('/api/family/address/state');
    setTempDeliveryFeeByAddresses(prevTemp => {
      const newTemp = [...prevTemp];
      newTemp[index] = { ...newTemp[index], stateName: result.data };
      return newTemp;
    });
  };

  const getAddressCity = async (index: number, stateName: string) => {
    const result = await getAxios().get('/api/family/address/city?stateName=' + stateName);
    setTempDeliveryFeeByAddresses(prevTemp => {
      const newTemp = [...prevTemp];
      newTemp[index] = { ...newTemp[index], cityName: result.data };
      return newTemp;
    });
  };

  const getAddressDong = async (index: number, stateName: string, cityName: string) => {
    const result = await getAxios().get(
      `/api/family/address/dong?stateName=${stateName}&cityName=${cityName}`,
    );
    setTempDeliveryFeeByAddresses(prevTemp => {
      const newTemp = [...prevTemp];
      newTemp[index] = { ...newTemp[index], dongName: result.data };
      return newTemp;
    });
  };

  const getFamilyDetailData = async () => {
    try {
      const result = await getAxios().get('/api/family/' + branchId);
      setSelectedValue({
        familyName: result.data.familyName,
        ownerName: result.data.ownerName,
        address: result.data.address,
        tel: result.data.tel,
        phoneNumber: result.data.phoneNumber,
        defaultDeliveryFee: result.data.defaultDeliveryFee.toString(),
        isOnlineOrderAvailable: result.data.isOnlineOrderAvailable ? 'Y' : 'N',
        isUseDanalPayment: result.data.isUseDanalPayment ? 'Y' : 'N',
        isUsePaycoPayment: result.data.isUsePaycoPayment ? 'Y' : 'N',
        isUsePayCoinPayment: result.data.isUsePayCoinPayment ? 'Y' : 'N',
        isUseKakaoPayment: result.data.isUseKakaoPayment ? 'Y' : 'N',
        isUseNaverPayment: result.data.isUseNaverPayment ? 'Y' : 'N',
        isUseTossPayment: result.data.isUseTossPayment ? 'Y' : 'N',
        isUseUbPayment: result.data.isUseUbPayment ? 'Y' : 'N',
        isUseSgPayment: result.data.isUseSgPayment ? 'Y' : 'N',
        danalPayment: {
          cpId: result.data.danalPayment.cpId,
          scpId: result.data.danalPayment.scpId,
        },
        paycoPayment: {
          sellerKey: result.data.paycoPayment.sellerKey,
          cpId: result.data.paycoPayment.cpId,
          itemCd: result.data.paycoPayment.itemCd,
        },
        payCoinPayment: {
          cpId: result.data.payCoinPayment.cpId,
        },
        naverPayment: {
          cpId: result.data.naverPayment.cpId,
        },
        kakaoPayment: {
          cpId: result.data.kakaoPayment.cpId,
        },
        tossPayment: {
          clientKey: result.data.tossPayment.clientKey,
          secretKey: result.data.tossPayment.secretKey,
        },
        sgPayment: {
          merchantKey: result.data.sgPayment.merchantKey,
        },
        ubPayment: {
          cpId: result.data.ubPayment.cpId,
        },
        deliveryFeeByAddresses: result.data.deliveryFeeByAddresses,
      });
      if (result.data.deliveryFeeByAddresses.length > 0) {
        setTempDeliveryFeeByAddresses(
          result.data.deliveryFeeByAddresses.map((data: any) => {
            return {
              ...initalDeliveryFeebyAddresses,
              additionalDeliveryFee: data.additionalDeliveryFee.toString(),
              selectedAdministrativeDongId: data.administrativeDongId,
              selectedAdministrativeDongName: data.administrativeDongName,
              selectedDongId: data.legalDongId,
              selectedDongName: data.legalDongName,
              dongName: [
                {
                  administrativeDongId: data.administrativeDongId,
                  administrativeDongName: data.administrativeDongName,
                  legalDongId: data.legalDongId,
                  legalDongName: data.legalDongName,
                },
              ],
              disabled: true,
            };
          }),
        );
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getAddressState(0);
  }, []);

  useEffect(() => {
    getFamilyDetailData();
  }, []);

  if (addressMode) {
    return (
      <div className="w-[30vw]">
        <DaumPostcodeEmbed autoClose={false} onComplete={handleAddressChange} />
      </div>
    );
  }

  return (
    <div className="w-auto">
      <TextInput
        className="w-full"
        placeholder="패밀리명"
        value={selectedValue.familyName}
        onChange={e => handleValueChange('familyName', e.target.value)}
      />
      <Flex className="gap-5 mt-2">
        <TextInput
          className="w-full"
          placeholder="점주명"
          value={selectedValue.ownerName}
          onChange={e => handleValueChange('ownerName', e.target.value)}
        />
        <TextInput
          className="w-full"
          placeholder="매장 연락처"
          value={selectedValue.tel}
          onChange={e => handleValueChange('tel', e.target.value)}
        />
      </Flex>
      <Flex className="gap-5 mt-2">
        <TextInput
          className="w-full"
          placeholder="점주 연락처"
          value={selectedValue.phoneNumber}
          onChange={e => handleValueChange('phoneNumber', e.target.value)}
        />
      </Flex>
      <Flex className="gap-5 mt-2">
        <TextInput
          className="w-3/4"
          placeholder="주소"
          onChange={e => handleValueChange('address', e.target.value)}
          value={selectedValue.address}
        />
        <Button className="w-1/4" onClick={() => setAddressMode(true)}>
          주소 찾기
        </Button>
      </Flex>

      <Flex justifyContent="start" className="mt-5 border-t pt-3">
        <Title className="mb-1 w-[100px]">배달료 설정</Title>
        <Flex justifyContent="start">
          <TextInput
            value={selectedValue.defaultDeliveryFee}
            onChange={e => handleValueChange('defaultDeliveryFee', e.target.value)}
            className="ml-10 w-[300px]"
            placeholder="배달료 직접 입력"
          />
        </Flex>
      </Flex>
      <Flex justifyContent="start" className="mt-3 border-b py-3">
        <Title className="mb-1 w-[100px] self-start">추가 배달료</Title>
        <Flex flexDirection="col" alignItems="start" className="ml-12 gap-3">
          {tempDeliveryFeeByAddresses.map((_, index) => {
            return (
              <Flex justifyContent="start" className="gap-3" key={index}>
                <Select
                  disabled={tempDeliveryFeeByAddresses[index].disabled}
                  className="w-[100px]"
                  placeholder="-"
                  value={tempDeliveryFeeByAddresses[index].selectedStateName}
                  onChange={value => {
                    setTempDeliveryFeeByAddresses(prevTemp => {
                      const newTemp = [...prevTemp];
                      newTemp[index] = {
                        ...newTemp[index],
                        selectedStateName: value,
                        selectedCityName: '',
                        selectedDongName: '',
                        selectedDongId: '',
                        selectedAdministrativeDongId: '',
                        selectedAdministrativeDongName: '',
                        cityName: [],
                        dongName: [],
                      };
                      return newTemp;
                    });
                    getAddressCity(index, value.toString());
                  }}
                >
                  {tempDeliveryFeeByAddresses[index].stateName.map(data => {
                    return (
                      <SelectItem value={data.stateName} key={data.stateName}>
                        {data.stateName}
                      </SelectItem>
                    );
                  })}
                </Select>

                <Select
                  disabled={tempDeliveryFeeByAddresses[index].disabled}
                  className="w-[150px]"
                  placeholder="-"
                  value={tempDeliveryFeeByAddresses[index].selectedCityName}
                  onChange={value => {
                    setTempDeliveryFeeByAddresses(prevTemp => {
                      const newTemp = [...prevTemp];
                      newTemp[index] = {
                        ...newTemp[index],
                        selectedCityName: value,
                        selectedDongName: '',
                        selectedDongId: '',
                        selectedAdministrativeDongId: '',
                        selectedAdministrativeDongName: '',
                        dongName: [],
                      };
                      return newTemp;
                    });
                    getAddressDong(
                      index,
                      tempDeliveryFeeByAddresses[index].selectedStateName,
                      value.toString(),
                    );
                  }}
                >
                  {tempDeliveryFeeByAddresses[index].cityName.map(data => {
                    return (
                      <SelectItem value={data.cityName} key={data.cityName}>
                        {data.cityName}
                      </SelectItem>
                    );
                  })}
                </Select>

                <Select
                  disabled={tempDeliveryFeeByAddresses[index].disabled}
                  className="w-[230px]"
                  placeholder="-"
                  value={`${tempDeliveryFeeByAddresses[index].selectedAdministrativeDongId}|${tempDeliveryFeeByAddresses[index].selectedAdministrativeDongName}|${tempDeliveryFeeByAddresses[index].selectedDongId}|${tempDeliveryFeeByAddresses[index].selectedDongName}`}
                  onChange={value => {
                    setTempDeliveryFeeByAddresses(prevTemp => {
                      const newTemp = [...prevTemp];
                      newTemp[index] = {
                        ...newTemp[index],
                        selectedAdministrativeDongId: value.toString().split('|')[0],
                        selectedAdministrativeDongName: value.toString().split('|')[1],
                        selectedDongId: value.toString().split('|')[2],
                        selectedDongName: value.toString().split('|')[3],
                      };
                      return newTemp;
                    });
                  }}
                >
                  {tempDeliveryFeeByAddresses[index].dongName.map(data => {
                    return (
                      <SelectItem
                        key={`${data.administrativeDongId}|${data.administrativeDongName}|${data.legalDongId}|${data.legalDongName}`}
                        value={`${data.administrativeDongId}|${data.administrativeDongName}|${data.legalDongId}|${data.legalDongName}`}
                      >
                        {data.legalDongName}
                        {data.administrativeDongName ? `(${data.administrativeDongName})` : ''}
                      </SelectItem>
                    );
                  })}
                </Select>
                <Flex justifyContent="start" className="w-auto">
                  <CustomNumberInput
                    className="w-[150px] !rounded-r-none !border-r-0"
                    placeholder="추가 금액"
                    value={tempDeliveryFeeByAddresses[index].additionalDeliveryFee}
                    onChange={e => {
                      setTempDeliveryFeeByAddresses(prevTemp => {
                        const newTemp = [...prevTemp];
                        newTemp[index] = {
                          ...newTemp[index],
                          additionalDeliveryFee: e.target.value,
                        };

                        return newTemp;
                      });
                    }}
                  />
                  <Text className="rounded-r border p-2 px-3">원</Text>
                </Flex>
                <CustomButton
                  onClick={() => {
                    setTempDeliveryFeeByAddresses(prevTemp => {
                      const newTemp = [...prevTemp];
                      newTemp.splice(index, 1);
                      return newTemp;
                    });
                  }}
                  type={'tertiary'}
                >
                  <MinusIcon width={18} height={18} />
                </CustomButton>
              </Flex>
            );
          })}

          <CustomButton
            type={'tertiary'}
            onClick={() => {
              setTempDeliveryFeeByAddresses(prevTemp => {
                const newTemp = [...prevTemp];
                newTemp.push(initalDeliveryFeebyAddresses);
                return newTemp;
              });
              getAddressState(tempDeliveryFeeByAddresses.length);
            }}
          >
            <PlusIcon width={18} height={18} />
          </CustomButton>
        </Flex>
      </Flex>

      <Flex className="mt-5 gap-3" flexDirection="col">
        <Flex justifyContent="start" className="gap-10  border-b pb-3">
          <Title className="w-[100px] self-start">온라인 주문</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isOnlineOrderAvailable}
                onChange={value => handleValueChange('isOnlineOrderAvailable', value)}
              >
                <Radiobox value={'Y'} label="가능" />
                <Radiobox value={'N'} label="불가" />
              </RadioboxGroup>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="start" className="gap-10 border-b pb-3">
          <Title className="self-start w-[100px]">다날</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUseDanalPayment}
                onChange={value => handleValueChange('isUseDanalPayment', value)}
              >
                <Radiobox value={'Y'} label="사용" />
                <Radiobox value={'N'} label="비사용" />
              </RadioboxGroup>
            </Flex>
            <Divider className="my-3 !bg-[#dcdde2] h-[1px]" />
            <Flex className="gap-5" justifyContent="start" alignItems="start">
              <Flex
                flexDirection="col"
                justifyContent="start"
                alignItems="start"
                className="w-auto"
              >
                <Text>CPID</Text>
                <TextInput
                  disabled={selectedValue.isUseDanalPayment !== 'Y'}
                  placeholder="CPID 입력"
                  className="w-[300px]"
                  value={selectedValue.danalPayment.cpId}
                  onChange={e =>
                    handleValueChange('danalPayment', {
                      ...selectedValue.danalPayment,
                      cpId: e.target.value,
                    })
                  }
                />
              </Flex>
              <Flex
                flexDirection="col"
                justifyContent="start"
                alignItems="start"
                className="w-auto"
              >
                <Text>SECRET CPID</Text>
                <TextInput
                  disabled={selectedValue.isUseDanalPayment !== 'Y'}
                  placeholder="SECRET CPID 입력"
                  className="w-[300px]"
                  value={selectedValue.danalPayment.scpId}
                  onChange={e =>
                    handleValueChange('danalPayment', {
                      ...selectedValue.danalPayment,
                      scpId: e.target.value,
                    })
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex justifyContent="start" className="gap-10 border-b pb-3">
          <Title className="self-start w-[100px]">페이코</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUsePaycoPayment}
                onChange={value => handleValueChange('isUsePaycoPayment', value)}
              >
                <Radiobox value={'Y'} label="사용" />
                <Radiobox value={'N'} label="비사용" />
              </RadioboxGroup>
            </Flex>
            <Divider className="my-3 !bg-[#dcdde2] h-[1px]" />
            <Flex className="gap-5">
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>sellerKey</Text>
                <TextInput
                  disabled={selectedValue.isUsePaycoPayment !== 'Y'}
                  placeholder="sellerKey 입력"
                  className="w-[300px]"
                  value={selectedValue.paycoPayment.sellerKey}
                  onChange={e =>
                    handleValueChange('paycoPayment', {
                      ...selectedValue.paycoPayment,
                      sellerKey: e.target.value,
                    })
                  }
                />
              </Flex>
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>CPID</Text>
                <TextInput
                  disabled={selectedValue.isUsePaycoPayment !== 'Y'}
                  placeholder="CPID 입력"
                  className="w-[300px]"
                  value={selectedValue.paycoPayment.cpId}
                  onChange={e =>
                    handleValueChange('paycoPayment', {
                      ...selectedValue.paycoPayment,
                      cpId: e.target.value,
                    })
                  }
                />
              </Flex>
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>Item CD</Text>
                <TextInput
                  disabled={selectedValue.isUsePaycoPayment !== 'Y'}
                  placeholder="Item CD 입력"
                  className="w-[300px]"
                  value={selectedValue.paycoPayment.itemCd}
                  onChange={e =>
                    handleValueChange('paycoPayment', {
                      ...selectedValue.paycoPayment,
                      itemCd: e.target.value,
                    })
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="start" className="gap-10 border-b pb-3">
          <Title className="self-start w-[100px]">페이코인</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUsePayCoinPayment}
                onChange={value => handleValueChange('isUsePayCoinPayment', value)}
              >
                <Radiobox value={'Y'} label="사용" />
                <Radiobox value={'N'} label="비사용" />
              </RadioboxGroup>
            </Flex>
            <Divider className="my-3 !bg-[#dcdde2] h-[1px]" />
            <Flex className="gap-5">
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>CPID</Text>
                <TextInput
                  disabled={selectedValue.isUsePayCoinPayment !== 'Y'}
                  placeholder="CPID 입력"
                  className="w-[300px]"
                  value={selectedValue.payCoinPayment.cpId}
                  onChange={e =>
                    handleValueChange('payCoinPayment', {
                      ...selectedValue.payCoinPayment,
                      cpId: e.target.value,
                    })
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="start" className="gap-10 border-b pb-3">
          <Title className="self-start w-[100px]">카카오페이</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUseKakaoPayment}
                onChange={value => handleValueChange('isUseKakaoPayment', value)}
              >
                <Radiobox value={'Y'} label="사용" />
                <Radiobox value={'N'} label="비사용" />
              </RadioboxGroup>
            </Flex>
            <Divider className="my-3 !bg-[#dcdde2] h-[1px]" />
            <Flex className="gap-5">
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>CPID</Text>
                <TextInput
                  disabled={selectedValue.isUseKakaoPayment !== 'Y'}
                  placeholder="CPID 입력"
                  className="w-[300px]"
                  value={selectedValue.kakaoPayment.cpId}
                  onChange={e =>
                    handleValueChange('kakaoPayment', {
                      ...selectedValue.kakaoPayment,
                      cpId: e.target.value,
                    })
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="start" className="gap-10 border-b pb-3">
          <Title className="self-start w-[100px]">네이버 페이</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUseNaverPayment}
                onChange={value => handleValueChange('isUseNaverPayment', value)}
              >
                <Radiobox value={'Y'} label="사용" />
                <Radiobox value={'N'} label="비사용" />
              </RadioboxGroup>
            </Flex>
            <Divider className="my-3 !bg-[#dcdde2] h-[1px]" />
            <Flex className="gap-5">
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>CPID</Text>
                <TextInput
                  disabled={selectedValue.isUseNaverPayment !== 'Y'}
                  placeholder="CPID 입력"
                  className="w-[300px]"
                  value={selectedValue.naverPayment.cpId}
                  onChange={e =>
                    handleValueChange('naverPayment', {
                      ...selectedValue.naverPayment,
                      cpId: e.target.value,
                    })
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="start" className="gap-10 border-b pb-3">
          <Title className="self-start w-[100px]">토스 페이</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUseTossPayment}
                onChange={value => handleValueChange('isUseTossPayment', value)}
              >
                <Radiobox value={'Y'} label="사용" />
                <Radiobox value={'N'} label="비사용" />
              </RadioboxGroup>
            </Flex>
            <Divider className="my-3 !bg-[#dcdde2] h-[1px]" />
            <Flex className="gap-5" alignItems="start" justifyContent="start">
              <Flex
                flexDirection="col"
                justifyContent="start"
                alignItems="start"
                className="w-auto"
              >
                <Text>clientKey</Text>
                <TextInput
                  disabled={selectedValue.isUseTossPayment !== 'Y'}
                  placeholder="clientKey 입력"
                  className="w-[300px]"
                  value={selectedValue.tossPayment.clientKey}
                  onChange={e =>
                    handleValueChange('tossPayment', {
                      ...selectedValue.tossPayment,
                      clientKey: e.target.value,
                    })
                  }
                />
              </Flex>
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>secretKey</Text>
                <TextInput
                  disabled={selectedValue.isUseTossPayment !== 'Y'}
                  placeholder="secretKey 입력"
                  className="w-[300px]"
                  value={selectedValue.tossPayment.secretKey}
                  onChange={e =>
                    handleValueChange('tossPayment', {
                      ...selectedValue.tossPayment,
                      secretKey: e.target.value,
                    })
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="start" className="gap-10 border-b pb-3">
          <Title className="self-start w-[100px]">딹페이</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUseUbPayment}
                onChange={value => handleValueChange('isUseUbPayment', value)}
              >
                <Radiobox value={'Y'} label="사용" />
                <Radiobox value={'N'} label="비사용" />
              </RadioboxGroup>
            </Flex>
            <Divider className="my-3 !bg-[#dcdde2] h-[1px]" />
            <Flex className="gap-5">
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>CPID</Text>
                <TextInput
                  disabled={selectedValue.isUseUbPayment !== 'Y'}
                  placeholder="CPID 입력"
                  className="w-[300px]"
                  value={selectedValue.ubPayment.cpId}
                  onChange={e =>
                    handleValueChange('ubPayment', {
                      ...selectedValue.ubPayment,
                      cpId: e.target.value,
                    })
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="start" className="gap-10 border-b pb-3">
          <Title className="self-start w-[100px]">BBQ 페이</Title>
          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUseSgPayment}
                onChange={value => handleValueChange('isUseSgPayment', value)}
              >
                <Radiobox value={'Y'} label="사용" />
                <Radiobox value={'N'} label="비사용" />
              </RadioboxGroup>
            </Flex>
            <Divider className="my-3 !bg-[#dcdde2] h-[1px]" />
            <Flex className="gap-5">
              <Flex flexDirection="col" justifyContent="start" alignItems="start">
                <Text>merchantKey</Text>
                <TextInput
                  disabled={selectedValue.isUseSgPayment !== 'Y'}
                  placeholder="merchantKey 입력"
                  className="w-[300px]"
                  value={selectedValue.sgPayment.merchantKey}
                  onChange={e =>
                    handleValueChange('sgPayment', {
                      ...selectedValue.sgPayment,
                      merchantKey: e.target.value,
                    })
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Button className="mt-5 w-full" onClick={submitData}>
        등록 완료
      </Button>
    </div>
  );
}

// BBQ00000
// BBQ00000
//BBQ00000_EASYP
