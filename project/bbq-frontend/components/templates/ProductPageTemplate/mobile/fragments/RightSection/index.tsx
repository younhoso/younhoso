import { FC, Fragment } from 'react';

import styled from 'styled-components';

import { Box, CheckBox, Divider, Flex, Icon, RadioBox, Space, Text } from '@/components/atoms';
import {
  COLOR_DIVIDER,
  COLOR_PRIMARY,
  COLOR_WHITE,
  FONTSIZE_11,
  FONTSIZE_14,
  FONTSIZE_18,
  PLANCK,
} from '@/constants';

import { ProductPageTemplateProps } from '../../../';

const RightSection: FC<ProductPageTemplateProps> = ({
  selectedSubOptionData,
  menuSubOptions,
  onOptionItemClick,
}) => {
  if (!menuSubOptions.length) {
    return (
      <Flex.CCC
        full={true}
        padding={PLANCK * 4}
        style={{ borderLeft: `1px solid ${COLOR_DIVIDER}`, height: '80vh' }}
      >
        <Text align="center" lineHeight={'1.5em'} color={'#777777'}>
          구매옵션이 없습니다.
          <br />
          주문서에 담기를 클릭해주세요
        </Text>
      </Flex.CCC>
    );
  } else {
    return (
      <Flex.CSS
        full={true}
        padding={PLANCK * 4}
        style={{ borderLeft: `1px solid ${COLOR_DIVIDER}` }}
      >
        <Space.H1 />
        <Text size={FONTSIZE_14}>구매옵션</Text>
        <Space.H5 />
        <>
          {menuSubOptions.map((menuSubOption, index) => (
            <Fragment key={index}>
              <Flex.CSS full={true}>
                <Flex.RBC full={true}>
                  <Text weight={700} size={FONTSIZE_18}>
                    {menuSubOption.subOptionTitle}
                  </Text>
                  <Box
                    background={menuSubOption.requiredSelectCount ? COLOR_PRIMARY : '#f1f1f1'}
                    shape={'9999px'}
                  >
                    <Flex.RCC full={true} style={{ height: 25 }}>
                      <Space.V2_5 />
                      <Text
                        weight={600}
                        size={FONTSIZE_11}
                        color={menuSubOption.requiredSelectCount ? COLOR_WHITE : '#777777'}
                      >
                        {menuSubOption.requiredSelectCount ? '필수' : '선택'}
                      </Text>
                      <Space.V2_5 />
                    </Flex.RCC>
                  </Box>
                </Flex.RBC>
                {menuSubOption.maxSelectCount > 1 ? (
                  <>
                    <Space.H1 />
                    <Text size={FONTSIZE_14} color={'#777777'}>
                      최대 {menuSubOption.maxSelectCount}개 선택
                    </Text>
                  </>
                ) : null}
                <Space.H2 />
                <Flex.CSB full>
                  {menuSubOption.subOptionItemDetailResponseList.map((item, index) => {
                    const selectedData = selectedSubOptionData.filter(
                      item => item.id === menuSubOption.id,
                    )[0];

                    return (
                      <OptionItemInputWrapper
                        key={index}
                        onClick={() => {
                          onOptionItemClick(menuSubOption, item);
                        }}
                      >
                        <Space.H1 />
                        <Flex.RSC layout={`auto auto auto 1 auto`}>
                          <Space.V2 />
                          <div>
                            {menuSubOption.maxSelectCount > 1 ? (
                              <CheckBox
                                theme={'dark'}
                                checked={
                                  selectedData
                                    ? (selectedData as any).itemIds.includes(item.id)
                                    : selectedData
                                }
                                style={{ pointerEvents: 'none' }}
                              />
                            ) : (
                              <RadioBox
                                checked={
                                  selectedData
                                    ? (selectedData as any).itemIds.includes(item.id)
                                    : selectedData
                                }
                                style={{ pointerEvents: 'none' }}
                              />
                            )}
                          </div>
                          <Space.V1_5 />
                          <div>
                            <Text size={FONTSIZE_14} color={'#777777'}>
                              {item.itemTitle}
                            </Text>
                          </div>
                          <div>
                            <Text size={FONTSIZE_14} color={'#777777'}>
                              {`${item.addPrice > 0 ? '+' : ''}${item.addPrice.toLocaleString()}원`}
                            </Text>
                          </div>
                        </Flex.RSC>
                        <Space.H1 />
                      </OptionItemInputWrapper>
                    );
                  })}
                </Flex.CSB>
              </Flex.CSS>
              <Space.H4 />
              {index !== menuSubOptions.length - 1 ? (
                <>
                  <Divider />
                  <Space.H4 />
                </>
              ) : null}
            </Fragment>
          ))}
        </>
      </Flex.CSS>
    );
  }
};

const OptionItemInputWrapper = styled.div`
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f5f6f7;
  }
`;

export default RightSection;
