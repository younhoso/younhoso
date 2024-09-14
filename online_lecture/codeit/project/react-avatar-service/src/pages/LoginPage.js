import { useState } from "react";
import { Helmet } from "react-helmet";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import HorizontalRule from "../components/HorizontalRule";
import Link from "../components/Link";
import GoogleImage from "../assets/google.svg";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    await login({ email, password });
    navigate("/me");
    console.log({ email, password });
  }

  return (
    <>
      <Helmet>
        <title>로그인 - avtr</title>
      </Helmet>
      <h1 className={styles.Heading}>로그인</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        <Button className={styles.Button}>로그인</Button>
        <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
        <Button
          className={styles.GoogleButton}
          type="button"
          appearance="secondary"
          as={Link}
        >
          <img src={GoogleImage} alt="Google" />
          구글로 시작하기
        </Button>
        <div className={styles.Footer}>
          회원이 아니신가요? <Link to="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
