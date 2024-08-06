import { useState } from 'react';

import close from '~/assets/icon/close.svg';
import send from '~/assets/icon/send.svg';
import popup from '~/assets/image/popup.jpg';
import Img from '~/components/atoms/Img';
import Svg from '~/components/atoms/Svg';
import { numberToRem } from '~/utils/rem';

import { SubscribeModalStyled } from './styled';

import clsx from 'clsx';

interface SubscribeModalProps {
  className?: string;
}

const SubscribeModal = ({ className }: SubscribeModalProps) => {
  const [notShow, setNotShow] = useState(false);
  return (
    <SubscribeModalStyled className={clsx('SubscribeModal', className)}>
      <div className="contents">
        <Img src={popup} alt={''} />

        <div className="content">
          <div className="closeControls">
            <Svg
              className="closeBtn"
              icon={close}
              color="white"
              width={numberToRem(18, 1)}
              height={numberToRem(18, 1)}
            />
            <div className="todayNoShow" onClick={() => setNotShow(!notShow)}>
              <p>오늘 하루동안 열지 않기</p>
              <div className="checkbox">
                <div className={clsx('check', notShow && 'checked')}></div>
              </div>
            </div>
          </div>
          <div className="comment">
            <h1>NEVER MISS AN UPDATE</h1>
            <p>Get The Latest Updates Straight To Your Inbox!</p>
          </div>
          <div className={clsx('subseribe')}>
            <div>
              <button>SUBSERIBE</button>
            </div>
          </div>
        </div>
      </div>
    </SubscribeModalStyled>
  );
};

export default SubscribeModal;
