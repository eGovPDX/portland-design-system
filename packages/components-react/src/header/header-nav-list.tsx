import React from "react";

import { mergeClasses } from "../utils";

export type ReactHeaderNavListProps = React.HTMLAttributes<HTMLUListElement>;

export const HeaderNavList: React.FC<ReactHeaderNavListProps> = ({
  children,
  className,
  ...props
}) => (
  <ul className={mergeClasses("header__nav-list", className)} {...props}>
    {children}
  </ul>
);
