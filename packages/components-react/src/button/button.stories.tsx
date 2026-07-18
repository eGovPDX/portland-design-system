import { BUTTON_SIZES, BUTTON_TYPES } from "@cityofportland/types/button";
import {
  BOX_COLORS,
  BOX_VARIANTS,
  validateBoxConfiguration,
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { fn } from "storybook/test";

import { Box } from "../box";
import { Button, type ReactButtonProps } from "./button";
import boxStories from "../box/box.stories";

type StoryProps = ReactButtonProps & {
  left?: boolean | React.ReactNode;
  right?: boolean | React.ReactNode;
};

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    controls: {
      exclude: ["className", "onClick"],
    },
  },
  argTypes: {
    ...boxStories.argTypes,
    children: {
      control: "text",
      description: "The text content of the button",
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
    type: "button",
    outline: false,
    disabled: false,
    left: false,
    right: false,
    onClick: fn(), // Add default action logger
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

const DemoButton = ({ left, right, children, ...args }: StoryProps) => (
  <Button {...args}>
    {left && <span>{left}</span>}
    {children}
    {right && <span>{right}</span>}
  </Button>
);

// Default button
export const Basic: Story = {
  render: ({ children, ...args }) => (
    <DemoButton {...args}>{children}</DemoButton>
  ),
};

export const PortlandGov: Story = {
  name: "portland.gov",
  parameters: {
    controls: {
      exclude: [
        "className",
        "color",
        "disabled",
        "onClick",
        "outline",
        "size",
        "variant",
      ],
    },
  },
  render({ children, left, right, ...props }) {
    return (
      <div className="grid gap-md">
        <DemoButton
          color="primary"
          variant="moderate"
          size="md"
          className="rounded-md"
          left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
          right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
        >
          {children}
        </DemoButton>
        <DemoButton
          color="primary"
          variant="moderate"
          outline
          size="md"
          className="rounded-md"
          left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
          right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
        >
          {children}
        </DemoButton>
        <DemoButton
          color="secondary"
          variant="emphasis"
          size="md"
          className="rounded-md"
          left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
          right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
        >
          {children}
        </DemoButton>
        <DemoButton
          color="secondary"
          variant="emphasis"
          outline
          size="md"
          className="rounded-md"
          left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
          right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
        >
          {children}
        </DemoButton>
        <DemoButton
          color="danger"
          variant="emphasis"
          size="md"
          className="rounded-md"
          left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
          right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
        >
          {children}
        </DemoButton>
        <DemoButton
          color="danger"
          variant="emphasis"
          outline
          size="md"
          className="rounded-md"
          left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
          right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
        >
          {children}
        </DemoButton>
        <DemoButton
          color="inverse"
          variant="subtle"
          size="md"
          className="rounded-md"
          left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
          right={right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined}
        >
          {children}
        </DemoButton>
      </div>
    );
  },
};

export const Variants: StoryObj<
  StoryProps & {
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
    color: "default",
    size: "md",
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
        "onClick",
        "right",
        "size",
        "variant",
      ],
    },
  },
  render({ backgroundColor, backgroundVariant, color, outline, ...props }) {
    const ButtonTester = ({ color, variant }) => {
      const id = `${color}-${variant}`;

      return (
        <div className="grid items-start gap-md">
          <span key={`${variant}-label`} className="capitalize font-bold">
            {variant}
          </span>

          <DemoButton
            key={`${variant}`}
            id={id}
            color={color}
            variant={variant}
            outline={outline}
            className="capitalize "
            {...props}
          >
            {variant}
          </DemoButton>
        </div>
      );
    };

    return (
      <Box
        as="section"
        color={backgroundColor}
        variant={backgroundVariant}
        className="min-h-screen p-xl"
      >
        <div className="grid grid-cols-1 gap-lg items-center">
          <h2 key={color} className="heading-lg capitalize">
            {color}
          </h2>
          {BOX_VARIANTS.map((variant) =>
            validateBoxConfiguration(color, variant)
          )
            .filter(([color, variant]) => color && variant)
            .map(([color, variant]) => (
              <ButtonTester color={color} variant={variant} />
            ))}
        </div>
      </Box>
    );
  },
};

export const Sizes: Story = {
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["children", "className", "onClick", "size"],
    },
  },
  render({ left, right, onClick, ...props }) {
    return (
      <section className="p-xl grid gap-lg">
        {BUTTON_SIZES.map((size) => (
          <div key={size}>
            <h2 key={size} className="heading-md uppercase">
              {size}
            </h2>
            <Button
              key={size}
              size={size}
              left={left ? <FontAwesomeIcon icon={faArrowLeft} /> : undefined}
              right={
                right ? <FontAwesomeIcon icon={faArrowRight} /> : undefined
              }
              onClick={onClick}
              {...props}
            >
              {size.toLocaleUpperCase()} Button
            </Button>
          </div>
        ))}
      </section>
    );
  },
};

export const Incognito: StoryObj<StoryProps & { underline: boolean }> = {
  args: {
    underline: false,
  },
  render: ({ left, right, underline, ...props }) => (
    <div className="grid gap-md">
      <p className="text-body-lg">
        There is a{" "}
        <DemoButton
          className={`${underline && "underline"}`}
          left={left && <FontAwesomeIcon icon={faArrowRight} />}
          right={right && <FontAwesomeIcon icon={faArrowLeft} />}
          {...props}
        >
          button
        </DemoButton>{" "}
        hidden in this sentence.
      </p>
      <p className="text-body-lg">
        There are two{" "}
        <DemoButton
          className={`${underline && "underline"}`}
          left={left && <FontAwesomeIcon icon={faArrowRight} />}
          right={right && <FontAwesomeIcon icon={faArrowLeft} />}
          {...props}
        >
          buttons
        </DemoButton>{" "}
        hidden in this{" "}
        <DemoButton
          className={`${underline && "underline"}`}
          left={left && <FontAwesomeIcon icon={faArrowRight} />}
          right={right && <FontAwesomeIcon icon={faArrowLeft} />}
          {...props}
        >
          sentence
        </DemoButton>
        .
      </p>
    </div>
  ),
};

export default meta;
