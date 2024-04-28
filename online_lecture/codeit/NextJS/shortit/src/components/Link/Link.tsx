import BaseLink from "next/link";

interface LinkProps {
  [key: string]: unknown;
}

export default function Link({ className = "", ...rest }: LinkProps) {
  return <BaseLink href={""} className={`${className}`} {...rest} />;
}
