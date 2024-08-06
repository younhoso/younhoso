import { FC } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import styled from 'styled-components';

import { Flex, Icon, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import {
  COLOR_BACKGROUND,
  COLOR_WHITE,
  FONTSIZE_11,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_14,
  FONTSIZE_15,
  FONTSIZE_18,
  MOBILE_HEADER_HEIGHT,
  PLANCK,
} from '@/constants';

import { AddressMapPageTemplateComponentProps } from './AddressMapPageTemplate';

export const AddressMapPageTemplateMobile: FC<AddressMapPageTemplateComponentProps> = ({
  dragging,
  address,
  position,
  myPosition,
  defaultPosition,
  handleMapDragStart,
  handleMapDragEnd,
  handleMapCenterChanged,
  handlePickAddressButtonClick,
  handleGoToMyLocationButtonClick,
  ...rest
}) => {
  return (
    <>
      <Wrapper>
        <MapContainer>
          <Map
            center={{
              lat: defaultPosition.lat,
              lng: defaultPosition.lng,
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
            <LocationContainer
              visible={address && dragging ? false : true}
              address={address}
              handlePickAddressButtonClick={handlePickAddressButtonClick}
            />
            <Point>
              <Icon src={'human-point.svg'} size={40} />
            </Point>
          </Map>
        </MapContainer>
      </Wrapper>
      <GoToMyLocationButton
        visible={
          myPosition && myPosition.lat !== position.lat && myPosition.lng !== position.lng
            ? 'true'
            : 'false'
        }
        onClick={handleGoToMyLocationButtonClick}
      >
        <Text size={FONTSIZE_14}>현재 위치로 이동하기</Text>
      </GoToMyLocationButton>
    </>
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

const MapContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 1;
`;

const GoToMyLocationButton = styled.div<{ visible: 'true' | 'false' }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  padding: ${PLANCK * 3}px ${PLANCK * 5}px;
  bottom: ${PLANCK * 6}px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  z-index: 11;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR_WHITE};
  cursor: pointer;
  transition: opacity 0.3s;
  ${props => (props.visible === 'true' ? 'opacity: 0.95;' : 'opacity: 0; pointer-events: none;')};
`;

const LocationContainer = ({
  visible,
  address,
  handlePickAddressButtonClick,
}: {
  visible: boolean;
  address?: { address: string; roadAddress?: string };
  handlePickAddressButtonClick: () => void;
}) => (
  <LocationWrapper visible={visible ? 'true' : 'false'}>
    <Text weight={700} size={FONTSIZE_18}>
      지도를 움직여 위치를 설정하세요
    </Text>
    <Space.H5 />
    <Text size={FONTSIZE_15}>{address ? address.roadAddress ?? address.address : ''}</Text>
    {address && address.roadAddress ? (
      <>
        <Space.H2 />
        <Flex.RSC>
          <TextWithBackground inline size={FONTSIZE_11}>
            지번
          </TextWithBackground>
          <Text inline size={FONTSIZE_13}>
            {address.address}
          </Text>
        </Flex.RSC>
      </>
    ) : null}
    <Space.H3 />
    <Button.Mobile
      disabled={!address}
      onClick={handlePickAddressButtonClick}
      full={true}
      color={'red'}
      shape={'round'}
      text="이 위치로 주소 설정"
    />
  </LocationWrapper>
);

const LocationWrapper = styled.div<{ visible: 'true' | 'false' }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(50% + 46px + ${PLANCK * 5}px);
  box-sizing: border-box;
  min-width: 320px;
  border-radius: 7px;
  border: 1px solid #dddddd;
  z-index: 21;
  overflow: hidden;
  padding: ${PLANCK * 4}px;
  background-color: #ffffff;
  box-shadow: 0 ${PLANCK * 2}px ${PLANCK * 3}px 0 rgba(0, 0, 0, 0.15);
  transition: opacity 0.3s;
  ${props => (props.visible === 'true' ? 'opacity: 0.95;' : 'opacity: 0; pointer-events: none;')};
`;

const TextWithBackground = styled(Text)`
  padding: 5px 10px;
  border-radius: 7px;
  background-color: #e1e6eb;
  font-size: 12px;
  color: #777777;
  margin-right: 5px;
`;

const Point = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(50% + 6px);
  z-index: 20;
`;
