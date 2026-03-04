import { ALERT_VARIANTS, ALERT_TYPES } from "@cityofportland/types/alert";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "react";

import { Alert, type ReactAlertProps } from "./alert";

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
  },
  argTypes: {
    variant: {
      control: "select",
      options: ALERT_VARIANTS,
      description: "The visual style of the alert",
    },
    type: {
      control: "select",
      options: ALERT_TYPES,
      description: "The type of alert",
    },
    icon: {
      control: "boolean",
      description: "Show an icon in the alert",
    },
    dismissible: {
      control: "boolean",
      description: "Allow the alert to be dismissed by the user",
    },
  },
} satisfies Meta<ReactAlertProps>;

type Story = StoryObj<ReactAlertProps>;

export const Default: Story = {
  args: {
    heading: "Alert heading",
    children: (
      <p>
        This is the alert text content. <a href="#">Read more</a>
      </p>
    ),
  },
};
