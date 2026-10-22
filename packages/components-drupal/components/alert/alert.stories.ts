import * as Icons from "@cityofportland/icons";
import {
  ALERT_ROLES,
  ALERT_SIZES,
  type AlertProps,
} from "@cityofportland/types/alert";
import type { Meta, StoryObj } from "@storybook/html-vite";

import boxStories from "../box/box.stories";
import Icon from "../icon/icon.component.yml";

import Alert from "./alert.component.yml";
import AlertContent from "./alert-content/alert-content.component.yml";
import AlertDescription from "./alert-description/alert-description.component.yml";
import AlertIcon from "./alert-icon/alert-icon.component.yml";
import AlertTitle from "./alert-title/alert-title.component.yml";

import "@cityofportland/components-css/utilities.css";

type ContentOptions = {
  icon: string;
  title: string;
  description: string;
  link: boolean;
};

const alertContent = ({ icon, title, description, link }: ContentOptions) => `
  ${
    icon
      ? AlertIcon.component({
          alert_icon_content: Icon.component({
            icon,
            defaultAttributes: [
              ...Icon.args.defaultAttributes,
              ["aria-hidden", ["true"]],
            ],
          }),
        })
      : ""
  }
  ${AlertContent.component({
    alert_content: `
      ${
        title
          ? AlertTitle.component({
              alert_title_content: title,
            })
          : ""
      }
      ${AlertDescription.component({
        alert_description_content: `<p>${description}${
          link ? ' <a href="#" class="link">Read more</a>' : ""
        }</p>`,
      })}
    `,
  })}
`;

type Props = AlertProps & ContentOptions;

export default {
  title: "Components/Alert",
  parameters: {
    layout: "padded",
  },
  argTypes: {
    ...boxStories.argTypes,
    size: {
      control: "select",
      options: ALERT_SIZES,
      description: "The visual style of the alert",
    },
    role: {
      control: "select",
      options: ALERT_ROLES,
      description: "The ARIA role for the alert",
    },
    dismissible: {
      control: "boolean",
      description: "Allow the alert to be dismissed by the user",
    },
    icon: {
      control: "select",
      options: Object.entries(Icons).map(([_, def]) => def.name),
      description: "Which icon to display",
    },
    title: {
      control: "text",
      description: "The heading text for the alert",
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
    size: "default",
    role: "status",
    dismissible: true,
    icon: Icons.circleInfo.name,
    title: "Alert heading",
    description: "This is the alert text content.",
    link: true,
  },
} satisfies Meta<Props>;

export const Basic: StoryObj = {
  render: ({
    as,
    color,
    variant,
    size,
    role,
    dismissible,
    description,
    icon,
    link,
    title,
  }) => {
    return `
      ${Alert.component({
        as,
        color,
        variant,
        size,
        role,
        dismissible,
        content: alertContent({
          icon,
          title,
          description,
          link,
        }),
      })}
    `;
  },
};

export const PortlandGov: StoryObj<Omit<Props, "icon"> & { icon: boolean }> = {
  name: "portland.gov",
  parameters: {
    controls: {
      exclude: ["as", "color", "role", "variant"],
    },
  },
  argTypes: {
    icon: {
      control: "boolean",
      description: "Show an icon in the alert",
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
  render: ({ description, dismissible, icon, link, size, title }) => {
    const types = [
      ["info", "moderate", "status", "circle-info"],
      ["warning", "moderate", "status", "triangle-exclamation"],
      ["danger", "moderate", "alert", "circle-exclamation"],
      ["success", "moderate", "status", "circle-check"],
    ] as const;

    return `
      <section class="grid gap-sm">
        ${types
          .map(([color, variant, role, alertIcon]) =>
            Alert.component({
              color,
              variant,
              size,
              role,
              dismissible,
              content: alertContent({
                icon: icon ? alertIcon : "",
                title,
                description,
                link,
              }),
            })
          )
          .join("")}
      </section>
    `;
  },
};
