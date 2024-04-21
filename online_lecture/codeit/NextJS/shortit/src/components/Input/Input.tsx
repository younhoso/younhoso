import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps {
  [key: string]: unknown;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...rest }, ref) => {
    // value와 defaultValue 중 하나만 존재해야 함을 확인
    if (rest.hasOwnProperty("value") && rest.hasOwnProperty("defaultValue")) {
      console.warn(
        "입력 구성 요소에는 value 및 defaultValue 소품이 모두 있어서는 안 됩니다."
      );
      const { defaultValue, ...restProps } = rest; // defaultValue를 제외
      return <input className={`${className}`} {...restProps} ref={ref} />;
    }
    return <input className={`${className}`} {...rest} ref={ref} />;
  }
);

export default Input;
