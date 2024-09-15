import { Outlet, useNavigate } from 'react-router-dom';
import Nav, { PublicNav } from './Nav';
import styles from './Layout.module.css';
import leftArrowImage from '../assets/left-arrow.svg';

export function LandingLayout() {
  return (
    <div className={styles.Layout}>
      <Nav />
      <main className={`${styles.Main} ${styles.landing}`}>
        <Outlet />
      </main>
    </div>
  );
}

export function MyPageLayout() {
  return (
    <div className={`${styles.Layout} ${styles.dark}`}>
      <Nav />
      <main className={styles.Main}>
        <div className={styles.Container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function UserLayout() {
  return (
    <div className={`${styles.Layout} ${styles.dark}`}>
      <PublicNav />
      <main className={styles.Main}>
        <div className={styles.Container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function FullLayout() {
  const navigate = useNavigate();

  function handleClickBack() {
    navigate(-1);
  }

  return (
    <main className={`${styles.FullLayout}`}>
      <div className={styles.Container}>
        <div className={styles.BackLinkContainer}>
          <img
            className={styles.BackLink}
            src={leftArrowImage}
            alt="뒤로가기"
            onClick={handleClickBack}
          />
        </div>
        <Outlet />
      </div>
    </main>
  );
}
