import "@cityofportland/components-css/alert.css";
import type { AlertProps } from "@cityofportland/types/alert";
import React from "react";
import { Box } from "../box/box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

export type ReactAlertProps = React.PropsWithChildren<AlertProps>;

const alert = {
  info: {
    boxColor: "info",
    label: "Information alert",
    fontAwesomeIcon: ["fas", "circle-info"] as IconProp,
    ariaRole: "status",
  },
  success: {
    boxColor: "success",
    label: "Success alert",
    fontAwesomeIcon: ["fas", "circle-check"] as IconProp,
    ariaRole: "status",
  },
  warning: {
    boxColor: "warning",
    label: "Warning alert",
    fontAwesomeIcon: ["fas", "triangle-exclamation"] as IconProp,
    ariaRole: "status",
  },
  error: {
    boxColor: "danger",
    label: "Error alert",
    fontAwesomeIcon: ["fas", "circle-exclamation"] as IconProp,
    ariaRole: "alert",
  },
};

export const Alert: React.FC<ReactAlertProps> = ({
  variant = "default",
  type = "info",
  icon = true,
  heading,
  children,
  dismissible = true,
}) => {
  function classes() {
    const classes = ["border-l-8", "alert"];

    classes.push(`alert--${type}`);
    if (variant !== "default") {
      classes.push(`alert--${variant}`);
    }

    return classes.join(" ");
  }

  return (
    <Box
      className={classes()}
      color={
        alert[type]["boxColor"] as "info" | "warning" | "danger" | "success"
      }
      variant="moderate"
      role={alert[type]["ariaRole"]}
      aria-label={alert[type]["label"]}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={alert[type]["fontAwesomeIcon"]}
          className="alert__icon"
          aria-label={alert[type]["label"]}
        />
      ) : (
        ""
      )}
      <div className="alert__content">
        {heading && variant == "default" ? (
          <div className="alert__heading">{heading}</div>
        ) : (
          ""
        )}
        <div className="alert__text">{children}</div>
      </div>
      {dismissible ? (
        <button
          className="alert__close"
          aria-label="Dismiss alert"
          onClick={(event) => {
            const alertElement = event.currentTarget.closest(".box");
            alertElement?.remove();
          }}
        >
          <FontAwesomeIcon icon={["fas", "xmark"]} />
        </button>
      ) : (
        ""
      )}
    </Box>
  );
};
