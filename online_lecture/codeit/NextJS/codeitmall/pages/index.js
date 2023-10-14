import { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList';
import SearchForm from '@/components/SearchForm';
import { apis } from '@/lib/axios';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Container from '@/components/Container';

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
      <Header />
      <Container>
        <SearchForm />
        <ProductList className={styles.products} products={products} />
      </Container>
    </>
  )
}
