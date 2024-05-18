import { ReactNode } from "react";
import clsx from "clsx";
import { PostModalStyled } from "./styled";
import CloseIcon from "../ui/icons/CloseIcon";

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <PostModalStyled
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={clsx("PostModal")}
    >
      <button onClick={() => onClose()}>
        <CloseIcon />
      </button>
      <div className="contents">{children}</div>
    </PostModalStyled>
  );
}
