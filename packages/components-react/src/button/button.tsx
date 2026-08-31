import { type ButtonProps } from "@cityofportland/types/button";
import React from "react";

import { mergeClasses } from "../utils";
import { Box, type ReactBoxProps } from "../box";

import "@cityofportland/components-css/button.css";

type ButtonElementType = "button" | "a";

const DefaultElementType: ButtonElementType = "button";

type ButtonOwnProps = Omit<ButtonProps, keyof ReactBoxProps>;

export type ReactButtonProps<
  T extends ButtonElementType = typeof DefaultElementType,
> = React.PropsWithChildren<ButtonOwnProps & ReactBoxProps<T>>;

export const Button = <
  T extends ButtonElementType = typeof DefaultElementType,
>({
  as,
  children = null,
  size = "md",
  outline = false,
  disabled = false,
  className,
  ...props
}: ReactButtonProps<T>) => {
  const element = as ?? DefaultElementType;

  return (
    <Box
      as={element}
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
