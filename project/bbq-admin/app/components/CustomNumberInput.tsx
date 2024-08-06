import { TextInput } from '@tremor/react';
import React from 'react';

interface CustomNumberInputProps {
  value: string;
  [key: string]: unknown;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomNumberInput = ({ value, onChange, ...props }: CustomNumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      alert('숫자만 입력 가능합니다.');
      return;
    }
    onChange(e); // 부모 컴포넌트로 이벤트 전달
  };

  return <TextInput value={value} onChange={handleChange} {...props} />;
};

export default CustomNumberInput;
