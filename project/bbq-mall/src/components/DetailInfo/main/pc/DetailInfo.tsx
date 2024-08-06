'use client';

import clsx from 'clsx';

import { DetailInfoStyled } from './styled';

export interface DetailInfoProps {
  className?: string;
  label: string;
  value: string;
}

const DetailInfo = ({ className, label, value }: DetailInfoProps) => {
  return (
    <DetailInfoStyled className={clsx('DetailInfo', className)}>
      <div className="detailInfo-inner">
        <p className="left-info">{label}</p>
        <p className="rigth-info">{value}</p>
      </div>
    </DetailInfoStyled>
  );
};

export default DetailInfo;
