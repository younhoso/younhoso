'use client';

import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcnon from "./ui/icons/HomeFillIcnon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcnon from "./ui/icons/SearchFillIcnon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import { usePathname } from "next/navigation";
import ColorButton from "./ui/ColorButton";

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcnon />
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcnon />
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />
  }
]

export default function Navbar() {
  const pathName = usePathname();
  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Instantgram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map(({href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>
                {pathName === href ? clickedIcon : icon}
              </Link>
            </li>
          ))}
          <ColorButton text="Sign in" onClick={() => {}} />
        </ul>  
      </nav>
    </div>
  );
} 