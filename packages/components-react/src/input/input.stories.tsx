import { circleArrowRight, creditCard } from "@cityofportland/icons";
import { INPUT_STATES, TEXT_INPUT_TYPES } from "@cityofportland/types/input";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "../icon";
import { Input, type ReactInputProps } from "./input";
import { InputAddon } from "./input-addon";

type InputStoryArgs = Omit<ReactInputProps, "prefix" | "suffix"> & {
  customValidity?: boolean;
};

const meta = {
  title: "Components/Forms/Text",
  component: Input,
  parameters: {
    controls: { exclude: ["className", "prefix", "suffix"] },
  },
  argTypes: {
    type: {
      control: "select",
      options: TEXT_INPUT_TYPES,
      description: "The native HTML input type",
    },
    state: {
      control: "select",
      options: INPUT_STATES,
      description: "The visual state of the input",
      if: { arg: "disabled", truthy: false },
    },
    name: {
      control: "text",
      description: "The input name submitted with a form",
    },
    id: {
      control: "text",
      description: "The input id",
    },
    value: {
      control: "text",
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
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
      if: { arg: "state", neq: "disabled" },
    },
    readOnly: {
      control: "boolean",
      description: "Whether the input value cannot be edited",
    },
    autoComplete: {
      control: "text",
      description: "The browser autocomplete hint",
    },
    minLength: {
      control: "number",
      description: "The minimum number of characters",
    },
    maxLength: {
      control: "number",
      description: "The maximum number of characters",
    },
    pattern: {
      control: "text",
      description: "A pattern the input value must match",
    },
    customValidity: {
      control: "boolean",
      description: "Add a custom validity message for the input",
      if: { arg: "state", neq: "disabled" },
    },
  },
  args: {
    type: "text",
    state: undefined,
    id: "input",
    name: "input",
    value: "",
    required: false,
    disabled: false,
    readOnly: false,
    customValidity: false,
  },
} satisfies Meta<InputStoryArgs>;

export default meta;

type Story = StoryObj<InputStoryArgs>;

export const Basic: Story = {
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
  render: ({ id, name, value, customValidity: _, ...args }) => (
    <div className="grid grid-cols-1 gap-xs">
      <label htmlFor={id} className="capitalize">
        {name}
      </label>
      <Input
        key={String(value)}
        id={id}
        name={name}
        defaultValue={value}
        {...args}
      />
    </div>
  ),
};

export const Addons: StoryObj<
  InputStoryArgs & { prefix: boolean; suffix: boolean }
> = {
  parameters: {
    controls: { exclude: ["id", "name", "className"] },
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
  afterEach: ({ args }) => {
    const { customValidity } = args;

    if (customValidity) {
      const elements = document.getElementsByTagName("input");

      for (const element of elements) {
        element.setCustomValidity(
          customValidity ? "Custom validity message" : ""
        );
      }
    }
  },
  render: ({ prefix, suffix, value, customValidity: _, ...args }) => (
    <form className="grid grid-cols-1 gap-xl">
      <div>
        <label htmlFor="input-text" className="font-semibold text-heading-lg">
          With text addons that are announced
        </label>
        <Input
          {...args}
          key={`text-${String(value)}`}
          defaultValue={value}
          id="input-text"
          name="input-text"
          prefix={
            prefix ? (
              <InputAddon id="input-text" orientation="start" announce>
                https://
              </InputAddon>
            ) : null
          }
          suffix={
            suffix ? (
              <InputAddon id="input-text" orientation="end" announce>
                .com
              </InputAddon>
            ) : null
          }
        />
      </div>
      <div>
        <label htmlFor="input-icon" className="font-semibold text-heading-lg">
          With icon addons that are not announced
        </label>
        <Input
          {...args}
          key={`icon-${String(value)}`}
          defaultValue={value}
          id="input-icon"
          name="input-icon"
          prefix={
            prefix ? (
              <InputAddon id="input-icon" orientation="start">
                <Icon icon={creditCard} size="sm" />
              </InputAddon>
            ) : null
          }
          suffix={
            suffix ? (
              <InputAddon id="input-icon" orientation="end">
                <Icon icon={circleArrowRight} size="sm" />
              </InputAddon>
            ) : null
          }
        />
      </div>
    </form>
  ),
};
