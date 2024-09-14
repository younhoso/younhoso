import styles from "./Nav.module.css";
import Button from "./Button";
import Link from "./Link";
import Avatar from "./Avatar";
import logoImage from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthProvider";

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
  const { user, avatar, logout } = useAuth();
  const showAuthNav = user && avatar;

  return (
    <header className={styles.Container}>
      <nav className={styles.Nav}>
        <Link to="/">
          <img className={styles.Logo} src={logoImage} alt="logo" />
        </Link>
        <div className={styles.Menu}>
          {showAuthNav ? (
            <>
              {user.name}
              <div className={styles.AvatarContainer}>
                <Avatar className={styles.Avatar} value={avatar} />
              </div>
              <div className={styles.Divider} />
              <Button
                className={styles.Button}
                as={Link}
                appearance="secondary"
                onClick={logout}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button
                className={styles.Button}
                as={Link}
                appearance="minimal"
                to="/login"
              >
                로그인
              </Button>
              <Button className={styles.Button} as={Link} to="/register">
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
