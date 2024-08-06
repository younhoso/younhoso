import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Flex, Text, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';

import axios, { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { getAxios } from '@/app/lib/Axios';
import { OptionResponse, SubOptionItemsEntity } from '@/pages/api/menu/option';

export default function RegisterOption({ type, data }: { type: string; data?: OptionResponse }) {
  const { closeModal } = useModalContext();
  const initalSubOption: SubOptionItemsEntity = {
    itemTitle: '',
    addPrice: '',
    priority: '',
    isActive: true,
    posCodeFoodTech: '',
    posCodeSolbi: '',
  };

  const [option, setOption] = useState<OptionResponse>({
    subOptionTitle: '',
    requiredSelectCount: '',
    maxSelectCount: '',
    subOptionItems: [initalSubOption],
  });

  const registerOption = async () => {
    try {
      const result = await getAxios().post('/api/menu/option', option);
      if (result.status == 200) {
        alert('옵션 등록이 완료되었습니다.');
        closeModal();
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  const deleteSubOption = async (item: any) => {
    setOption({
      ...option,
      subOptionItems: item,
    });
  };

  const modifyOption = async () => {
    try {
      const result = await getAxios().patch(`/api/menu/option`, {
        id: option.id,
        subOptionTitle: option.subOptionTitle,
        requiredSelectCount: parseInt(option.requiredSelectCount),
        maxSelectCount: parseInt(option.maxSelectCount),
        subOptionItems: option.subOptionItems.map(subOption => {
          return {
            id: subOption.id,
            itemTitle: subOption.itemTitle,
            addPrice: parseInt(subOption.addPrice),
            priority: parseInt(subOption.priority),
            isActive: subOption.isActive,
            posCodeFoodTech: subOption.posCodeFoodTech,
            posCodeSolbi: subOption.posCodeSolbi,
          };
        }),
      });
      if (result.status == 200) {
        alert('옵션 수정이 완료되었습니다.');
        closeModal();
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };
  const deleteOption = async () => {
    try {
      const result = await getAxios().delete(`/api/menu/option`, {
        params: option,
      });
      if (result.status == 200) {
        alert('옵션 삭제가 완료되었습니다.');
        closeModal();
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setOption(data);
    }
  }, [data]);

  return (
    <Flex flexDirection="col" className="w-[auto]" alignItems="start">
      <Flex justifyContent="start" className="mb-2 gap-3">
        <TextInput
          className="w-[300px]"
          placeholder="옵션 제목"
          value={option.subOptionTitle}
          onChange={e => setOption({ ...option, subOptionTitle: e.target.value })}
        />
        <Flex justifyContent="start" className="w-auto">
          <TextInput
            className="min-w-[90px] w-[90px] !rounded-r-none !border-r-0"
            placeholder="최소 수량"
            value={option.requiredSelectCount}
            onChange={e => setOption({ ...option, requiredSelectCount: e.target.value })}
          />
          <Text className="rounded-r border p-2 px-3 w-[40px]">개</Text>
        </Flex>
        <Flex justifyContent="start" className="w-auto">
          <TextInput
            className="min-w-[90px] w-[90px] !rounded-r-none !border-r-0"
            placeholder="최대 수량"
            value={option.maxSelectCount}
            onChange={e => setOption({ ...option, maxSelectCount: e.target.value })}
          />
          <Text className="rounded-r border p-2 px-3 w-[40px]">개</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="start" alignItems="start" flexDirection="col">
        {option.subOptionItems &&
          option.subOptionItems.length > 0 &&
          option.subOptionItems?.map(data => {
            return (
              <Flex className="gap-3" justifyContent="start" key={data.id}>
                <ArrowRightIcon className="w-5 h-5 mr-3 my-5 ml-3" />
                <TextInput
                  className="w-[200px]"
                  placeholder="옵션 명"
                  value={data.itemTitle}
                  onChange={e => {
                    setOption({
                      ...option,
                      subOptionItems: option.subOptionItems?.map((subOption, index) => {
                        if (subOption === data) {
                          return {
                            ...subOption,
                            itemTitle: e.target.value,
                          };
                        }
                        return subOption;
                      }),
                    });
                  }}
                />

                <TextInput
                  className="w-[150px]"
                  placeholder="푸드테크POS 메뉴코드"
                  value={data.posCodeFoodTech}
                  onChange={e => {
                    setOption({
                      ...option,
                      subOptionItems: option.subOptionItems?.map(subOption => {
                        if (subOption === data) {
                          return {
                            ...subOption,
                            posCodeFoodTech: e.target.value,
                          };
                        }
                        return subOption;
                      }),
                    });
                  }}
                />
                <TextInput
                  className="w-[150px]"
                  placeholder="솔비POS 메뉴코드"
                  value={data.posCodeSolbi}
                  onChange={e => {
                    setOption({
                      ...option,
                      subOptionItems: option.subOptionItems?.map(subOption => {
                        if (subOption === data) {
                          return {
                            ...subOption,
                            posCodeSolbi: e.target.value,
                          };
                        }
                        return subOption;
                      }),
                    });
                  }}
                />
                <Flex justifyContent="start" className="w-auto">
                  <TextInput
                    value={data.addPrice}
                    className="w-[100px] !rounded-r-none !border-r-0"
                    placeholder="최대 주문 금액"
                    onChange={e => {
                      setOption({
                        ...option,
                        subOptionItems: option.subOptionItems?.map(subOption => {
                          if (subOption === data) {
                            return {
                              ...subOption,
                              addPrice: e.target.value,
                            };
                          }
                          return subOption;
                        }),
                      });
                    }}
                  />
                  <Text className="rounded-r border p-2 px-3 w-[70px]">원 추가</Text>
                </Flex>
                <Flex justifyContent="start" className="w-auto">
                  <TextInput
                    className="min-w-[50px] w-[50px] !rounded-r-none !border-r-0"
                    placeholder=""
                    value={data.priority}
                    onChange={e => {
                      setOption({
                        ...option,
                        subOptionItems: option.subOptionItems?.map(subOption => {
                          if (subOption === data) {
                            return {
                              ...subOption,
                              priority: e.target.value,
                            };
                          }
                          return subOption;
                        }),
                      });
                    }}
                  />
                  <Text className="w-[100px] rounded-r border p-2 px-3">번째로 노출</Text>
                </Flex>
                <CustomButton
                  type="secondary"
                  onClick={() =>
                    deleteSubOption(option.subOptionItems?.filter(subOption => subOption !== data))
                  }
                >
                  삭제
                </CustomButton>
              </Flex>
            );
          })}
      </Flex>
      <CustomButton
        type="secondary"
        onClick={() => {
          setOption({
            ...option,
            subOptionItems: [
              ...option.subOptionItems,
              {
                ...initalSubOption,
                id: option.subOptionItems.length,
              },
            ],
          });
        }}
      >
        서브 메뉴 추가
      </CustomButton>

      <Flex justifyContent="start" className="mt-3 gap-3">
        {type == 'register' && (
          <>
            <CustomButton type="primary" onClick={registerOption}>
              옵션 등록
            </CustomButton>
            <CustomButton type="tertiary" onClick={closeModal}>
              취소
            </CustomButton>
          </>
        )}
        {type == 'modify' && (
          <>
            <CustomButton type="primary" onClick={modifyOption}>
              옵션 수정
            </CustomButton>
            <CustomButton type="tertiary" onClick={deleteOption}>
              삭제
            </CustomButton>
          </>
        )}
      </Flex>
    </Flex>
  );
}
