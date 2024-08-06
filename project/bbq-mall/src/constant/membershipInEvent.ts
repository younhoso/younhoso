import membershipDetailImage from '@/assets/images/event/membership-detail.png';
import membershipListMobile from '@/assets/images/event/membership-list-mobile.png';
import membershipList from '@/assets/images/event/membership-list.png';
import { Event } from '@/types/Event';

export const membershipListData: Event = {
  displayPeriodType: 'REGULAR',
  endYmdt: '2099-12-31 23:59:59',
  eventNo: 0,
  eventYn: 'N',
  id: '',
  label: 'BBQ몰 회원등급 혜택',
  mobileimageUrl: membershipListMobile.src,
  pcImageUrl: membershipList.src,
  progressStatus: 'ING',
  promotionText: '',
  startYmdt: '2023-12-21 00:00:00',
  tag: 'benefit',
  url: '',
  urlType: 'EVENT_NUMBER',
};

export interface MebershipData {
  label: string;
  startYmdt: string;
  endYmdt: string;
  top: {
    mobile: {
      url: string;
    };
    pc: {
      url: string;
    };
  };
}

export const membershipDetail: MebershipData = {
  label: 'BBQ몰 회원등급 혜택',
  startYmdt: '2023-12-21 00:00:00',
  endYmdt: '2099-12-31 23:59:59',
  top: {
    mobile: { url: membershipDetailImage.src },
    pc: { url: membershipDetailImage.src },
  },
};
