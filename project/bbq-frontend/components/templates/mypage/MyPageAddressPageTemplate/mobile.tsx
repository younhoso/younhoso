import { FC } from 'react';

import { Box, CheckBox, Flex, Grid, Icon, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { RegisterAddressPopup } from '@/components/organisms';
import { FONTSIZE_13, FONTSIZE_16, PLANCK } from '@/constants';

import { Template } from '../components';
import { MyPageAddressPageTemplateComponentProps } from './MyPageAddressPageTemplate';

export const MyPageAddressPageTemplateMobile: FC<MyPageAddressPageTemplateComponentProps> = ({
  refetch,
  addresses,
  handleAddressDeleteButtonClick,
  handleAddressDefaultCheck,
}) => {
  const { openModal } = useModal();

  return (
    <Template.Mobile
      title="배송지 관리"
      button={
        <Button.Mobile
          onClick={() => {
            openModal({
              title: '배송지 등록',
              body: <RegisterAddressPopup defaultAddress={undefined} refetch={refetch} />,
            });
          }}
          shape={'round'}
          color={'red'}
          text={'+ 배송지 등록'}
        ></Button.Mobile>
      }
    >
      <Grid columnCount={1} gap={PLANCK * 3}>
        {addresses.map((address, index) => {
          return (
            <Box key={index} border="lightgray">
              <Space.H3 />
              <Flex.RSS layout="auto auto auto 1 auto">
                <Space.V2 />
                <Icon size="28px" src="bbq-point.svg" />
                <Space.V2 />
                <div>
                  <Flex.RSC layout="1 auto">
                    <Text size={FONTSIZE_16}>{address.deliveryName}</Text>
                    <Flex.RSC>
                      <Button.Mobile
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
                      <Button.Mobile
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
                  <Space.H2 />
                  <Text
                    size={FONTSIZE_13}
                    lineHeight={'1.4em'}
                  >{`${address.fullAddress} ${address.detailAddress}`}</Text>
                  <Space.H2 />
                  <CheckBox.Mobile
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
              <Space.H5 />
            </Box>
          );
        })}
      </Grid>
    </Template.Mobile>
  );
};
