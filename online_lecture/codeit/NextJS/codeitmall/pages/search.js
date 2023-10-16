import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductList from '@/components/ProductList';
import SearchForm from '@/components/SearchForm';
import { apis } from '@/lib/axios';
import styles from '@/styles/Search.module.css';
import Head from 'next/head';

export default function Search() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { q } = router.query;

  async function getProducts(query) {
    const res = await apis.getProductsSearch(query);
    const nextProducts = res.data.results;
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts(q);
  }, [q]);


  return (
    <>
      <Head>
        <title>{q} 검색 결과!</title>
      </Head>
      <div>
          <SearchForm initialValue={q} />
          <h2 className={styles.title}>
            <span className={styles.keyword}>{q}</span> 검색 결과
          </h2>
          <ProductList className={styles.productList} products={products} />
      </div>
    </>
  );
}
