import { Outlet, useNavigate } from 'react-router-dom';
import Nav, { PublicNav } from './Nav';
import Card from './Card';
import styles from './Layout.module.css';
import LeftAngleImage from '../assets/left-angle.svg';

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

export function CardLayout() {
  return (
    <main className={styles.CardLayout}>
      <Card className={styles.CardContainer}>
        <Outlet />
      </Card>
    </main>
  );
}

export function UserLayout() {
  return (
    <div className={styles.Layout}>
      <Nav />
      <main className={`${styles.Main} ${styles.user}`}>
        <div className={styles.Container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function BackLinkLayout() {
  const navigate = useNavigate();

  function handleClickBack() {
    navigate(-1);
  }

  return (
    <div className={styles.BackLinkLayout}>
      <main className={styles.Container}>
        <img
          className={styles.BackLink}
          src={LeftAngleImage}
          alt="뒤로가기"
          onClick={handleClickBack}
        />
        <Outlet />
      </main>
    </div>
  );
}

export function FullLayout() {
  return (
    <main className={styles.FullLayout}>
      <Outlet />
    </main>
  );
}

export function PublicLayout() {
  return (
    <div className={styles.Layout}>
      <PublicNav />
      <main className={`${styles.Main} ${styles.user}`}>
        <div className={styles.Container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
