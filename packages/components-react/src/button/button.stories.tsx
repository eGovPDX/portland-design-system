import { BUTTON_VARIANTS, BUTTON_SIZES } from "@cityofportland/types/button";
import { faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "react";

import { Button, type ReactButtonProps } from "./button";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "A button draws attention to important actions with a large selectable surface.",
      },
    },
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
    left: {
      control: "object",
      description: "FontAwesome icon to display before the button text",
    },
    right: {
      control: "object",
      description: "FontAwesome icon to display after the button text",
    },
  },
} satisfies Meta<ReactButtonProps>;

type Story = StoryObj<ReactButtonProps>;

// Default button
export const Default: Story = {
  args: {
    children: "Default Button",
    onClick: () => console.log("Button clicked!"),
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

// Accent cool button
export const AccentCool: Story = {
  args: {
    children: "Accent Cool Button",
    variant: "accent-cool",
  },
};

// Accent warm button
export const AccentWarm: Story = {
  args: {
    children: "Accent Warm Button",
    variant: "accent-warm",
  },
};

export const Base: Story = {
  args: {
    children: "Base Button",
    variant: "base",
  },
};

// Outline button
export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

// Outline inverse button (displayed on dark background)
export const OutlineInverse: Story = {
  args: {
    children: "Outline Inverse Button",
    variant: "outline-inverse",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// Unstyled button
export const Unstyled: Story = {
  args: {
    children: "Unstyled Button",
    variant: "unstyled",
  },
};

// Big button
export const Big: Story = {
  args: {
    children: "Big Button",
    size: "big",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    children: "Download",
    left: <FontAwesomeIcon icon={faDownload} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: "Continue",
    right: <FontAwesomeIcon icon={faArrowRight} />,
  },
};

export const TextWrap: Story = {
  args: {
    children:
      "This is a very long button text that should wrap onto multiple lines to demonstrate text wrapping within the button component.",
    size: "big",
    left: <FontAwesomeIcon icon={faDownload} />,
    right: <FontAwesomeIcon icon={faArrowRight} />,
  },
};
