import { Card } from '@tremor/react';
import React from 'react';

import ComparedText, { FlexDirection } from './ComparedText';

interface CustomComparedTextProps {
  className?: string;
  yesterday?: number;
  today?: number;
  direction?: FlexDirection;
  text?: string;
}

const CustomComparedText = (props: CustomComparedTextProps) => {
  let { yesterday, className, direction, today, text } = props;
  today = today ? today : 0;
  yesterday = yesterday ? yesterday : 0;
  return (
    <ComparedText
      className={className}
      up={today - yesterday > 0 ? true : false}
      text={text ? text : '전일 동시대비'}
      value={`${
        yesterday == 0
          ? (today * 100).toFixed(1)
          : (((today - yesterday) / yesterday) * 100).toFixed(1)
      }%`}
      direction={direction ? direction : 'col-reverse'}
    />
  );
};

export default CustomComparedText;
