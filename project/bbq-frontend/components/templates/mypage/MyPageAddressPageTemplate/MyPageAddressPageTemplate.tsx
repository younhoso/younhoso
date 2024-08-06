import { FC, ReactNode } from 'react';

import { Box, CheckBox, Flex, Grid, Icon, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { RegisterAddressPopup } from '@/components/organisms';
import { PLANCK } from '@/constants';
import { Address } from '@/types';

import { Template } from '../components';
import { MyPageAddressPageTemplateMobile } from './mobile';

export interface MyPageAddressPageTemplateProps {
  refetch: () => void;
  addresses: Address[];
  handleAddressDeleteButtonClick: (params: { addressId: number }) => void;
  handleAddressDefaultCheck: (params: { addressId: number }) => void;
}

export interface MyPageAddressPageTemplateComponentProps extends MyPageAddressPageTemplateProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const MyPageAddressPageTemplate: FC<MyPageAddressPageTemplateComponentProps> & {
  Mobile: FC<MyPageAddressPageTemplateComponentProps>;
} = ({ refetch, addresses, handleAddressDeleteButtonClick, handleAddressDefaultCheck }) => {
  const { openModal } = useModal();

  return (
    <Template
      title="배송지 관리"
      button={
        <Button
          onClick={() => {
            openModal({
              title: '배송지 등록',
              body: <RegisterAddressPopup defaultAddress={undefined} refetch={refetch} />,
            });
          }}
          shape={'round'}
          color={'red'}
          text={'+ 배송지 등록'}
        ></Button>
      }
    >
      <Grid columnCount={1} gap={PLANCK * 3}>
        {addresses.map((address, index) => {
          return (
            <Box key={index} border="lightgray">
              <Space.H4 />
              <Flex.RSS layout="auto auto auto 1 auto">
                <Space.V4 />
                <Icon size="44px" src="bbq-point.svg" />
                <Space.V4 />
                <div>
                  <Flex.RSC layout="1 auto">
                    <Text size={20}>{address.deliveryName}</Text>
                    <Flex.RSC>
                      <Button
                        disabled={address.isDefault}
                        inline={true}
                        text="삭제"
                        size="small"
                        color="graypurple"
                        textColor={'#302d46'}
                        fill={false}
                        shape={'round'}
                        onClick={() => {
                          handleAddressDeleteButtonClick({
                            addressId: address.id,
                          });
                        }}
                      />
                      <Space.V2 />
                      <Button
                        inline={true}
                        text="수정"
                        size="small"
                        color="graypurple"
                        textColor={'#302d46'}
                        fill={false}
                        shape={'round'}
                        onClick={() =>
                          openModal({
                            title: '배송지 수정',
                            body: (
                              <RegisterAddressPopup defaultAddress={address} refetch={refetch} />
                            ),
                          })
                        }
                      />
                    </Flex.RSC>
                  </Flex.RSC>
                  <Space.H3 />
                  <Text>{`${address.fullAddress} ${address.detailAddress}`}</Text>
                  <Space.H3 />
                  <CheckBox
                    checked={address.isDefault}
                    onClick={() => {
                      handleAddressDefaultCheck({
                        addressId: address.id,
                      });
                    }}
                    label={'기본 배송지로 선택'}
                  />
                </div>
                <Space.V4 />
              </Flex.RSS>
              <Space.H6 />
            </Box>
          );
        })}
      </Grid>
    </Template>
  );
};
MyPageAddressPageTemplate.Mobile = MyPageAddressPageTemplateMobile;
