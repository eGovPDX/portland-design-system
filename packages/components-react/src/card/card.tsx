import type { CardProps } from "@cityofportland/types/card";
import React from "react";

import { Box } from "../box";
import { mergeClasses } from "../utils";

import "@cityofportland/components-css/card.css";
import "@cityofportland/components-css/utilities.css";

export type ReactCardProps = CardProps & {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({
  as = "article",
  layout = "vertical",
  border = true,
  children = null,
  className,
  ...props
}: ReactCardProps) => {
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
};
