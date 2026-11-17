import type { CollectionProps } from "@cityofportland/types/collection";
import React from "react";

import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

import "@cityofportland/components-css/collection.css";

export type ReactCollectionProps<E extends React.ElementType = "ul"> =
  ReactBoxProps<E, CollectionProps> & {
    children: React.ReactNode;
  };

export function Collection({
  as = "ul",
  divider = false,
  children = null,
  className,
  ...props
}: ReactCollectionProps<React.ElementType>) {
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
}
