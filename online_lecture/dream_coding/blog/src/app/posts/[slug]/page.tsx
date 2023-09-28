import { getPostData } from "@/service/posts";


type Props = {
  params: {
    slug: string
  }
}
export default async function PostPage({params: { slug }}: Props) {
  const post = await getPostData(slug);

  return (
    <>
      <h1>{post.title}</h1>
      <pre>{post.content}</pre>
    </>
  );
} 