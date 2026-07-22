import {
  validateButtonElement,
  type ButtonProps,
} from "@cityofportland/types/button";
import React from "react";

import { mergeClasses } from "../utils";
import { Box, type ReactBoxProps } from "../box";

import "@cityofportland/components-css/button.css";

export type ReactButtonProps = ButtonProps &
  ReactBoxProps<"button" | "a"> &
  React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> &
  React.PropsWithChildren;

export const Button: React.FC<ReactButtonProps> = ({
  as = "button",
  children = null,
  size,
  outline = false,
  disabled = false,
  className,
  ...props
}) => {
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
