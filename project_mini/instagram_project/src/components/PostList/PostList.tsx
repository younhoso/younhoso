"use client";

import clsx from "clsx";
import { PostListStyled } from "./styled";
import useSWR from "swr";
import { SimplePost } from "@/model/posts";
import PostListCard from "../PostListCard/PostListCard";
import { LoadingPageStyled } from "@/styles/pageStyled/LoadingPageStyled";
import GridSpinner from "../ui/GridSpinner";

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>("/api/posts");

  if (loading) {
    return (
      <LoadingPageStyled>
        <GridSpinner color="red" />
      </LoadingPageStyled>
    );
  }

  return (
    <PostListStyled className={clsx("PostList")}>
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
      </ul>
    </PostListStyled>
  );
}
