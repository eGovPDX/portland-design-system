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
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
      control: "boolean",
      description: "Whether to show a left icon",
    },
    right: {
      control: "boolean",
      description: "Whether to show a right icon",
    },
  },
  args: {
    children: "{text}",
    variant: "primary",
    size: "default",
    type: "button",
    outline: false,
    disabled: false,
    left: false,
    right: false,
    onClick: fn(), // Add default action logger
  },
} satisfies Meta<ReactButtonProps>;

type Story = StoryObj<ReactButtonProps>;

// Default button
export const Basic: Story = {
  render: ({ left, right, ...args }) => (
    <Button
      {...args}
      left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
      right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
    />
  ),
};

const VALID_VARIANTS: Array<[ButtonVariant, string?]> = [
  ["primary", "outline"],
  ["secondary", "outline"],
  ["danger", "outline"],
  ["inverse"],
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
      hover: ".hover",
      focus: ".focus",
      active: ".active",
    },
  },
  render({ backgroundColor, backgroundVariant, onClick, size }) {
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
            <span key={`${variant}-label`} className="capitalize font-bold">
              {variant}
            </span>,
            ...states.map((state) => (
              <Button
                key={`${variant}-${state}`}
                variant={variant}
                size={size}
                className={`capitalize ${state}`}
                onClick={onClick}
              >
                {state}
              </Button>
            )),
          ];

          if (outline) {
            children.push(
              <span
                key={`${variant}-outline-label`}
                className="capitalize font-bold"
              >
                {variant} Outline
              </span>,
              ...states.map((state) => (
                <Button
                  key={`${variant}-outline-${state}`}
                  variant={variant}
                  size={size}
                  outline
                  className={`capitalize ${state}`}
                  onClick={onClick}
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
      exclude: ["children", "className", "onClick", "size"],
    },
  },
  render({ disabled, outline, variant, left, right, onClick }) {
    return (
      <section className="flex flex-col lg:flex-row gap-lg items-center">
        {BUTTON_SIZES.map((size) => (
          <Button
            key={size}
            size={size}
            variant={variant}
            outline={outline}
            disabled={disabled}
            className="capitalize"
            left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
            right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
            onClick={onClick}
          >
            {size} Button
          </Button>
        ))}
      </section>
    );
  },
};

export default meta;
