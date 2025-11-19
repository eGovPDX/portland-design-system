import { ASSETS_CITY_SEAL } from "@cityofportland/design-tokens";
import React, { createContext, useContext, useId } from "react";

import "@cityofportland/components-css/footer.css";

export type ReactFooterProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLElement>
>;

export const FooterContent: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children, className, ...rest }) => {
  function classes() {
    const classes = ["footer__content"];

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

export const FooterNavigation: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children, className, ...rest }) => {
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

type FooterCopyrightProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLElement> & { startYear: number }
>;

export const FooterCopyright: React.FC<FooterCopyrightProps> = ({
  startYear,
  children,
  className,
  ...rest
}) => {
  function classes() {
    const classes = ["footer__copyright"];

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }
  return (
    <div className={classes()} {...rest}>
      <h2>City of Portland, Oregon</h2>
      <img
        src={ASSETS_CITY_SEAL}
        alt="Official City of Portland seal. The image depicts Portlandia holding her trident backdropped by mountain and river, accompanied by the text 'City of Portland, Oregon 1851'"
      />
      <p>
        © Copyright {startYear}-{new Date().getFullYear()}
      </p>
    </div>
  );
};

export const Footer: React.FC<ReactFooterProps> = ({
  children,
  className,
  ...rest
}) => {
  function classes() {
    const classes = ["footer"];

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }
  return (
    <footer className={classes()} {...rest}>
      {children}
    </footer>
  );
};
