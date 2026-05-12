import {
  CITY_SEAL_SIZES,
  type CitySealProps,
} from "@cityofportland/types/city-seal";
import type { Meta, StoryObj } from "@storybook/html-vite";

import CitySeal from "./city-seal.component.yml";

type Props = CitySealProps & {
  attributes: Record<string, string>;
};

export default {
  title: "Components/City Seal",
  render: (args) => {
    return `
      ${CitySeal.component({ ...args })}
    `;
  },
  argTypes: {
    size: {
      control: "select",
      options: CITY_SEAL_SIZES,
      description: "Size of the City Seal",
    },
  },
  args: {
    size: "lg",
  },
} satisfies Meta<Props>;

// Basic City Seal
export const Basic: StoryObj<Props & { border: boolean }> = {
  render: ({ size }) => {
    return `
      ${CitySeal.component({
        defaultAttributes: [...CitySeal.args.defaultAttributes],
        size,
      })}
    `;
  },
};

// City Seal size variations
export const Sizes: StoryObj<Props & { border: boolean }> = {
  parameters: {
    controls: { exclude: ["size"] },
  },
  render: ({ size }) => {
    return `
      <div class="grid grid-cols-3 items-top gap-xl text-standard-default-strong">
        <div>
          <h1 class="font-bold py-md">Extra large</h1>
          ${CitySeal.component({
            defaultAttributes: [...CitySeal.args.defaultAttributes],
            size: "xl",
          })}
        </div>
        <div>
          <h1 class="font-bold py-md">Large</h1>
          ${CitySeal.component({
            defaultAttributes: [...CitySeal.args.defaultAttributes],
            size: "lg",
          })}
        </div>
        <div>
          <h1 class="font-bold py-md">Small</h1>
          ${CitySeal.component({
            defaultAttributes: [...CitySeal.args.defaultAttributes],
            size: "sm",
          })}
      </div>
    `;
  },
};
