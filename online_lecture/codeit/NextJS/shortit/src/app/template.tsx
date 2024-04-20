"use client";
import { ReactNode } from "react";
import { TemplateStyled } from "@/styles/pageStyled/TemplateStyled";
import useSWR from "swr";
import clsx from "clsx";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Wrapper from "@/provider/WrapperProvider";

export default function CommonTemplate({ children }: { children: ReactNode }) {

  return (
    <TemplateStyled className={clsx("Template")}>
      {/* <Header category={categoriesData} /> */}
      <div className="content">{children}</div>
      <Footer />
      {/* <button onClick={ () => handle()}>Click my name!</button> */}
    </TemplateStyled>
  );
}
