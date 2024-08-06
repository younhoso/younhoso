import { FC, ReactNode } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Image } from '@/components/atoms';
import { PLANCK } from '@/constants';

export interface BannerCardProps {}

export interface BannerCardComponentProps extends BannerCardProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const BannerCard: FC<BannerCardComponentProps> = props => {
  const { className, children, ...rest } = props;

  return (
    <Wrapper>
      <Image src="" backgroundPosition="center" backgroundSize="cover" height="56.25%"></Image>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${PLANCK * 3}px;
  box-sizing: border-box;
`;
