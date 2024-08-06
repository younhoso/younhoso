import { Box, Flex, Grid, Space, Text } from '@/components/atoms';
import { FONTSIZE_12, FONTSIZE_14, FONTSIZE_16, PLANCK } from '@/constants';
import { Menu } from '@/types';

export const NutritionalInformationPopup = ({
  menuDetail,
  nutrientGridColumnCount = 5,
}: {
  menuDetail: Menu;
  nutrientGridColumnCount?: number;
}) => {
  return (
    <Flex.CSS full padding={PLANCK * 3}>
      <Text size={FONTSIZE_16}>원산지 정보</Text>
      <Space.H2_5 />
      {menuDetail.origin && menuDetail.origin.length ? (
        menuDetail.origin.map((origin, index) => {
          return (
            <Flex.RSC key={index}>
              <Text size={FONTSIZE_14} color={'#777777'}>
                • {origin.name}
              </Text>
              <Space.V2 />
              <Text size={FONTSIZE_14}>{origin.region}</Text>
            </Flex.RSC>
          );
        })
      ) : (
        <Text size={FONTSIZE_14} color={'#777777'}>
          정보 없음
        </Text>
      )}
      <Space.H5 />
      <Flex.RBC full>
        <Text size={FONTSIZE_16}>영양 정보</Text>
        <Text size={FONTSIZE_12} color={'#777777'}>
          ※100g 당 함량 기준으로 표기함.
        </Text>
      </Flex.RBC>
      <Space.H2_5 />
      <Grid columnCount={nutrientGridColumnCount} gap={PLANCK * 1.5}>
        {['calorie', 'sugars', 'protein', 'saturatedFat', 'natrium'].map((key, index) => {
          const value = (menuDetail.nutrient as any)[key] ?? 0;

          return (
            <Box key={index} shape={10} background={'#ebebeb'} padding={PLANCK * 2.5}>
              <Flex.CCC>
                <Text size={FONTSIZE_12} color={'#666666'}>
                  {(key => {
                    switch (key) {
                      case 'calorie':
                        return '열량(kcal)';
                      case 'sugars':
                        return '당류(g)';
                      case 'protein':
                        return '단백질(g)';
                      case 'saturatedFat':
                        return '포화지방(g)';
                      case 'natrium':
                        return '나트륨(mg)';
                    }
                  })(key)}
                </Text>
                <Space.H1 />
                <Text size={FONTSIZE_12}>{value}</Text>
              </Flex.CCC>
            </Box>
          );
        })}
      </Grid>
      <Space.H5 />
      <Flex.RBC full>
        <Text size={FONTSIZE_16}>알레르기 정보</Text>
      </Flex.RBC>
      <Space.H2_5 />
      <Text size={FONTSIZE_14} color={'#777777'} lineHeight={'1.5em'}>
        {menuDetail.allergy && menuDetail.allergy.length ? menuDetail.allergy : '정보 없음'}
      </Text>
    </Flex.CSS>
  );
};
