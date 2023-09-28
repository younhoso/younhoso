
import { getNonFeaturedPosts } from "@/service/posts";
import PostCard from "./PostCard";
import MultiSwiper from "./MultiSwiper";

export default async function SwiperPosts() {
  const posts = await getNonFeaturedPosts();
  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold my-2">You May Like</h2>
      <MultiSwiper>
        {posts.map(post => (
          <PostCard key={post.path} post={post}></PostCard>
        ))}
      </MultiSwiper>
    </section>
  );
}