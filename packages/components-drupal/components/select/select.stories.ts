import { circleArrowRight, creditCard } from "@cityofportland/icons";
import { CONTROL_STATES } from "@cityofportland/types/control";
import { type SelectProps } from "@cityofportland/types/select";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Icon from "../icon/icon.component.yml";
import InputAddon from "../input/input-addon/input-addon.component.yml";

import Select from "./select.component.yml";

type SelectStoryArgs = SelectProps & {
  options: number;
  customValidity?: boolean;
};

export default {
  title: "Components/Forms/Select",
  render: (args) => Select.component({ ...args }),
  argTypes: {
    id: {
      control: "text",
      description: "The select element id",
    },
    name: {
      control: "text",
      description: "The form field name",
    },
    state: {
      control: "select",
      options: CONTROL_STATES,
      description: "The visual state of the select",
      if: { arg: "disabled", truthy: false },
    },
    required: {
      control: "boolean",
      description: "Whether a value must be selected before form submission",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
      if: { arg: "state", neq: "disabled" },
    },
    multiple: {
      control: "boolean",
      description: "Whether this is a multi select element.",
    },
    size: {
      control: "number",
      description:
        "How many options to show at one time when the multiple option is enabled.",
      if: { arg: "multiple", truthy: true },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    options: {
      control: "number",
      description: "How many options to generate",
    },
  },
  args: {
    id: "select",
    name: "select",
    state: undefined,
    required: false,
    disabled: false,
    multiple: false,
    placeholder: "Select an option...",
    options: 2,
  },
} satisfies Meta<SelectStoryArgs>;

export const Basic: StoryObj<SelectStoryArgs> = {
  render: ({ options, ...args }) => `
    <label for="${args.id}" class="block mb-xs">Select an option</label>
    ${Select.component({
      ...args,
      content: [...Array(options)]
        .map(
          (_value, index) =>
            `<option value="${index + 1}">Option ${index + 1}</option>`
        )
        .join(""),
    })}
  `,
};

export const Addons: StoryObj<
  SelectStoryArgs & { prefix: boolean; suffix: boolean }
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
  render: ({ prefix, suffix, options, ...args }) => `
	<form class="grid grid-cols-1 gap-xl">
    <div>
      <label for="input-text" class="font-semibold text-heading-lg">With text addons that are announced</label>
      ${Select.component({
        ...args,
        id: "input-text",
        name: "input-text",
        content: [...Array(options)]
          .map(
            (_value, index) =>
              `<option value="${index + 1}">Option ${index + 1}</option>`
          )
          .join(""),
        addons: `
        ${
          prefix
            ? InputAddon.component({
                id: "input-text",
                orientation: "start",
                content: "https://",
                announce: true,
              })
            : ""
        }
        ${
          suffix
            ? InputAddon.component({
                id: "input-text",
                orientation: "end",
                content: ".com",
                announce: true,
              })
            : ""
        }`,
      })}
    </div>
    <div>
      <label for="input-icon" class="font-semibold text-heading-lg">With icon addons that are not announced</label>
      ${Select.component({
        ...args,
        id: "input-icon",
        name: "input-icon",
        content: [...Array(options)]
          .map(
            (_value, index) =>
              `<option value="${index + 1}">Option ${index + 1}</option>`
          )
          .join(""),
        addons: `${
          prefix
            ? InputAddon.component({
                id: "input-icon",
                orientation: "start",
                content: Icon.component({ icon: creditCard.name, size: "sm" }),
                announce: false,
              })
            : ""
        }
        ${
          suffix
            ? InputAddon.component({
                id: "input-icon",
                orientation: "end",
                content: Icon.component({
                  icon: circleArrowRight.name,
                  size: "sm",
                }),
                announce: false,
              })
            : ""
        }`,
      })}
    </div>
	</form>
  `,
};
