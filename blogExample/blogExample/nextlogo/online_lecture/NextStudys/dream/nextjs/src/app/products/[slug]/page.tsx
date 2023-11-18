import { getProduct, getProducts } from '@/service/products';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export function generateMetadata({params}: Props){
  return {
    title: `제품의 이름: ${params.slug}`
  }
}

export default async function ProductPage({params: {slug}}: Props) {
  const product = await getProduct(slug);
  
  if(!product) {
    notFound();
  }
  return <h1>{product.name} 제품 설명 페이지</h1>
};

export async function generateStaticParams() {
  // 모든 제품의 페이지들을 미리 만들어 둘 수 있게 해줄거임 (SSG)
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.id
  }))
};