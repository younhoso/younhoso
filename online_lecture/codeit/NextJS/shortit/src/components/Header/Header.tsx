"use client";

import clsx from "clsx";
import { HeaderStyled } from "./styled";
import Link from "next/link";
// import logo from "@/assets/images/header/logo.png";
import Wrapper from "@/provider/WrapperProvider";
import { usePathname } from "next/navigation";
import { Category } from "@/app/sitemap";

interface HeaderProps {
  category: Category[];
}

export default function Header({ category }: HeaderProps) {
  const pathname = usePathname();

  return (
    <HeaderStyled className={clsx("Header", { mainHeader: pathname === "/" })}>
      <Wrapper>
        <div className="inner">
          <ul className="category-inner">
            {category.map((v) => {
              return (
                <Link href={v.href}>
                  <div key={v.title}>{v.title}</div>
                </Link>
              );
            })}
          </ul>
        </div>
      </Wrapper>
    </HeaderStyled>
  );
}
