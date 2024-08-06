'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import axios from 'axios';

import CardReview from '@/components/CardReview';
import Cardslide from '@/components/Cardslide';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import MainBanner from '@/components/MainBanner';
import MainProductCard from '@/components/MainProductCard';
import Popup from '@/components/Popup';
import { PopupSlide, hideTodayKey } from '@/components/Popup/main/pc/Popup';
import { CartMutateBody } from '@/components/ProductOptionPayInfo/main/pc/ProductOptionPayInfo';
import SectionDescription from '@/components/SectionDescription';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useAddCart } from '@/hooks/useAddCart';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { queryClient } from '@/provider/ReactQueryProvider';
import { MobileRootPageStyled } from '@/styles/pageStyled/mobile/mobileRootPageStyled';
import { Cart, DetailCategory, PopupDetail } from '@/types';
import { Product } from '@/types/categorymenu';
import { AdditionalSection, BasicSection, ReviewData } from '@/types/mainProduct';
import { arrangeProductList } from '@/utils/arrangeProducList';
import { flattenBanners } from '@/utils/dataCustom';
import { getLocalStorageItem, removeLocalStorageItem } from '@/utils/localStorage';

const limitReview = 15;
const BANNERID = 'mo_main_banner_top'; //관리자 > "헤드리스 배너 관리"에 있는 고유한 배너ID

const Mobile = () => {
  const { isSignIn } = useHandleIsSignIn();
  const { addCart } = useAddCart(PLATFORMLIST.MOBILE_WEB, false);
  const {
    data: mainbannerDatas,
    isPending: mainbannerIsLoading,
    error: mainbannerError,
  } = useQuery({
    queryKey: ['mainbanner'],
    queryFn: async () => {
      const { data: bannerTopData } = await customAxios(PLATFORMLIST.MOBILE_WEB).get(
        `/display/banners/id/${BANNERID}`,
      );

      return {
        contents: flattenBanners(bannerTopData),
      };
    },
  });

  const {
    data: mainProductCardDatas,
    isPending: mainProductCardIsLoading,
    error: mainProductCardError,
  } = useQuery({
    queryKey: ['mainProductCard'],
    queryFn: async () => {
      const { data } = await axios.get<{
        productCardGetData: (BasicSection & AdditionalSection)[];
        productsectionsGetData: {
          sectionId: string;
          sectionExplain: string;
          label: string;
          items: Product[];
        }[];
      }>('/api/main/product', { params: { platform: PLATFORMLIST.MOBILE_WEB } });

      return data;
    },
  });

  const {
    data: mainReviewDatas,
    isPending: mainReviewIsLoading,
    error: mainReviewError,
  } = useCustomQuery({
    queryKey: ['/category/product-reviews'],
    platform: PLATFORMLIST.MOBILE_WEB,
    params: {
      bestReviewYn: 'Y',
      categoryDepth: '1',
      'order.direction': 'DESC',
      pageNumber: 1,
      pageSize: limitReview,
    },
  });

  const { data: detailCategory } = useQuery({
    queryKey: ['/categories'],
    queryFn: () => customAxios(PLATFORMLIST.MOBILE_WEB).get<DetailCategory>('/categories'),
  });

  const noToday = getLocalStorageItem(hideTodayKey);
  const { data: popup, isPending } = useQuery({
    queryKey: ['/display/popups'],
    queryFn: async ({ queryKey: [key] }) => {
      const { data } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<PopupDetail[]>(key);
      return data.reduce((acc: PopupSlide[], cur) => {
        const { mainImageUrl, landingUrl } = cur.popupSlideInfo.slideImages?.[0];
        acc.push({ image: mainImageUrl, url: landingUrl });

        return acc;
      }, []);
    },
  });
  useEffect(() => {
    if (!isSignIn) {
      return;
    }
    const guestCart = getLocalStorageItem<CartMutateBody[]>('cart');

    if (!guestCart || !guestCart.length) {
      return;
    }

    (async () => {
      const { data } = await queryClient.fetchQuery({
        queryKey: ['cart'],
        queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.MOBILE_WEB).get<Cart>(key),
      });

      const original = arrangeProductList(data?.deliveryGroups);
      const filtered = guestCart.filter(
        v =>
          !original.some(
            k => `${k.productNo}` + `${k.optionNo}` === `${v.productNo}` + `${v.optionNo}`,
          ),
      );

      await addCart(filtered);
      removeLocalStorageItem('cart');
    })();
  }, [isSignIn]);

  const isLoading =
    mainbannerIsLoading || mainProductCardIsLoading || mainReviewIsLoading || isPending;

  if (isLoading) {
    return <Loading.Mobile />;
  }

  return (
    <>
      <Header.Mobile />
      <MobileRootPageStyled>
        {!!mainbannerDatas?.contents.length && (
          <MainBanner.Mobile error={mainbannerError} data={mainbannerDatas} />
        )}
        <MainProductCard.Mobile
          error={mainProductCardError}
          data={mainProductCardDatas?.productCardGetData}
          categoryData={detailCategory?.data.multiLevelCategories}
        />

        {mainProductCardDatas?.productsectionsGetData.map(item => (
          <Cardslide.Mobile
            key={item.label}
            data={item}
            categoryData={detailCategory?.data.multiLevelCategories}
            error={mainProductCardError}
          >
            <SectionDescription.Mobile
              data={item}
              categoryData={detailCategory?.data.multiLevelCategories}
            />
          </Cardslide.Mobile>
        ))}

        <CardReview.Mobile data={mainReviewDatas as ReviewData} error={mainReviewError} />
      </MobileRootPageStyled>
      <Footer.Mobile />
      {!noToday && !!popup?.length && <Popup.Mobile popupList={popup} />}
    </>
  );
};

export default Mobile;
