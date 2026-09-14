import React from "react";

import { mergeClasses } from "../utils";

export type ReactHeaderNavLinkProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const HeaderNavLink: React.FC<ReactHeaderNavLinkProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = mergeClasses(["link", className]);

  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
};
