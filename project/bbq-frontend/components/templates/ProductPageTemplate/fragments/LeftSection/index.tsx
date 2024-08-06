import { FC, useCallback } from 'react';

import { Arrow, Box, Flex, Icon, Image, Space, Text } from '@/components/atoms';
import { useModal } from '@/components/molecules';
import { NutritionalInformationPopup } from '@/components/organisms';
import { FONTSIZE_12, FONTSIZE_14, FONTSIZE_18, FONTSIZE_22, PLANCK } from '@/constants';

import { ProductPageTemplateProps } from '../../';

const LeftSection: FC<ProductPageTemplateProps> = props => {
  const { menuDetail, menuCategories } = props;
  const { openModal } = useModal();
  const handleNutritionalInformationButtonClick = useCallback(() => {
    openModal({
      title: '영양정보',
      body: <NutritionalInformationPopup menuDetail={menuDetail} />,
    });
  }, [menuDetail]);

  return (
    <div>
      <Image
        src={menuDetail.menuImageUrl}
        height={'62.8070175439%'}
        backgroundPosition={'center'}
        backgroundSize={'cover'}
      />
      <Box padding={PLANCK * 4}>
        <Flex.CCS>
          {menuCategories && menuCategories.length ? (
            <>
              {menuCategories.map((menuCategory, index) => (
                <Box key={index} background={`#EFF0F4`} shape={'9999px'}>
                  <Flex.RCC style={{ height: 30 }}>
                    {menuCategory.categoryImageUrl &&
                    menuCategory.categoryImageUrl.trim().length ? (
                      <>
                        <Space.V1_5 />
                        <Icon src={menuCategory.categoryImageUrl} size={24} />
                        <Space.V1 />
                      </>
                    ) : null}
                    <Text size={FONTSIZE_14}>{menuCategory.categoryName}</Text>
                    <Space.V2_5 />
                  </Flex.RCC>
                </Box>
              ))}
              <Space.H3 />
            </>
          ) : null}
          <Text size={FONTSIZE_22}>{menuDetail.menuName}</Text>
          <Space.H3 />
          <Text size={FONTSIZE_14} color={'#777777'} lineHeight={'1.5em'}>
            {menuDetail.description}
          </Text>
          <Space.H3 />
          <Text size={FONTSIZE_18}>{`${menuDetail.menuPrice.toLocaleString()}원`}</Text>
          <Space.H4 />
          <div onClick={handleNutritionalInformationButtonClick} style={{ cursor: 'pointer' }}>
            <Flex.RSC>
              <Text size={FONTSIZE_12} color={'#777777'}>
                영양정보 보기
              </Text>
              <Space.V1 />
              <div style={{ transform: 'translateY(-13%)' }}>
                <Arrow.Right size={2.5} color={'#777777'} thickness={1.5} />
              </div>
            </Flex.RSC>
          </div>
        </Flex.CCS>
      </Box>
    </div>
  );
};

export default LeftSection;
