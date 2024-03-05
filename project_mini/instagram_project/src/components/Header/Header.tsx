'use client';

import Link from "next/link";
import ColorButton from "../ui/ColorButton";
import clsx from "clsx";
import Avatar from "../Avatar/Avatar";
import { menu } from "@/app/sitemap";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { HeaderStyled } from "./styled";

export default function Header() {
 const pathName = usePathname();
 const { data: session } = useSession();
 const user = session?.user;
 
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
        {user && (
          <li>
            <Link href={`/user/${user.username}`}>
              <Avatar className="highlight" image={user.image}/>
            </Link>
          </li>
        )}
        {session ? (
            <ColorButton text='Sign out' onClick={() => signOut()} />
        ) : (
            <ColorButton text='Sign in' onClick={() => signIn()} />
        )}
      </ul>
    </nav>
  </HeaderStyled>
 );
};