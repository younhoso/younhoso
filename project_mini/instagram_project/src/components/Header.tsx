'use client';

import { menu } from "@/app/sitemap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
 const pathName = usePathname();
 return (
  <div>
    <Link href="/">
      <h1>Instantgram</h1>
    </Link>
    <nav>
      <ul>
        {
          menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{pathName === item.href ? item.clickedIcon : item.icon}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
 );
};