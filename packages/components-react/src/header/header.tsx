import "@cityofportland/components-css/header.css";
import React from "react";

export type ReactHeaderProps = React.PropsWithChildren<{
  className?: string;
}>;

export type ReactHeaderBrandingProps = React.PropsWithChildren;

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

export const Header: React.FC<ReactHeaderProps> = ({ children, className }) => {
  return (
    <header className={["header", className].filter(Boolean).join(" ")}>
      {children}
    </header>
  );
};
