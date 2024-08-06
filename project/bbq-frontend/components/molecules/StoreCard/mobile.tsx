import { FC } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Flex, Icon, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_13, PLANCK } from '@/constants';

import { StoreCardComponentProps } from './StoreCard';

export const StoreCardMobile: FC<StoreCardComponentProps> = props => {
  const {
    district: { familyImageUrl, familyName, address, tel, availableType },
    index,
    className,
    ...rest
  } = props;

  return (
    <Wrapper className={classNames(className)} {...rest}>
      <ContentBox>
        <LeftSection>
          <Image src={familyImageUrl} backgroundPosition={'center'} backgroundSize={'cover'}>
            {!familyImageUrl ? (
              <Flex.RCC
                style={{
                  position: 'absolute',
                  backgroundColor: '#EAEAEA',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Icon src="bbq-store-gray.svg" size={32} />
              </Flex.RCC>
            ) : null}
            <StatusTag>
              <StatusTagIcon
                actived={availableType === 'AVAILABLE' ? 'true' : 'false'}
              ></StatusTagIcon>
              <Space.V0_5 />
              <StatusTagText>{availableType === 'AVAILABLE' ? '영업중' : '영업종료'}</StatusTagText>
            </StatusTag>
          </Image>
        </LeftSection>
        <Space.V2 />
        <RightSection>
          <IndexTag>
            <IndexTagText>{index}</IndexTagText>
          </IndexTag>
          <Space.H1 />
          <Text weight={600} size={FONTSIZE_13}>
            {familyName}
          </Text>
          <Space.H0_5 />
          <AddressText>{address}</AddressText>
          <Space.H1 />
          <PhoneText>{tel}</PhoneText>
        </RightSection>
      </ContentBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  cursor: pointer;
`;

const ContentBox = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  width: 75px;
`;

const RightSection = styled.div`
  flex: 1;
`;

const StatusTag = styled.div`
  position: absolute;
  left: ${PLANCK * 1}px;
  top: ${PLANCK * 1}px;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  align: center;
  box-sizing: border-box;
  padding: ${PLANCK * 0.5}px ${PLANCK}px;
`;

const StatusTagIcon = styled.div<{ actived: 'true' | 'false' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ actived }) => (actived === 'true' ? `#46d586` : `#83827f`)};
`;

const StatusTagText = styled.div`
  margin-left: 2px;
  font-size: 10px;
  font-weight: 600;
  color: #302d46;
`;

const IndexTag = styled.div`
  width: 20px;
  height: 14px;
  background: #b92c35;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IndexTagText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.005em;
  color: #ffffff;
`;

const AddressText = styled(Text)`
  font-weight: 600;
  font-size: 11px;
  letter-spacing: -0.005em;
  color: #a6a6a6;
  margin-top: 2px;
  line-height: 1.2em;
`;

const PhoneText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: -0.005em;
  color: #8e93ad;
`;
