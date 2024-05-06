interface ButtonProps {
  [key: string]: unknown;
}

export default function Button({ className, ...rest }: ButtonProps) {
  return <button className={`${className}`} {...rest} />;
}
