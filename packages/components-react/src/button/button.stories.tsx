import { BUTTON_SIZES, BUTTON_TYPES } from "@cityofportland/types/button";
import {
  BOX_COLORS,
  BOX_VARIANTS,
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import {
  faArrowLeft,
  faArrowRight,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Color from "colorjs.io";
import React, { useEffect, useState } from "react";
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
    backgroundColor: "default",
    backgroundVariant: "subtle",
    color: "default",
    size: "md",
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
    const [backgroundElement, setBackgroundElement] =
      useState<HTMLElement | null>(null);
    const [bgColor, setBgColor] = useState<Color>();

    const getElement = (id: string) => document.querySelector(`#${id}`);

    const getProperty = (id: string, name: string) => {
      const element = getElement(id);

      if (!element) {
        return null;
      }

      return getComputedStyle(element).getPropertyValue(name).trim();
    };

    useEffect(() => {
      if (!backgroundElement) return;
      const style = getComputedStyle(backgroundElement);
      setBgColor(new Color(style.backgroundColor));
    }, [backgroundElement, backgroundColor, backgroundVariant, color]);

    const ButtonTester = ({ color, variant }) => {
      const id = `${color}-${variant}`;
      const el = getElement(id);

      const b = getProperty(id, "--box-background-color");
      const bc =
        bgColor && b && Color.contrastWCAG21(bgColor, new Color(b)).toFixed(2);
      const r =
        getProperty(id, "--box-ring-color") ||
        (el && getComputedStyle(el).color);
      const rc =
        bgColor && r && Color.contrastWCAG21(bgColor, new Color(r)).toFixed(2);

      const o = getProperty(id, "--box-outline-color");
      const oc =
        bgColor && o && Color.contrastWCAG21(bgColor, new Color(o)).toFixed(2);

      return (
        <div className="grid items-start gap-md">
          <span key={`${variant}-label`} className="capitalize font-bold">
            {variant}
          </span>
          <div className="grid md:grid-cols-2 gap-md">
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
            <dl className="grid sm:grid-cols-3 gap-xs">
              {outline && r && (
                <div className="flex-1 grid gap-xs">
                  <dt className="font-bold">outline</dt>
                  <dd>
                    {new Color(r).toString({ format: "hex" })} ({rc}){" "}
                    {Number(rc) >= 3 ? "✅" : "❌"}
                  </dd>
                </div>
              )}
              {!outline && (
                <div className="flex-1 grid gap-xs">
                  <dt className="font-bold">background</dt>
                  <dd>
                    {b} ({bgColor && bc}){" "}
                    {bgColor && Number(bc) >= 3 ? "✅" : "❌"}
                  </dd>
                </div>
              )}
              <div className="flex-1 grid gap-xs">
                <dt className="font-bold">focus</dt>
                <dd>
                  {o} ({oc}) {Number(oc) >= 3 ? "✅" : "❌"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      );
    };

    return (
      <Box
        ref={setBackgroundElement}
        as="section"
        color={backgroundColor}
        variant={backgroundVariant}
        className="min-h-screen p-xl"
      >
        <span>current background: {bgColor?.toString({ format: "hex" })}</span>
        <h2 className="heading-lg capitalize">Unset</h2>
        <ButtonTester color="unset" variant="unset" />

        <div className="grid grid-cols-1 gap-lg items-center">
          <h2 key={color} className="heading-lg capitalize">
            {color}
          </h2>
          {BOX_VARIANTS.map((variant) => (
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

export const Stacked: Story = {
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["children", "className", "onClick"],
    },
  },
  render: ({ color, variant, size, ...props }) => (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto gap-md">
      <Box
        as="div"
        color={color}
        variant={variant}
        className={[
          "pl-xs flex items-center justify-between gap-md hover:bg-(--box-background-color)",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="underline">Some text leading in</span>
        <DemoButton size={size} className="h-full" {...props}>
          <FontAwesomeIcon icon={faEllipsis} />
        </DemoButton>
      </Box>
    </div>
  ),
};

export default meta;
