import { useState } from 'react';

const useInput = <T>(initialValue: string, validator: T) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    let willUpdate = true;

    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

export default useInput;
