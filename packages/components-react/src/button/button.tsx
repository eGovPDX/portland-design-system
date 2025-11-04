import "@cityofportland/components-css/button.css";
import type { ButtonProps } from "@cityofportland/components-types/button";
import React from "react";

// Extend ButtonProps with React-specific props
export interface ReactButtonProps extends ButtonProps {
  children?: React.ReactNode; // React's type for anything renderable
  left?: React.ReactNode; // Left slot content
  right?: React.ReactNode; // Right slot content
  className?: string; // CSS classes
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Click event handler
}

export const Button: React.FC<ReactButtonProps> = ({
  children = null,
  variant = "primary",
  size = "default",
  disabled = false,
  type = "button",
  left,
  right,
  className = "",
  label,
  ...props
}) => {
  function classes() {
    const classes = ["button"];

    classes.push(`button--${size}`);

    if (!disabled) classes.push(`button--${variant}`);

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
      {children || label}
      {right && <span>{right}</span>}
    </button>
  );
};
