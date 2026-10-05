import type { ButtonGroupProps } from "@cityofportland/types/button-group";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Button from "../button/button.component.yml";
import ButtonGroup from "./button-group.component.yml";

type Props = ButtonGroupProps;

const renderActions = (classNames: string = "") =>
  ["Save draft", "Preview", "Publish"]
    .map((content) =>
      Button.component({
        color: "primary",
        variant: "moderate",
        size: "md",
        button_content: content,
        defaultAttributes: [
          ...Button.args.defaultAttributes,
          ["class", [classNames]],
        ],
      })
    )
    .join("");

export default {
  title: "Components/Button Group",
  render: ({ segmented, label }) =>
    ButtonGroup.component({
      segmented,
      label,
      button_group_content: renderActions(),
    }),
  argTypes: {
    segmented: {
      control: "boolean",
      description: "Whether the actions appear connected without gaps",
    },
    label: {
      control: "text",
      description: "Accessible name describing the group of actions",
    },
  },
  args: {
    segmented: false,
    label: "Publishing actions",
  },
} satisfies Meta<Props>;

type Story = StoryObj<Props>;

export const Basic: Story = {};

export const NarrowContainer: Story = {
  render: ({ segmented, label }) => `
    <div style="max-width: 15rem; outline: 1px solid gray; padding: 3px; height: 8rem;">
      ${ButtonGroup.component({
        segmented,
        label,
        button_group_content: renderActions(),
      })}
    </div>
  `,
};

export const RoundedCorners: Story = {
  render: ({ segmented, label }) => `
    ${ButtonGroup.component({
      segmented,
      label,
      button_group_content: renderActions("rounded-lg"),
    })}
  `,
};
