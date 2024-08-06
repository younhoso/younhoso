import React, { FC } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

export interface DimProps {
  opacity?: number;
}

export interface DimComponentProps extends DimProps {
  className?: string;
  [x: string]: any;
}

export const Dim: FC<DimComponentProps> = props => {
  const { opacity, className, ...rest } = props;

  return (
    <Wrapper opacity={opacity ?? 0.5} className={classNames(className)} {...rest}>
      &nbsp;
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  opacity: number;
}>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  background-color: #000;
  transition: opacity 0.25s ease-in-out;
  opacity: ${props => props.opacity};
  ${props => (props.opacity <= 0 ? `pointer-events: none;` : ``)}
`;
