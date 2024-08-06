import React, { ReactNode, isValidElement, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import CheckIcon from '../../public/icons/check.svg';
import CheckActiveIcon from '../../public/icons/check_active.svg';

interface CheckboxProps {
  className?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string[], checked: boolean) => void;
  label?: string | ReactNode | ReactNode[];
  disabled?: boolean;
}

function Checkbox({ value, checked = false, onChange, label, className, disabled }: CheckboxProps) {
  const id = uuidv4();
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = () => {
    const newChecked = !isChecked;
    if (onChange) {
      onChange([value], newChecked);
    }
    setIsChecked(newChecked);
  };

  return (
    <div className={`flex items-center ${className ? className : ''}`}>
      <label htmlFor={id} className="inline-block">
        <input
          id={id}
          key={id}
          type="checkbox"
          className="hidden"
          onChange={!disabled ? handleClick : () => {}}
          checked={isChecked}
          disabled={disabled}
        />
        <span
          className={`flex w-5 h-5 rounded-md  ${isChecked ? 'bg-red-500' : 'bg-[#D9D9D9]'}  ${
            disabled ? 'border-gray-500 !cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isChecked ? (
            <CheckIcon className="inline-block w-[12px] h-[12px] rounded-lg relative left-[4px] top-[5px]" />
          ) : (
            <CheckActiveIcon className="inline-block w-[7px] h-[7px] rounded-lg relative left-[6px] top-[6px]" />
          )}
        </span>
      </label>
      {isValidElement(label) ? (
        label
      ) : (
        <label htmlFor={id} className="pl-2 cursor-pointer whitespace-pre">
          {label}
        </label>
      )}
    </div>
  );
}

interface CheckboxGroupProps {
  value: string[];
  onChange: (value: string[], isChecked: boolean) => void;
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  table?: boolean;
  disabled?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value,
  onChange,
  checked,
  children,
  className,
  table,
  disabled,
}) => {
  const handleChange = (selectedValues: string[], isChecked: boolean) => {
    let updatedValue: string[];

    if (selectedValues.includes('all')) {
      if (isChecked) {
        updatedValue = ['all'];
      } else {
        updatedValue = value.filter(val => val !== 'all');
      }
    } else {
      if (value.includes('all')) {
        updatedValue = selectedValues;
      } else {
        const newValues = value.length
          ? selectedValues.reduce(
              (arr: string[], _value: string) => {
                if (arr.includes(_value)) {
                  return arr.filter(val => val !== _value);
                } else {
                  return [...arr, _value];
                }
              },
              [...value],
            )
          : [...selectedValues];
        updatedValue = Array.from(new Set(newValues));
      }
    }
    onChange(updatedValue, isChecked);
  };

  return (
    <div className={`flex justify-start ${className ? className : ''}`} key={uuidv4()}>
      {React.Children.map(children, (child, index) => {
        if (isValidElement<CheckboxProps>(child)) {
          const childValue = child.props.value?.toString();
          if (childValue) {
            const isChecked = value.includes(childValue) || checked;
            return (
              <Checkbox
                {...child.props}
                disabled={child.props.disabled}
                onChange={() => handleChange([childValue], !isChecked)}
                checked={table === true && value[0] == 'all' ? true : isChecked}
              />
            );
          }
        }
        return child;
      })}
    </div>
  );
};

export { Checkbox, CheckboxGroup };
