import Button from "../components/Button";
import Link from "../components/Link";
import HeroImage from "../assets/hero.png";
import HeroPlaceholderImage from "../assets/hero-placeholder.png";
import styles from "./HomePage.module.css";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/me");
    }
  }, [user, navigate]);

  return (
    <div>
      <header className={styles.Header}>
        <h1 className={styles.Heading}>
          나의 링크들을 <span className={styles.accent}>하나로</span>{" "}
          관리하세요.
        </h1>
        <p className={styles.Description}>
          파편화된 모든 정보들을, 이제는 하나의 프로필로 관리해봐요.
        </p>
        <Button className={styles.CTA} as={Link} to="/login">
          시작하기
        </Button>
      </header>
      <div className={styles.Hero}>
        <img src={HeroPlaceholderImage} alt="빈 화면" />
        <img src={HeroImage} alt="예시 링크 관리 화면" />
        <img src={HeroPlaceholderImage} alt="빈 화면" />
      </div>
    </div>
  );
}

export default HomePage;
