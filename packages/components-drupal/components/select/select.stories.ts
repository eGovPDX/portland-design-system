import { SELECT_STATES, type SelectProps } from "@cityofportland/types/select";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Select from "./select.component.yml";

type SelectStoryArgs = SelectProps & {
  options: string;
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
      options: SELECT_STATES,
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
    options: {
      control: "text",
      description:
        "Standard HTML option elements. Mark the selected option with the selected attribute.",
    },
  },
  args: {
    id: "select",
    name: "select",
    state: undefined,
    required: false,
    disabled: false,
    options: `<option value="">Choose an option</option>
<option value="one">Option one</option>
<option value="two" selected>Option two</option>`,
  },
} satisfies Meta<SelectStoryArgs>;

export const Basic: StoryObj<SelectStoryArgs> = {
  render: (args) => `
    <label for="${args.id}" class="block mb-xs">Select an option</label>
    ${Select.component({ ...args })}
  `,
};
