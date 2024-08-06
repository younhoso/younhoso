import { FC, ReactNode, useState } from 'react';

import styled, { css } from 'styled-components';

import { Space, Text } from '@/components/atoms';
import { FONTSIZE_14, FONTSIZE_16 } from '@/constants';

import { Template } from '../components';
import { MyPageGuidePageTemplateMobile } from './mobile';

export interface MyPageGuidePageTemplateProps {}

export interface MyPageGuidePageTemplateComponentProps extends MyPageGuidePageTemplateProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const MyPageGuidePageTemplate: FC<MyPageGuidePageTemplateComponentProps> & {
  Mobile: FC<MyPageGuidePageTemplateComponentProps>;
} = ({}) => {
  return (
    <Template title="이용안내">
      <Text size={FONTSIZE_16}>배달/포장 주문</Text>
      <Space.H3 />
      <Text size={FONTSIZE_14} color={'#777777'} lineHeight={'1.5em'}>
        ➀ 여러분의 위치 정보를 확인해요.
        <br />
        ➁ 주소와 현재 위치는 치빡이가 알려드려요.
        <br />➂ 주문 방식을 선택하지 않으면 자동으로 배달로 선택됩니다!
      </Text>
      <Space.H6 />
      <Text size={FONTSIZE_16}>쿠폰 사용</Text>
      <Space.H3 />
      <Text size={FONTSIZE_14} color={'#777777'} lineHeight={'1.5em'}>
        ➀ 메인 페이지에서 다양한 쿠폰을 사용해 보세요.
        <br />➁ 더 많은 혜택을 받고 싶다면 회원가입은 필수!
      </Text>
      <Space.H6 />
      <Text size={FONTSIZE_16}>멤버십 혜택</Text>
      <Space.H3 />
      <Text size={FONTSIZE_14} color={'#777777'} lineHeight={'1.5em'}>
        ➀ 회원 가입을 하시면 멤버십 혜택을 받을 수 있어요.
        <br />➁ 멤버십 혜택은 등급에 따라 제공돼요.
      </Text>
      <Space.H6 />
      <Text size={FONTSIZE_16}>유의사항</Text>
      <Space.H3 />
      <Text size={FONTSIZE_14} color={'#777777'} lineHeight={'1.5em'}>
        ➀ 매장별 주문금액이 다를 수 있으니, 반드시 최소금액을 확인해주세요.
        <br />
        ➁ 배달 소요시간은 기상조건이나 매장 사정상 지연 또는 제한될 수 있어요.
        <br />
        ➂ 주문 고객님과 여러 차례 연락을 했지만 연락이 되지 않으면 배달 음식의 변질, 부패 등의
        우려로 식품위생법을 지키기 위해서 별도로 보관하지 않으며, 재배달, 환불처리가 어려울 수
        있어요.
        <br />
        ➃ 제품 가격과 메뉴 구성은 본사 정책에 따라 변경될 수 있어요.
        <br />
        ➄ 대량 주문의 경우 콜센터(1588-9282)로 문의해주세요.
        <br />
        ➅ 주문 완료 후 변경 및 취소는 콜센터(1588-9282)로 문의해주세요.
        <br />
      </Text>
    </Template>
  );
};
MyPageGuidePageTemplate.Mobile = MyPageGuidePageTemplateMobile;
