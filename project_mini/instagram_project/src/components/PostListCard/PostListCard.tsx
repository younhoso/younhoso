"use client";
import { useState } from "react";
import clsx from "clsx";
import { PostListCardStyled } from "./styled";
import { SimplePost } from "@/model/posts";
import Avatar from "../Avatar/Avatar";
import Image from "next/image";

import FormComment from "../FormComment/FormComment";
import ActionBar from "../ActionBar/ActionBar";
import ModalPortal from "../ModalPortal/ModalPortal";
import PostModal from "../PostModal/PostModal";
import PostDetail from "../PostDetail/PostDetail";
import PostUserAvatar from "../PostUserAvatar/PostUserAvatar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const [openModal, setOpenMoal] = useState(false);
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <PostListCardStyled className={clsx("PostListCard rounded")}>
      <PostUserAvatar image={userImage} username={username} />
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenMoal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <FormComment />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenMoal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </PostListCardStyled>
  );
}
