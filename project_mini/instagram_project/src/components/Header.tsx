'use client';

import { menu } from "@/app/sitemap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ColorButton from "./ui/ColorButton";
import { HeaderStyled } from "./styled";
import clsx from "clsx";

export default function Header() {
 const pathName = usePathname();
 return (
  <HeaderStyled className={clsx('Header')}>
    <Link href="/">
      <h1>Instantgram</h1>
    </Link>
    <nav>
      <ul className={clsx('item-inner')}>
        {menu.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{pathName === item.href ? item.clickedIcon : item.icon}</Link>
          </li>
        ))}
        <ColorButton text='Sign in' onClick={() => {}} />
      </ul>
    </nav>
  </HeaderStyled>
 );
};