import { circleArrowRight, creditCard } from "@cityofportland/icons";
import {
  INPUT_STATES,
  TEXT_INPUT_TYPES,
  type TextInputProps,
} from "@cityofportland/types/input";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Icon from "../icon/icon.component.yml";

import Input from "./input.component.yml";
import InputAddon from "./input-addon/input-addon.component.yml";

type InputStoryArgs = TextInputProps & {
  customValidity?: boolean;
};

export default {
  title: "Components/Forms/Text",
  render: (args) => `
		${Input.component({ ...args })}
	`,
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

export const Basic: StoryObj<InputStoryArgs> = {
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
    <div class="grid grid-cols-1 gap-xs">
      <label for="${id}" class="capitalize">${name}</label>
      ${Input.component({
        id,
        name,
        ...args,
      })}
    </div>
  `;
  },
};

export const Addons: StoryObj<
  InputStoryArgs & { prefix: boolean; suffix: boolean }
> = {
  parameters: {
    controls: {
      exclude: ["id", "name"],
    },
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
      const elements = document.getElementsByTagName(
        "input"
      ) as HTMLCollectionOf<HTMLInputElement>;

      for (const element of elements) {
        element.setCustomValidity(
          customValidity ? "Custom validity message" : ""
        );
      }
    }
  },
  render: ({ prefix, suffix, ...args }) => `
	<form class="grid grid-cols-1 gap-xl">
    <div>
      <label for="input-text" class="font-semibold text-heading-lg">With text addons that are announced</label>
      ${Input.component({
        ...args,
        id: "input-text",
        name: "input-text",
        prefix: prefix
          ? InputAddon.component({
              id: "input-text",
              orientation: "start",
              content: "https://",
              announce: true,
            })
          : null,
        suffix: suffix
          ? InputAddon.component({
              id: "input-text",
              orientation: "end",
              content: ".com",
              announce: true,
            })
          : null,
      })}
    </div>
    <div>
      <label for="input-icon" class="font-semibold text-heading-lg">With icon addons that are not announced</label>
      ${Input.component({
        ...args,
        id: "input-icon",
        name: "input-icon",
        prefix: prefix
          ? InputAddon.component({
              id: "input-icon",
              orientation: "start",
              content: Icon.component({ icon: creditCard.name, size: "sm" }),
              announce: false,
            })
          : null,
        suffix: suffix
          ? InputAddon.component({
              id: "input-icon",
              orientation: "end",
              content: Icon.component({
                icon: circleArrowRight.name,
                size: "sm",
              }),
              announce: false,
            })
          : null,
      })}
    </div>
	</form>
  `,
};
