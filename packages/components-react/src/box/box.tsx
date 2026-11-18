import type { BoxProps } from "@cityofportland/types/box";
import { validateBoxConfiguration } from "@cityofportland/types/box";

import React from "react";

import { mergeClasses } from "../utils";

import "@cityofportland/components-css/box.css";

/**
 * Default HTML element type for the Box component
 */
type DefaultElementType = "div";

/**
 * Props handled by Box regardless of the rendered element or component
 */
type ReactBoxOwnProps<
  E extends React.ElementType,
  SharedProps,
> = React.PropsWithChildren<
  Omit<SharedProps, keyof BoxProps> & BoxProps<E> & { className?: string }
>;

/**
 * Polymorphic Box props that merge own props with the element's native props
 * Replaces shared Box fields with React's element-aware fields, then adds native
 * props and refs. Component-specific shared props take priority over native props.
 * NoInfer ensures that only `as` selects the element type.
 *
 * @example
 * type ReactCardProps<E extends React.ElementType = "article"> =
 *   ReactBoxProps<E, CardProps>;
 */
export type ReactBoxProps<
  E extends React.ElementType = DefaultElementType,
  SharedProps = BoxProps,
> = ReactBoxOwnProps<E, SharedProps> &
  Omit<
    React.ComponentPropsWithRef<NoInfer<E>>,
    keyof ReactBoxOwnProps<E, SharedProps>
  >;

/**
 * Generic Box component type with element-specific props and refs
 */
export type BoxComponent = <E extends React.ElementType = DefaultElementType>(
  props: ReactBoxProps<E>
) => React.ReactNode;

/**
 * Build the class list for the Box component
 */
function buildClassList({
  className = "",
  color,
  variant,
}: Partial<ReactBoxProps>): string {
  const classes = ["box"];

  if (color && variant) {
    classes.push(
      color ? `box--${color}` : "",
      variant ? `box--${variant}` : ""
    );
  }

  return mergeClasses(...classes, className);
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
export const Box: BoxComponent = <
  E extends React.ElementType = DefaultElementType,
>({
  as,
  ref,
  children,
  color,
  variant,
  className,
  ...rest
}: ReactBoxProps<E>) => {
  const Element: React.ElementType = as ?? "div";

  [color, variant] = validateBoxConfiguration(color, variant);

  const classList = buildClassList({
    className,
    color,
    variant,
  });

  return (
    <Element
      ref={ref}
      className={classList.length ? classList : undefined}
      {...rest}
    >
      {children}
    </Element>
  );
};
