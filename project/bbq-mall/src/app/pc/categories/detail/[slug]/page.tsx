'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Element, Link } from 'react-scroll';

import Image from 'next/image';

import clsx from 'clsx';
import DOMPurify from 'dompurify';

import Acodion from '@/components/Acodion';
import DetailInfo from '@/components/DetailInfo';
import Loading from '@/components/Loading';
import ModalQnaForm from '@/components/ModalQnaForm';
import ProductDeliveryInfo from '@/components/ProductDeliveryInfo';
import ProductOptionPayInfo from '@/components/ProductOptionPayInfo';
import ProductPriceInfo from '@/components/ProductPriceInfo';
import ProductQna from '@/components/ProductQna';
import ProductReview from '@/components/ProductReview';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import {
  categoryDetailTabs,
  datailReviewPointData,
  detailOptionSortList,
  productStatus,
} from '@/constant/categoryDetailRelated';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { PcCategoriesDetailErrorStyled } from '@/styles/pageStyled/pc/PcCategoriesDetailErrorStyled';
import { PcCategoriesDetailSlugPageStyled } from '@/styles/pageStyled/pc/pcCategoriesDetailSlugPageStyled';
import { ProductInquiry, Reviewed } from '@/types';
import { DetailInfoData, detailProductInfoLabel } from '@/types/detailProductInfoData';
import { CombinedProduct, Item } from '@/types/productDetail';
import { CombinedProductOption } from '@/types/productOption';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';
import { comma } from '@/utils/regExp';

type Params = {
  params: {
    slug: string;
  };
};

const limitReview = 10;
const limitQna = 10;

