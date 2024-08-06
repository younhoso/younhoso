import { FC, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { Box, Container, Divider, Flex, Space } from '@/components/atoms';
import { Sidebar } from '@/components/organisms';
import { Menu, MenuCategory, MenuSubOption, MenuSubOptionItem } from '@/types';

import AddToCartSection from './fragments/AddToCartSection';
import LeftSection from './fragments/LeftSection';
import RightSection from './fragments/RightSection';
import { ProductPageTemplateMobile } from './mobile';

export interface ProductPageTemplateProps {
  selectedSubOptionData: { id: number; itemIds: number[] }[];
  needRequiredOptionsSelected: boolean;
  menuDetail: Menu;
  menuSubOptions: MenuSubOption[];
  menuCategories: MenuCategory[];
  onOptionItemClick: (option: MenuSubOption, item: MenuSubOptionItem) => void;
  handleAddToCartButtonClick: () => void;
}

export interface ProductPageTemplateComponentProps extends ProductPageTemplateProps {}

export const ProductPageTemplate: FC<ProductPageTemplateComponentProps> & {
  Mobile: FC<ProductPageTemplateComponentProps>;
} = ({ ...rest }) => {
  const stickySensorRef = useRef(null);
  const [stickyVisible, setStickyVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (stickySensorRef.current) {
        const rect = (stickySensorRef.current as any).getBoundingClientRect();

        if (rect.bottom <= window.innerHeight) {
          setStickyVisible(false);
        } else {
          setStickyVisible(true);
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Template>
            <Space.H3 />
            <Box border="lightgray" style={{ borderBottom: 'none' }}>
              <Flex.CSS full layout="1 auto">
                <Flex.RSS full layout="1.2 1">
                  <div>
                    <LeftSection {...rest} />
                  </div>
                  <div>
                    <RightSection {...rest} />
                  </div>
                </Flex.RSS>
              </Flex.CSS>
              <Divider />
              <AddToCartSection {...rest} />
              <div ref={stickySensorRef} style={{ position: 'relative', top: 1 }}></div>
            </Box>
          </Template>
        </Container.Body>
        <Container.Sidebar>
          <Sidebar />
        </Container.Sidebar>
      </Container>
      <StickyBox full style={!stickyVisible ? { display: 'none' } : {}}>
        <Container>
          <Container.Body>
            <Box border={'lightgray'} background={'white'}>
              <AddToCartSection {...rest} />
            </Box>
          </Container.Body>
          <Container.Sidebar></Container.Sidebar>
        </Container>
      </StickyBox>
    </Wrapper>
  );
};
ProductPageTemplate.Mobile = ProductPageTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;

const StickyBox = styled(Box)`
  position: fixed;
  bottom: -1px;
  z-index: 1;
`;
