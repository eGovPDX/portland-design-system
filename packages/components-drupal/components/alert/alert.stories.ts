import { ALERT_SIZES, type AlertProps } from "@cityofportland/types/alert";
import {
  BOX_COLORS,
  BOX_VARIANTS,
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import type { Meta, StoryObj } from "@storybook/html-vite";

import "../icon/icon.component.yml";

import Alert from "./alert.component.yml";

import "@cityofportland/components-css/utilities.css";

const ICON_MAP = new Map<BoxColorScheme, string>([
  ["danger", "circle-exclamation"],
  ["info", "circle-info"],
  ["success", "circle-check"],
  ["warning", "triangle-exclamation"],
]);

type Props = AlertProps & {
  as: "div" | "section" | "article" | "aside";
  color: BoxColorScheme;
  variant: BoxColorVariation;
  role: "status" | "alert";
  icon: string;
  title: string;
  title_as: "header" | "h2" | "h3" | "h4" | "h5" | "h6";
  description: string;
  link: boolean;
  attributes: Record<string, string>;
};

export default {
  title: "Components/Alert",
  render: (args) => {
    return `
      ${Alert.component({ ...args })}
    `;
  },
  parameters: {
    layout: "padded",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "section", "article", "aside"],
      description: "The HTML element to render the alert as",
    },
    color: {
      control: "select",
      options: BOX_COLORS,
      description: "Color scheme for background and content colors",
    },
    variant: {
      control: "select",
      options: BOX_VARIANTS,
      description: "Color variation within the chosen color scheme",
    },
    size: {
      control: "select",
      options: ALERT_SIZES,
      description: "The visual style of the alert",
    },
    role: {
      control: "select",
      options: ["status", "alert"],
      description: "The ARIA role for the alert",
    },
    dismissible: {
      control: "boolean",
      description: "Allow the alert to be dismissed by the user",
    },
    icon: {
      control: "select",
      options: [...ICON_MAP.values(), "circle-question", ""],
      description: "The name of the icon to show alongside the alert content",
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
    icon: "circle-info",
    title: "Alert heading",
    title_as: "header",
    description: "This is the alert text content.",
    link: true,
  },
} satisfies Meta<Props>;

export const Basic: StoryObj<Omit<Props, "icon"> & { icon: boolean }> = {
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
    icon: false,
  },
  render: ({ description, icon, link, title, ...args }) => {
    return `
      ${Alert.component({
        ...args,
        icon: icon ? ICON_MAP.get(args.color) || "circle-question" : "",
        title,
        alert_content: `<p>${description}${
          link ? ' <a href="#" class="link">Read more</a>' : ""
        }</p>`,
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
  render: ({ description, dismissible, icon, link, size, title, title_as }) => {
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
              as: "div",
              color,
              variant,
              size,
              role,
              dismissible,
              icon: icon ? alertIcon : "",
              title,
              title_as,
              alert_content: `<p>${description}${
                link ? ' <a href="#" class="link">Read more</a>' : ""
              }</p>`,
            })
          )
          .join("")}
      </section>
    `;
  },
};
