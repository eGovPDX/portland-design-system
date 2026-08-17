import { Box, type ReactBoxProps } from "@cityofportland/components-react/box";
import React from "react";

type NavItemProps<E extends React.ElementType = "a"> = ReactBoxProps<E> & {
  children?: React.ReactNode;
  className?: string;
};

export function NavItem<E extends React.ElementType = "a">({
  children,
  className,
  ...rest
}: NavItemProps<E>) {
  return (
    <Box
      className={["w-full justify-start", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Box>
  );
}
