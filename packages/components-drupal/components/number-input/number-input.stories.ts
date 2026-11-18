import { anglesRight, anglesLeft } from "@cityofportland/icons";
import type { NumberInputProps } from "@cityofportland/types/input";
import type { Meta, StoryObj } from "@storybook/html-vite";

import "../control/control.component.yml"
import "../input/input.component.yml";

import ControlAddon from "../control/control-addon/control-addon.component.yml";
import Icon from "../icon/icon.component.yml";

import NumberInput from "./number-input.component.yml";

type NumberInputStoryArgs = Omit<NumberInputProps, "type"> & {
  customValidity?: boolean;
};

const renderBasic = ({ customValidity, ...args }: NumberInputStoryArgs) => {
  return NumberInput.component({
    ...args,
    type: "number",
    state: customValidity ? "error" : args.state,
  });
};

export default {
  title: "Components/Forms/Number",
  render: renderBasic,
  argTypes: {
    state: {
      control: "select",
      options: ["error", "disabled"],
      description: "The visual state of the input",
      if: { arg: "disabled", truthy: false },
    },
    id: {
      control: "text",
      description: "The input id",
    },
    name: {
      control: "text",
      description: "The input name submitted with a form",
    },
    value: {
      control: "number",
      description: "The input value",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the input is read-only",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    min: {
      control: "number",
      description: "The minimum allowed value",
    },
    max: {
      control: "number",
      description: "The maximum allowed value",
    },
    step: {
      control: "number",
      description: "The allowed stepping interval",
    },
  },
  args: {
    id: "input-number",
    name: "input-number",
    required: false,
    readOnly: false,
    disabled: false,
  },
} satisfies Meta<NumberInputStoryArgs>;

export const Basic: StoryObj<NumberInputStoryArgs> = {
  afterEach: ({ args }) => {
    const { id, customValidity } = args;

    if (id && customValidity) {
      const element = document.getElementById(id) as HTMLInputElement;

      if (element) {
        element.setCustomValidity(
          customValidity ? "Custom validity message" : ""
        );
      }
    }
  },
  render: ({ id, name, customValidity, ...args }) => {
    return `
    <form class="grid grid-cols-1 gap-xl">
      <div>
        <label class="block mb-xs" for="${id}">Number input</label>
      ${NumberInput.component({
        id,
        name,
        customValidity,
        ...args,
      })}
      </div>
    </form>
    `;
  },
};

export const Addons: StoryObj<
  NumberInputStoryArgs & { prefix: boolean; suffix: boolean }
> = {
  parameters: {
    controls: { exclude: ["id", "name"] },
  },
  argTypes: {
    prefix: { 
      control: "boolean",
      description: "Whether to show the prefix addon",
    },
    suffix: { 
      control: "boolean",
      description: "Whether to show the suffix addon",
    },
  },
  args: {
    prefix: true,
    suffix: true,
  },
  render: ({ prefix, suffix, customValidity, ...args }) => `
    <form class="grid grid-cols-1 gap-xl">
      <div>
        <label class="block mb-xs" for="number-input">
          Number input with announced addons
        </label>
        ${NumberInput.component({
          ...args,
          id: "number-input",
          name: "number-input",
          type: "number",
          addons: `
          ${prefix
            ? ControlAddon.component({
                id: "number-input",
                content: "$",
                orientation: "start",
                decorative: false,
                describeControl: true,
              })
            : null}
            ${suffix
            ? ControlAddon.component({
                id: "number-input",
                content: ".00",
                orientation: "end",
                decorative: false,
                describeControl: true,
              })
            : null}
            `
        })}
      </div>
      <div>
        <label class="block mb-xs" for="number-input">
          Number input with unannounced addons
        </label>
        ${NumberInput.component({
          ...args,
          id: "number-input",
          name: "number-input",
          type: "number",
          addons: `${prefix
            ? ControlAddon.component({
                id: "number-input",
                content: Icon.component({ icon: anglesLeft.name, size: "sm" }),
                orientation: "start",
                decorative: true,
                describeControl: false,
              })
            : null}${
          suffix
            ? ControlAddon.component({
                id: "number-input",
                content: Icon.component({ icon: anglesRight.name, size: "sm" }),
                orientation: "end",
                decorative: true,
                describeControl: false,
              })
            : null}`
        })}
      </div>
    </form>
  `,
};
