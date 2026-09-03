import {
  circleCheck,
  circleExclamation,
  circleInfo,
  circleQuestion,
  triangleExclamation,
} from "@cityofportland/icons";
import { ALERT_SIZES } from "@cityofportland/types/alert";
import type { BoxColorScheme } from "@cityofportland/types/box";
import type { IconDefinition } from "@cityofportland/types/icon";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "react";

import "@cityofportland/components-css/utilities.css";

import boxStories from "../box/box.stories";
import { Icon } from "../icon/icon";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  type ReactAlertProps,
} from "./alert";

type StoryProps = ReactAlertProps;

export default {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          "Alerts are used to provide important messages to users, such as information, success, warning, and error messages. They can include an icon, heading, and text content to effectively communicate the message.",
      },
    },
    layout: "padded",
    controls: {
      exclude: ["children"],
    },
  },
  argTypes: {
    ...boxStories.argTypes,
    size: {
      control: "select",
      options: ALERT_SIZES,
      description: "The visual style of the alert",
    },
    dismissible: {
      control: "boolean",
      description: "Allow the alert to be dismissed by the user",
    },
    role: {
      control: "select",
      options: ["status", "alert"],
    },
  },
} satisfies Meta<StoryProps>;

export const Basic: StoryObj<
  StoryProps & {
    icon: boolean;
    title: string;
    description: string;
    link: boolean;
  }
> = {
  argTypes: {
    icon: {
      control: "boolean",
      description: "Show an icon in the alert",
    },
    title: {
      control: "text",
      description: "The title for the alert",
    },
    description: {
      control: "text",
      description: "The text description of the alert",
    },
    link: {
      control: "boolean",
      description: "Show a 'read more' link in the alert description.",
    },
  },
  args: {
    as: "div",
    color: "info",
    variant: "moderate",
    role: "status",
    size: "default",
    dismissible: true,
    icon: true,
    title: "Alert heading",
    description: "This is the alert text content.",
    link: true,
  },
  render: ({ color, title, icon, link, size, description, ...args }) => {
    const iconMap = new Map<BoxColorScheme, IconDefinition>([
      ["danger", circleExclamation],
      ["info", circleInfo],
      ["success", circleCheck],
      ["warning", triangleExclamation],
    ]);

    return (
      <Alert color={color} size={size} {...args}>
        {icon && (
          <AlertIcon>
            <Icon icon={iconMap.get(color!) || circleQuestion} />
          </AlertIcon>
        )}
        <AlertContent>
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && (
            <AlertDescription>
              <p>
                {description}{" "}
                {link && (
                  <a href="#" className="link">
                    Read more
                  </a>
                )}
              </p>
            </AlertDescription>
          )}
        </AlertContent>
      </Alert>
    );
  },
};

export const PortlandGov: StoryObj<
  StoryProps & {
    description: string;
    icon: boolean;
    link: boolean;
    title: string;
  }
> = {
  name: "portland.gov",
  parameters: {
    controls: {
      exclude: ["as", "color", "role", "variant"],
    },
  },
  argTypes: {
    description: {
      control: "text",
      description: "The text description of the alert",
    },
    icon: {
      control: "boolean",
      description: "Show an icon in the alert",
    },
    link: {
      control: "boolean",
      description: "Show a 'read more' link in the alert description.",
    },
    title: {
      control: "text",
      description: "The title for the alert",
    },
  },
  args: {
    size: "default",
    dismissible: true,
    icon: true,
    title: "Alert heading",
    description: "This is the alert text content.",
    link: true,
  },
  render: ({
    description,
    dismissible,
    icon: iconEnabled,
    link,
    size,
    title,
  }) => {
    const types = new Map<
      string,
      Pick<ReactAlertProps, "color" | "variant" | "role"> & {
        icon: IconDefinition;
      }
    >([
      [
        "info",
        {
          color: "info",
          variant: "moderate",
          role: "status",
          icon: circleInfo,
        },
      ],
      [
        "warning",
        {
          color: "warning",
          variant: "moderate",
          role: "status",
          icon: triangleExclamation,
        },
      ],
      [
        "error",
        {
          color: "danger",
          variant: "moderate",
          role: "alert",
          icon: circleExclamation,
        },
      ],
      [
        "success",
        {
          color: "success",
          variant: "moderate",
          role: "status",
          icon: circleCheck,
        },
      ],
    ]);

    return (
      <section className="grid gap-sm">
        {[...types.entries()].map(([key, { color, variant, role, icon }]) => (
          <Alert
            key={key}
            color={color}
            variant={variant}
            size={size}
            role={role}
            dismissible={dismissible}
          >
            {iconEnabled && (
              <AlertIcon>
                <Icon icon={icon} />
              </AlertIcon>
            )}
            <AlertContent>
              {title && <AlertTitle>{title}</AlertTitle>}
              {description && (
                <AlertDescription>
                  <p>
                    {description}{" "}
                    {link && (
                      <a href="#" className="link">
                        Read more
                      </a>
                    )}
                  </p>
                </AlertDescription>
              )}
            </AlertContent>
          </Alert>
        ))}
      </section>
    );
  },
};
