import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { AccountAPI, ContentAPI, MenuAPI } from '@/apis';
import { Flex, Space, Text } from '@/components/atoms';
import { Desktop, Mobile } from '@/components/functions';
import { Button, useModal } from '@/components/molecules';
import { BannerPopup, useCIModal } from '@/components/organisms';
import { HomePageTemplate } from '@/components/templates';
import { FONTSIZE_16, FONTSIZE_18, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { isArsSessionState } from '@/stores';
import { EventBanner, MenuCategory, PopupBanner } from '@/types';
import { parseApiError } from '@/utils';

const CIRequiredPopup = ({
  handleAgreeButtonClick,
  handleCancelButtonClick,
}: {
  handleAgreeButtonClick: () => void;
  handleCancelButtonClick: () => void;
}) => {
  return (
    <Flex.CCC full padding={PLANCK * 2}>
      <Text size={FONTSIZE_18} lineHeight={'1em'} weight={700} align="center">
        본인 인증 안내
      </Text>
      <Space.H3 />
      <Text size={FONTSIZE_16} lineHeight={'1.5em'} weight={500} align="center">
        원할한 서비스 이용을 위해
        <br />
        통신사 본인 인증이 1회 필요합니다.
        <br />
        지금 본인 인증을 진행하시겠습니까?
      </Text>
      <Space.H6 />
      <Flex.RSC layout="1 auto 1" full>
        <Button
          full
          fill={false}
          color="gray"
          shape="round"
          textColor="black"
          text="취소"
          onClick={() => handleCancelButtonClick()}
          style={{ height: 50 }}
        />
        <Space.V1_5 />
        <Button
          full
          color="red"
          shape="round"
          text="확인"
          onClick={() => handleAgreeButtonClick()}
          style={{ height: 50 }}
        />
      </Flex.RSC>
    </Flex.CCC>
  );
};

export default function HomePage() {
  const { member } = useAuth();
  const { openModal, closeModal } = useModal();
  const { openCIModal, closeCIModal } = useCIModal();
  const [popupBanner, setPopupBanner] = useState<PopupBanner[] | undefined>(undefined);
  const [categories, setCategories] = useState<MenuCategory[] | undefined>(undefined);
  const [banners, setBanners] = useState<EventBanner[] | undefined>(undefined);
  const isArs = useRecoilValue(isArsSessionState);

  useEffect(() => {
    ContentAPI.Popup.get()
      .then(res => {
        setPopupBanner(res);
      })
      .catch(err => {
        console.error(err);
      });
    MenuAPI.Category.getList()
      .then(res => {
        setCategories(res);
      })
      .catch(err => {
        console.error(err);
      });
    ContentAPI.Banner.getList()
      .then(res => {
        // TODO: 지금 아무런 값이 안와서 임시로 넣었음. 삭제해야 함.
        setBanners(
          res.length
            ? res
            : [
                {
                  id: 1,
                  pcImageUrl: '',
                  mobileImageUrl: '',
                  startDate: '',
                  endDate: '',
                  aosUrl: '',
                  iosUrl: '',
                  webUrl: '',
                  isActive: true,
                  priority: 1,
                },
              ],
        );
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!member || !member.memberId) {
      return;
    }
    if (!member.isMemberCiRegistered) {
      openModal({
        title: '알림',
        body: (
          <CIRequiredPopup
            handleAgreeButtonClick={() => {
              closeModal();

              openCIModal({
                onSuccess: ({ ciToken }) => {
                  closeCIModal();
                  AccountAPI.Member.CI.set({
                    ciToken,
                  })
                    .then(() => {
                      window.location.reload();
                    })
                    .catch(error => {
                      console.error(error);
                      alert(parseApiError(error).message);
                      window.location.reload();
                    });
                },
                onCancel: () => {
                  closeCIModal();
                },
                onError: ({ error }) => {
                  closeCIModal();
                  console.error(error);
                  alert(parseApiError(error).message);
                },
              });
            }}
            handleCancelButtonClick={() => {
              closeModal();
            }}
          />
        ),
      });
    }
  }, [member]);

  if (!categories || !banners) {
    return null;
  }

  return (
    <>
      <Desktop>
        <HomePageTemplate eventBanners={banners} categories={categories} />
      </Desktop>
      <Mobile>
        <HomePageTemplate.Mobile eventBanners={banners} categories={categories} />
      </Mobile>
      {!isArs && popupBanner && popupBanner.length ? (
        <BannerPopup popupBanner={popupBanner} />
      ) : null}
    </>
  );
}
