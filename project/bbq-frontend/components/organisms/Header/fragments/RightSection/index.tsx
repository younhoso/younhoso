import { FC, useEffect, useState } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { SIDEBAR_WIDTH } from '@/constants';
import { useAuth } from '@/hooks';

import { HeaderProps } from '../../Header';
import AfterLogin from './fragments/AfterLogin';
import BeforeLogin from './fragments/BeforeLogin';

interface HeaderRightSectionComponentProps extends HeaderProps {
  className?: string;
  [x: string]: any;
}

const HeaderRightSection: FC<HeaderRightSectionComponentProps> = ({ user, className, ...rest }) => {
  const { loading, member } = useAuth();

  // TODO: hydration을 이렇게해서 한번 쉬어가서 막거나, 아니면 서버에서 먼저 멤버와 다른 정보에 대해 가져와야함. 후자가 맞긴함.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <Wrapper className={classNames(className)} {...rest}>
      {loading ? null : (
        <>
          {!member && <BeforeLogin />}
          {member && <AfterLogin />}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: ${SIDEBAR_WIDTH}px;
  height: 100%;
`;

export default HeaderRightSection;
