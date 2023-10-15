import { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList';
import SearchForm from '@/components/SearchForm';
import { apis } from '@/lib/axios';
import styles from '@/styles/Home.module.css';


export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const res = await apis.getProducts('/products');
    const nextProducts = res.data.results;
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
        <SearchForm />
        <ProductList className={styles.products} products={products} />
    </>
  )
}
