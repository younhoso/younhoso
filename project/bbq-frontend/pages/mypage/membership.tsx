import { Desktop, Mobile } from '@/components/functions';
import { MyPageMembershipPageTemplate } from '@/components/templates';
import { useAuth } from '@/hooks';

export default function MyPageMembership() {
  const { member } = useAuth();

  if (!member) {
    return null;
  }

  return (
    <>
      <Desktop>
        <MyPageMembershipPageTemplate />
      </Desktop>
      <Mobile>
        {' '}
        <MyPageMembershipPageTemplate.Mobile />
      </Mobile>
    </>
  );
}
