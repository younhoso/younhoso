import { readFile } from "fs/promises";
import path from "path";

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  return readFile(filePath, 'utf-8')
  .then<Post[]>(JSON.parse)
  .then(posts => posts.sort((a, b) => (a.date > b.date ? -1 : 1)))
};

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts().then(posts => posts.filter(post => post.featured));
};

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts().then(posts => posts.filter(post => !post.featured));
};
