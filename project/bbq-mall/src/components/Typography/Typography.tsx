'use client';

import clsx from 'clsx';

import { TypographyStyled } from './styled';

export interface TypographyProps {
  label: string;
}

const Typography = ({ label, ...props }: TypographyProps) => {
  return (
    <TypographyStyled className={clsx('typography')} {...props}>
      <div className="title01">{label}</div>
      <div className="title02">{label}</div>
      <div className="title03">{label}</div>
      <div className="title04">{label}</div>
      <div className="title05">{label}</div>
      <div className="title06">{label}</div>
      <div className="type07">{label}</div>
    </TypographyStyled>
  );
};

export default Typography;
