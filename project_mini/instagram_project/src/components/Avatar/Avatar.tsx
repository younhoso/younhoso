import clsx from "clsx";
import { AvatarStyled } from "./styled";
type AvatarSize = "small" | "medium" | "large";
type Props = {
  className?: string;
  size?: AvatarSize;
  highlight?: boolean;
  image?: string | null;
};

export default function Avatar({
  className,
  image,
  size = "large",
  highlight = false,
}: Props) {
  return (
    <AvatarStyled
      className={clsx(className, "Avatar", getContainerStyle(size, highlight))}
    >
      <img
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </AvatarStyled>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const sizeStyle = getContainerSize(size);
  return `${sizeStyle}`;
}

function getContainerSize(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-11 h-11";
    case "large":
      return "w-[68px] h-[68px]";
  }
}
