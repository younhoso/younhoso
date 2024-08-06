'use client';

import { ArrowRightIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Card,
  DateRangePickerValue,
  Divider,
  Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import axios, { isAxiosError } from 'axios';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import FileInput, { IFileTypes } from '@/app/components/FileInput';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { MenuResponse, OptionsEntity } from '@/pages/api/menu/[id]';
import { MenuCategoryResponse } from '@/pages/api/menu/category';
import { SubOptionItemsEntity } from '@/pages/api/menu/option';

import OptionList from '../../Modal/OptionList';

const Editor = dynamic(() => import('../../../components/Editor'), {
  ssr: false,
});

interface OptionResponse {
  priority?: number;
  id?: number;
  subOptionTitle: string;
  requiredSelectCount: string;
  maxSelectCount: string;
  subOptionItems: SubOptionItemsEntity[] | [];
}

interface MenuEditCondition {
  isActive: string;
  menuType: string;
  categoryIds: string[];
  menuName: string;
  menuPrice: string;
  alcoholPrice: string;
  addPrice: string;
  posCodeFoodTech: string;
  posCodeSolbi: string;
  optionGroup?: OptionGroup[];
  discountValues?: DiscountValue[];
  productInformationNutrition: {
    kcal: string;
    sugar: string;
    protein: string;
    fat: string;
    natrium: string;
  };
  productMainImageUploaded: string;
  productInformationAllergy: string;
  description: string;
  productMainImage: IFileTypes[];
  requiredOptions: OptionResponse[];
  optionalOptions: OptionResponse[];
  productInformationCountry: string[];
}

interface DiscountValue {
  label: string;
  type: string;
  value: string;
  valueType: any;
  dateRangeSet: string[];
  dateRange: DateRangePickerValue;
}

interface OptionGroup {
  order: number;
  title: string;
  option: Option[];
}

interface Option {
  order: number;
  title: string;
  price: string;
}
const initialOptionState: OptionGroup[] = [
  {
    order: 1,
    title: '',
    option: [
      {
        order: 1,
        title: '',
        price: '',
      },
    ],
  },
];

export default function MenuEditPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<MenuResponse>();
  const { openModal } = useModalContext();
  const [category, setCategory] = useState<MenuCategoryResponse[]>([]);
  const [options, setOptions] = useState<
    {
      id: number;
      priority: number;
      isActive: boolean;
    }[]
  >([]);

  const [selectedValue, setSelectedValue] = useState<MenuEditCondition>({
    isActive: 'true',
    menuType: '',
    categoryIds: [],
    menuName: '',
    menuPrice: '',
    alcoholPrice: '',
    addPrice: '',
    posCodeFoodTech: '',
    posCodeSolbi: '',
    optionGroup: initialOptionState,
    productInformationNutrition: {
      kcal: '',
      sugar: '',
      protein: '',
      fat: '',
      natrium: '',
    },
    productMainImageUploaded: '',
    productInformationAllergy: '',
    description: '',
    productMainImage: [],
    requiredOptions: [],
    optionalOptions: [],
    productInformationCountry: [],
  });

  const handleValueChange = (key: keyof MenuEditCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getCategory = async () => {
    const result = await getAxios().get<MenuCategoryResponse[]>('/api/menu/category');
    setCategory(result.data);
  };

  const registerMenu = async () => {
    try {
      selectedValue.requiredOptions.map(option => {
        if (option.priority != undefined && isNaN(option.priority)) {
          throw new Error('우선순위는 숫자만 입력 가능합니다.');
        }
      });
      if (!(Number(selectedValue.menuPrice) % 100 === 0)) {
        alert('판매가는 100원 단위로만 입력 가능합니다.');
        return;
      }
      if (!(Number(selectedValue.addPrice) % 100 === 0)) {
        alert('제주 및 도서 산간지역은 100원 단위로만 입력 가능합니다.');
        return;
      }
      if (!selectedValue.productInformationCountry) {
        throw new Error('원산지 형식이 잘못되었습니다.');
      }

      const formData = new FormData();
      if (selectedValue.productMainImage.length > 0) {
        formData.append('imageFile', selectedValue.productMainImage[0].object);
      }
      formData.append(
        'menuInfo',
        JSON.stringify({
          isActive: selectedValue.isActive,
          menuType: selectedValue.menuType,
          menuName: selectedValue.menuName,
          categoryIds: selectedValue.categoryIds.map(categoryId => parseInt(categoryId)),
          menuPrice: parseInt(selectedValue.menuPrice),
          alcoholPrice: parseInt(selectedValue.alcoholPrice),
          addPrice: selectedValue.addPrice,
          posCodeFoodTech: selectedValue.posCodeFoodTech,
          posCodeSolbi: selectedValue.posCodeSolbi,
          description: selectedValue.description,
          nutrient: {
            calorie: parseInt(selectedValue.productInformationNutrition.kcal),
            sugars: parseInt(selectedValue.productInformationNutrition.sugar),
            protein: parseInt(selectedValue.productInformationNutrition.protein),
            saturatedFat: parseInt(selectedValue.productInformationNutrition.fat),
            natrium: parseInt(selectedValue.productInformationNutrition.natrium),
          },
          allergy: selectedValue.productInformationAllergy,
          origin: selectedValue.productInformationCountry.map(item => {
            return {
              name: item.split('/')[0],
              region: item.split('/')[1],
            };
          }),

          options: [
            ...selectedValue.requiredOptions.map(option => {
              return {
                id: option.id,
                priority: option.priority ? option.priority : 1,
                isActive: true,
              };
            }),
            ...selectedValue.optionalOptions.map(option => {
              return {
                id: option.id,
                priority: option.priority ? option.priority : 1,
                isActive: true,
              };
            }),
          ],
        }),
      );
      if (searchParams && searchParams.get('id')) {
        const result = await getAxios().patch(`/api/menu/${searchParams.get('id')}`, formData);

        if (result.status == 200) {
          alert('매뉴가 수정되었습니다.');
          router.push('/menu/list');
        }
      } else {
        alert('잘못된 접근입니다.');
      }
    } catch (error: any) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        console.error(error);
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getMenuData = async (id: string) => {
    const result = await getAxios().get<MenuResponse>(`/api/menu/${id}`);
    const { data } = result;
    setSelectedValue({
      isActive: String(data.isActive),
      menuType: data.menuType,
      categoryIds: data.categories
        ? data.categories.map(categoryId => categoryId.id.toString())
        : [],
      menuName: data.menuName,
      menuPrice: data?.menuPrice?.toString(),
      alcoholPrice: data?.alcoholPrice?.toString(),
      addPrice: data?.addPrice?.toString(),
      posCodeFoodTech: data?.posCodeFoodTech?.toString(),
      posCodeSolbi: data?.posCodeSolbi?.toString(),
      productInformationCountry: data.origin
        ? data.origin.map(item => {
            return `${item.name}/${item.region}`;
          })
        : [],
      optionGroup: initialOptionState,
      productInformationNutrition: {
        kcal: data?.nutrient?.calorie?.toString(),
        sugar: data?.nutrient?.sugars?.toString(),
        protein: data?.nutrient?.protein?.toString(),
        fat: data?.nutrient?.saturatedFat?.toString(),
        natrium: data?.nutrient?.natrium?.toString(),
      },
      productInformationAllergy: data.allergy,
      description: data.description,
      productMainImageUploaded: data.menuImageUrl,
      productMainImage: [],
      requiredOptions: data.requiredOptions || [],
      optionalOptions: data.optionalOptions || [],
    });
  };

  useEffect(() => {
    if (!searchParams) return;

    const menuId = searchParams.get('id');

    if (menuId) {
      getMenuData(menuId);
    } else {
      alert('잘못된 접근입니다.');
      router.push('/menu/list');
    }
  }, [searchParams]);

  let fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Card className="p-0">
        <div className="border-b p-5">
          <Title>활성 상태 *</Title>
        </div>

        <div className="ml-3 p-5">
          <Flex justifyContent="start" className="gap-10 mt-5 pb-3">
            <Text className="w-[30px] self-start">선택</Text>
            <Flex justifyContent="start" className="gap-5 flex-wrap flex">
              <RadioboxGroup
                value={selectedValue.isActive}
                onChange={value => handleValueChange('isActive', value)}
              >
                <Radiobox className={'w-auto'} value={'true'} label={'활성화'} />
                <Radiobox className={'w-auto'} value={'false'} label={'비활성화'} />
              </RadioboxGroup>
            </Flex>
          </Flex>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>메뉴 형태 *</Title>
        </div>

        <div className="ml-3 p-5">
          <Flex justifyContent="start" className="gap-10 mt-5 pb-3">
            <Text className="w-[30px] self-start">선택</Text>
            <Flex justifyContent="start" className="gap-5 flex-wrap flex">
              <RadioboxGroup
                value={selectedValue.menuType}
                onChange={value => handleValueChange('menuType', value)}
              >
                <Radiobox className={'w-auto'} value={'MAIN'} label={'일반'} />
                <Radiobox className={'w-auto'} value={'SIDE'} label={'사이드'} />
                <Radiobox className={'w-auto'} value={'ALCOHOL'} label={'음료/주류'} />
              </RadioboxGroup>
            </Flex>
          </Flex>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>카테고리 *</Title>
        </div>

        <div className="ml-3 p-5">
          <Flex justifyContent="start" className="gap-10 mt-5 pb-3">
            <Text className="w-[30px] self-start">선택</Text>
            <Flex flexDirection="col" justifyContent="start" alignItems="start" className="gap-5">
              <CheckboxGroup
                className="flex-wrap flex gap-5"
                value={selectedValue.categoryIds}
                onChange={value => handleValueChange('categoryIds', value)}
              >
                {category.map(item => {
                  return (
                    <Checkbox
                      key={item.categoryName}
                      className={'w-auto mx-3'}
                      value={item.id.toString()}
                      label={item.categoryName}
                    />
                  );
                })}
              </CheckboxGroup>
            </Flex>
          </Flex>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>메뉴명 *</Title>
        </div>
        <div className="p-5">
          <TextInput
            value={selectedValue.menuName}
            onChange={e => handleValueChange('menuName', e.target.value)}
            className="w-full"
            placeholder="메뉴명 입력"
          />
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>판매가 *</Title>
        </div>
        <div className="p-5">
          <div className="py-3">
            <TextInput
              className="w-[400px] inline-block"
              placeholder="판매가 (숫자만)"
              value={selectedValue.menuPrice}
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  alert('숫자만 입력 가능합니다.');
                  e.target.value = '';
                  return;
                }
                handleValueChange('menuPrice', e.target.value);
              }}
            />
            <p className="text-[#DE1F38] text-[12px] mt-[12px]">
              * 판매가는 숫자, 100원 단위로 입력 가능합니다.
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>메뉴 중 주류의 금액 *</Title>
        </div>
        <div className="p-5">
          <div className="py-3">
            <TextInput
              className="w-[400px] inline-block"
              placeholder="메뉴 중 주류의 금액(숫자만)"
              value={selectedValue.alcoholPrice}
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  alert('숫자만 입력 가능합니다.');
                  e.target.value = '';
                  return;
                }
                handleValueChange('alcoholPrice', e.target.value);
              }}
            />
            <p className="text-[#DE1F38] text-[12px] mt-[12px]">
              * 전체 메뉴 중 주류의 금액을 입력해 주세요. (예: 세트메뉴에 맥주가 포함되어 있다면 맥주의 금액을 입력해 주세요.) 
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>제주 및 도서 산간지역 추가 금액</Title>
        </div>
        <div className="p-5">
          <div className="py-3">
            <TextInput
              className="w-[400px] inline-block"
              placeholder="추가 금액을 입력해 주세요"
              value={selectedValue.addPrice}
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  alert('숫자만 입력 가능합니다.');
                  e.target.value = '';
                  return;
                }
                handleValueChange('addPrice', e.target.value);
              }}
            />
            <p className="text-[#DE1F38] text-[12px] mt-[12px]">
              * 제주 및 도서산간 지역에서 주문할 경우 추가되는 금액은 숫자로 입력, 100원 단위로 입력
              가능합니다.
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>POS 코드</Title>
        </div>
        <div className="px-5">
          <div className="py-3">
            <p className="pb-3 text-[#46477a]">푸드테크 POS 코드 *</p>
            <TextInput
              className="w-[400px] inline-block"
              placeholder="푸드테크 POS 코드를 입력해 주세요"
              value={selectedValue.posCodeFoodTech}
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  alert('숫자만 입력 가능합니다.');
                  e.target.value = '';
                  return;
                }
                handleValueChange('posCodeFoodTech', e.target.value);
              }}
            />
            <p className="text-[#DE1F38] text-[12px] mt-[12px]">
              * POS 코드는 숫자만 입력해 주세요.
            </p>
          </div>
        </div>
        <div className="px-5 pb-5">
          <div>
            <p className="pb-3 text-[#46477a]">솔비 POS 코드</p>
            <TextInput
              className="w-[400px] inline-block"
              placeholder="솔비 POS 코드를 입력해 주세요"
              value={selectedValue.posCodeSolbi}
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  alert('숫자만 입력 가능합니다.');
                  e.target.value = '';
                  return;
                }
                handleValueChange('posCodeSolbi', e.target.value);
              }}
            />
            <p className="text-[#DE1F38] text-[12px] mt-[12px]">
              * POS 코드는 숫자만 입력해 주세요.
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5 mb-5">
          <Flex>
            <Title className="w-[50px]">옵션</Title>
            <Flex justifyContent="start" className="gap-5">
              <CustomButton
                type="primary"
                onClick={() =>
                  openModal(
                    '필수옵션 불러오기',
                    '',
                    <OptionList checked={selectedValue.requiredOptions} type={1} />,
                    value => value && handleValueChange('requiredOptions', value),
                  )
                }
              >
                필수옵션 불러오기
              </CustomButton>
              <CustomButton
                type="secondary"
                onClick={() =>
                  openModal(
                    '선택옵션 불러오기',
                    '',
                    <OptionList checked={selectedValue.optionalOptions} type={0} />,
                    value => value && handleValueChange('optionalOptions', value),
                  )
                }
              >
                선택옵션 불러오기
              </CustomButton>
            </Flex>
          </Flex>
        </div>
        {selectedValue.requiredOptions.length > 0 &&
          selectedValue.requiredOptions.map(item => {
            return (
              <>
                <Flex>
                  <Flex flexDirection="col" className="w-[70px] self-start">
                    <Text className="!text-4xl">{item.id}</Text>
                    <Text
                      className={`!text-xs p-1 rounded-lg text-white ${
                        parseInt(item.requiredSelectCount) > 0 ? 'bg-red-600' : 'bg-blue-950'
                      }`}
                    >
                      {parseInt(item.requiredSelectCount) > 0 ? '필수' : '선택'}
                    </Text>
                  </Flex>
                  <Flex justifyContent="start" flexDirection="col" alignItems="start">
                    <Flex justifyContent="start" className="w-auto">
                      <TextInput
                        className="w-[300px] mb-3"
                        disabled={true}
                        value={item.subOptionTitle}
                      />
                      <button
                        className="w-[80px] mr-3"
                        onClick={() => {
                          handleValueChange(
                            'requiredOptions',
                            selectedValue.requiredOptions.filter(option => option.id !== item.id),
                          );
                        }}
                      >
                        <Text className="font-bold ml-3 mb-3">삭제</Text>
                      </button>
                      <Flex justifyContent="start" className=" mb-3">
                        <TextInput
                          placeholder="우선순위"
                          className="min-w-[100px] w-[100px] border"
                          onChange={e => {
                            handleValueChange(
                              'requiredOptions',
                              selectedValue.requiredOptions.map(option => {
                                if (option.id === item.id) {
                                  return {
                                    ...option,
                                    priority: parseInt(e.target.value),
                                  };
                                }
                                return option;
                              }),
                            );
                          }}
                        />
                        <Text className="ml-3">번째로 노출</Text>
                      </Flex>
                    </Flex>
                    <Flex flexDirection="col" justifyContent="start">
                      {item.subOptionItems &&
                        item.subOptionItems.map(subOption => {
                          return (
                            <Flex justifyContent="start" key={subOption.id}>
                              <ArrowRightIcon className="w-5 h-5 mr-3 my-5 ml-3" />
                              <TextInput
                                className="w-[300px]"
                                disabled={true}
                                value={subOption.itemTitle}
                              />
                              <Text className="ml-3">
                                {subOption.addPrice.toLocaleString()}원 추가
                              </Text>
                            </Flex>
                          );
                        })}
                    </Flex>
                  </Flex>
                </Flex>
                <Divider />
              </>
            );
          })}

        {selectedValue.optionalOptions.length > 0 &&
          selectedValue.optionalOptions.map(item => {
            return (
              <>
                <Flex>
                  <Flex flexDirection="col" className="w-[70px] self-start">
                    <Text className="!text-4xl">{item.id}</Text>
                    <Text
                      className={`!text-xs p-1 rounded-lg text-white ${
                        parseInt(item.requiredSelectCount) > 0 ? 'bg-red-600' : 'bg-blue-950'
                      }`}
                    >
                      {parseInt(item.requiredSelectCount) > 0 ? '필수' : '선택'}
                    </Text>
                  </Flex>
                  <Flex justifyContent="start" flexDirection="col" alignItems="start">
                    <Flex justifyContent="start" className="w-auto">
                      <TextInput
                        className="w-[300px] mb-3"
                        disabled={true}
                        value={item.subOptionTitle}
                      />
                      <button
                        className="w-[80px] mr-3"
                        onClick={() => {
                          handleValueChange(
                            'optionalOptions',
                            selectedValue.optionalOptions.filter(option => option.id !== item.id),
                          );
                        }}
                      >
                        <Text className="font-bold ml-3 mb-3">삭제</Text>
                      </button>
                      <Flex justifyContent="start" className=" mb-3">
                        <TextInput
                          placeholder="우선순위"
                          className="min-w-[100px] w-[100px] border"
                          onChange={e => {
                            handleValueChange(
                              'optionalOptions',
                              selectedValue.optionalOptions.map(option => {
                                if (option.id === item.id) {
                                  return {
                                    ...option,
                                    priority: parseInt(e.target.value),
                                  };
                                }
                                return option;
                              }),
                            );
                          }}
                        />
                        <Text className="ml-3">번째로 노출</Text>
                      </Flex>
                    </Flex>
                    <Flex flexDirection="col" justifyContent="start">
                      {item.subOptionItems &&
                        item.subOptionItems.map(subOption => {
                          return (
                            <Flex justifyContent="start" key={subOption.id}>
                              <ArrowRightIcon className="w-5 h-5 mr-3 my-5 ml-3" />
                              <TextInput
                                className="w-[300px]"
                                disabled={true}
                                value={subOption.itemTitle}
                              />
                              <Text className="ml-3">
                                {subOption.addPrice.toLocaleString()}원 추가
                              </Text>
                            </Flex>
                          );
                        })}
                    </Flex>
                  </Flex>
                </Flex>
                <Divider />
              </>
            );
          })}
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>상품 정보 고시</Title>
        </div>
        <div className="p-5">
          <Flex justifyContent="start" className="pb-3 border-b">
            <Text className="w-[100px] self-start mt-2">원재료명/원산지</Text>
            <Flex
              className="ml-3 gap-3"
              flexDirection="col"
              justifyContent="start"
              alignItems="start"
            >
              {selectedValue.productInformationCountry.map((_, index) => {
                return (
                  <Flex justifyContent="start" className="gap-1" key={index}>
                    <TextInput
                      value={selectedValue.productInformationCountry[index]}
                      onChange={e =>
                        setSelectedValue({
                          ...selectedValue,
                          productInformationCountry: [
                            ...selectedValue.productInformationCountry.slice(0, index),
                            e.target.value,
                            ...selectedValue.productInformationCountry.slice(
                              index + 1,
                              selectedValue.productInformationCountry.length,
                            ),
                          ],
                        })
                      }
                      className="w-[400px] inline-block mr-3"
                      placeholder="(ex 닭고기/국내산)"
                    />
                    <CustomButton
                      onClick={() => {
                        setSelectedValue({
                          ...selectedValue,
                          productInformationCountry: [
                            ...selectedValue.productInformationCountry.slice(
                              0,
                              selectedValue.productInformationCountry.length - 1,
                            ),
                          ],
                        });
                      }}
                      type="tertiary"
                      className="w-5 h-8"
                    >
                      <MinusIcon width={15} />
                    </CustomButton>
                  </Flex>
                );
              })}

              <CustomButton
                onClick={() => {
                  setSelectedValue({
                    ...selectedValue,
                    productInformationCountry: [...selectedValue.productInformationCountry, ''],
                  });
                }}
                type="tertiary"
              >
                <Flex>
                  <PlusIcon width={15} />
                  <Text>추가</Text>
                </Flex>
              </CustomButton>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="gap-1 mt-5 pb-3 border-b">
            <Text className="w-[100px]">영양 정보</Text>
            <TextInput
              value={selectedValue.productInformationNutrition.kcal}
              onChange={e =>
                setSelectedValue({
                  ...selectedValue,
                  productInformationNutrition: {
                    ...selectedValue.productInformationNutrition,
                    kcal: e.target.value,
                  },
                })
              }
              className="w-[200px] inline-block"
              placeholder="열량"
            />
            <Text className="mr-3">kcal</Text>
            <TextInput
              value={selectedValue.productInformationNutrition.sugar}
              onChange={e =>
                setSelectedValue({
                  ...selectedValue,
                  productInformationNutrition: {
                    ...selectedValue.productInformationNutrition,
                    sugar: e.target.value,
                  },
                })
              }
              className="w-[200px] inline-block"
              placeholder="당류"
            />
            <Text className="mr-3">g</Text>
            <TextInput
              value={selectedValue.productInformationNutrition.protein}
              onChange={e =>
                setSelectedValue({
                  ...selectedValue,
                  productInformationNutrition: {
                    ...selectedValue.productInformationNutrition,
                    protein: e.target.value,
                  },
                })
              }
              className="w-[200px] inline-block"
              placeholder="단백질"
            />
            <Text className="mr-3">g</Text>
            <TextInput
              className="w-[200px] inline-block"
              placeholder="포화지방"
              value={selectedValue.productInformationNutrition.fat}
              onChange={e =>
                setSelectedValue({
                  ...selectedValue,
                  productInformationNutrition: {
                    ...selectedValue.productInformationNutrition,
                    fat: e.target.value,
                  },
                })
              }
            />
            <Text className="mr-3">g</Text>
            <TextInput
              className="w-[200px] inline-block"
              placeholder="나트륨"
              value={selectedValue.productInformationNutrition.natrium}
              onChange={e =>
                setSelectedValue({
                  ...selectedValue,
                  productInformationNutrition: {
                    ...selectedValue.productInformationNutrition,
                    natrium: e.target.value,
                  },
                })
              }
            />
            <Text className="mr-3">g</Text>
          </Flex>
          <Flex justifyContent="start" className="gap-1 mt-5 pb-3">
            <Text className="w-[100px]">알레르기 정보</Text>
            <TextInput
              className="w-full inline-block ml-2"
              placeholder="알레르기 정보를 입력하세요"
              value={selectedValue.productInformationAllergy}
              onChange={e => handleValueChange('productInformationAllergy', e.target.value)}
            />
          </Flex>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>상세 설명 *</Title>
        </div>
        <div className="p-5">
          <div className="w-full border h-[400px] p-5">
            <textarea
              cols={5}
              className="w-full h-full"
              value={selectedValue.description}
              onChange={e => handleValueChange('description', e.target.value)}
            ></textarea>
          </div>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>상품 이미지 등록</Title>
        </div>
        <div className="p-5">
          <Flex justifyContent="start" className=" py-5">
            <Title className="w-[200px] self-start">대표 이미지 *</Title>
            <Image
              className={`cursor-pointer ${
                selectedValue.productMainImage.length > 0 ? 'invisible' : 'visible'
              }`}
              onClick={() => fileInputRef.current?.click()}
              alt="main image"
              src={selectedValue.productMainImageUploaded}
              width={200}
              height={200}
            />
            <div
              className={`${selectedValue.productMainImage.length > 0 ? 'visible' : 'invisible'}`}
            >
              <FileInput
                fileInputRef={fileInputRef}
                type="image"
                multiple={false}
                value={selectedValue.productMainImage}
                onChange={value => handleValueChange('productMainImage', value)}
              />
              <Text className="text-emerald-500 mt-3">
                이미지 해상도 : 720 ✗ 480 픽셀
                <br />
                png 형식의 이미지만 등록됩니다.
              </Text>
            </div>
          </Flex>
          {/* <Flex justifyContent="start" className="py-5">
            <div className="w-[200px] self-start">
              <Title className="inline">추가 이미지</Title>
              <Subtitle className="inline">(0/9)</Subtitle>
            </div>
            <div>
              <FileInput
                type="image"
                multiple={true}
                value={selectedValue.productAdditionalImage}
                onChange={(value) =>
                  handleValueChange('productAdditionalImage', value)
                }
              />
              <Text className="text-emerald-500 mt-3">
                권장 크기 : 1,000 ✗ 1,000 픽셀 (1:1 비율)
                <br />
                추가 이미지는 최대 9개까지 등록하실 수 있습니다.
                <br />
                jpg, jpeg,gif,png 형식의 이미지만 등록됩니다.
              </Text>
            </div>
          </Flex> */}
        </div>
      </Card>

      <Flex justifyContent="center" className="p-5">
        <Button
          onClick={() => router.back()}
          className="bg-white border-gray-500 hover:bg-white text-gray-500 w-[200px] h-[50px] rounded-none"
        >
          취소
        </Button>
        <Button
          className="bg-gray-800 border-none ml-3 hover:bg-gray-700 text-white w-[200px] h-[50px] rounded-none"
          onClick={registerMenu}
        >
          수정완료
        </Button>
      </Flex>
    </>
  );
}
