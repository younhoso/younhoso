import { ContentBannerAPI } from './banner';
import { ContentEventAPI } from './event';
import { ContentFaqAPI } from './faq';
import { ContentGradeAPI } from './grade';
import { ContentNoticeAPI } from './notice';
import { ContentPopupAPI } from './popup';
import { ContentQnaAPI } from './qna';
import { ContentRelayAPI } from './relay';

export const ContentAPI = {
  Popup: ContentPopupAPI,
  Banner: ContentBannerAPI,
  Event: ContentEventAPI,
  FAQ: ContentFaqAPI,
  Notice: ContentNoticeAPI,
  QNA: ContentQnaAPI,
  Grade: ContentGradeAPI,
  Relay: ContentRelayAPI,
};
