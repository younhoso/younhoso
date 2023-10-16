import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { apis } from '@/lib/axios';
import styles from '@/styles/Product.module.css';
import SizeReviewList from '@/components/SizeReviewList';
import StarRating from '@/components/StarRating';
import Image from 'next/image';

export default function Product() {
  const [product, setProduct] = useState();
  const [sizeReviews, setSizeReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  async function getProduct(targetId) {
    const res = await apis.getProductsId(targetId);
    const nextProduct = res.data;
    console.log(nextProduct)
    setProduct(nextProduct);
  }

  async function getSizeReviews(targetId) {
    const res = await apis.reviews(targetId);
    const nextSizeReviews = res.data.results ?? [];
    setSizeReviews(nextSizeReviews);
  }

  useEffect(() => {
    if (!id) return;

    getProduct(id);
    getSizeReviews(id);
  }, [id]);

  if (!product) return null;

  return (
    <>
        <h1 className={styles.name}>
          {product.name}
          <span className={styles.englishName}>{product.englishName}</span>
        </h1>
        <div className={styles.content}>
          <div className={styles.image}>
            <Image fill src={product.imgUrl} alt={product.name}/>
          </div>
          <div>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>제품 정보</h2>
              <div className={styles.info}>
                <table className={styles.infoTable}>
                  <tbody>
                    <tr>
                      <th>브랜드 / 품번</th>
                      <td>
                        {product.brand} / {product.productCode}
                      </td>
                    </tr>
                    <tr>
                      <th>제품명</th>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <th>가격</th>
                      <td>
                        <span className={styles.salePrice}>
                          {product.price.toLocaleString()}원
                        </span>{' '}
                        {product.salePrice.toLocaleString()}원
                      </td>
                    </tr>
                    <tr>
                      <th>포인트 적립</th>
                      <td>{product.point.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>구매 후기</th>
                      <td className={styles.starRating}>
                        <StarRating value={product.starRating} />{' '}
                        {product.starRatingCount.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th>좋아요</th>
                      <td className={styles.like}>
                        ♥
                        {product.likeCount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>사이즈 추천</h2>
              <SizeReviewList sizeReviews={sizeReviews ?? []} />
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>사이즈 추천하기</h2>
            </section>
          </div>
        </div>
    </>
  );
}
