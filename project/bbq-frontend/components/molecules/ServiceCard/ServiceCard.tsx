import React, { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Space, Text } from '@/components/atoms';
import { COLOR_EVENT_CARD_SUBTITLE, COLOR_PLACEHOLDER, FONTSIZE_12 } from '@/constants';

import { ServiceCardMobile } from './mobile';

export interface ServiceCardProps {
  url: string;
  imageUrl: string;
  title: string;
  description: string;
}

export interface ServiceCardComponentProps extends ServiceCardProps {
  className?: string;
  [x: string]: any;
}

export const ServiceCard: FC<ServiceCardComponentProps> & {
  Mobile: FC<ServiceCardComponentProps>;
} = props => {
  const { url, imageUrl, title, description, className, ...rest } = props;

  return (
    <Wrapper href={url} className={classNames(className)} {...rest}>
      <Image src={imageUrl} className="-image" />
      {title ? (
        <>
          <Space.H2_5 />
          <Text size={13}>{title}</Text>
        </>
      ) : null}
      {description ? (
        <>
          <Space.H1_5 />
          <Text size={FONTSIZE_12} weight={500} color={COLOR_EVENT_CARD_SUBTITLE}>
            {description}
          </Text>
        </>
      ) : null}
    </Wrapper>
  );
};
ServiceCard.Mobile = ServiceCardMobile;

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;

  &:hover {
    & > .-image::after {
      transform: scale(1.1);
    }
  }
`;

const Image = styled.div<{ src?: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    width: 100%;
    display: block;
    padding-top: 47.7%;
  }

  &::after {
    transition: transform 0.2s;
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    ${({ src }) =>
      src && src.length
        ? `background-image: url(${src});`
        : `background-color: ${COLOR_PLACEHOLDER};`}
    background-size: cover;
    background-position: center;
  }
`;
