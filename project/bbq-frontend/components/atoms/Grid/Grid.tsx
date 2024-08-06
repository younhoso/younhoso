import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

export interface GridProps {
  columnCount: number;
  gap?: number;
}

export interface GridComponentProps extends GridProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Grid: FC<GridComponentProps> = props => {
  const { columnCount, gap, className, children, ...rest } = props;

  return (
    <Wrapper columnCount={columnCount} gap={gap ?? 0} className={classNames(className)} {...rest}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ columnCount: number; gap: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columnCount}, 1fr);
  grid-column-gap: ${props => props.gap}px;
  grid-row-gap: ${props => props.gap}px;
  width: 100%;
`;
