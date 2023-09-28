'use client'
import { useState } from "react";
import { Post } from "@/service/posts";
import PostsGrid from "./PostsGrid";
import Categories from "./Categories";

type Props = {
  posts: Post[];
  categories: string[]
}

const ALL_POSTS = 'All Posts';

export default function FilterablePosts({posts, categories}: Props) {
  const [selected, setSelected] = useState(ALL_POSTS);
  const filtered = selected === ALL_POSTS ? posts : posts.filter((post) => post.category === selected);

  return (
    <section className="flex m-4">
      <PostsGrid posts={filtered} />
      <Categories categories={[ALL_POSTS, ...categories]} selected={selected} onClick={setSelected} />
    </section>
  );
}