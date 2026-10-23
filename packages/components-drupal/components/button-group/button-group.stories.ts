import type { ButtonGroupProps } from "@cityofportland/types/button-group";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Button from "../button/button.component.yml";
import ButtonGroup from "./button-group.component.yml";

type StoryProps = ButtonGroupProps & {
  rounded?: boolean;
};

const render = ({ segmented, label, rounded }: StoryProps) =>
  ButtonGroup.component({
    segmented,
    label,
    content: ["Save draft", "Preview", "Publish"]
      .map((content) =>
        Button.component({
          color: "primary",
          variant: "moderate",
          size: "md",
          button_content: content,
          defaultAttributes: [
            ...Button.args.defaultAttributes,
            ["class", [rounded ? "rounded-lg" : ""]],
          ],
        })
      )
      .join(""),
  });

export default {
  title: "Components/Button Group",
  render,
  argTypes: {
    segmented: {
      control: "boolean",
      description: "Whether the actions appear connected without gaps",
    },
    label: {
      control: "text",
      description: "Accessible name describing the group of actions",
    },
    rounded: {
      control: "boolean",
      description: "Whether to round the buttons",
    },
  },
  args: {
    segmented: false,
    label: "Publishing actions",
    rounded: false,
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Basic: Story = {};

export const NarrowContainer: Story = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (story) =>
      `
    <div class="@container w-full sm:w-1/4 p-xs border">
    ${story()}
    </div>`,
    (story) =>
      `<div class="min-h-screen flex justify-center items-center p-lg">${story()}</div>`,
  ],
};
