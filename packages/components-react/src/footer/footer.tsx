import { ASSETS_CITY_SEAL } from "@cityofportland/design-tokens";
import type { FooterProps } from "@cityofportland/types/footer";
import React, { createContext, useContext, useId } from "react";

import "@cityofportland/components-css/footer.css";
import { Box } from "../box";

export type ReactFooterProps = FooterProps &
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>;

export const FooterNavigation: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children, className, ...rest }) => {
  let hasMenu = false;

  // Validate that a FooterMenu is present
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === FooterMenu) {
      hasMenu = true;
    }
  });

  if (!import.meta.env.PROD && !hasMenu) {
    throw new Error("FooterNavigation must contain a FooterMenu component");
  }

  function classes() {
    const classes = ["footer__navigation"];

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }
  return (
    <section className={classes()} {...rest}>
      {children}
    </section>
  );
};

const MenuContext = createContext<{ id?: string }>({});

export const FooterMenu: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children, className, ...rest }) => {
  const id = useId();

  let hasTitle = false;

  // Validate that a FooterMenuTitle is present
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === FooterMenuTitle) {
      hasTitle = true;
    }
  });

  if (!import.meta.env.PROD && !hasTitle) {
    throw new Error(
      "FooterMenu must contain a FooterMenuTitle component for accessibility."
    );
  }

  function classes() {
    const classes = ["footer__menu"];

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }
  return (
    <MenuContext.Provider value={{ id }}>
      <nav aria-labelledby={id} className={classes()} {...rest}>
        {children}
      </nav>
    </MenuContext.Provider>
  );
};

export const FooterMenuTitle: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children, className, ...rest }) => {
  const { id } = useContext(MenuContext);

  function classes() {
    const classes = ["footer__menu-title"];

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }
  return (
    <h2 id={id} className={classes()} {...rest}>
      {children}
    </h2>
  );
};

export const FooterMenuItem: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children, className, ...rest }) => {
  function classes() {
    const classes = ["footer__menu-item"];

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }

  return (
    <div className={classes()} {...rest}>
      {children}
    </div>
  );
};

/**
 * The footer component is used to display information about the website, such
 * as contact information, social media links, and copyright information.
 * It is typically placed at the bottom of the page.
 *
 * The Footer component is a wrapper around the Box component that applies
 * the appropriate styles and structure for a footer.
 * It also provides subcomponents for the content, navigation, menu, menu title,
 * menu item, and copyright sections of the footer.
 *
 */
export const Footer: React.FC<ReactFooterProps> = ({
  children,
  className,
  copyrightStart,
  color = "default",
  variant = "moderate",
  ...rest
}) => {
  function classes() {
    const classes = ["footer"];

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }

  const currentYear = new Date().getFullYear();

  const copyrightText =
    copyrightStart >= currentYear || !copyrightStart
      ? `Copyright ${currentYear}`
      : `Copyright ${copyrightStart}-${currentYear}`;

  return (
    <Box
      as="footer"
      color={color}
      variant={variant}
      className={classes()}
      {...rest}
    >
      {children}
      <aside className="footer__copyright">
        <img
          src={ASSETS_CITY_SEAL}
          alt="Official City of Portland seal. The image depicts Portlandia holding her trident backdropped by mountain and river, accompanied by the text 'City of Portland, Oregon 1851'"
        />
        <span className="footer__copyright-text">
          <h2>City of Portland, Oregon</h2>
          <p>© {copyrightText}</p>
        </span>
      </aside>
    </Box>
  );
};
