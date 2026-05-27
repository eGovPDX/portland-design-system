import "@cityofportland/components-css/header.css";
import React from "react";
import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

export type ReactHeaderProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"header">, "as">
>;

export type ReactHeaderBrandingProps<
  E extends React.ElementType<{ className?: string }> = "div",
> = ReactBoxProps<E>;

export type ReactHeaderLogoProps = React.PropsWithChildren;

export type ReactHeaderContentProps = React.PropsWithChildren;

export const HeaderBranding: React.FC<ReactHeaderBrandingProps> = ({
  children,
}) => <span className="header__branding">{children}</span>;

export const HeaderLogo: React.FC<ReactHeaderLogoProps> = ({ children }) => (
  <span className="header__logo">{children}</span>
);

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
  const classes = ["header__nav-link", className].filter(Boolean).join(" ");

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
};

export const Header: React.FC<ReactHeaderProps> = ({
  children,
  className,
  color = "primary",
  variant = "strong",
  ...rest
}) => {
  return (
    <header className={["header", className].filter(Boolean).join(" ")}>
      {children}
    </header>
  );
};
