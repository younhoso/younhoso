import { Arrow, Box, Flex, Icon, Space, Text } from '@/components/atoms';
import { FONTSIZE_12, FONTSIZE_16, PLANCK } from '@/constants';

export const RegisterCouponPopup = () => {
  return (
    <Flex.CCS full padding={PLANCK * 3}>
      <Text lineHeight="1.6em">
        바코드 스캔 쿠폰 등록은 앱전용 서비스입니다.
        <br />
        구글플레이, 앱스토어에서 [BBQ]앱을 설치 하신 후 이용하시기 바랍니다.
      </Text>
      <Space.H4 />
      <Flex.CSS full gap={PLANCK * 3}>
        {[
          {
            iconSrc: 'ticket-123-black-line.svg',
            title: '쿠폰 번호 입력',
            caption: '',
          },
          {
            iconSrc: 'camera-black-line.svg',
            title: '쿠폰 번호 입력',
            caption: '(파일, 이미지)',
          },
          {
            iconSrc: 'qr-scan-black-line.svg',
            title: '쿠폰 번호 입력',
            caption: '',
          },
        ].map(item => (
          <Box
            full
            border="#e8eaf0"
            background="#f5f6f7"
            padding={PLANCK * 2}
            shape="round"
            key={item.title}
          >
            <Flex.RSC full layout="auto auto 1 auto auto">
              <Icon src={item.iconSrc} size={28} />
              <Space.V2 />
              <Flex.RSE>
                <Text size={FONTSIZE_16}>{item.title}</Text>
                <Space.V1 />
                <Text size={FONTSIZE_12}>{item.caption}</Text>
              </Flex.RSE>
              <Arrow tail size={4} />
              <Space.V2 />
            </Flex.RSC>
          </Box>
        ))}
      </Flex.CSS>
    </Flex.CCS>
  );
};
