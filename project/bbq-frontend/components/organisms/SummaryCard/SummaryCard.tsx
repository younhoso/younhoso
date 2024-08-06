import { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';

import classNames from 'classnames';
import styled from 'styled-components';

import { Box, Divider, Flex, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import {
  COLOR_PRIMARY,
  FONTSIZE_15,
  FONTSIZE_16,
  FONTSIZE_20,
  FONTSIZE_24,
  PLANCK,
} from '@/constants';

import { SummaryCardMobile } from './mobile';

export interface SummaryCardProps {
  title: string;
  body: {
    items: {
      name: string;
      value: string;
      highlighted: boolean;
    }[];
  };
  bottom: {
    items: {
      name: string;
      value: string;
    }[];
    suffix?: ReactNode | ReactNode[] | string;
    warnings?: string[];
  };
  button?: {
    disabled?: boolean;
    title?: string;
    loading?: boolean;
    url?: string;
    color?: string;
    textColor?: string;
    onClick?: () => void;
  };
}

export interface SummaryCardComponentProps extends SummaryCardProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const SummaryCard: FC<SummaryCardComponentProps> & {
  Mobile: FC<SummaryCardComponentProps>;
} = ({
  title,
  body: { items: bodyItems },
  bottom: { items: bottomItems, suffix: bottomSuffix, warnings },
  button,
  className,
  children,
  ...rest
}) => {
  const router = useRouter();

  return (
    <Box
      className={classNames(className)}
      {...rest}
      padding={`${PLANCK * 7}px ${PLANCK * 5}px`}
      border="black"
      background="white"
    >
      <Text size={FONTSIZE_20}>{title}</Text>
      <Space.H5 />
      <Divider />
      <Space.H5 />
      <Flex.CSS full gap={PLANCK * 5} padding={`0 0 0 ${PLANCK * 2.5}px`}>
        {bodyItems.map((item, index) => (
          <Flex.RSC full layout="auto auto 1 auto" key={index}>
            <PlusIcon />
            <Space.V2 />
            <Text size={FONTSIZE_16} color={'#777777'}>
              {item.name}
            </Text>
            <Text size={FONTSIZE_16} color={item.highlighted ? COLOR_PRIMARY : '#777777'}>
              {item.value}
            </Text>
          </Flex.RSC>
        ))}
      </Flex.CSS>
      <Space.H5 />
      <Divider />
      <Space.H5 />
      <Flex.CSS full gap={PLANCK * 5}>
        {bottomItems.map((item, index) => (
          <Flex.RSC full layout="1 auto" key={index}>
            <Text size={FONTSIZE_16}>{item.name}</Text>
            <Text size={FONTSIZE_24} weight={700}>
              {item.value}
            </Text>
          </Flex.RSC>
        ))}
      </Flex.CSS>
      {bottomSuffix ? (
        <>
          <Space.H2 />
          {bottomSuffix}
        </>
      ) : null}
      <Space.H5 />
      <Button
        full
        disabled={button?.disabled || button?.loading}
        text={button?.title ? button?.title : '결제하기'}
        color={button?.color ? button?.color : 'red'}
        textColor={button?.textColor ? button?.textColor : undefined}
        shape="round"
        size="big"
        onClick={() => {
          if (button?.onClick) {
            button?.onClick();
          } else {
            router.push(button?.url ?? '/checkout');
          }
        }}
      />
      {warnings && warnings.length ? (
        <>
          <Space.H4 />
          <Flex.CSS full gap={PLANCK * 2}>
            {warnings.map((warning, index) => (
              <Flex layout="auto auto 1" key={index}>
                <Text color={'#324266'} size={FONTSIZE_15} lineHeight={'1.5em'}>
                  ⚠
                </Text>
                <Space.V1_5 />
                <Text color={'#324266'} size={FONTSIZE_15} lineHeight={'1.5em'}>
                  {warning}
                </Text>
              </Flex>
            ))}
          </Flex.CSS>
        </>
      ) : null}
    </Box>
  );
};
SummaryCard.Mobile = SummaryCardMobile;

const PlusIcon = styled.div`
  position: relative;
  width: 8px;
  height: 16px;

  &::before,
  &::after {
    pointer-events: none;
    position: absolute;
    content: '';
    display: block;
    width: 8px;
    height: 2px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: ${COLOR_PRIMARY};
  }

  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;
