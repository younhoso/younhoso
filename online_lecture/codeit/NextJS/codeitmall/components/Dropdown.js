import { useEffect, useState, useRef } from 'react';
import styles from './Dropdown.module.css';

export default function Dropdown({
  className,
  name,
  value,
  options,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  function handleInputClick() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function handleBlur() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      const isInside = inputRef.current?.contains(e.target);
      if (!isInside) {
        setIsOpen(false);
      }
    }

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const classNames = `${styles.input} ${
    isOpen ? styles.opened : ''
  } ${className}`;
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={classNames}
      onClick={handleInputClick}
      onBlur={handleBlur}
      ref={inputRef}
    >
      {selectedOption.label}
      <span className={styles.arrow}>▲</span>
      <div className={styles.options}>
        {options.map((option) => {
          const selected = value === option.value;
          const className = `${styles.option} ${
            selected ? styles.selected : ''
          }`;
          return (
            <div
              className={className}
              key={option.value}
              onClick={() => onChange(name, option.value)}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
