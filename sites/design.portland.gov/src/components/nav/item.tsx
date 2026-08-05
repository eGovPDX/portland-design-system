import { Box } from "@cityofportland/components-react/box";
import {
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import React from "react";

export function NavItem({
  as = "div",
  children,
  className,
  color,
  variant,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  color?: BoxColorScheme;
  variant?: BoxColorVariation;
}) {
  return (
    <Box
      as={as}
      color={color}
      variant={variant}
      className={["w-full justify-start", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Box>
  );
}
