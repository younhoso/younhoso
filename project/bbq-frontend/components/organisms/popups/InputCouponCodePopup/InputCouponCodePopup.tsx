import { useCallback, useState } from 'react';

import { CouponAPI } from '@/apis';
import { Box, Flex, Icon, Input, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { LoadCouponPopup } from '@/components/organisms';
import { FONTSIZE_14, FONTSIZE_18, PLANCK } from '@/constants';
import { parseApiError } from '@/utils';

const CouponMemberOnlyPopup = () => {
  const { closeModal } = useModal();

  return (
    <Flex.CCC full padding={PLANCK * 2}>
      <Text size={FONTSIZE_18} lineHeight={'1.3em'} align="center">
        E-쿠폰, 상품권 등록은 <br />
        비비큐 회원만 가능합니다.
      </Text>
      <Space.H6 />
      <Button
        full
        color="red"
        shape="round"
        text="확인"
        onClick={() => closeModal()}
        style={{ height: 50 }}
      />
    </Flex.CCC>
  );
};

export const InputCouponCodePopup = ({
  type,
  refetch,
}: {
  type?: 'e' | 'price' | 'voucher' | 'membership';
  refetch?: () => void;
}) => {
  const { openModal, closeModal } = useModal();
  const [couponNumber, setCouponNumber] = useState<string>('');

  const handleRegisterButtonClick = useCallback(() => {
    if (!couponNumber || !couponNumber.trim().length) return;
    if (type === 'price') {
      //CouponAPI.Price.add({ couponNo: couponNumber })
      CouponAPI.add({ couponNo: couponNumber })
        .then(res => {
          alert('쿠폰이 등록되었습니다.');
          closeModal();
          refetch && refetch();
        })
        .catch(err => {
          console.error(err);
          const message = parseApiError(err).message;
          if (message.indexOf('비회원') >= 0) {
            openModal({
              title: '쿠폰 알림',
              body: <CouponMemberOnlyPopup />,
            });
          } else {
            alert(message);
          }
        });
    } else if (type === 'voucher') {
      //CouponAPI.Voucher.add({ voucherSn: couponNumber })
      CouponAPI.add({ couponNo: couponNumber })
        .then(res => {
          alert('쿠폰이 등록되었습니다.');
          closeModal();
          refetch && refetch();
        })
        .catch(err => {
          console.error(err);
          const message = parseApiError(err).message;
          if (message.indexOf('비회원') >= 0) {
            openModal({
              title: '쿠폰 알림',
              body: <CouponMemberOnlyPopup />,
            });
          } else {
            alert(message);
          }
        });
    } else if (type === 'e') {
      //CouponAPI.E.add({ couponNo: couponNumber })
      CouponAPI.add({ couponNo: couponNumber })
        .then(res => {
          alert('쿠폰이 등록되었습니다.');
          closeModal();
          refetch && refetch();
        })
        .catch(err => {
          console.error(err);
          const message = parseApiError(err).message;
          if (message.indexOf('비회원') >= 0) {
            openModal({
              title: '쿠폰 알림',
              body: <CouponMemberOnlyPopup />,
            });
          } else {
            alert(message);
          }
        });
    } else if (type === 'membership') {
      //CouponAPI.Membership.add({ couponNo: couponNumber })
      CouponAPI.add({ couponNo: couponNumber })
        .then(res => {
          alert('쿠폰이 등록되었습니다.');
          closeModal();
          refetch && refetch();
        })
        .catch(err => {
          console.error(err);
          const message = parseApiError(err).message;
          if (message.indexOf('비회원') >= 0) {
            openModal({
              title: '쿠폰 알림',
              body: <CouponMemberOnlyPopup />,
            });
          } else {
            alert(message);
          }
        });
    } else {
      CouponAPI.add({ couponNo: couponNumber })
        .then(res => {
          alert('쿠폰이 등록되었습니다.');
          closeModal();
          refetch && refetch();
        })
        .catch(err => {
          console.error(err);
          const message = parseApiError(err).message;
          if (message.indexOf('비회원') >= 0) {
            openModal({
              title: '쿠폰 알림',
              body: <CouponMemberOnlyPopup />,
            });
          } else {
            alert(message);
          }
        });
    }
  }, [type, couponNumber]);

  const handleImageButtonClick = useCallback(() => {
    closeModal();
    openModal({
      title: '쿠폰 불러오기',
      body: <LoadCouponPopup />, //<LoadCouponPopup refetch={refetch} />,
    });
  }, []);

  return (
    <div>
      <Text
        color={'#281D19'}
        align="center"
        lineHeight={'20px'}
        weight={600}
        style={{ marginBottom: '12px' }}
        size={16}
      >
        카카오 상품권, 모바일 상품권등
        <br />
        등록하실 쿠폰번호를 입력해주세요.
      </Text>
      <Text color={'#B92C35'} align="center" lineHeight={'18px'} weight={500} size={13}>
        * 등록한 제품이 아닌 타제품으로 교환 시
        <br />
        차액에 대한 추가요금이 발생할 수 있습니다.
      </Text>
      <Space.H4 />
      <Flex.RSC layout="1 auto 80px">
        <Input
          placeholder="쿠폰 번호를 입력하세요"
          showClearButton={true}
          value={couponNumber}
          onChange={e => {
            setCouponNumber(e.target.value.replace(/[^0-9]/g, ''));
          }}
        />
        <Space.V1_5 />
        <Button
          disabled={!couponNumber || !couponNumber.trim().length}
          onClick={handleRegisterButtonClick}
          text="등록"
          color="red"
          shape="round"
          fill={true}
          style={{ height: 44 }}
        />
      </Flex.RSC>
      {false /*!type || type === "e" || type === "price"*/ ? (
        <>
          <Space.H3_5 />
          <Flex.RSC full={true} layout="1 auto 1">
            <Box shape="round" border="lightgray" background="#f5f6f7" style={{ opacity: 0.5 }}>
              <Space.H2 />
              <Flex.RCC full>
                <Icon src="barcode-black-line.svg" size={24} />
                <Space.V3 />
                <Text>바코드스캔</Text>
              </Flex.RCC>
              <Space.H2 />
            </Box>
            <Space.V3 />
            <Box
              shape="round"
              border="lightgray"
              background="#f5f6f7"
              style={{ cursor: 'pointer' }}
              onClick={handleImageButtonClick}
            >
              <Space.H2 />
              <Flex.RCC full>
                <Icon src="image-black-line.svg" size={24} />
                <Space.V3 />
                <Text>상품권 이미지</Text>
              </Flex.RCC>
              <Space.H2 />
            </Box>
          </Flex.RSC>
          <Space.H2_5 />
          <Text color={'#777777'} size={FONTSIZE_14}>
            ⚠ 바코드 스캔은 모바일앱에서만 가능하세요.
          </Text>
          <Space.H3 />
        </>
      ) : null}
    </div>
  );
};
