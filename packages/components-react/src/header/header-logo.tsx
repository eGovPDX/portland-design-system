import React from "react";

import { CitySeal } from "../city-seal";
import { mergeClasses } from "../utils";

export type ReactHeaderLogoProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLSpanElement>
>;

export const HeaderLogo: React.FC<ReactHeaderLogoProps> = ({
  children = <CitySeal size="sm" />,
  className,
  ...props
}) => (
  <span className={mergeClasses("header__logo", className)} {...props}>
    {children}
  </span>
);
