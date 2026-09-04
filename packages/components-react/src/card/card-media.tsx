import type { CardMediaProps } from "@cityofportland/types/card";
import React from "react";

import { Box } from "../box";
import { mergeClasses } from "../utils";

export type ReactCardMediaProps = React.PropsWithChildren<
  CardMediaProps & {
    className?: string;
  }
>;

export const CardMedia: React.FC<ReactCardMediaProps> = ({
  children,
  className,
  position,
  ...props
}) => (
  <Box
    {...props}
    as="figure"
    className={mergeClasses(
      "card__media",
      `card__media--${position}`,
      className
    )}
  >
    {children}
  </Box>
);
