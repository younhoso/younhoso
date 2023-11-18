import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function NavBar() {
  const router = useRouter();
  return (
    <NavWraper>
      <img src="/vercel.svg" />
      <div className="linkInner">
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>Home</a>
        </Link>
        <Link href="/about">
          <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </Link>
      </div>
    </NavWraper>
  );
}

const NavWraper = styled.nav`
    max-width: 680px;
    margin: 0 auto;
    height: 100px;
    padding-top: 20px;
    padding-bottom: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  .linkInner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a { 
    text-decoration: none;
    font-weight: 600;
    font-size: 18px;
    margin: 0 10px;
  }

  img {
    width: 20%;
    margin: 0 auto;
    display: block;
    margin-bottom: 5px;
  }
  .active {
    color: tomato;
  }
  div {
    display: flex;
    gap: 10px;
  }
`;
