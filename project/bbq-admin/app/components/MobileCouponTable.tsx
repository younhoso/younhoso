import { MobileCoupon } from '../coupon/mobile-coupon/page';
import { comma } from '../utils/regExp';
import CustomButton from './CustomButton';

interface MobileCouponTableProps {
  className: string;
  handleCancel: () => void;
  data?: MobileCoupon;
}

export default function MobileCouponTable({
  className,
  handleCancel,
  data,
}: MobileCouponTableProps) {
  if (!data) return null;
  const {
    couponType,
    couponNo,
    couponId,
    couponName,
    couponPrice,
    startDate,
    endDate,
    isUsed,
    familyName,
    branchId,
    approvalNumber,
    useStatusName,
  } = data;

  return (
    <div className={`${className}`}>
      <div className="text-[18px] mt-[32px]">조회결과</div>
      <div className="mt-[24px] bg-[#fff] border">
        <div className="flex">
          <div className="flex flex-row basis-1/2 border-b text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              쿠폰 종료
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">
              {couponType === 'ECOUPON' ? 'E-쿠폰' : '지류상품권'}
            </div>
          </div>
          <div className="flex flex-row basis-1/2 border-b text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              유효 기간
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">
              {startDate ? `${startDate} ~ ${endDate}` : '-'}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-row basis-1/2 border-b text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              쿠폰 번호
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">{couponNo || '-'}</div>
          </div>
          <div className="flex flex-row basis-1/2 border-b text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              사용 여부
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">
              {isUsed === true ? '사용' : '미사용'}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-row basis-1/2 border-b text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              쿠폰 ID
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">{couponId || '-'}</div>
          </div>
          <div className="flex flex-row basis-1/2 border-b text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              사용 상세
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">
              {useStatusName || '-'}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-row basis-1/2 border-b text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              쿠폰 이름
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">{couponName || '-'}</div>
          </div>
          <div className="flex flex-row basis-1/2 border-b text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              패밀리점명(코드)
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">
              {familyName ? `${familyName} (${branchId})` : '-'}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-row basis-1/2 text-[#46477A]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              쿠폰 가격
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px] font-[600]">
              {couponPrice ? comma(couponPrice) : '-'} 원
            </div>
          </div>
          <div className="flex flex-row basis-1/2 text-[#46477A] font-[600]">
            <div className="w-[160px] h-[60px] leading-[60px] text-center bg-[#EFF0F5]">
              승인 번호
            </div>
            <div className="h-[60px] leading-[60px] ml-[20px]">{approvalNumber || '-'}</div>
          </div>
        </div>
      </div>
      {(couponType === 'ECOUPON' && isUsed === true) ||
      (couponType === 'VOUCHER' && useStatusName === '취소가능') ? (
        <div className="text-right mt-[20px]">
          <CustomButton
            type="secondary"
            className="w-[200px] h-[48px] self-start !rounded-none border-0 !bg-[#E52143]"
            onClick={handleCancel}
          >
            사용 취소
          </CustomButton>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
