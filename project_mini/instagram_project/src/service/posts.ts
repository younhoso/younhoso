import { client } from "./sanity";

const simplePost = `
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": count(comments),
  "id":_id,
  "createAt":_createAt
`;
export async function getFollowingPostsOf(username: string) {
  return client.fetch(
    `*[_type == "post" && author->username == "${username}"
      || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
      | order(_createdAt desc){${simplePost}}`
  )
}