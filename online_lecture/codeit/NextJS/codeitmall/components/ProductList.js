import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductList.module.css';
import StarRating from './StarRating';

export default function ProductList({ className = '', products }) {
  return (
    <ul className={`${styles.productList} ${className}`}>
      {products?.map((product) => (
        <li key={product.id}>
          <Link className={styles.product} href={`/items/${product.id}`}>
            <div className={styles.image}>
              <Image fill src={product.imgUrl} alt={product.name}/>
            </div>
            <div className={styles.content}>
              <div>
                <span className={styles.name}>{product.name}</span>
                <div className={styles.prices}>
                  <span className={styles.originalPrice}>
                    {product.price.toLocaleString()}원
                  </span>
                  {product.salePrice.toLocaleString()}원
                </div>
              </div>
              <hr className={styles.divider} />
              <div>
                <div className={styles.starRating}>
                  <StarRating value={product.starRating} />
                  {product.starRatingCount.toLocaleString()}
                </div>
                <div className={styles.likeCount}>
                  ♥
                  {product.likeCount.toLocaleString()}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
