import {
  BUTTON_SIZES,
  type ButtonSize,
  type ButtonProps,
} from "@cityofportland/types/button";
import {
  BOX_COLORS,
  BOX_VARIANTS,
  validateBoxConfiguration,
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Meta, StoryObj } from "@storybook/html-vite";

import "../box/box.component.yml";
import Button from "./button.component.yml";

library.add(faArrowLeft, faArrowRight);

const arrowLeft = icon({ prefix: "fas", iconName: "arrow-left" });
const arrowRight = icon({ prefix: "fas", iconName: "arrow-right" });

type ButtonStoryArgs = ButtonProps & {
  as?: "button" | "a";
  type?: "button" | "submit" | "reset";
  href?: string;
  content?: string | object;
  left?: boolean;
  right?: boolean;
  attributes?: Record<string, string>;
};

const renderButton = (rawArgs: ButtonStoryArgs) => {
  const { as, left, right, content, attributes, ...args } = rawArgs;

  const componentArgs: Record<string, unknown> = {
    ...args,
    as,
    content,
    left: left ? arrowLeft.html.join(" ") : undefined,
    right: right ? arrowRight.html.join(" ") : undefined,
  };

  if (as === "a") {
    componentArgs.href = componentArgs.href || "#";
  }

  if (attributes) {
    componentArgs.defaultAttributes = [
      ...Button.args.defaultAttributes,
      ...Object.entries(attributes).map(([key, value]) => [key, [value]]),
    ];
  }

  return Button.component(componentArgs as never);
};

export default {
  title: "Components/Button",
  render: (args) => {
    return `
      ${renderButton(args as ButtonStoryArgs)}
    `;
  },
  argTypes: {
    as: {
      control: "select",
      options: ["button", "a"],
      description: "The HTML element to render as",
    },
    color: {
      control: "select",
      options: BOX_COLORS,
      description: "Color scheme for background and content colors",
    },
    variant: {
      control: "select",
      options: BOX_VARIANTS,
      description: "Color variation within the chosen color scheme",
    },
    size: {
      control: "select",
      options: BUTTON_SIZES,
      description: "The size of the button",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "The HTML button type attribute",
      if: { arg: "as", eq: "button" },
    },
    href: {
      control: "text",
      description: "The anchor URL when rendering as a link",
      if: { arg: "as", eq: "a" },
    },
    outline: {
      control: "boolean",
      description: "Whether the button should have an outline style",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    content: {
      control: "text",
      description: "The text content of the button",
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
    as: "button",
    color: "inverse",
    variant: "subtle",
    size: "md",
    type: "button",
    outline: false,
    disabled: false,
    content: "{text}",
    left: false,
    right: false,
  },
} satisfies Meta<ButtonStoryArgs>;

type Story = StoryObj<ButtonStoryArgs>;

export const Basic: Story = {
  render: ({ content, ...args }) => {
    return `
      ${renderButton({ content, ...args })}
    `;
  },
};

export const PortlandGov: Story = {
  name: "portland.gov",
  parameters: {
    controls: {
      exclude: [
        "as",
        "color",
        "disabled",
        "outline",
        "size",
        "type",
        "variant",
      ],
    },
  },
  render({
    color: _color,
    variant: _variant,
    size: _size,
    outline: _outline,
    type: _type,
    content,
    ...props
  }) {
    return `
      <div class="grid gap-md">
        ${renderButton({
          ...props,
          type: "button",
          color: "primary",
          variant: "moderate",
          size: "md",
          attributes: { class: "rounded-md" },
          content,
        })}
        ${renderButton({
          ...props,
          type: "button",
          color: "primary",
          variant: "moderate",
          outline: true,
          size: "md",
          attributes: { class: "rounded-md" },
          content,
        })}
        ${renderButton({
          ...props,
          type: "button",
          color: "secondary",
          variant: "emphasis",
          size: "md",
          attributes: { class: "rounded-md" },
          content,
        })}
        ${renderButton({
          ...props,
          type: "button",
          color: "secondary",
          variant: "emphasis",
          outline: true,
          size: "md",
          attributes: { class: "rounded-md" },
          content,
        })}
        ${renderButton({
          ...props,
          type: "button",
          color: "danger",
          variant: "emphasis",
          size: "md",
          attributes: { class: "rounded-md" },
          content,
        })}
        ${renderButton({
          ...props,
          type: "button",
          color: "danger",
          variant: "emphasis",
          outline: true,
          size: "md",
          attributes: { class: "rounded-md" },
          content,
        })}
        ${renderButton({
          ...props,
          type: "button",
          color: "inverse",
          variant: "subtle",
          size: "md",
          attributes: { class: "rounded-md" },
          content,
        })}
      </div>
    `;
  },
};

export const Variants: StoryObj<
  ButtonStoryArgs & {
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
        "content",
        "disabled",
        "left",
        "right",
        "size",
        "type",
        "variant",
      ],
    },
  },
  render({
    variant: _variant,
    backgroundColor,
    backgroundVariant,
    color,
    outline,
    ...props
  }) {
    const validVariants = BOX_VARIANTS.map((v) =>
      validateBoxConfiguration(color, v)
    ).filter(
      ([currentColor, currentVariant]) => currentColor && currentVariant
    ) as Array<[BoxColorScheme, BoxColorVariation]>;

    return `
      <section class="box box--${backgroundColor} box--${backgroundVariant} min-h-screen p-xl">
        <div class="grid grid-cols-1 gap-lg items-center">
          <h2 class="heading-lg capitalize">${color}</h2>
          ${validVariants
            .map(
              ([currentColor, currentVariant]) => `
                <div class="grid items-start gap-md">
                  <span class="capitalize font-bold">${currentVariant}</span>
                  ${renderButton({
                    ...props,
                    color: currentColor,
                    variant: currentVariant,
                    outline,
                    attributes: { class: "capitalize" },
                    content: String(currentVariant),
                  })}
                </div>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  },
};

export const Sizes: Story = {
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["content", "size", "type"],
    },
  },
  render({ size: _size, ...props }) {
    return `
      <section class="p-xl grid gap-lg">
        ${BUTTON_SIZES.map(
          (size) => `
            <div>
              <h2 class="heading-md uppercase">${size}</h2>
              ${renderButton({
                ...props,
                size: size as ButtonSize,
                content: `${size.toUpperCase()} Button`,
              })}
            </div>
          `
        ).join("")}
      </section>
    `;
  },
};

export const Incognito: StoryObj<ButtonStoryArgs & { underline: boolean }> = {
  args: {
    color: undefined,
    variant: undefined,
    size: undefined,
    underline: false,
  },
  render: ({ left, right, underline, ...props }) => {
    return `
      <div class="grid gap-md">
        <p class="text-body-lg">
          There is a
          ${renderButton({
            ...props,
            left: right,
            right: left,
            attributes: { class: underline ? "underline" : "" },
            content: "button",
          })}
          hidden in this sentence.
        </p>
        <p class="text-body-lg">
          There are two
          ${renderButton({
            ...props,
            left: right,
            right: left,
            attributes: { class: underline ? "underline" : "" },
            content: "buttons",
          })}
          hidden in this
          ${renderButton({
            ...props,
            left: right,
            right: left,
            attributes: { class: underline ? "underline" : "" },
            content: "sentence",
          })}.
        </p>
      </div>
    `;
  },
};
