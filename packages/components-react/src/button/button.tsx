import {
  validateButtonElement,
  type ButtonProps,
} from "@cityofportland/types/button";
import React from "react";

import { mergeClasses } from "../utils";
import { Box, type ReactBoxProps } from "../box";

import "@cityofportland/components-css/button.css";

type ElementType = "button" | "a";

export type ReactButtonProps<E extends ElementType = "button"> = ButtonProps &
  ReactBoxProps<E> &
  React.PropsWithChildren;

export const Button = <E extends ElementType = "button">({
  as = "button",
  children = null,
  size,
  outline = false,
  disabled = false,
  className,
  ...props
}: ReactButtonProps<E>) => {
  try {
    validateButtonElement(as);
  } catch (err) {
    console.warn(err);
    as = "button";
  }

  return (
    <Box
      as={as}
      className={mergeClasses(
        "button",
        size && `button--${size}`,
        disabled && "button--disabled",
        outline && "button--outline",
        className
      )}
      disabled={disabled}
      aria-disabled={disabled ? "true" : "false"}
      role="button"
      {...props}
    >
      {children}
    </Box>
  );
};
