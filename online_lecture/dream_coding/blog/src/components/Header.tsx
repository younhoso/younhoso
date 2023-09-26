import Link from "next/link";

export default function Header() {
  
  return (
    <header>
      <Link href="/">
        <h1>"소윤호', Blog"</h1>
      </Link>
      <nav>
        <Link href='/'>home</Link>
        <Link href='/about'>about</Link>
        <Link href='/posts'>posts</Link>
        <Link href='/contact'>contact</Link>
      </nav>
    </header>
  );
} 