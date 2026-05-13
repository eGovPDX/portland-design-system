import { ALERT_VARIANTS, ALERT_TYPES } from "@cityofportland/types/alert";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "react";

import { Alert, type ReactAlertProps } from "./alert";

type StoryProps = ReactAlertProps & {
  text: string;
};

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
    text: {
      control: "text",
      description: "The text content of the alert",
    },
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Basic: Story = {
  args: {
    heading: "Alert heading",
    variant: "default",
    type: "info",
    icon: true,
    dismissible: true,
    text: "This is the alert text content.",
  },
  render: ({ text, ...args }) => (
    <Alert {...args}>
      <p>
        {text} <a href="#">Read more</a>
      </p>
    </Alert>
  ),
};
