import "@cityofportland/components-css/header.css";
import { ASSETS_CITY_SEAL } from "@cityofportland/design-tokens";
import { type HeaderProps } from "@cityofportland/types";
import React from "react";

export type ReactHeaderProps = HeaderProps & {
  children?: React.ReactNode;
  branding?: React.ReactNode;
  className?: string;
};
/**
 * PGOVHeader component for Portland.gov
 */
export const Header: React.FC<ReactHeaderProps> = ({
  title,
  branding,
  children,
  className,
}) => {
  return (
    <header className={["header", className].filter(Boolean).join(" ")}>
      <span className="header__branding">
        <img
          src={ASSETS_CITY_SEAL}
          alt="City of Portland Seal"
          className="header__branding__logo"
        />
        {branding}
        <span className="header__branding__title">{title}</span>
      </span>
      <span className="header__content">{children}</span>
    </header>
  );
};
