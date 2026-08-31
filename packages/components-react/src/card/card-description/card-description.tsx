import type { BoxProps } from "@cityofportland/types/box";
import React from "react";

import { Box, type ReactBoxProps } from "../../box";

export type ReactCardDescriptionProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"div">, keyof BoxProps> & {
    className?: string;
  }
>;

export const CardDescription: React.FC<ReactCardDescriptionProps> = ({
  children,
  className,
  ...props
}) => (
  <Box
    className={["card__description", className].filter(Boolean).join(" ")}
    {...props}
  >
    {children}
  </Box>
);
