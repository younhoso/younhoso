import React, { ReactNode, isValidElement } from 'react';

import { v4 as uuidv4 } from 'uuid';

interface RadioboxProps {
  disabled?: boolean;
  className?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  groupValue?: string;
  label?: string | ReactNode | ReactNode[];
}

function Radiobox({
  value,
  checked,
  onChange,
  groupValue,
  label,
  className,
  disabled,
}: RadioboxProps) {
  const id = uuidv4(); // Generate a unique id for each Radiobox

  const handleClick = () => {
    if (onChange && value !== groupValue) {
      onChange(value);
    }
  };

  return (
    <div className={`flex items-center ${className ? className : ''}`}>
      <label htmlFor={id} className="inline-block">
        <input
          id={id}
          type="radio"
          className="hidden"
          onChange={handleClick}
          checked={checked}
          disabled={disabled}
        />
        <span
          className={`flex w-4 h-4 rounded-full ${
            checked ? 'bg-red-500' : 'bg-gray-300'
          } ${disabled ? 'bg-gray-500 !cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="inline-block w-2 h-2 bg-white rounded-full relative left-[4px] top-[4px]"></span>
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

interface RadioboxGroupProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const RadioboxGroup: React.FC<RadioboxGroupProps> = ({ value, onChange, children, disabled }) => {
  const handleChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement<RadioboxProps>(child)) {
          return React.cloneElement<RadioboxProps>(child, {
            groupValue: value,
            onChange: handleChange,
            checked: child.props.value === value,
            disabled: child.props.disabled,
          });
        }
        return child;
      })}
    </>
  );
};

export { Radiobox, RadioboxGroup };
