import "@cityofportland/components-css/tag.css";
import "@cityofportland/components-css/utilities.css";
import type { TagProps } from "@cityofportland/types/tag";
import React from "react";

// Extend TagProps with React-specific props
export interface ReactTagProps extends TagProps {
  children?: React.ReactNode; // Content of the tag
  className?: string; // Additional CSS classes
}

export const Tag: React.FC<ReactTagProps> = ({
  variant = "info",
  children = null,
  className = null,
  ...props
}) => {
  function classes() {
    const classes = ["tag"];

    classes.push(`tag--${variant}`);

    if (className) {
      classes.push(className);
    }

    return classes;
  }

  return (
    <span className={classes().join(" ")} {...props}>
      {children}
    </span>
  );
};
