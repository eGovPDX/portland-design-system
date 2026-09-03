import { circleArrowRight, creditCard } from "@cityofportland/icons";
import {
  INPUT_STATES,
  TEXT_INPUT_TYPES,
  type TextInputProps,
} from "@cityofportland/types/input";
import type { Meta, StoryObj } from "@storybook/html-vite";

import "../box/box.component.yml";
import boxStories from "../box/box.stories";
import Button from "../button/button.component.yml";
import Icon from "../icon/icon.component.yml";

import Input from "./input.component.yml";
import InputAddon from "./input-addon/input-addon.component.yml";

type InputStoryArgs = TextInputProps & {
  attributes?: Record<string, string>;
};

export default {
  title: "Components/Inputs/Text",
  render: (args) => `
		${Input.component({ ...args })}
	`,
  argTypes: {
    color: {
      ...boxStories.argTypes.color,
    },
    variant: {
      ...boxStories.argTypes.variant,
    },
    type: {
      control: "select",
      options: TEXT_INPUT_TYPES,
      description: "The native HTML input type",
    },
    state: {
      control: "select",
      options: INPUT_STATES,
      description: "The visual state of the input",
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
    },
    readOnly: {
      control: "boolean",
      description: "Whether the input value cannot be edited",
    },
    autoComplete: {
      control: "text",
      description: "The browser autocomplete hint",
    },
    autoFocus: {
      control: "boolean",
      description: "Whether the input receives focus on page load",
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
    autoFocus: false,
  },
} satisfies Meta<InputStoryArgs>;

export const Basic: StoryObj<
  TextInputProps & {
    start?: string;
    end?: string;
  }
> = {
  render: ({ start, end, ...args }) => `
    ${Input.component({
      ...args,
    })}
  `,
};

export const Addons: StoryObj<
  TextInputProps & {
    start?: string;
    end?: string;
  }
> = {
  argTypes: {
    start: {
      control: "text",
      description: "Content for the start input addon",
    },
    end: {
      control: "text",
      description: "Content for the end input addon",
    },
  },
  render: ({ start, end, ...args }) => `
	<article class="rich-text">
		<h2>With text addons</h2>
		${Input.component({
      ...args,
      id: "input-text",
      content: `
      ${InputAddon.component({ orientation: "start", content: "https://" })}
      ${InputAddon.component({ orientation: "end", content: ".com" })}
    `,
    })}
		<h2>With icon addons</h2>
		${Input.component({
      ...args,
      id: "input-icon",
      content: `
      ${InputAddon.component({
        orientation: "start",
        content: Icon.component({ icon: creditCard.name, size: "sm" }),
      })}
      ${InputAddon.component({
        orientation: "end",
        content: Icon.component({ icon: circleArrowRight.name, size: "sm" }),
      })}
    `,
    })}
		<h2>With button addons</h2>
		${Input.component({
      ...args,
      id: "input-button",
      content: `
      ${InputAddon.component({
        defaultAttributes: [
          ...InputAddon.args.defaultAttributes,
          ["class", ["ml-none"]],
        ],
        orientation: "start",
        content: Button.component({
          disabled: args.disabled,
          button_content: "Clear",
        }),
      })}
      ${InputAddon.component({
        defaultAttributes: [
          ...InputAddon.args.defaultAttributes,
          ["class", ["mr-none"]],
        ],
        orientation: "end",
        content: Button.component({
          disabled: args.disabled,
          button_content: "Submit",
        }),
      })}
    `,
    })}
	</article>
  `,
};
