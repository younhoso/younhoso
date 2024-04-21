"use client";
import clsx from "clsx";
import { FooterStyled } from "./styled";
import { usePathname } from "next/navigation";
import Wrapper from "@/provider/WrapperProvider";

const footerInfo = {
  title: "OMT Labs / Company Profile",
  default: "Copyright © 2024 OMT Labs. All rights reserved.",
};

export default function Footer() {
  const pathname = usePathname();

  return (
    <FooterStyled className={clsx("Footer", { mainFooter: pathname === "/" })}>
      <Wrapper>
        <div className="inner">
          <div>
            <span>{footerInfo.title.split("/")[0]}</span>/
            {footerInfo.title.split("/")[1]}
          </div>
          <div>{footerInfo.default}</div>
        </div>
      </Wrapper>
    </FooterStyled>
  );
}
