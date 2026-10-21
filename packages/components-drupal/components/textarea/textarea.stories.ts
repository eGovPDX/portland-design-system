import { arrowsRotate, heading, listUl, listOl } from "@cityofportland/icons";
import { INPUT_STATES } from "@cityofportland/types/input";
import {
  TEXTAREA_AUTO_CAPITALIZE,
  TEXTAREA_SPELL_CHECK,
  TEXTAREA_WRAP,
  type TextAreaProps,
} from "@cityofportland/types/textarea";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Box from "../box/box.component.yml";
import Button from "../button/button.component.yml";
import Icon from "../icon/icon.component.yml";

import Textarea from "./textarea.component.yml";
import InputAddon from "../input/input-addon/input-addon.component.yml";

type StoryArgs = TextAreaProps & {
  customValidity?: boolean;
};

export default {
  title: "Components/Forms/Textarea",
  render: (args) => `
		${Textarea.component({ ...args })}
	`,
  argTypes: {
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
    cols: {
      control: "number",
      description: "The number of columns",
    },
    rows: {
      control: "number",
      description: "The number of rows",
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
    autoCorrect: {
      control: "boolean",
      description: "Whether to set autocorrect setting for the textarea",
    },
    autoCapitalize: {
      control: "select",
      options: TEXTAREA_AUTO_CAPITALIZE,
      description: "The autocapitalize setting for the textarea",
    },
    spellCheck: {
      control: "select",
      options: TEXTAREA_SPELL_CHECK,
      description: "The spellcheck setting for the textarea",
    },
    wrap: {
      control: "select",
      options: TEXTAREA_WRAP,
      description: "The wrap setting for the textarea",
    },
    characterCount: {
      control: "boolean",
      description: "Whether to show the character count",
    },
    customValidity: {
      control: "boolean",
      description: "Add a custom validity message for the input",
      if: { arg: "state", neq: "disabled" },
    },
  },
  args: {
    state: undefined,
    id: "input",
    name: "input",
    value: "",
    required: false,
    disabled: false,
    readOnly: false,
    cols: 20,
    characterCount: false,
    customValidity: false,
  },
} satisfies Meta<StoryArgs>;

export const Basic: StoryObj<StoryArgs> = {
  afterEach: ({ args }) => {
    const { id, customValidity } = args;

    if (id && customValidity) {
      const element = document.getElementById(id) as HTMLTextAreaElement;

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
      ${Textarea.component({
        id,
        name,
        ...args,
      })}
    </div>
  `;
  },
};

export const Addons: StoryObj<
  StoryArgs & { prefix: boolean; suffix: boolean }
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
        "textarea"
      ) as HTMLCollectionOf<HTMLTextAreaElement>;

      for (const element of elements) {
        element.setCustomValidity(
          customValidity ? "Custom validity message" : ""
        );
      }
    }
  },
  render: ({ prefix, suffix, ...args }) => `
	<form class="grid grid-cols-1 gap-xl">
    <div class="grid grid-cols-1 gap-xs">
      <label for="input-icon" class="capitalize">With control addons</label>
      ${Textarea.component({
        ...args,
        id: "input-icon",
        name: "input-icon",
        addons: `${
          prefix
            ? InputAddon.component({
                id: "input-icon",
                orientation: "start",
                defaultAttributes: [
                  ...InputAddon.args.defaultAttributes,
                  ["class", ["flex gap-xs"]],
                ],
                content: `
              ${Button.component({
                color: "inverse",
                variant: "subtle",
                outline: true,
                size: "3xs",
                button_content: Icon.component({
                  icon: heading.name,
                  size: "sm",
                }),
              })}
              ${Button.component({
                color: "inverse",
                variant: "subtle",
                outline: true,
                size: "3xs",
                button_content: Icon.component({
                  icon: listUl.name,
                  size: "sm",
                }),
              })}
              ${Button.component({
                color: "inverse",
                variant: "subtle",
                outline: true,
                size: "3xs",
                button_content: Icon.component({
                  icon: listOl.name,
                  size: "sm",
                }),
              })}`,
                announce: false,
              })
            : ""
        }
          ${
            suffix
              ? InputAddon.component({
                  id: "input-icon",
                  orientation: "end",
                  defaultAttributes: [
                    ...InputAddon.args.defaultAttributes,
                    ["class", ["flex justify-end"]],
                  ],
                  content: `${Button.component({
                    color: "inverse",
                    variant: "subtle",
                    outline: true,
                    size: "3xs",
                    button_content: Icon.component({
                      icon: arrowsRotate.name,
                      size: "md",
                    }),
                  })}`,
                  announce: false,
                })
              : ""
          }`,
      })}
    </div>
	</form>
  `,
};
