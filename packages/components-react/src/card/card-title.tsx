import type { BoxProps } from "@cityofportland/types/box";
import React from "react";

import { Box, type ReactBoxProps } from "../box";

export type ReactCardTitleProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"header">, keyof BoxProps> & {
    className?: string;
  }
>;

export const CardTitle: React.FC<ReactCardTitleProps> = ({
  children,
  className,
  ...props
}) => (
  <Box
    {...props}
    as="header"
    className={["card__title", "heading-md", className]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </Box>
);
