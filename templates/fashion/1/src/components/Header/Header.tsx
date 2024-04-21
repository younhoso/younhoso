"use client";

import clsx from "clsx";
import { HeaderStyled } from "./styled";
import Link from "next/link";
import Image from "next/image";
// import logo from "@/assets/images/header/logo.png";
import Wrapper from "@/provider/WrapperProvider";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <HeaderStyled className={clsx("Header", { mainHeader: pathname === "/" })}>
      <Wrapper>
        <div className="inner">
          <Link href={"/"}>
          </Link>
          <ul className="category-inner">
            Header
          </ul>
        </div>
      </Wrapper>
    </HeaderStyled>
  );
}
