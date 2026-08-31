import type { BoxProps } from "@cityofportland/types/box";
import React from "react";

import { Box, type ReactBoxProps } from "../../box";

export type ReactCardFooterProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"footer">, keyof BoxProps> & {
    className?: string;
  }
>;

export const CardFooter: React.FC<ReactCardFooterProps> = ({
  children,
  className,
  ...props
}) => (
  <Box
    {...props}
    as="footer"
    className={["card__footer", className].filter(Boolean).join(" ")}
  >
    {children}
  </Box>
);
