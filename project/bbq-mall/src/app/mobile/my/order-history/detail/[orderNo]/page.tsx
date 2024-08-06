import { redirect } from 'next/navigation';

const MobileMyOrderhistoryDetail = ({ params: { orderNo } }: { params: { orderNo: string } }) => {
  return redirect(`/my/order-history/detail/${orderNo}/completed`);
};

export default MobileMyOrderhistoryDetail;
