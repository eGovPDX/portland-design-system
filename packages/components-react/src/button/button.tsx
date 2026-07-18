import type { ButtonProps } from "@cityofportland/types/button";
import React from "react";

import { mergeClasses } from "../utils";
import { Box, type ReactBoxProps } from "../box";

import "@cityofportland/components-css/button.css";

export type ReactButtonProps = ButtonProps &
  ReactBoxProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.PropsWithChildren;

export const Button: React.FC<ReactButtonProps> = ({
  as = "button",
  children = null,
  size,
  outline = false,
  disabled = false,
  type = "button",
  className,
  ...props
}) => {
  return (
    <Box
      as={as}
      type={type}
      className={mergeClasses(
        "button",
        size && `button--${size}`,
        outline && "button--outline",
        className
      )}
      disabled={disabled}
      aria-disabled={disabled ? "true" : "false"}
      {...props}
    >
      {children}
    </Box>
  );
};
