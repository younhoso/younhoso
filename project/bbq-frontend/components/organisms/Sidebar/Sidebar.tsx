import { FC, ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { MenuAPI } from '@/apis';
import { COLOR_BORDER, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { useSidebarCart } from '@/stores';
import { GetMenuRecommendListAPIResponse } from '@/types';

import { LoginCard, OrderFormCard, OrderMethodCard, RecommendMenusCard } from '../';

export interface SidebarProps {}

export interface SidebarComponentProps extends SidebarProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const Sidebar: FC<SidebarComponentProps> = props => {
  const { className, ...rest } = props;

  const router = useRouter();
  const { member } = useAuth();

  const [newMenusData, setNewMenusData] = useState<GetMenuRecommendListAPIResponse | undefined>(
    undefined,
  );
  const [recommendedMenusData, setRecommendedMenusData] = useState<
    GetMenuRecommendListAPIResponse | undefined
  >(undefined);

  const { data: sidebarCart } = useSidebarCart();

  // 추천 메뉴 불러오기
  useEffect(() => {
    MenuAPI.Recommend.getList({
      type: 'recommended',
    })
      .then(res => {
        setRecommendedMenusData(res);
      })
      .catch(err => {
        console.error(err);
      });

    MenuAPI.Recommend.getList({
      type: 'new',
    })
      .then(res => {
        setNewMenusData(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Wrapper>
      <SectionGroups>
        <SectionGroup>
          <OrderMethodCard />
          {router.pathname === '/products/[id]' ? (
            <>
              {sidebarCart && sidebarCart.items && sidebarCart.items.length ? (
                <OrderFormCard />
              ) : null}
            </>
          ) : null}
        </SectionGroup>
        <SectionGroup>
          {!member ? <LoginCard /> : null}
          {newMenusData ? <RecommendMenusCard data={newMenusData} /> : null}
          {recommendedMenusData ? <RecommendMenusCard data={recommendedMenusData} /> : null}
        </SectionGroup>
      </SectionGroups>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SectionGroups = styled.div`
  padding-top: ${PLANCK * 3}px;
  padding-bottom: ${PLANCK * 3}px;
  box-sizing: border-box;

  & > *:not(:nth-child(1)) {
    margin-top: ${PLANCK * 4}px;
  }
`;

const SectionGroup = styled.div`
  border: 1px solid ${COLOR_BORDER};

  & > *:not(:nth-child(1)) {
    border-top: 1px solid ${COLOR_BORDER};
  }
`;
