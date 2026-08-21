import * as Icons from "@cityofportland/icons";
import { ICON_SIZES, type IconProps } from "@cityofportland/types/icon";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Icon from "./icon.component.yml";

const meta: Meta<IconProps> = {
  title: "Components/Icon",
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(Icons).map((key) => {
        const parts =
          key.match(/[A-Z]+(?=[A-Z][a-z]|\d|$)|[A-Z]?[a-z]+|\d+/g) ?? [];
        return parts.map((part) => part.toLowerCase()).join("-");
      }),
      description: "Which icon to display",
    },
    size: {
      control: "select",
      options: ICON_SIZES,
      description: "Size of the City Seal",
    },
  },
  args: {
    size: "lg",
  },
  parameters: {
    controls: { exclude: ["className"] },
  },
};

export default meta;

export const Basic: StoryObj<IconProps> = {
  parameters: {
    controls: { exclude: ["className"] },
  },
  render: ({ icon, size }) => {
    return `${
      icon
        ? Icon.component({
            defaultAttributes: [...Icon.args.defaultAttributes],
            icon,
            size,
          })
        : `<p>Select an icon using the controls...</p>`
    }`;
  },
};

export const Sizes: StoryObj<IconProps> = {
  parameters: {
    controls: { exclude: ["className", "size"] },
  },
  render: ({ icon }) => {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-xl">
        ${ICON_SIZES.map(
          (size) => `
          <div class="grid justify-items-center">
            <h1 class="font-bold py-md">${size}</h1>
            ${
              icon
                ? Icon.component({
                    defaultAttributes: [...Icon.args.defaultAttributes],
                    icon,
                    size,
                  })
                : `<p>Select an icon using the controls...</p>`
            }
          </div>
        `
        ).join("")}
      </div>
    `;
  },
};
