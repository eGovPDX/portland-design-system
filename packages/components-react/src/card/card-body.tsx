import React from "react";

import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

export type ReactCardBodyProps = React.PropsWithChildren<
  ReactBoxProps & {
    className?: string;
  }
>;

export const CardBody: React.FC<ReactCardBodyProps> = ({
  children,
  className,
  ...props
}) => (
  <Box className={mergeClasses("card__body", className)} {...props}>
    {children}
  </Box>
);