const PcCategoriesDetailSlug = ({ params: { slug } }: Params) => {
  const queryClient = useQueryClient();
  const [isPopUp, setIsPopUp] = useState(false);
  const [productInfoData, setProductInfoData] = useState<
    { label: string; value: string }[] | undefined
  >([]);
  const { isSignIn } = useHandleIsSignIn();
  const [orderByKey, setOrderByKey] = useState(detailOptionSortList[0]);
  const [inquiryNo, setInquiryNo] = useState<number>(0);
  const [modifyItem, setModifyItem] = useState<ProductInquiry | undefined>(undefined);
  const [reviewPage, setReviewPage] = useState(1);
  const [qnaPage, setQnaPage] = useState(1);
  const [isOpenAcodion, setIsOpenAcodion] = useState<null | number>(null);

  const { data: userProfileQuery, refetch: userRefetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: productDetailData } = await customAxios(PLATFORMLIST.PC).get<{
        memberNo: number;
      }>(`/profile`);

      return productDetailData;
    },
    enabled: false,
  });

  useEffect(() => {
    if (isSignIn) {
      userRefetch();
    }
  }, [isSignIn]);

  const {
    data: productDetailQuery,
    isPending: isLoadingProductDetail,
    refetch: productDetailRefetch,
    error: errorProductDetail,
  } = useQuery({
    queryKey: [`/products/${slug}`],
    queryFn: async () => {
      const { data: productDetailData } = await customAxios(PLATFORMLIST.PC).get<CombinedProduct>(
        `/products/${slug}`,
      );

      return productDetailData;
    },
  });

  const { data: productDetailOptionQuery, isPending: isLoadingProductDetailOption } = useQuery({
    queryKey: ['productOption' + slug],
    queryFn: async () => {
      const { data: productDetailDataOption } = await customAxios(
        PLATFORMLIST.PC,
      ).get<CombinedProductOption>(`/products/${slug}/options`);

      return productDetailDataOption;
    },
  });

  const {
    data: reviews,
    isFetching: isFetchingReviews,
    isPending: isLoadingReviews,
    refetch,
  } = useCustomQuery<{ items: Reviewed[]; totalCount: number }>({
    queryKey: [`/products/${slug}/product-reviews`],
    platform: PLATFORMLIST.PC,
    params: {
      pageNumber: reviewPage,
      pageSize: limitReview,
      hasTotalCount: true,
      'order.by': detailOptionSortList.find(v => v.value === orderByKey.value)?.orderBy,
      'order.direction': detailOptionSortList.find(v => v.value === orderByKey.value)
        ?.orderDirection,
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [reviewPage, orderByKey.value, orderByKey.orderBy]);

  const {
    data: qnaData,
    isPending: isLoadingQna,
    refetch: qnaRefetch,
  } = useCustomQuery<{
    items: Item[];
    totalCount: number;
  }>({
    queryKey: [`/products/${slug}/inquiries`],
    platform: PLATFORMLIST.PC,
    params: {
      hasTotalCount: true,
      isMyInquiries: false,
      pageNumber: qnaPage,
      pageSize: limitQna,
    },
    enabled: false,
  });

  useEffect(() => {
    qnaRefetch();
  }, [qnaPage]);

  const handleEditClick = async ({ inquiryNo }: { inquiryNo: number }) => {
    setIsPopUp(true);

    const qnaInquiryData = await queryClient.fetchQuery({
      queryKey: [`/products/${slug}/inquiries/${inquiryNo}`],
      queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get(key),
    });

    setInquiryNo(inquiryNo);
    setModifyItem(qnaInquiryData.data);
  };

  const { mutateAsync: qnaDataMutat } = useMutation<number, unknown, number, unknown>({
    mutationFn: inquiryNo =>
      customAxios(PLATFORMLIST.PC).delete(`/products/inquiries/${inquiryNo}`),
  });

  const handleDeleteClick = async ({ inquiryNo }: { inquiryNo: number }) => {
    await qnaDataMutat(inquiryNo);
    qnaRefetch();
  };

  const { mutate } = useMutation({
    mutationFn: async (body: { productNo: number }) =>
      customAxios(PLATFORMLIST.PC).post(`/profile/recent-products`, body),
  });

  const detailProductInfoData: DetailInfoData = {
    defaultType: [
      {
        label: detailProductInfoLabel.Price,
        value: `${comma(
          productDetailQuery?.price.salePrice! - productDetailQuery?.price.immediateDiscountAmt!,
        )}원`,
      },
      {
        label: detailProductInfoLabel.DeliveryFee,
        value: `${comma(productDetailQuery?.deliveryFee.deliveryAmt!)}원`,
      },
      {
        label: detailProductInfoLabel.DeliveryArea,
        value: `전국`,
      },
      {
        label: detailProductInfoLabel.ReturnExchange,
        value: `반품관련 배송비 : 편도 ${comma(
          productDetailQuery?.deliveryFee.returnDeliveryAmt!,
        )}원 / 무료배송 : 6,000원
        교환관련 배송비 : 6,000원
        도서지역 배송비 추가 : 5,000원`,
      },
    ],
    essentialCertification: productInfoData ?? [],
    asNotes: [
      {
        label: detailProductInfoLabel.BankTransferNotes,
        value: `- 주문자명과 입금자명을 동일하게 작성해주세요
                - 주문금액과 입금금액의 차이가 있을 경우, 자동입금확인이 되지 않아 발송처리가 되지 않습니다.`,
      },
      {
        label: detailProductInfoLabel.DeliveryGuide,
        value: `[일반택배]
                - 배송사 : ${
                  productDetailQuery?.deliveryFee.deliveryCompanyTypeLabel
                } / 대표번호: 1588-2121(월~금 08:00~18:00 / 토 09:00~13:00)
                - 배송비 ${comma(
                  productDetailQuery?.deliveryFee.deliveryAmt!,
                )}원(결제금액 3만원 이상 무료) / 전 지역가능
                - 제주 및 도서 산간지역은 추가 운임 최대 5,000원 추가됩니다.
                
                [브랜드 배송]
                - BBQ 배송과 각 브랜드 개별 배송비는 별도로 부과됩니다.
                - 브랜드 개별 배송: 브랜드 정책에 따라 무료배송 혹은 배송비 부과.`,
      },
      {
        label: detailProductInfoLabel.ReturnExchangeGuide,
        value: `- 취소, 반품 및 교환은 고객센터(1588-9282) 또는 1:1 게시판을 통해 문의해주시기 바랍니다.
                  (평일 오전11시~오후5시, 점심시간 오후1시~오후2시, 주말 및 공휴일은 휴무입니다.)
                - 제품의 하자나 판매자의 실수로 인한 경우 100% 교환/반품/환불이 가능합니다.
                - 고객님의 단순 변심일 경우 반품/교환이 제한될 수 있습니다.
                - 개봉하신 제품은 교환/반품이 불가하므로 꼭 확인 후 개봉해주세요.
                - 제품에 하자가 있는 경우, 제품 배송 즉시 판매자에게 사전 전화통화를 해야 하며 판매자 승인없이 임의 반품하는 경우 반품/교환이 제한될 수 있습니다.
                - 상품 수령후 보관상 발생한 변질, 파손에 대해서는 반품/교환이 제한될 수 있습니다.
                - 각 상품별 반품지가 상이하므로, 아래 표를 참고해주세요.`,
      },
      {
        label: detailProductInfoLabel.ReturnExchangeAddress,
        value: `- ${productDetailQuery?.deliveryFee.returnWarehouse.addressStr}`,
      },
    ],
  };

  const { mutateAsync: orderSheetNoMutate, isPending } = useMutation({
    mutationFn: async (body: {
      channelType?: string;
      productCoupons?: any[];
      products: {
        productNo: number;
        optionNo: number;
        orderCnt: number;
        optionInputs?: {
          inputLabel: string;
          inputValue: string;
        }[];
      }[];
      trackingKey?: string;
    }) => customAxios(PLATFORMLIST.PC).post<{ orderSheetNo: string }>(`/order-sheets`, body),
  });

  const { mutateAsync: likeMutate } = useMutation({
    mutationFn: async (body: { productNos: number[] }) =>
      customAxios(PLATFORMLIST.PC).post<{ productNo: number; result: boolean }>(
        `/profile/like-products`,
        body,
      ),
  });

  useEffect(() => {
    if (isSignIn) {
      mutate({ productNo: Number(slug) });
    } else {
      const productNos = getLocalStorageItem('productNo') as string[];
      const updatedProductNos = !Array.isArray(productNos)
        ? []
        : Array.from(new Set([slug, ...productNos]));
      setLocalStorageItem('productNo', updatedProductNos);
    }
  }, [slug, isSignIn]);

  useEffect(() => {
    if (productDetailQuery?.baseInfo.dutyInfo) {
      const dutyInfoJson = JSON.parse(productDetailQuery.baseInfo.dutyInfo);

      const essentialCertification = dutyInfoJson.contents.map(
        (content: { [key: string]: string }) => {
          const key = Object.keys(content)[0];
          const value = content[key];
          return {
            label: key,
            value: value,
          };
        },
      );

      setProductInfoData(essentialCertification);
    }
  }, [productDetailQuery]);

  const isLoading =
    isLoadingProductDetail || isLoadingProductDetailOption || isLoadingReviews || isLoadingQna;

  const isLoadingReview = isFetchingReviews || isLoadingReviews;

  if (errorProductDetail) {
    return (
      <PcCategoriesDetailErrorStyled>상품 정보가 존재하지 않습니다.</PcCategoriesDetailErrorStyled>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PcCategoriesDetailSlugPageStyled>
      {productDetailQuery && (
        <>
          <div className="product-detail">
            <div className="product-priceInfo">
              <picture className={clsx(productDetailQuery.status.soldout && 'sold-out')}>
                <Image
                  src={
                    productDetailQuery.baseInfo.imageUrls &&
                    'https:' + productDetailQuery.baseInfo.imageUrls[0]
                  }
                  width={520}
                  height={520}
                  alt={productDetailQuery.baseInfo.productName}
                />
              </picture>

              <div className="productDetail-section-inner">
                <ProductPriceInfo data={productDetailQuery} />
                <ProductDeliveryInfo data={productDetailQuery} />
                {productDetailQuery && (
                  <ProductOptionPayInfo
                    productData={productDetailQuery}
                    slug={slug}
                    data={productDetailOptionQuery}
                    orderSheetNoMutate={orderSheetNoMutate}
                    likeMutate={async e => {
                      await likeMutate(e);
                      await productDetailRefetch();
                    }}
                    orderSheetPending={isPending}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="productDetail-tabs-inner">
            {categoryDetailTabs({
              reviewTotal: reviews?.totalCount,
              qnaTotal: qnaData?.totalCount,
            }).map(({ label, currentValue }) => {
              return (
                <Link
                  key={label}
                  activeClass="active"
                  to={currentValue}
                  offset={-156 - 62}
                  duration={100}
                  spy
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="product-description-inner">
            <Element name={productStatus[0]}>
              <div
                className="product-description"
                dangerouslySetInnerHTML={{
                  __html:
                    productDetailQuery?.baseInfo.content &&
                    DOMPurify.sanitize(productDetailQuery?.baseInfo.content),
                }}
              />
            </Element>

            <Element name={productStatus[1]}>
              <p className="detail-info-title">상세정보</p>
              <div className="default-type">
                {detailProductInfoData.defaultType.map(v => (
                  <DetailInfo key={v.label} label={v.label} value={v.value} />
                ))}
              </div>
              <Acodion
                className="essential"
                title={'상품 필수정보 및 인증정보'}
                isOpenAcodion={isOpenAcodion === 0}
                onClick={() => setIsOpenAcodion(isOpenAcodion !== 0 ? 0 : null)}
              >
                {detailProductInfoData.essentialCertification.map(v => (
                  <DetailInfo key={v.label} label={v.label} value={v.value} />
                ))}
              </Acodion>
              <Acodion
                className="as-notes"
                title={'배송/교환/환불/AS/유의사항'}
                isOpenAcodion={isOpenAcodion === 1}
                onClick={() => setIsOpenAcodion(isOpenAcodion !== 1 ? 1 : null)}
              >
                {detailProductInfoData.asNotes.map(v => (
                  <DetailInfo key={v.label} label={v.label} value={v.value} />
                ))}
              </Acodion>
            </Element>

            <Element name={productStatus[2]}>
              <ProductReview
                optionList={detailOptionSortList}
                datailReviewData={datailReviewPointData}
                setOrderByKey={setOrderByKey}
                setReviewPage={setReviewPage}
                limit={limitReview}
                data={reviews}
                orderBy={orderByKey.orderBy}
                isLoadingReview={isLoadingReview}
              />
            </Element>

            <Element name={productStatus[3]}>
              <ProductQna
                setIsPopUp={setIsPopUp}
                setQnaPage={setQnaPage}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                limit={limitQna}
                data={qnaData}
                memberNo={userProfileQuery?.memberNo}
              />
            </Element>
          </div>

          <ModalQnaForm
            key={inquiryNo}
            isPopUp={isPopUp}
            slug={slug}
            onClose={() => setIsPopUp(!isPopUp)}
            data={inquiryNo ? modifyItem : undefined}
            onChange={v => setInquiryNo(v)}
            inquiryNo={inquiryNo}
            qnaRefetch={qnaRefetch}
          />
        </>
      )}
    </PcCategoriesDetailSlugPageStyled>
  );
};

export default PcCategoriesDetailSlug;
