import "@cityofportland/components-css/card.css";
import "@cityofportland/components-css/utilities.css";
import type { BoxProps } from "@cityofportland/types/box";
import type { CardProps } from "@cityofportland/types/card";
import React from "react";

import { Box } from "../box";

import { type MediaPosition } from "@cityofportland/types/card";

export type ReactCardProps = Omit<CardProps, "border"> & {
  border?: boolean;
  children?: React.ReactNode;
  className?: string;
  "media position"?: MediaPosition;
} & Omit<
    React.ComponentPropsWithoutRef<"article">,
    keyof CardProps | keyof BoxProps | "className"
  >;

export const Card = ({
  as,
  layout = "vertical",
  border = true,
  children = null,
  className,
  ...props
}: ReactCardProps) => {
  const classes = [
    "card",
    `card--${layout}`,
    border && "card--bordered",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box
      as={as ?? "article"}
      color="default"
      variant="subtle"
      className={classes}
      {...props}
    >
      {children}
    </Box>
  );
};
