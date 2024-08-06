'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import orderQuestionMark from '@/assets/images/order/question.png';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Radio from '@/components/Radio';
import { CacheReceiptPurpose, companyCashReceipt, personalCashReceipt } from '@/types';
import { changeCompanyRegex } from '@/utils/changeCompanyRegex';
import { changedToPhoneNumberRegex } from '@/utils/changedToPhoneNumberRegex';

import { ChangeCashReceiptProps, showInPg } from '../pc/ChangeCashReceipt';
import { ChangeCashReceiptMobileStyled } from './styled';

const ChangeCashReceiptMobile = ({
  className,
  onChangeValue,
  hideRadio,
}: ChangeCashReceiptProps) => {
  const [receiptType, setReceiptType] = useState<CacheReceiptPurpose | ''>('');
  const [receiptInfo, setReceiptInfo] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ChangeCashReceiptMobileStyled className={clsx('ChangeCashReceiptMobile', className)}>
      <div className="cash-receipt-wrapper">
        <div className="cash-title">
          <div>현금영수증 발급 신청</div>
          <Image
            src={orderQuestionMark}
            width={20}
            height={20}
            alt="order-question"
            onClick={() => setModalOpen(true)}
          />
        </div>
        {hideRadio ? (
          <p className="show-in-pg">{showInPg}</p>
        ) : (
          <Radio.Mobile
            defaultValue=""
            radioList={[
              { label: '개인 소득공제용', value: personalCashReceipt },
              { label: '사업자 지출증빙용', value: companyCashReceipt },
              { label: '미발행', value: '' },
            ]}
            onChange={e => {
              setReceiptType(e!);
              onChangeValue?.({
                cashReceipt: { cashReceiptIssuePurposeType: e ?? '', cashReceiptKey: '' },
              });
              setReceiptInfo('');
            }}
          />
        )}
        {receiptType && (
          <>
            {receiptType === personalCashReceipt ? (
              <Input.Mobile
                className="cash-recipt-input"
                placeholder="휴대폰 번호를 입력해주세요."
                onPaste={e => e.preventDefault()}
                maxLength={13}
                onChange={e => {
                  const value = changedToPhoneNumberRegex(e.target.value);
                  setReceiptInfo(value);
                  onChangeValue?.({
                    cashReceipt: {
                      cashReceiptKey: value,
                      cashReceiptIssuePurposeType: receiptType,
                    },
                  });
                }}
                value={receiptInfo}
              />
            ) : (
              <Input.Mobile
                className="cash-recipt-input"
                placeholder="사업자 번호를 입력해주세요."
                onPaste={e => e.preventDefault()}
                maxLength={10}
                onChange={e => {
                  const value = changeCompanyRegex(e.target.value);
                  setReceiptInfo(value);
                  onChangeValue?.({
                    cashReceipt: {
                      cashReceiptKey: value,
                      cashReceiptIssuePurposeType: receiptType,
                    },
                  });
                }}
                value={receiptInfo}
              />
            )}
          </>
        )}
      </div>
      <Divider marginBottom="0" marginTop="0" />
      <p className="cash-receipt-info">
        &#183; 정보통신망 이용촉진 및 정보보호에 관한 법률 제정으로 인해 주민등록번호 사용이
        제한됩니다.
      </p>
      <Modal.Mobile
        width="280px"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="현금영수증 발급 안내"
        onOk={() => setModalOpen(false)}
        className="cash-receipt-modal"
      >
        <p>
          주문 신청 페이지에서 현금영수증을 신청하실 수 있습니다. 신청하신 현금영수증은 주문한
          상품이 배송완료된 후 48시간 내 국세청으로 이관된 후, 증빙서류로 출력이 가능합니다. 주문을
          취소하거나 반품하는 경우 현금영수증 발급은 취소거나 증빙금액이 변경됩니다. 현금영수증
          제도에 대한 자세한 내용은 국세청 홈페이지 ({' '}
          <Link href="https://www.nts.go.kr/" target="_blank">
            https://www.nts.go.kr/
          </Link>{' '}
          )를 참고하시기 바랍니다.
        </p>
        <p className="cash-receipt-modal-title">발급조건</p>
        <p>
          현금영수증은 1원 이상 현금결제한 경우에만 발행됩니다. 간이과세자의 상품 구매 시 사업자
          증빙용 현금영수증을 발행할 수 없습니다. 입력한 핸드폰 번호 또는 현금영수증 카드번호가
          존재하지 않은 번호일 경우 자동으로 자진발급처리가 됩니다.
        </p>
        <p className="cash-receipt-modal-title">현금영수증 조회</p>
        <p>
          발급된 현금영수증은 국세청 현금영수증 홈페이지 ({' '}
          <Link href="https://www.nts.go.kr/" target="_blank">
            https://www.nts.go.kr/
          </Link>{' '}
          )에서 확인하실 수 있습니다.
        </p>
      </Modal.Mobile>
    </ChangeCashReceiptMobileStyled>
  );
};

export default ChangeCashReceiptMobile;
