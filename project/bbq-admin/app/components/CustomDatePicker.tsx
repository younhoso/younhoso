import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ko } from 'date-fns/locale';

interface CustomDatePickerProps {
  showIcon?: boolean;
  title: string;
  className: string;
  dateFormat: string;
  dateFormatCalendar: string;
  showTimeSelect?: boolean;
  selected: Date;
  onChange: (v: Date) => void;
}

export default function CustomDatePicker({
  showIcon,
  title,
  className,
  dateFormat,
  dateFormatCalendar,
  showTimeSelect = false,
  selected,
  onChange,
}: CustomDatePickerProps) {
  return (
    <DatePicker
      showIcon={showIcon}
      dateFormat={dateFormat}
      dateFormatCalendar={dateFormatCalendar}
      timeCaption={title}
      locale={ko}
      showTimeSelect={showTimeSelect}
      selected={selected}
      className={className}
      onChange={onChange}
      icon={
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" style={{ margin: '3px 0 0 0' }}>
          <g clipPath="url(#clip0_3680_6364)">
            <path
              d="M12.2826 2.17188H3.71751C2.07503 2.17188 0.74353 3.5534 0.74353 5.25759V14.1444C0.74353 15.8486 2.07503 17.2302 3.71751 17.2302H12.2826C13.925 17.2302 15.2565 15.8486 15.2565 14.1444V5.25759C15.2565 3.5534 13.925 2.17188 12.2826 2.17188Z"
              stroke="#8E93AD"
              strokeWidth="1.4"
              strokeMiterlimit="10"
            />
            <path
              d="M4.3717 5.93359V17.2273"
              stroke="#8E93AD"
              strokeWidth="1.4"
              strokeMiterlimit="10"
            />
            <path d="M8 5.93359V17.2273" stroke="#8E93AD" strokeWidth="1.4" strokeMiterlimit="10" />
            <path
              d="M11.6283 5.93359V17.2273"
              stroke="#8E93AD"
              strokeWidth="1.4"
              strokeMiterlimit="10"
            />
            <path
              d="M4.3717 0.769531V3.26896"
              stroke="#8E93AD"
              strokeWidth="1.4"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M11.6283 0.769531V3.26896"
              stroke="#8E93AD"
              strokeWidth="1.4"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M15.2565 5.93359H0.74353"
              stroke="#8E93AD"
              strokeWidth="1.4"
              strokeMiterlimit="10"
            />
            <path
              d="M15.2565 9.69922H0.74353"
              stroke="#8E93AD"
              strokeWidth="1.4"
              strokeMiterlimit="10"
            />
            <path
              d="M15.2565 13.4648H0.74353"
              stroke="#8E93AD"
              strokeWidth="1.4"
              strokeMiterlimit="10"
            />
          </g>
          <defs>
            <clipPath id="clip0_3680_6364">
              <rect width="16" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      }
    />
  );
}
