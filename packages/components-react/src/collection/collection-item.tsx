import type { BoxProps } from "@cityofportland/types/box";
import React from "react";

import { Box } from "../box";
import { mergeClasses } from "../utils";

export type ReactCollectionItemProps = React.PropsWithChildren<
  BoxProps & {
    className?: string;
  }
>;

export const CollectionItem: React.FC<ReactCollectionItemProps> = ({
  as = "li",
  children,
  className,
  ...props
}) => (
  <Box
    as={as}
    className={mergeClasses("collection__item", className)}
    {...props}
  >
    {children}
  </Box>
);
