import React from "react";

import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

export type ReactCardTitleProps = React.PropsWithChildren<
  ReactBoxProps & {
    className?: string;
  }
>;

export const CardTitle: React.FC<ReactCardTitleProps> = ({
  children,
  className,
  ...props
}) => (
  <Box
    className={mergeClasses("card__title", "heading-md", className)}
    {...props}
  >
    {children}
  </Box>
);
