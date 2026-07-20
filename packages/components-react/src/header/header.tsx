import "@cityofportland/components-css/header.css";
import React from "react";
import { Box, type ReactBoxProps } from "../box";
import { CitySeal } from "../city-seal";
import { mergeClasses } from "../utils";

export type ReactHeaderProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"header">, "as">
>;

export type ReactHeaderBrandingProps<
  E extends React.ElementType<{ className?: string }> = "div",
> = ReactBoxProps<E>;

export type ReactHeaderLogoProps = React.PropsWithChildren;

export type ReactHeaderContentProps = React.PropsWithChildren;

export type ReactHeaderNavProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export const HeaderBranding = <
  E extends React.ElementType<{ className?: string }> = "div",
>({
  className,
  ...rest
}: ReactHeaderBrandingProps<E>) => {
  return (
    <Box {...rest} className={mergeClasses(["header__branding"], className)} />
  );
};

export const HeaderLogo: React.FC<ReactHeaderLogoProps> = ({ children }) => (
  <span className="header__logo">{children ?? <CitySeal size="sm" />}</span>
);

export const HeaderContent: React.FC<ReactHeaderContentProps> = ({
  children,
}) => <div className="header__content">{children}</div>;

export const HeaderNav: React.FC<ReactHeaderNavProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <nav className={mergeClasses(["header__nav"], className)} {...rest}>
      {children}
    </nav>
  );
};

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
