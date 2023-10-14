import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm({ initialValue = '' }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      router.push('/');
      return;
    }
    router.push(`/search?q=${value}`);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        name="q"
        value={value}
        placeholder="찾고 싶은 옷을 검색해보세요."
        onChange={handleChange}
      />
      <button className={styles.searchButton}>검색</button>
    </form>
  );
}
