import { Desktop, Mobile } from '@/components/functions';
import { MyPageGuidePageTemplate } from '@/components/templates';

export default function MyPageGuide() {
  return (
    <>
      <Desktop>
        <MyPageGuidePageTemplate />
      </Desktop>
      <Mobile>
        <MyPageGuidePageTemplate.Mobile />
      </Mobile>
    </>
  );
}
