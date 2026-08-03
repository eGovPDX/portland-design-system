import "@cityofportland/components-css/alert.css";
import type { AlertProps } from "@cityofportland/types/alert";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { type ElementType } from "react";

import { Box, type ReactBoxProps } from "../box/box";
import { mergeClasses } from "../utils";

export type ReactAlertProps = React.PropsWithChildren<
  AlertProps & ReactBoxProps & { onDismiss: (element: Element) => void }
>;

export const AlertContent: React.FC<React.PropsWithChildren<ReactBoxProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Box className={mergeClasses(className, "alert__content")} {...props}>
      {children}
    </Box>
  );
};

export const AlertDescription: React.FC<
  React.PropsWithChildren<ReactBoxProps>
> = ({ children, className, ...props }) => {
  return (
    <Box className={mergeClasses(className, "alert__text")} {...props}>
      {children}
    </Box>
  );
};

export const AlertIcon: React.FC<React.PropsWithChildren<ReactBoxProps>> = ({
  as = "span" as ElementType,
  children,
  className,
  ...props
}) => {
  return (
    <Box as={as} className={mergeClasses(className, "alert__icon")} {...props}>
      {children}
    </Box>
  );
};

export const AlertTitle: React.FC<React.PropsWithChildren<ReactBoxProps>> = ({
  as = "header" as ElementType,
  children,
  className,
  ...props
}) => {
  return (
    <Box
      as={as}
      className={mergeClasses(className, "alert__heading")}
      {...props}
    >
      {children}
    </Box>
  );
};

export const Alert: React.FC<ReactAlertProps> = ({
  as = "div",
  color,
  variant,
  size = "default",
  role = "status",
  children,
  dismissible = true,
  className,
  "aria-label": ariaLabel = `${color} alert`,
  onDismiss,
  ...props
}) => {
  return (
    <Box
      as={as}
      className={mergeClasses(className, "alert", `alert--${size}`)}
      color={color}
      variant={variant}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
      {dismissible ? (
        <button
          className="alert__close"
          aria-label="Dismiss alert"
          onClick={(event) => {
            const alertElement = event.currentTarget.closest(".alert");

            if (!alertElement) {
              console.warn("Could not find alert to dismiss");
              return;
            }

            alertElement.remove();

            if (onDismiss) onDismiss(alertElement);
          }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            widthAuto
            style={{
              "--fa-display": "block",
            }}
          />
        </button>
      ) : (
        ""
      )}
    </Box>
  );
};
