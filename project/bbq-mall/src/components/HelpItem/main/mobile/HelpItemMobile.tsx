'use client';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';

import newIcon from '@/assets/images/components/new-icon.svg';
import pin from '@/assets/images/components/pin.svg';
import rightArrow from '@/assets/images/help/right-arrow.svg';

import { HelpItemMobileStyled } from './styled';

export interface HelpItemMobileProps {
  className?: string;
  notice?: boolean;
  title: string;
  registerYmdt: string;
  showPin?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
  showNew?: boolean;
  writer?: string;
}

const HelpItemMobile = ({
  className,
  notice,
  title,
  registerYmdt,
  showPin,
  showArrow,
  onClick,
  showNew,
  writer = '비비큐 몰',
}: HelpItemMobileProps) => {
  const registerDate = new Date(registerYmdt);
  return (
    <HelpItemMobileStyled className={clsx('HelpItemMobile', className)} onClick={onClick}>
      <div className="mobile-help-item-left">
        <div className="mobile-help-item-title">
          {notice && showPin && <Image src={pin} width={20} height={20} alt="notice-item" />}
          {title}
          {showNew && dayjs().diff(dayjs(registerDate), 'hours', true) < 24 && (
            <Image src={newIcon} width={12} height={12} alt="new" />
          )}
        </div>
        <div className="mobile-help-item-info">
          <p>{writer}</p>
          <p>{dayjs(registerDate).format('YYYY.MM.DD')}</p>
        </div>
      </div>
      {showArrow && <Image src={rightArrow} width={20} height={20} alt="go-to-item-image" />}
    </HelpItemMobileStyled>
  );
};

export default HelpItemMobile;
