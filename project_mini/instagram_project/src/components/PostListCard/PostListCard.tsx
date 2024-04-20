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

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const [openModal, setOpenMoal] = useState(false);
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <PostListCardStyled className={clsx("PostListCard rounded")}>
      <div className="flex">
        <Avatar className="following" image={userImage} />
        <span>{username}</span>
      </div>
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
            <div className="modal">
              <div>포스트 상세 페이지!!</div>
            </div>
          </PostModal>
        </ModalPortal>
      )}
    </PostListCardStyled>
  );
}
