import React from "react";

import { Box, type ReactBoxProps } from "../box";

export type ReactCardFooterProps = React.PropsWithChildren<
  ReactBoxProps & {
    className?: string;
  }
>;

export const CardFooter: React.FC<ReactCardFooterProps> = ({
  children,
  className,
  ...props
}) => (
  <Box
    className={["card__footer", className].filter(Boolean).join(" ")}
    {...props}
  >
    {children}
  </Box>
);
