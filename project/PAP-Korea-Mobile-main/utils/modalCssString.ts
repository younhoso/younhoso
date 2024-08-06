interface modalCssProps {
  display?: string;
  zIndex?: number;
  option?: string;
  opacity?: string | number;
}

export const modalCssString = ({
  option,
  zIndex,
  display,
  opacity,
}: modalCssProps) => `
position: fixed;
top: 0;
left: 0;
background: rgba(0, 0, 0, ${opacity || 0.8});
width: 100%;
height: 100%;
display: ${display || 'flex'};
justify-content: center;
align-items: center;
transition: 0.5s all;
opacity: 0;
visibility: hidden;
z-index: ${zIndex || '9999'};
backdrop-filter: blur(0.15rem);
  &.open {
    visibility: visible;
    opacity: 1;
  }

  ${option}
`;
