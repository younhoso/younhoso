import clsx from "clsx";
import Image from "next/image";
import { FullPost, SimplePost } from "@/model/posts";
import { PostDetailStyled } from "./styled";
import useSWR from "swr";
import PostUserAvatar from "../PostUserAvatar/PostUserAvatar";
import ActionBar from "../ActionBar/ActionBar";
import CommentForm from "../CommentForm/CommentForm";
import Avatar from "../Avatar/Avatar";

interface PostDetailProps {
  post: SimplePost;
}

export default function PostDetail({ post }: PostDetailProps) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <PostDetailStyled className={clsx("PostDetail")}>
      <div className="relative">
        <Image
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div>
        <PostUserAvatar image={userImage} username={username} />
        <ul>
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index}>
                  <Avatar image={image} />
                </li>
              )
            )}
        </ul>

        <ActionBar likes={likes} username={username} createdAt={createdAt} />

        <CommentForm />
      </div>
    </PostDetailStyled>
  );
}
