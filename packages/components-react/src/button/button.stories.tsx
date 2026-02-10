import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  type ButtonVariant,
  type ButtonSize,
} from "@cityofportland/types/button";
import {
  faArrowLeft,
  faArrowRight,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "react";
import { fn } from "storybook/test";

import { Button, type ReactButtonProps } from "./button";

const meta = {
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
    children: {
      control: "text",
      description: "The text content of the button",
    },
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
    type: {
      control: "select",
      options: BUTTON_TYPES,
      description: "The HTML button type attribute",
    },
    outline: {
      control: "boolean",
      description: "Whether the button should have an outline style",
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
  args: {
    children: "{text}",
    variant: "primary",
    size: "default",
    type: "button",
    outline: false,
    disabled: false,
    onClick: fn(), // Add default action logger
  },
} satisfies Meta<ReactButtonProps>;

type Story = StoryObj<ReactButtonProps>;

// Default button
export const Basic: Story = {};

const VALID_VARIANTS: Array<[ButtonVariant, string?]> = [
  ["primary", "outline"],
  ["secondary", "outline"],
  ["danger", "outline"],
  ["inverse"],
  ["unstyled"],
];

export const Variants: Story = {
  parameters: {
    controls: {
      exclude: ["children", "disabled"],
    },
    pseudo: {
      hover: "#hover",
      focus: "#focus",
      active: "#active",
    },
  },
  render() {
    const states = ["default", "hover", "focus", "active"];

    return (
      <section className="grid grid-cols-1 md:grid-cols-5 gap-lg items-center">
        {VALID_VARIANTS.map(([variant, outline]) => {
          const children = [
            <span className="capitalize font-bold">{variant}</span>,
            ...states.map((state) => (
              <Button
                key={`${variant}-${state}`}
                variant={variant}
                id={state}
                className="capitalize"
              >
                {state}
              </Button>
            )),
          ];

          if (outline) {
            children.push(
              <span className="capitalize font-bold">{variant} Outline</span>,
              ...states.map((state) => (
                <Button
                  key={`${variant}-${state}-pseudo`}
                  variant={variant}
                  outline
                  id={state}
                  className="capitalize"
                >
                  {state}
                </Button>
              ))
            );
          }

          return children;
        })}
      </section>
    );
  },
};

export const Sizes: Story = {
  parameters: {
    controls: {
      exclude: ["children", "size"],
    },
  },
  render({ disabled, outline, variant }) {
    const sizes: Array<ButtonSize> = ["small", "default", "big"];

    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-lg items-center">
        {sizes.map((size) => (
          <Button
            key={size}
            size={size}
            variant={variant}
            outline={outline}
            disabled={disabled}
            className="capitalize"
          >
            {size}
          </Button>
        ))}
      </section>
    );
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

export const WithBothIcons: Story = {
  args: {
    children: "Double Icon",
    left: <FontAwesomeIcon icon={faArrowLeft} />,
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

export default meta;
