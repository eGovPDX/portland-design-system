import { anglesRight, anglesLeft } from "@cityofportland/icons";
import type { NumberInputProps } from "@cityofportland/types/input";
import type { Meta, StoryObj } from "@storybook/html-vite";

import NumberInput from "./number-input.component.yml";
import InputAddon from "../input/input-addon/input-addon.component.yml";
import Icon from "../icon/icon.component.yml";

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

export const NativeConstraints: StoryObj<NumberInputStoryArgs> = {
  parameters: {
    controls: { exclude: ["value"] },
  },
  render: ({ value }) => `
    <form class="grid grid-cols-1 gap-xl">
      <div>
        <label class="block mb-xs" for="number-min">Minimum value is 1.</label>
        ${NumberInput.component({
          id: "number-min",
          name: "number-min",
          type: "number",
          value: value ?? -1,
          min: 1,
        })}
      </div>
      <div>
        <label class="block mb-xs" for="number-max">Maximum value is 10.</label>
        ${NumberInput.component({
          id: "number-max",
          name: "number-max",
          type: "number",
          value: value ?? 11,
          max: 10,
        })}
      </div>
      <div>
        <label class="block mb-xs" for="number-step">With min 0 and step 2, values must be even.</label>
        ${NumberInput.component({
          id: "number-step",
          name: "number-step",
          type: "number",
          value: value ?? 3,
          min: 0,
          step: 2,
        })}
      </div>
    </form>
  `,
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
          prefix: prefix
            ? InputAddon.component({
                id: "number-input",
                content: "$",
                orientation: "start",
                announce: true,
              })
            : null,
          suffix: suffix
            ? InputAddon.component({
                id: "number-input",
                content: ".00",
                orientation: "end",
                announce: true,
              })
            : null,
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
          prefix: prefix
            ? InputAddon.component({
                id: "number-input",
                content: Icon.component({ icon: anglesLeft.name, size: "sm" }),
                orientation: "start",
                announce: false,
              })
            : null,
          suffix: suffix
            ? InputAddon.component({
                id: "number-input",
                content: Icon.component({ icon: anglesRight.name, size: "sm" }),
                orientation: "end",
                announce: false,
              })
            : null,
        })}
      </div>
    </form>
  `,
};
