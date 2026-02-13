import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  type ButtonVariant,
  type ButtonSize,
} from "@cityofportland/types/button";
import {
  BOX_COLORS,
  BOX_VARIANTS,
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import {
  faArrowLeft,
  faArrowRight,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "react";
import { fn } from "storybook/test";

import { Box } from "../box";
import { Button, type ReactButtonProps } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    controls: {
      exclude: ["className", "onClick"],
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

export const Variants: StoryObj<
  ReactButtonProps & {
    backgroundColor: BoxColorScheme;
    backgroundVariant: BoxColorVariation;
  }
> = {
  argTypes: {
    backgroundColor: {
      control: "select",
      options: BOX_COLORS,
    },
    backgroundVariant: {
      control: "select",
      options: BOX_VARIANTS,
    },
  },
  args: {
    backgroundColor: "default",
    backgroundVariant: "subtle",
  },
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: [
        "children",
        "className",
        "disabled",
        "left",
        "outline",
        "onClick",
        "right",
        "variant",
      ],
    },
    pseudo: {
      hover: "#hover",
      focus: "#focus",
      active: "#active",
    },
  },
  render({ backgroundColor, backgroundVariant, size }) {
    const states = ["default", "hover", "focus", "active"];

    return (
      <Box
        as="section"
        color={backgroundColor}
        variant={backgroundVariant}
        className="min-h-screen p-xl grid grid-cols-1 md:grid-cols-5 gap-lg items-center"
      >
        {VALID_VARIANTS.map(([variant, outline]) => {
          const children = [
            <span className="capitalize font-bold">{variant}</span>,
            ...states.map((state) => (
              <Button
                key={`${variant}-${state}`}
                variant={variant}
                size={size}
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
                  size={size}
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
      </Box>
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

export const WithIcons: StoryObj<
  Omit<ReactButtonProps, "left" | "right"> & { left?: boolean; right?: boolean }
> = {
  argTypes: {
    left: {
      control: "boolean",
      description: "Whether to show a left icon",
    },
    right: {
      control: "boolean",
      description: "Whether to show a right icon",
    },
  },
  args: {
    left: true,
    right: true,
    children: "Button with Icons",
  },
  render({ left, right, ...args }) {
    return (
      <Button
        {...args}
        left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
        right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
      />
    );
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
