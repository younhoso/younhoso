'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import rightArrow from '@/assets/images/components/right-arrow-999.svg';
import chicken from '@/assets/images/my/chicken-with-chicken.png';
import Divider from '@/components/Divider';
import { signItemList } from '@/components/MyCategory/main/pc/MyCategory';
import MyItem from '@/components/MyItem';
import { useHandleWebview } from '@/hooks/useHandleWebview';
import { MobileMySignPageStyled } from '@/styles/pageStyled/mobile/mobileMySignPageStyled';

const MobileMySign = () => {
  const router = useRouter();
  const { handleLogin } = useHandleWebview();
  return (
    <MobileMySignPageStyled>
      <div className="login-needed">
        <div className="login-needed-info">
          <h3 onClick={handleLogin}>
            로그인하세요
            <Image src={rightArrow} width={16} height={16} alt="go" />
          </h3>
          <p>로그인하고 비비큐의</p>
          <p>멤버십 혜택을 만나보세요!</p>
          <div onClick={() => router.push('/my/membership')}>멤버십 혜택</div>
        </div>
        <Image src={chicken} width={150} height={150} alt="chicken" unoptimized />
      </div>
      <Divider.Mobile />
      <div className="login-needed-item">
        {signItemList.map(v => (
          <MyItem.Mobile label={v.label} onClick={() => router.push(v.linkTo)} key={v.label} />
        ))}
      </div>
    </MobileMySignPageStyled>
  );
};

export default MobileMySign;
