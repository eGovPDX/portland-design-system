import "@cityofportland/components-css/header.css";
import React from "react";

import { Box, type ReactBoxProps } from "../box";

export type ReactHeaderProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"header">, "as">
>;

export const Header: React.FC<ReactHeaderProps> = ({
  children,
  className,
  color,
  variant,
  ...rest
}) => {
  return (
    <Box
      as="header"
      color={color}
      variant={variant}
      className={["header", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Box>
  );
};
