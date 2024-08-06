import { FC, useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Arrow, CheckBox, Divider, Flex, Grid, Icon, Input, Space, Text } from '@/components/atoms';
import { Button, StoreCard } from '@/components/molecules';
import {
  COLOR_BACKGROUND,
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_WHITE,
  FONTSIZE_13,
  FONTSIZE_14,
  HEADER_HEIGHT,
  PLANCK,
} from '@/constants';
import { useCookie } from '@/hooks';
import { District, MealTypeEnum } from '@/types';

import { StoreMapPageTemplateMobile } from './mobile';

const SIDEBAR_WIDTH = 300;

export interface StoreMapPageTemplateProps {
  queryFor?: string;
  queryRedirectTo?: string;
  onlyAvailable: boolean;
  handleOnlyAvailableChecked: () => void;
  districts: District[];
  searchText: string;
  setSearchText: (value: string) => void;
  dragging: boolean;
  address?: { address: string; roadAddress?: string };
  position: { lat: number; lng: number };
  myPosition?: { lat: number; lng: number };
  tempDefaultPosition?: { lat: number; lng: number };
  defaultPosition: { lat: number; lng: number };
  handleSearch: () => void;
  handleMapDragStart: () => void;
  handleMapDragEnd: () => void;
  handleMapCenterChanged: (position: { lat: number; lng: number }) => void;
  handleGoToMyLocationButtonClick: () => void;
  handleStoreCardClick: (params: { district: District }) => void;
  selectedBranchId?: string;
  setSelectedBranchId: (id?: string) => void;
}

export interface StoreMapPageTemplateComponentProps extends StoreMapPageTemplateProps {}

