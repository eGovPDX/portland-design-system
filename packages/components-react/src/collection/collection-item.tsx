import React from "react";

import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

export type ReactCollectionItemProps<E extends React.ElementType = "li"> =
  ReactBoxProps<E>;

export function CollectionItem<E extends React.ElementType = "li">(
  props: ReactCollectionItemProps<E>
): React.ReactNode;
export function CollectionItem({
  as = "li",
  children,
  className,
  ...props
}: ReactCollectionItemProps<React.ElementType>) {
  return (
    <Box
      as={as}
      className={mergeClasses("collection__item", className)}
      {...props}
    >
      {children}
    </Box>
  );
}
