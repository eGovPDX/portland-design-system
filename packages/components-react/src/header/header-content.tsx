import React from "react";

import { mergeClasses } from "../utils";

export type ReactHeaderContentProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export const HeaderContent: React.FC<ReactHeaderContentProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={mergeClasses("header__content", className)} {...props}>
    {children}
  </div>
);
