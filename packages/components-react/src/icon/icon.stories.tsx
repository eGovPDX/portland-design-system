import * as Icons from "@cityofportland/icons";
import { ICON_SIZES, type IconDefinition } from "@cityofportland/types/icon";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon, type ReactIconProps } from "./icon";

const meta: Meta<ReactIconProps> = {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(Icons),
      mapping: {
        ...Object.entries(Icons).reduce(
          (acc, [name, def]) => {
            acc[name] = def;
            return acc;
          },
          {} as Record<string, IconDefinition>
        ),
      },
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

export const Basic: StoryObj<ReactIconProps> = {
  parameters: {
    controls: { exclude: ["className"] },
  },
  render: ({ icon, size }) => {
    return icon ? (
      <Icon icon={icon} size={size} />
    ) : (
      <p>Select an icon using the controls...</p>
    );
  },
};

export const Sizes: StoryObj<ReactIconProps> = {
  parameters: {
    controls: { exclude: ["className", "size"] },
  },
  render: ({ icon }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {ICON_SIZES.map((size) => (
          <div key={size} className="grid justify-items-center">
            <h1 className="font-bold py-md">{size}</h1>
            {icon ? (
              <Icon icon={icon} size={size} />
            ) : (
              <p>Select an icon using the controls...</p>
            )}
          </div>
        ))}
      </div>
    );
  },
};
