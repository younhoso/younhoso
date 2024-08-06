import { Desktop, Mobile } from '@/components/functions';
import { MyPageBulkPurchasePageTemplate } from '@/components/templates';

export default function MyPageBulkPurchasePage() {
  return (
    <>
      <Desktop>
        <MyPageBulkPurchasePageTemplate />
      </Desktop>
      <Mobile>
        <MyPageBulkPurchasePageTemplate.Mobile />
      </Mobile>
    </>
  );
}
