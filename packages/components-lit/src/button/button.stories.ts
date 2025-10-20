import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing, type TemplateResult } from "lit";

import "./button.js";
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  type ButtonProps,
} from "./button";

type TemplateProps = ButtonProps & {
  onClick: (e: Event) => void;
  left?: TemplateResult;
  right?: TemplateResult;
};

const template = (props: TemplateProps) => html`
  <portland-button
    .variant=${props.variant}
    .size=${props.size}
    ?disabled=${props.disabled}
    ?unstyled=${props.unstyled}
    .type=${props.type}
    .ariaDisabled=${props.ariaDisabled}
    @click=${props.onClick}
  >
    ${props.left ? html`<span slot="left">${props.left}</span>` : nothing}
    ${props.label}
    ${props.right ? html`<span slot="right">${props.right}</span>` : nothing}
  </portland-button>
`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  render: (args) => template(args),
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [...BUTTON_VARIANTS],
    },
    size: {
      control: { type: "select" },
      options: [...BUTTON_SIZES],
    },
    disabled: {
      control: { type: "boolean" },
    },
    ariaDisabled: {
      control: { type: "text" },
    },
    unstyled: {
      control: { type: "boolean" },
    },
    type: {
      control: { type: "select" },
      options: [...BUTTON_TYPES],
    },
    label: {
      control: { type: "text" },
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<TemplateProps>;

export default meta;
type Story = StoryObj<TemplateProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Button",
  },
};

export const AccentCool: Story = {
  args: {
    variant: "accent-cool",
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: "small",
  },
};

export const WithLeft: Story = {
  args: {
    ...Primary.args,
    left: html``,
  },
};

export const WithRight: Story = {
  args: {
    ...Primary.args,
    right: html`😀`,
  },
};

export const WithLeftAndRight: Story = {
  args: {
    ...Primary.args,
    left: html`😀`,
    right: html`😀`,
  },
};
