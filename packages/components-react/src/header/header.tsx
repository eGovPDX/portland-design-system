import "@cityofportland/components-css/header.css";
import React from "react";
import { Box, type ReactBoxProps } from "../box";
import { CitySeal } from "../city-seal";
import { mergeClasses } from "../utils";

export type ReactHeaderProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"header">, "as">
>;

type HeaderBrandingTypes = "a" | "div" | "span";

export type ReactHeaderBrandingProps<E extends HeaderBrandingTypes = "a"> =
  ReactBoxProps<E> & {
    children?: React.ReactNode;
    className?: string;
  };

export type ReactHeaderLogoProps = React.PropsWithChildren;

export type ReactHeaderContentProps = React.PropsWithChildren;

export const HeaderBranding = <E extends HeaderBrandingTypes = "a">({
  children,
  className,
  ...props
}: ReactHeaderBrandingProps<E>) => {
  return (
    <Box className={mergeClasses(["header__branding"], className)} {...props}>
      {children}
    </Box>
  );
};

export const HeaderLogo: React.FC<ReactHeaderLogoProps> = ({
  children = <CitySeal size="sm" />,
}) => <span className="header__logo">{children}</span>;

export const HeaderContent: React.FC<ReactHeaderContentProps> = ({
  children,
}) => <div className="header__content">{children}</div>;

export type ReactHeaderNavLinkProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
  };

export const HeaderNavLink: React.FC<ReactHeaderNavLinkProps> = ({
  children,
  href = "#",
  className = "",
  ...rest
}) => {
  const classes = mergeClasses(["link", className]);

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
};

export const Header: React.FC<ReactHeaderProps> = ({
  children,
  className,
  color,
  variant,
  ...rest
}) => {
  return (
    <Box
      as="header"
      color={color}
      variant={variant}
      className={["header", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Box>
  );
};
