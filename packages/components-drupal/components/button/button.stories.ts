import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  type ButtonProps,
  type ButtonVariant,
} from "@cityofportland/types/button";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Button from "./button.component.yml";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faArrowRight);

const arrowLeft = icon({ prefix: "fas", iconName: "arrow-left" });
const arrowRight = icon({ prefix: "fas", iconName: "arrow-right" });

type StoryProps = ButtonProps & {
  content: string | object;
  left: boolean;
  right: boolean;
};

export default {
  title: "Components/Button",
  render: (args) => {
    return `
      ${Button.component({ ...args })}
    `;
  },
  argTypes: {
    content: {
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
    content: "{text}",
    variant: "primary",
    size: "default",
    type: "button",
    outline: false,
    disabled: false,
    left: false,
    right: false,
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

// Default button
export const Basic: Story = {
  render({ left, right, ...args }) {
    return `${Button.component({
      left: left ? arrowLeft.html.join(" ") : "",
      right: right ? arrowRight.html.join(" ") : "",
      ...args,
    })}`;
  },
};

const VALID_VARIANTS: Array<[ButtonVariant, string?]> = [
  ["primary", "outline"],
  ["secondary", "outline"],
  ["danger", "outline"],
  ["inverse"],
];

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: [
        "children",
        "className",
        "disabled",
        "left",
        "outline",
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
  render({ size }) {
    const states = ["default", "hover", "focus", "active"];

    return `
    <section class="min-h-screen p-xl grid grid-cols-1 md:grid-cols-5 gap-lg items-center">
      ${VALID_VARIANTS.map(([variant, outline]) => {
        const children = [
          `<span class="capitalize font-bold">${variant}</span>`,
          ...states.map((state) =>
            Button.component({
              variant,
              size,
              attributes: { class: `capitalize ${state}` },
              content: state,
            })
          ),
        ];

        if (outline) {
          children.push(
            ...[
              `<span class="capitalize font-bold">${variant} outline</span>`,
              ...states.map((state) =>
                Button.component({
                  variant,
                  size,
                  outline: true,
                  attributes: { class: `capitalize ${state}` },
                  content: state,
                })
              ),
            ]
          );
        }

        return children;
      })
        .flat()
        .join("\n")}
    </section>`;
  },
};

export const Sizes: Story = {
  parameters: {
    controls: {
      exclude: ["children", "className", "onClick", "size"],
    },
  },
  render({ disabled, outline, variant, left, right }) {
    return `
    <section class="flex flex-col lg:flex-row gap-lg items-center">
      ${BUTTON_SIZES.map((size) =>
        Button.component({
          size,
          variant,
          outline,
          disabled,
          attributes: { class: "capitalize" },
          content: `${size} Button`,
          left: left ? arrowLeft.html.join(" ") : "",
          right: right ? arrowRight.html.join(" ") : "",
        })
      ).join("\n")}
    </section>
    `;
  },
};
