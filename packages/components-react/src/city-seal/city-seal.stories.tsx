import { CITY_SEAL_SIZES } from "@cityofportland/types/city-seal";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { CitySeal, type ReactCitySealProps } from "./city-seal";

const meta: Meta<ReactCitySealProps> = {
  title: "Components/City Seal",
  component: CitySeal,
  argTypes: {
    className: { table: { disable: true } },
    size: {
      control: "select",
      options: CITY_SEAL_SIZES,
      description: "Size of the City Seal",
    },
  },
  args: {
    size: "lg",
  },
};

export default meta;

// Basic CitySeal
export const Basic: StoryObj<ReactCitySealProps> = {
  render: ({ size }) => {
    const classes = [""].flat().filter(Boolean).join(" ");

    return <CitySeal className={classes} size={size} />;
  },
};

// Sizes CitySeal
export const Sizes: StoryObj<ReactCitySealProps> = {
  parameters: {
    controls: { exclude: ["size"] },
  },
  render: ({}) => {
    return (
      <div className="grid grid-cols-3 items-top gap-xl text-standard-default-strong">
        <div>
          <h1 className="font-bold py-md">Extra large</h1>
          <CitySeal size="xl" />
        </div>
        <div>
          <h1 className="font-bold py-md">Large</h1>
          <CitySeal size="lg" />
        </div>
        <div>
          <h1 className="font-bold py-md">Small</h1>
          <CitySeal size="sm" />
        </div>
      </div>
    );
  },
};
