import { Desktop, Mobile } from '@/components/functions';
import { QuickOrderIntroductionPageTemplate } from '@/components/templates';

export default function QuickOrderIntroduction() {
  return (
    <>
      <Desktop>
        <QuickOrderIntroductionPageTemplate />
      </Desktop>
      <Mobile>
        <QuickOrderIntroductionPageTemplate.Mobile />
      </Mobile>
    </>
  );
}
