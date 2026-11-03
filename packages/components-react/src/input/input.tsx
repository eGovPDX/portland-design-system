import type { AnyInputProps } from "@cityofportland/types/input";
import React from "react";

import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

import "@cityofportland/components-css/input.css";

/**
 * `color` and `variant` style the wrapper; every other prop is passed to the
 * native `<input>`.
 */
export type ReactInputProps = Omit<
  ReactBoxProps<"input">,
  "as" | "type" | "prefix"
> & {
  type?: AnyInputProps["type"];
  state?: AnyInputProps["state"];
  /** Content rendered before the input, typically an `InputAddon`. */
  prefix?: React.ReactNode;
  /** Content rendered after the input, typically an `InputAddon`. */
  suffix?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, ReactInputProps>(
  (
    {
      type = "text",
      state,
      id,
      disabled = false,
      prefix,
      suffix,
      className,
      color,
      variant,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const resolvedState = state ?? (disabled ? "disabled" : undefined);

    const describedBy = [
      ariaDescribedBy,
      id && prefix ? `${id}__prefix` : undefined,
      id && suffix ? `${id}__suffix` : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Box
        as="span"
        color={color}
        variant={variant}
        className={mergeClasses(
          "input",
          resolvedState && `input--${resolvedState}`,
          className
        )}
      >
        <input
          ref={ref}
          type={type}
          id={id}
          disabled={disabled || state === "disabled"}
          aria-describedby={describedBy || undefined}
          {...props}
        />
        {prefix}
        {suffix}
      </Box>
    );
  }
);

Input.displayName = "Input";
