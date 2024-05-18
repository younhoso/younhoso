import clsx from "clsx";
import { ActionBarStyled } from "./styled";
import HeartIcon from "../ui/icons/HeartIcon";
import BookmarkIcon from "../ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";

interface Props {
  likes: string[];
  username: string;
  createdAt: string;
  text?: string;
}

export default function ActionBar({ likes, username, text, createdAt }: Props) {
  return (
    <ActionBarStyled className={clsx("ActionBar")}>
      <div className="inner-icon">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="like-icon">
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        {text && (
          <p>
            <span className="username">{username}</span>
            {text}
          </p>
        )}
        <p className="created-at">{parseDate(createdAt)}</p>
      </div>
    </ActionBarStyled>
  );
}
