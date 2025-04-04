/// <reference types="react-scripts" />

declare type AppProps<T = {}> = AppPropsType<Router, T>;

declare type PropsWithChildren<T = {}> = import("react").PropsWithChildren<T>;

declare type PropsWithClassName = {
  className?: string;
};

declare type Callback = () => void;

declare module "*.css";

declare module "*.sass";

declare type Style = {
  readonly [key: string]: string;
};

declare type Icons = {
  readonly [key: string]: React.FunctionComponent<SvgIconProps>;
};

declare module "*.svg" {
  import React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;

  export default src;
}
