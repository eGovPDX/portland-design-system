import seal from "@cityofportland/design-tokens/assets/city-seal.svg";
import type { CitySealProps } from "@cityofportland/types/city-seal";
import React from "react";

import "@cityofportland/components-css/city-seal.css";
import { mergeClasses } from "../utils";

export interface ReactCitySealProps extends CitySealProps {
  size?: CitySealProps["size"]; // size of the City Seal, default is "lg"
  className?: string; // CSS classes
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
  ...props
}) => {
  return (
    <img
      src={seal}
      className={mergeClasses("city-seal", `city-seal--${size}`, className)}
      {...props}
    />
  );
};
