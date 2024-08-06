'use client';

import clsx from 'clsx';

import { DetailInfoMobileStyled } from './styled';

export interface DetailInfoMobileProps {
  className?: string;
  label: string;
  value: string;
}

const DetailInfoMobile = ({ className, label, value }: DetailInfoMobileProps) => {
  return (
    <DetailInfoMobileStyled className={clsx('DetailInfoMobile', className)}>
      <div className="detailInfo-inner">
        <p className="left-info">{label}</p>
        <p className="rigth-info">{value}</p>
      </div>
    </DetailInfoMobileStyled>
  );
};

export default DetailInfoMobile;
