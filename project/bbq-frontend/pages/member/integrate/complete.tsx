import { Desktop, Mobile } from '@/components/functions';
import { MemberIntegrateCompletePageTemplate } from '@/components/templates';

export default function MemberIntegrateCompletePage() {
  return (
    <>
      <Desktop>
        <MemberIntegrateCompletePageTemplate />
      </Desktop>
      <Mobile>
        <MemberIntegrateCompletePageTemplate.Mobile />
      </Mobile>
    </>
  );
}
