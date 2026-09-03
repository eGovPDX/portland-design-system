import type { BoxProps } from "@cityofportland/types/box";
import type { MediaPosition } from "@cityofportland/types/card";
import React from "react";

import { Box, type ReactBoxProps } from "../box";

export type ReactCardMediaProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"figure">, keyof BoxProps> & {
    className?: string;
    inset?: boolean;
    position?: MediaPosition;
  }
>;

export const CardMedia: React.FC<ReactCardMediaProps> = ({
  children,
  className,
  inset = false,
  position = "left",
  ...props
}) => (
  <Box
    {...props}
    as="figure"
    className={[
      "card__media",
      inset && "card__media--inset",
      `card__media--${position}`,
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </Box>
);
