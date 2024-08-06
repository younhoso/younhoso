import { FC, Fragment } from 'react';

import { Box, RadioBox, Space, Text } from '@/components/atoms';
import { FONTSIZE_16 } from '@/constants';

import { CheckoutPageTemplateProps } from '../../../CheckoutPageTemplate';

const PaymentMethodSectionBody: FC<CheckoutPageTemplateProps> = ({
  paymentMethod,
  setPaymentMethod,
  checkoutData,
}) => {
  return (
    <Box>
      {checkoutData?.availablePaymentMethodList.map((payment, index, arr) => (
        <Fragment key={`fragment-payment-method-${payment.paymentMethod}`}>
          <RadioBox
            checked={paymentMethod === payment.paymentMethod}
            onClick={() => {
              setPaymentMethod(payment.paymentMethod);
            }}
            label={
              <>
                <Space.V2 />
                <Text size={FONTSIZE_16}>{payment.paymentMethodName}</Text>
              </>
            }
          />
          {index < arr.length - 1 && <Space.H3 />}
        </Fragment>
      ))}
      <Space.H4 />
    </Box>
  );
};

export default PaymentMethodSectionBody;
