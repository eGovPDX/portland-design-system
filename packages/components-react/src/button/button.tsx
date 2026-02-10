import type { ButtonProps } from "@cityofportland/types/button";
import React from "react";

import "@cityofportland/components-css/button.css";

// Extend ButtonProps with React-specific props
export interface ReactButtonProps extends ButtonProps {
  children?: React.ReactNode; // React's type for anything renderable
  left?: React.ReactNode; // Left slot content
  right?: React.ReactNode; // Right slot content
  className?: string; // CSS classes
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Click event handler
}

const OUTLINE_VARIANTS = ["primary", "secondary", "danger"];

export const Button: React.FC<ReactButtonProps> = ({
  children = null,
  variant = "primary",
  size = "default",
  outline = false,
  disabled = false,
  type = "button",
  left,
  right,
  className = "",
  ...props
}) => {
  function classes() {
    const classes = ["button"];

    classes.push(`button--${size}`);

    if (!disabled) classes.push(`button--${variant}`);

    if (outline && OUTLINE_VARIANTS.includes(variant)) {
      classes.push("button--outline");
    }
    if (className) {
      classes.push(className);
    }

    return classes;
  }

  return (
    <button
      type={type}
      className={classes().join(" ")}
      disabled={disabled}
      aria-disabled={disabled ? "true" : "false"}
      {...props}
    >
      {left && <span>{left}</span>}
      {children}
      {right && <span>{right}</span>}
    </button>
  );
};
