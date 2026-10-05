import type { CollectionProps } from "@cityofportland/types/collection";
import React from "react";

import { Box } from "../box";
import { mergeClasses } from "../utils";

import "@cityofportland/components-css/collection.css";

export type ReactCollectionProps = CollectionProps & {
  children: React.ReactNode;
  className?: string;
};

export const Collection = ({
  as = "ul",
  divider = false,
  children = null,
  className,
  ...props
}: ReactCollectionProps) => {
  const classes = mergeClasses(
    "collection",
    divider && "collection--divided",
    className
  );

  return (
    <Box as={as} className={classes} {...props}>
      {children}
    </Box>
  );
};
