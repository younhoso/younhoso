import styles from './Nav.module.css';
import Button from './Button';
import Link from './Link';
import Avatar from './Avatar';
import logoImage from '../assets/logo.svg';

export function PublicNav() {
  return (
    <header className={styles.Container}>
      <nav className={`${styles.Nav} ${styles.public}`}>
        <Link to="/">
          <img className={styles.Logo} src={logoImage} alt="logo" />
        </Link>
      </nav>
    </header>
  );
}

function Nav() {
  /** @TODO 서버에서 내 정보를 가져온다 */
  const user = null;

  return (
    <header className={styles.Container}>
      <nav className={styles.Nav}>
        <Link to="/">
          <img className={styles.Logo} src={logoImage} alt="logo" />
        </Link>
        <div className={styles.Menu}>
          {user ? (
            <>
              {user.name}
              <Avatar src={user.avatar} size="small" />
              <div className={styles.Divider} />
              <Button as={Link} appearance="secondary"
              /** @TODO 로그아웃 구현 */
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} appearance="secondary" to="/login">
                로그인
              </Button>
              <Button as={Link} to="/register">
                회원가입
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