export const StoreMapPageTemplate: FC<StoreMapPageTemplateComponentProps> & {
  Mobile: FC<StoreMapPageTemplateComponentProps>;
} = ({
  queryFor,
  queryRedirectTo,
  onlyAvailable,
  handleOnlyAvailableChecked,
  districts,
  searchText,
  setSearchText,
  dragging,
  address,
  position,
  myPosition,
  tempDefaultPosition,
  defaultPosition,
  selectedBranchId,
  setSelectedBranchId,
  handleSearch,
  handleMapDragStart,
  handleMapDragEnd,
  handleMapCenterChanged,
  handleGoToMyLocationButtonClick,
  handleStoreCardClick,
  ...rest
}) => {
  const router = useRouter();
  const { setLastSelectedBranchId, setLastSelectedMealType, setLastSelectedPosition } = useCookie();

  const sidebarTopRef = useRef<HTMLDivElement>(null);
  const [sidebarBottomHeight, setSidebarBottomHeight] = useState<number | undefined>();

  useEffect(() => {
    if (!sidebarTopRef.current) {
      return;
    }

    setSidebarBottomHeight(sidebarTopRef.current.getBoundingClientRect().height);
  }, [address]);

  return (
    <Wrapper>
      <Sidebar>
        <SidebarTop ref={sidebarTopRef}>
          <Head>
            <Logo href="/" />
            <Space.H3 />
            <Input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="지역명(구,동) / 지점명"
              prefix={
                <Flex.RCC>
                  <Space.V2_5 />
                  <Icon src={'reading-glasses-red-line.svg'} size={20} />
                </Flex.RCC>
              }
              shape={'round'}
              style={{ boxShadow: '0px 1px 3px 0 #4b0c10' }}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Space.H3 />
            <Flex.RSC
              style={myPosition ? { cursor: 'pointer' } : { pointerEvents: 'none', opacity: 0.25 }}
              onClick={handleGoToMyLocationButtonClick}
            >
              <Icon src={'pin-map-white.svg'} size={18} />
              <Space.V2 />
              <Text color={COLOR_WHITE} size={FONTSIZE_13}>
                현재 위치로 매장검색
              </Text>
              <Space.V1_5 />
              <Arrow.Right size={3} color={COLOR_WHITE} thickness={1.5} />
            </Flex.RSC>
          </Head>
          <BodyHead>
            <Space.H4 />
            <Text>
              {address?.roadAddress ?? address?.address ?? ''} ({districts.length}개)
            </Text>
            <Space.H4 />
            <Flex.RSC onClick={handleOnlyAvailableChecked} style={{ cursor: 'pointer' }}>
              <CheckBox theme={'dark'} checked={onlyAvailable} style={{ pointerEvents: 'none' }} />
              <Space.V1_5 />
              <Text size={14} color={'#777'}>
                영업중
              </Text>
            </Flex.RSC>
            <Space.H3 />
            <Divider.H1 />
          </BodyHead>
        </SidebarTop>
        <SidebarBottom
          style={sidebarBottomHeight ? { height: `calc(100% - ${sidebarBottomHeight}px)` } : {}}
        >
          <SidebarBody>
            <Grid columnCount={1} gap={PLANCK * 3}>
              {districts
                .filter(district => {
                  if (onlyAvailable) {
                    return district.availableType === 'AVAILABLE';
                  }
                  return true;
                })
                .map((district, index) => (
                  <StoreCard
                    key={index}
                    district={district}
                    index={index + 1}
                    onClick={() => handleStoreCardClick({ district })}
                  />
                ))}
            </Grid>
          </SidebarBody>
        </SidebarBottom>
      </Sidebar>
      <MapContainer>
        <Map
          center={{
            lat: tempDefaultPosition ? tempDefaultPosition.lat : defaultPosition.lat,
            lng: tempDefaultPosition ? tempDefaultPosition.lng : defaultPosition.lng,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          level={4}
          onCenterChanged={map => {
            handleMapCenterChanged({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            });
          }}
          onZoomChanged={map => {
            handleMapCenterChanged({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            });
            handleMapDragEnd();
          }}
          onDragStart={() => {
            handleMapDragStart();
          }}
          onDragEnd={() => {
            handleMapDragEnd();
          }}
          onResize={() => {}}
          onResizeCapture={() => {}}
        >
          {myPosition ? (
            <CustomOverlayMap
              position={{
                lat: myPosition.lat,
                lng: myPosition.lng,
              }}
              yAnchor={0}
            >
              <Flex.CCC style={{ transform: 'translateY(-90%)' }}>
                <div
                  style={{
                    backgroundColor: COLOR_BLACK,
                    padding: '5px 10px',
                    borderRadius: 5,
                  }}
                >
                  <Text size={10} weight={700} color={COLOR_WHITE}>
                    현재 위치
                  </Text>
                </div>
                <Space.H1 />
                <Icon src={'human-point.svg'} size={40} />
              </Flex.CCC>
            </CustomOverlayMap>
          ) : null}
          {[...districts]
            .filter(district => {
              if (onlyAvailable) {
                return district.availableType === 'AVAILABLE';
              }
              return true;
            })
            .reverse()
            .map((district, index, list) => {
              const redirect = queryRedirectTo
                ? ({ mealType }: { mealType?: MealTypeEnum }) => {
                    const url = queryRedirectTo.split('?')[0];
                    const query = [
                      `branchId=${encodeURIComponent(district.branchId)}`,
                      ...(mealType
                        ? [`mealType=${encodeURIComponent(mealType.toLowerCase())}`]
                        : []),
                      ...(queryRedirectTo.split('?')[1] || '')
                        .split('&')
                        .map(s => s.trim())
                        .filter(s => s && s.length)
                        .filter(s => !s.startsWith('branchId=') && !s.startsWith('mealType=')),
                    ].join('&');

                    router.push(`${url}${query && query.length ? `?${query}` : ``}`);
                  }
                : undefined;

              const showDeliveryButton = (queryFor ?? '').split('|').includes('delivery');
              const showTakeoutButton = (queryFor ?? '').split('|').includes('takeout');
              const showChangeDeliveryButton = (queryFor ?? '')
                .split('|')
                .includes('change-delivery');
              const showChangeTakeoutButton = (queryFor ?? '')
                .split('|')
                .includes('change-takeout');
              const handleDeliveryButtonClick = () => {
                setLastSelectedMealType(MealTypeEnum.Delivery);
                setLastSelectedBranchId(district.branchId);
                setLastSelectedPosition({
                  lat: district.latitude,
                  lng: district.longitude,
                });

                redirect && redirect({ mealType: MealTypeEnum.Delivery });
              };
              const handleTakeoutButtonClick = () => {
                setLastSelectedMealType(MealTypeEnum.Takeout);
                setLastSelectedBranchId(district.branchId);
                setLastSelectedPosition({
                  lat: district.latitude,
                  lng: district.longitude,
                });

                redirect && redirect({ mealType: MealTypeEnum.Takeout });
              };
              const handleChangeDeliveryButtonClick = () => {
                setLastSelectedMealType(MealTypeEnum.Delivery);
                setLastSelectedBranchId(district.branchId);
                setLastSelectedPosition({
                  lat: district.latitude,
                  lng: district.longitude,
                });

                redirect && redirect({ mealType: MealTypeEnum.Delivery });
              };
              const handleChangeTakeoutButtonClick = () => {
                setLastSelectedMealType(MealTypeEnum.Takeout);
                setLastSelectedBranchId(district.branchId);
                setLastSelectedPosition({
                  lat: district.latitude,
                  lng: district.longitude,
                });
                district;

                redirect && redirect({ mealType: MealTypeEnum.Takeout });
              };

              return (
                <CustomOverlayMap
                  key={district.branchId ?? district.familyName}
                  position={{
                    lat: district.latitude,
                    lng: district.longitude,
                  }}
                  yAnchor={0}
                  zIndex={99999999 - Math.floor(district.latitude * 1000000)}
                >
                  <StoreInformation
                    district={district}
                    index={list.length - index}
                    informationVisible={selectedBranchId === district.branchId}
                    showDeliveryButton={showDeliveryButton}
                    showTakeoutButton={showTakeoutButton}
                    showChangeDeliveryButton={showChangeDeliveryButton}
                    showChangeTakeoutButton={showChangeTakeoutButton}
                    handleDeliveryButtonClick={handleDeliveryButtonClick}
                    handleTakeoutButtonClick={handleTakeoutButtonClick}
                    handleChangeDeliveryButtonClick={handleChangeDeliveryButtonClick}
                    handleChangeTakeoutButtonClick={handleChangeTakeoutButtonClick}
                    handlePinClick={() => {
                      if (selectedBranchId === district.branchId) {
                        setSelectedBranchId(undefined);
                      } else {
                        setSelectedBranchId(district.branchId);
                      }
                    }}
                  />
                </CustomOverlayMap>
              );
            })}
        </Map>
      </MapContainer>
    </Wrapper>
  );
};
StoreMapPageTemplate.Mobile = StoreMapPageTemplateMobile;

const StoreInformation = ({
  district,
  index,
  informationVisible,
  showTakeoutButton,
  showDeliveryButton,
  showChangeDeliveryButton,
  showChangeTakeoutButton,
  handleDeliveryButtonClick,
  handleTakeoutButtonClick,
  handleChangeDeliveryButtonClick,
  handleChangeTakeoutButtonClick,
  handlePinClick,
  ...rest
}: {
  district: District;
  index?: number;
  informationVisible?: boolean;
  showTakeoutButton?: boolean;
  showDeliveryButton?: boolean;
  showChangeButton?: boolean;
  handleDeliveryButtonClick?: () => void;
  handleTakeoutButtonClick?: () => void;
  handleChangeDeliveryButtonClick?: () => void;
  handleChangeTakeoutButtonClick?: () => void;
  handlePinClick?: () => void;
  [x: string]: any;
}) => {
  return (
    <StoreInformationWrapper {...rest}>
      {informationVisible ? (
        <StoreInformationPopup>
          <Flex.RSC layout="auto 1 auto">
            <Text style={{ marginRight: 5 }} size={18} inline color={COLOR_PRIMARY}>
              {`00${index}`.slice(-2)}
            </Text>
            <Text size={18} inline>
              {district.familyName}
            </Text>
            <StatusTag>
              <StatusTagIcon
                actived={district.availableType === 'AVAILABLE' ? 'true' : 'false'}
              ></StatusTagIcon>
              <Space.V0_5 />
              <StatusTagText>
                {district.availableType === 'AVAILABLE' ? '영업중' : '영업종료'}
              </StatusTagText>
            </StatusTag>
          </Flex.RSC>
          <Space.H2_5 />
          <Text
            full={true}
            size={FONTSIZE_14}
            color={COLOR_GRAY}
            lineHeight={'1.2em'}
            style={{ whiteSpace: 'normal' }}
          >
            {district.address}
          </Text>
          <Space.H1 />
          <Text size={15} color={'#8e93ad'}>
            {district.tel}
          </Text>
          <Space.H6 />
          <Grid columnCount={1} gap={PLANCK * 1}>
            {showDeliveryButton || showTakeoutButton ? (
              <Flex.RSC gap={PLANCK * 1}>
                {showDeliveryButton ? (
                  <Button
                    disabled={district.availableType !== 'AVAILABLE'}
                    onClick={handleDeliveryButtonClick}
                    full
                    color={'primary'}
                    shape={'round'}
                    text="배달주문"
                  />
                ) : null}
                {showTakeoutButton ? (
                  <Button
                    disabled={district.availableType !== 'AVAILABLE'}
                    onClick={handleTakeoutButtonClick}
                    full
                    color={'black'}
                    shape={'round'}
                    text="포장주문"
                  />
                ) : null}
              </Flex.RSC>
            ) : null}
            {showChangeDeliveryButton ? (
              <Button
                disabled={district.availableType !== 'AVAILABLE'}
                onClick={handleChangeDeliveryButtonClick}
                full
                color={'primary'}
                shape={'round'}
                text="이 패밀리로 변경"
              />
            ) : null}
            {showChangeTakeoutButton ? (
              <Button
                disabled={district.availableType !== 'AVAILABLE'}
                onClick={handleChangeTakeoutButtonClick}
                full
                color={'primary'}
                shape={'round'}
                text="이 패밀리로 변경"
              />
            ) : null}
          </Grid>
        </StoreInformationPopup>
      ) : null}
      <MarkerImage
        onClick={e => {
          handlePinClick && handlePinClick();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {index ? <MarkerImageText>{index}</MarkerImageText> : null}
      </MarkerImage>
    </StoreInformationWrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  clear: both;
  position: fixed;
  left: 0;
  top: ${HEADER_HEIGHT}px;
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  z-index: 9;
  background-color: ${COLOR_BACKGROUND};
`;

const Logo = styled(Link)`
  display: block;
  width: 76px;
  height: 34px;
  background-image: url('/images/symbols/logo-white-line.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MapContainer = styled.div`
  position: absolute;
  width: calc(100% - ${SIDEBAR_WIDTH}px);
  height: 100%;
  top: 0;
  right: 0;
  z-index: 1;
`;

const Sidebar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  width: ${SIDEBAR_WIDTH}px;
  height: 100%;
  background-color: ${COLOR_BACKGROUND};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const SidebarTop = styled.div``;

const Head = styled.div`
  background-color: ${COLOR_PRIMARY};
  padding: ${PLANCK * 4}px ${PLANCK * 4}px;
  box-sizing: border-box;
`;

const SidebarBottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100% - 258px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-vertical {
    display: none;
  }

  & {
    scrollbar-width: none;
  }
`;

const BodyHead = styled.div`
  padding: 0 ${PLANCK * 3}px;
  box-sizing: border-box;
`;

const SidebarBody = styled.div`
  flex: 1;
  padding: ${PLANCK * 3}px;
  box-sizing: border-box;
`;

const MarkerImage = styled.div`
  position: relative;
  z-index: 1;
  width: 35px;
  height: 43px;
  background-image: url('/images/icons/filled-pin-red.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  cursor: pointer;
  cursor: pointer;
  p {
    text-align: center;
    position: relative;
    top: 8px;
  }
`;

const MarkerImageText = styled.div`
  position: absolute;
  left: 50%;
  top: 42.5%;
  color: white;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 17px;
`;

const StoreInformationWrapper = styled.div`
  poistion: relative;
`;
const StoreInformationPopup = styled.div`
  z-index: 2;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 11px 20px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #9a9eb2;
  background-color: #fff;
  position: absolute;
  min-width: 320px;
  max-width: 360px;
  top: 0;
  left: 50%;
  transform: translate(-50%, calc(-100% - ${PLANCK * 3}px));
`;

const StatusTag = styled.div`
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  align: center;
  box-sizing: border-box;
  padding: ${PLANCK}px ${PLANCK * 1.5}px;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const StatusTagIcon = styled.div<{ actived: 'true' | 'false' }>`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: ${({ actived }) => (actived === 'true' ? `#46d586` : `#83827f`)};
`;

const StatusTagText = styled.div`
  margin-left: 2px;
  font-size: 11px;
  font-weight: 600;
  color: #302d46;
`;
