import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  type ButtonProps,
} from "@cityofportland/types/button";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Button from "./button.component.yml";

type Props = ButtonProps & {
  content: string | object;
  left: string | object;
  right: string | object;
};

export default {
  title: "Components/Button",
  render: (args) => {
    return `
      ${Button.component({ ...args })}
    `;
  },
  argTypes: {
    variant: {
      control: "select",
      options: BUTTON_VARIANTS,
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: BUTTON_SIZES,
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    content: {
      control: "object",
      description: "The text content of the button",
    },
    left: {
      control: "object",
      description: "FontAwesome icon to display before the button text",
    },
    right: {
      control: "object",
      description: "FontAwesome icon to display after the button text",
    },
  },
} satisfies Meta<Props>;

type Story = StoryObj<Props>;

// Default button
export const Default: Story = {
  args: {
    content: "Default Button",
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    content: "Secondary Button",
    variant: "secondary",
  },
};

// Accent cool button
export const AccentCool: Story = {
  args: {
    content: "Accent Cool Button",
    variant: "accent-cool",
  },
};

// Accent warm button
export const AccentWarm: Story = {
  args: {
    content: "Accent Warm Button",
    variant: "accent-warm",
  },
};

export const Base: Story = {
  args: {
    content: "Base Button",
    variant: "base",
  },
};

// Outline button
export const Outline: Story = {
  args: {
    content: "Outline Button",
    variant: "outline",
  },
};

// Outline inverse button (displayed on dark background)
export const OutlineInverse: Story = {
  args: {
    content: "Outline Inverse Button",
    variant: "outline-inverse",
  },
  parameters: {
    background: { default: "dark" },
  },
};

// Unstyled button
export const Unstyled: Story = {
  args: {
    content: "Unstyled Button",
    variant: "unstyled",
  },
};

// Big button
export const Big: Story = {
  args: {
    content: "Big Button",
    size: "big",
  },
};

export const Small: Story = {
  args: {
    content: "Small Button",
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    content: "Disabled Button",
    disabled: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    content: "Download",
    left: "left",
  },
};

export const WithEndIcon: Story = {
  args: {
    content: "Continue",
    right: "right",
  },
};

export const TextWrap: Story = {
  args: {
    content:
      "This is a very long button text that should wrap onto multiple lines to demonstrate text wrapping within the button component.",
    size: "big",
  },
};
