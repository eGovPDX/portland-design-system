import type { BoxProps } from "@cityofportland/types/box";
import React from "react";

import "@cityofportland/components-css/box.css";

/**
 * Default HTML element type for the Box component
 */
type DefaultElementType = "div";

/**
 * Props that are specific to the React implementation
 */
type ReactBoxOwnProps<E extends React.ElementType = DefaultElementType> =
  BoxProps & {
    /**
     * The HTML element or React component to render as
     * @default "div"
     */
    as?: E;
  };

/**
 * Polymorphic Box props that merge own props with the element's native props
 * Omits props that are defined in our own props to avoid conflicts
 */
export type ReactBoxProps<E extends React.ElementType = DefaultElementType> =
  ReactBoxOwnProps<E> &
    Omit<React.ComponentProps<E>, keyof ReactBoxOwnProps<E>>;

/**
 * Generic Box component type for use with forwardRef
 */
type BoxComponent = <E extends React.ElementType = DefaultElementType>(
  props: ReactBoxProps<E>
) => React.ReactNode;

/**
 * Build the class list for the Box component
 */
function buildClassList({
  className = "",
  color = "default",
  variant = "moderate",
}: Partial<ReactBoxProps>): string {
  const classes: Set<string> = new Set(["box"]);

  // Color scheme and variation
  classes.add(`box--${color}`);
  classes.add(`box--${variant}`);

  // Custom classes
  if (className) {
    className.split(" ").forEach((c) => classes.add(c));
  }

  return Array.from(classes).join(" ");
}

/**
 * A polymorphic Box component that allows users to customize the element tag
 * and apply design token-based color schemes and variations.
 *
 * @example
 * // Default div with primary color scheme
 * <Box color="primary" variant="subtle">
 *   Content here
 * </Box>
 *
 * @example
 * // As a section element
 * <Box as="section" color="info">
 *   Section content
 * </Box>
 *
 * @example
 * // With generic type for custom components
 * <Box as={MyCustomComponent} color="success" myProp="value">
 *   Custom component content
 * </Box>
 */
export const Box: BoxComponent = ({
  as = "div",
  border,
  children,
  color = "default",
  variant = "moderate",
  className,
  ...rest
}) => {
  const Element = as || "div";

  const classList = buildClassList({
    className,
    color,
    variant,
  });

  return (
    <Element className={classList} {...rest}>
      {children}
    </Element>
  );
};
