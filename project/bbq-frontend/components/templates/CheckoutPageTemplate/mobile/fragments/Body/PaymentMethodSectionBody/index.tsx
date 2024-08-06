import { FC, Fragment } from 'react';

import { Box, RadioBox, Space, Text } from '@/components/atoms';
import { FONTSIZE_14 } from '@/constants';

import { CheckoutPageTemplateProps } from '../../../../CheckoutPageTemplate';

const PaymentMethodSectionBody: FC<CheckoutPageTemplateProps> = ({
  paymentMethod,
  setPaymentMethod,
  checkoutData,
}) => {
  return (
    <Box>
      {checkoutData?.availablePaymentMethodList.map((payment, index, arr) => (
        <Fragment key={`fragment-payment-method-${payment.paymentMethod}`}>
          <RadioBox.Mobile
            checked={paymentMethod === payment.paymentMethod}
            onClick={() => {
              setPaymentMethod(payment.paymentMethod);
            }}
            label={
              <>
                <Space.V2 />
                <Text size={FONTSIZE_14}>{payment.paymentMethodName}</Text>
              </>
            }
          />
          {index < arr.length - 1 && <Space.H2_5 />}
        </Fragment>
      ))}
      <Space.H3 />
    </Box>
  );
};

export default PaymentMethodSectionBody;
