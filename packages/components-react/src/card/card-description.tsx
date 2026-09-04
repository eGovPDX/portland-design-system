import React from "react";

import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

export type ReactCardDescriptionProps = React.PropsWithChildren<
  ReactBoxProps & {
    className?: string;
  }
>;

export const CardDescription: React.FC<ReactCardDescriptionProps> = ({
  children,
  className,
  ...props
}) => (
  <Box className={mergeClasses("card__description", className)} {...props}>
    {children}
  </Box>
);
