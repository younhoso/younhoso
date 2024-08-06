import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircleProgressProps {
  total: number;
  value: number;
  style?: any;
  className?: string;
}
export default function CustomCircularProgressbar(props: CircleProgressProps) {
  const { total, value, style, className } = props;
  const percentage = (value / total) * 100 || 0;
  return (
    <CircularProgressbar
      className={className}
      value={percentage}
      text={`${percentage < 1 ? percentage.toFixed(1) : percentage.toFixed(0)}%`}
      styles={buildStyles(style)}
    />
  );
}
