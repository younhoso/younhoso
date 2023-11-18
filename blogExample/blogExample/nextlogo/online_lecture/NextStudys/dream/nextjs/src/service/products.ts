import { promises } from "fs";
import path from "path";

export type Product = {
  id: string;
  name: string;
  price: number;
}

export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const data = await promises.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export async function getProduct(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(item => item.id === id);
}