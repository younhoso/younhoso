import clsx from "clsx";
import { PostUserAvatarStyled } from "./styled";
import Avatar from "../Avatar/Avatar";

interface PostUserAvatarProps {
  image: string;
  username: string;
}

export default function PostUserAvatar({
  image,
  username,
}: PostUserAvatarProps) {
  return (
    <PostUserAvatarStyled className={clsx("PostUserAvatar")}>
      <div className="flex">
        <Avatar image={image} />
        <span>{username}</span>
      </div>
    </PostUserAvatarStyled>
  );
}
