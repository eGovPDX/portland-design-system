import type { NumberInputProps } from "@cityofportland/types/input";
import type { Meta, StoryObj } from "@storybook/html-vite";

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
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
      if: { arg: "state", neq: "disabled" },
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
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the input is empty",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
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
    customValidity: {
      control: "boolean",
      description: "Set a custom validity message with the HTML form API",
      if: { arg: "disabled", truthy: false },
    },
  },
  args: {
    id: DEFAULT_ID,
    name: DEFAULT_ID,
    value: 0,
    placeholder: "Enter a number",
    required: false,
    disabled: false,
    customValidity: false,
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
        <label class="block mb-xs" for="number-input">Number input</label>
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
  render: () => `
    <form class="grid grid-cols-1 gap-xl">
      <div>
        <label class="block mb-xs" for="number-min">Minimum Value</label>
        ${NumberInput.component({
          id: "number-min",
          name: "number-min",
          type: "number",
          value: -1,
          min: 1,
        })}
      </div>
      <div>
        <label class="block mb-xs" for="number-max">Maximum Value</label>
        ${NumberInput.component({
          id: "number-max",
          name: "number-max",
          type: "number",
          value: 11,
          max: 10,
        })}
      </div>
      <div>
        <label class="block mb-xs" for="number-step">With min 0 and step 2, values must be even.</label>
        ${NumberInput.component({
          id: "number-step",
          name: "number-step",
          type: "number",
          value: 3,
          min: 0,
          step: 2,
        })}
      </div>
    </form>
  `,
};
