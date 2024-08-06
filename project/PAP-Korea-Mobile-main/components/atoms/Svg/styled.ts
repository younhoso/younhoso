import styled from 'styled-components';

export const SvgStyled = styled.div<{
  icon: any;
  color?: string;
  width: string;
  height: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.color};
  -webkit-mask: ${props => `url(${props.icon.src}) no-repeat center`};
  mask: ${props => `url(${props.icon.src}) no-repeat center`};
  mask-size: inherit;
  transition: 0.4s;
`;
