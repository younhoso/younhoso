import { Post } from "@/service/posts";


type Props = {posts: Post[]};
export default function PostsGrid({posts}: Props) {
  
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.path}>{post.title}</li>
      ))}
    </ul>
  );
} 