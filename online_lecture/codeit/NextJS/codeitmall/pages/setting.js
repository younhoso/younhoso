import Container from '@/components/Container';
import Header from '@/components/Header';
import styles from '@/styles/Setting.module.css';

export default function Setting() {
  return (
    <>
      <Header />
      <Container>
        <h1 className={styles.title}>설정</h1>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>테마 설정</h2>
        </section>
      </Container>
    </>
  );
}
