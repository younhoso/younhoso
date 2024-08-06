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
  FONTSIZE_12,
  FONTSIZE_13,
  MOBILE_HEADER_HEIGHT,
  PLANCK,
} from '@/constants';
import { useCookie } from '@/hooks';
import { District, MealTypeEnum } from '@/types';

import { StoreMapPageTemplateComponentProps } from './StoreMapPageTemplate';

const SIDEBAR_WIDTH = 260;

export const StoreMapPageTemplateMobile: FC<StoreMapPageTemplateComponentProps> = ({
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

  const [sidebarOpened, setSidebarOpened] = useState<boolean>(true);

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
      <Sidebar opened={sidebarOpened}>
        <SidebarTop ref={sidebarTopRef}>
          <Head>
            <Logo href="/" />
            <Space.H2_5 />
            <Input.Mobile
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
              <Icon src={'pin-map-white.svg'} size={16} />
              <Space.V1_5 />
              <Text color={COLOR_WHITE} size={FONTSIZE_12}>
                현재 위치로 매장검색
              </Text>
              <Space.V1_5 />
              <Arrow.Right size={2} color={COLOR_WHITE} thickness={1.5} />
            </Flex.RSC>
          </Head>
          <BodyHead>
            <Space.H3 />
            <Text size={FONTSIZE_13}>
              {address?.roadAddress ?? address?.address ?? ''} ({districts.length}개)
            </Text>
            <Space.H2 />
            <Flex.RSC onClick={handleOnlyAvailableChecked} style={{ cursor: 'pointer' }}>
              <CheckBox.Mobile
                theme={'dark'}
                checked={onlyAvailable}
                style={{ pointerEvents: 'none' }}
              />
              <Text size={FONTSIZE_12} color={'#777'}>
                영업중
              </Text>
            </Flex.RSC>
            <Space.H2_5 />
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
                  <StoreCard.Mobile
                    key={index}
                    district={district}
                    index={index + 1}
                    onClick={() => {
                      setSidebarOpened(false);
                      handleStoreCardClick({ district });
                    }}
                  />
                ))}
            </Grid>
          </SidebarBody>
        </SidebarBottom>
        <SidebarButton
          arrow={sidebarOpened ? 'left' : 'right'}
          onClick={() => {
            setSidebarOpened(!sidebarOpened);
          }}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </SidebarButton>
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
            <Text style={{ marginRight: 4 }} size={16} inline color={COLOR_PRIMARY}>
              {`00${index}`.slice(-2)}
            </Text>
            <Text size={16} inline>
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
          <Space.H2 />
          <Text
            full={true}
            size={FONTSIZE_13}
            color={COLOR_GRAY}
            lineHeight={'1.2em'}
            style={{ whiteSpace: 'normal' }}
          >
            {district.address}
          </Text>
          <Space.H2 />
          <Text size={13} color={'#8e93ad'}>
            {district.tel}
          </Text>
          <Space.H3 />
          <Grid columnCount={1} gap={PLANCK * 1}>
            {showDeliveryButton || showTakeoutButton ? (
              <Flex.RSC gap={PLANCK * 1}>
                {showDeliveryButton ? (
                  <Button.Mobile
                    disabled={district.availableType !== 'AVAILABLE'}
                    onClick={handleDeliveryButtonClick}
                    full
                    color={'primary'}
                    shape={'round'}
                    text="배달주문"
                  />
                ) : null}
                {showTakeoutButton ? (
                  <Button.Mobile
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
              <Button.Mobile
                disabled={district.availableType !== 'AVAILABLE'}
                onClick={handleChangeDeliveryButtonClick}
                full
                color={'primary'}
                shape={'round'}
                text="이 패밀리로 변경"
              />
            ) : null}
            {showChangeTakeoutButton ? (
              <Button.Mobile
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
  top: ${MOBILE_HEADER_HEIGHT}px;
  width: 100%;
  height: calc(100vh - ${MOBILE_HEADER_HEIGHT}px);
  z-index: 9;
  background-color: ${COLOR_BACKGROUND};
`;

const Logo = styled(Link)`
  display: block;
  width: 60px;
  height: 27px;
  background-image: url('/images/symbols/logo-white-line.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MapContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 1;
`;

const Sidebar = styled.div<{ opened: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  width: ${SIDEBAR_WIDTH}px;
  height: 100%;
  background-color: ${COLOR_BACKGROUND};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
  transition: transform 0.4s ease-in-out;

  ${({ opened }) => (opened ? `` : `transform: translateX(-100%);`)}
`;

const SidebarTop = styled.div``;

const Head = styled.div`
  background-color: ${COLOR_PRIMARY};
  padding: ${PLANCK * 3}px;
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

const SidebarButton = styled.div<{ arrow: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 2;
  transform: translate(22px, -50%) rotate(90deg);
  cursor: pointer;

  & > div:nth-child(1) {
    position: absolute;
    margin-left: -34px;
    width: 36px;
    height: 23px;
    background: white;
    border-bottom: 2px solid white;
    border-radius: 10px 0 0 3px;
    transform: skewX(-10deg);
  }

  & > div:nth-child(2) {
    position: absolute;
    margin-left: -2px;
    width: 36px;
    height: 23px;
    background: white;
    border-bottom: 2px solid white;
    border-radius: 10px 0 0 3px;
    transform: skewX(10deg) scaleX(-1);
  }

  & > div:nth-child(3) {
    position: absolute;
    width: 14px;
    height: 3px;
    border-radius: 999px;
    background-color: #131313;
    ${({ arrow }) =>
      arrow === 'left' ? `transform: rotate(30deg);` : `transform: rotate(-30deg);`}
    top: 12px;
    left: -12px;
  }

  & > div:nth-child(4) {
    position: absolute;
    width: 14px;
    height: 3px;
    border-radius: 999px;
    background-color: #131313;
    ${({ arrow }) =>
      arrow === 'left' ? `transform: rotate(-30deg);` : `transform: rotate(30deg);`}
    top: 12px;
    left: -1px;
  }
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
  position: relative;
`;

const StoreInformationPopup = styled.div`
  z-index: 2;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 11px 20px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #9a9eb2;
  background-color: #fff;
  position: absolute;
  min-width: 270px;
  max-width: 320px;
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
