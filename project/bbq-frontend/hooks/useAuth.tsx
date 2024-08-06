import { signOut } from 'next-auth/react';
import { ReactNode, createContext, useContext, useEffect } from 'react';

import { Session } from 'next-auth';
import { useRouter } from 'next/router';

import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from 'recoil';

import {
  accountDefaultAddressState,
  accountDeliveryInfoState,
  accountGradeState,
  accountPointStatusState,
  cartCountState,
  memberState,
  sessionState,
} from '@/stores';
import { Address, GetAccountMemberAPIResponse, Grade } from '@/types';
import { parseApiError } from '@/utils';

export interface AuthContextType {
  loading: boolean;
  session: Session | null | undefined;
  member: GetAccountMemberAPIResponse | null | undefined;
  memberLoadingStatus: 'hasError' | 'hasValue' | 'loading';
  defaultAddress: Address | null | undefined;
  reloadDefaultAddress: () => void;
  cartCount: number | null | undefined;
  reloadCartCount: () => void;
  pointAmount: number | null | undefined;
  reloadPointAmount: () => void;
  membershipCouponCount: number | null | undefined;
  ecouponCount: number | null | undefined;
  grade: Grade | null | undefined;
}

export const AuthContext = createContext<AuthContextType>({
  loading: true,
  session: null,
  member: null,
  memberLoadingStatus: 'loading',
  defaultAddress: null,
  reloadDefaultAddress: () => {},
  cartCount: null,
  reloadCartCount: () => {},
  pointAmount: null,
  reloadPointAmount: () => {},
  membershipCouponCount: null,
  ecouponCount: null,
  grade: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
  const router = useRouter();

  const { state: sessionLoadingStatus, contents: session } = useRecoilValueLoadable(sessionState);
  const { state: memberLoadingStatus, contents: member } = useRecoilValueLoadable(memberState);
  const { state: accountDefaultAddressLoadingStatus, contents: accountDefaultAddress } =
    useRecoilValueLoadable(accountDefaultAddressState);
  const reloadDefaultAddress = useRecoilRefresher_UNSTABLE(accountDefaultAddressState);
  const { state: cartCountLoadingStatus, contents: cartCount } =
    useRecoilValueLoadable(cartCountState);
  const reloadCartCount = useRecoilRefresher_UNSTABLE(cartCountState);
  const { state: pointStatusLoadingStatus, contents: pointStatus } =
    useRecoilValueLoadable(accountPointStatusState);
  const reloadPointAmount = useRecoilRefresher_UNSTABLE(accountPointStatusState);
  const { state: deliveryInfoLoadingStatus, contents: deliveryInfo } =
    useRecoilValueLoadable(accountDeliveryInfoState);
  const { state: gradeLoadingStatus, contents: grade } = useRecoilValueLoadable(accountGradeState);

  // NOTE: middleware.ts에서 멤버의 기본 주소를 체크하는 함수를 여기로 옮겨서 중복 호출을 막음
  // NOTE: 토큰의 유효를 체크해서 로그아웃 시키는 것을 이쪽에서 전부 처리하도록 함.
  useEffect(() => {
    if (!router.isReady) return;
    if (router.asPath.startsWith('/address')) return;
    if (!session) return;
    // 리프레쉬 토큰이 만료된 것으로 처리 되면 -> 로그아웃 순서를 밟는다.
    if (session && session.refreshTokenExpired) {
      // TODO: 멤버만 처리해야할지 의사결정 필요
      signOut()
        .then(() => {
          window.location.href = '/reset';
        })
        .catch(err => {
          console.error(err);
          alert(parseApiError(err).message);
          window.location.href = '/reset';
        });
    }
    if (!memberLoadingStatus || memberLoadingStatus === 'loading') return;
    if (!member) return;
    if (!accountDefaultAddressLoadingStatus || accountDefaultAddressLoadingStatus === 'loading')
      return;
    if (!accountDefaultAddress) {
      router.replace(`/address/permission?redirect_to=${encodeURIComponent(router.asPath)}`);
    }
  }, [
    session,
    memberLoadingStatus,
    member,
    accountDefaultAddressLoadingStatus,
    accountDefaultAddress,
    router.asPath,
    router.isReady,
  ]);

  return (
    <AuthContext.Provider
      value={{
        loading: sessionLoadingStatus === 'loading' || memberLoadingStatus === 'loading',
        session:
          sessionLoadingStatus === 'loading'
            ? undefined
            : sessionLoadingStatus === 'hasValue'
              ? session ?? null
              : null,
        member:
          memberLoadingStatus === 'loading'
            ? undefined
            : memberLoadingStatus === 'hasValue'
              ? member ?? null
              : null,
        memberLoadingStatus: memberLoadingStatus,
        defaultAddress:
          accountDefaultAddressLoadingStatus === 'loading'
            ? undefined
            : accountDefaultAddressLoadingStatus === 'hasValue'
              ? accountDefaultAddress ?? null
              : null,
        reloadDefaultAddress: reloadDefaultAddress,
        cartCount:
          cartCountLoadingStatus === 'loading'
            ? undefined
            : cartCountLoadingStatus === 'hasValue'
              ? cartCount?.cartCount ?? null
              : null,
        reloadCartCount: reloadCartCount,
        pointAmount:
          pointStatusLoadingStatus === 'loading'
            ? undefined
            : pointStatusLoadingStatus === 'hasValue'
              ? pointStatus?.currentPoint ?? 0
              : 0,
        reloadPointAmount: reloadPointAmount,
        membershipCouponCount:
          deliveryInfoLoadingStatus === 'loading'
            ? undefined
            : deliveryInfoLoadingStatus === 'hasValue'
              ? deliveryInfo?.membershipCouponCount ?? 0
              : 0,
        ecouponCount:
          deliveryInfoLoadingStatus === 'loading'
            ? undefined
            : deliveryInfoLoadingStatus === 'hasValue'
              ? deliveryInfo?.ecouponCount ?? 0
              : 0,
        grade:
          gradeLoadingStatus === 'loading'
            ? undefined
            : gradeLoadingStatus === 'hasValue'
              ? grade ?? null
              : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
