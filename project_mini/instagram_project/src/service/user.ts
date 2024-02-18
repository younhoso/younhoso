import { client } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null; 
}

export async function addUser({id, username, email, name, image}: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  })
}