import type { BoxProps } from "@cityofportland/types/box";
import React from "react";

import { Box, type ReactBoxProps } from "../box";

export type ReactCardBodyProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"div">, keyof BoxProps> & {
    className?: string;
  }
>;

export const CardBody: React.FC<ReactCardBodyProps> = ({
  children,
  className,
  ...props
}) => (
  <Box
    className={["card__body", className].filter(Boolean).join(" ")}
    {...props}
  >
    {children}
  </Box>
);
