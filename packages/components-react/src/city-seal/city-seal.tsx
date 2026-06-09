import type { CitySealProps } from "@cityofportland/types/city-seal";
import React from "react";

import "@cityofportland/components-css/city-seal.css";

export interface ReactCitySealProps extends CitySealProps {
  size?: CitySealProps["size"]; // size of the City Seal, default is "lg"
  className?: string; // CSS classes
}

/**
 * Build the class list for the CitySeal component
 */
function buildClassList({
  className = "",
  size = "lg",
}: Partial<ReactCitySealProps>): string {
  const classes: Set<string> = new Set(["city-seal"]);

  // Size variation
  classes.add(`city-seal--${size}`);

  // Custom classes
  if (className) {
    className.split(" ").forEach((c) => classes.add(c));
  }

  return Array.from(classes).join(" ");
}

/**
 * CitySeal component with two size variations (large and small). The component is
 * designed to be flexible, allowing you to add custom CSS classes via the
 * `className` prop. This enables you to easily customize the appearance of the
 * City Seal by adding your own styles or utility classes as needed.
 *
 * @example
 * // Large City Seal with a custom class
 * <CitySeal className="my-custom-class" size="lg" />
 *
 */
export const CitySeal: React.FC<ReactCitySealProps> = ({
  size = "lg",
  className,
  ...rest
}) => {
  const classList = buildClassList({
    className,
    size,
  });

  return <img className={classList} alt="" {...rest} />;
};
