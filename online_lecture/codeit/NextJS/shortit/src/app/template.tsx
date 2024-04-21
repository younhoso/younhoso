"use client";
import { ReactNode } from "react";
import { TemplateStyled } from "@/styles/pageStyled/TemplateStyled";
import clsx from "clsx";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Wrapper from "@/provider/WrapperProvider";
import { defaultSiteMaps } from "./sitemap";

export default function CommonTemplate({ children }: { children: ReactNode }) {
  return (
    <TemplateStyled className={clsx("Template")}>
      <Header category={defaultSiteMaps} />
      <div className="content">{children}</div>
      <Footer />
      {/* <button onClick={ () => handle()}>Click my name!</button> */}
    </TemplateStyled>
  );
}
