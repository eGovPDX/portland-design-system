import type { CardProps } from "@cityofportland/types/card";
import React from "react";

import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

import "@cityofportland/components-css/card.css";
import "@cityofportland/components-css/utilities.css";

export type ReactCardProps<E extends React.ElementType = "article"> =
  ReactBoxProps<E, CardProps> & {
    children: React.ReactNode;
  };

export function Card({
  as = "article",
  layout = "vertical",
  border = true,
  children = null,
  className,
  ...props
}: ReactCardProps<React.ElementType>) {
  const classes = mergeClasses(
    "card",
    `card--${layout}`,
    border && "card--bordered",
    className
  );

  return (
    <Box as={as} className={classes} {...props}>
      {children}
    </Box>
  );
}
