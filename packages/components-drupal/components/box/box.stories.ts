import {
  BOX_COLORS,
  BOX_VARIANTS,
  type BoxProps,
} from "@cityofportland/types/box";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Box from "./box.component.yml";

type Props = BoxProps & {
  content: string | object;
  attributes: Record<string, string>;
  as:
    | "div"
    | "section"
    | "article"
    | "aside"
    | "main"
    | "header"
    | "footer"
    | "nav";
};

export default {
  title: "Components/Box",
  render: (args) => {
    return `
      ${Box.component({ ...args })}
    `;
  },
  argTypes: {
    as: {
      control: "select",
      options: [
        "div",
        "section",
        "article",
        "aside",
        "main",
        "header",
        "footer",
        "nav",
      ],
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
    content: {
      control: "object",
      description: "The text content of the box",
    },
  },
  args: {
    as: "div",
    color: "default",
    variant: "moderate",
  },
} satisfies Meta<Props>;

type Story = StoryObj<Props>;

// Basic box
export const Basic: StoryObj<Props & { border: boolean }> = {
  argTypes: {
    border: {
      control: "boolean",
      description:
        "Whether to include a border around the box. This adds the `border-xs` utility class to the box, which applies a border using the color defined by the current color scheme and variant. This is not a standard prop of the Box component, but is included here for demonstration purposes.",
    },
  },
  args: {
    border: false,
  },
  parameters: {
    controls: { exclude: ["content"] },
  },
  render: ({ as, border, color, variant }) => {
    return `
      ${Box.component({
        defaultAttributes: [
          ...Box.args.defaultAttributes,
          ["class", ["p-xl", border ? "border-xl" : ""]],
        ],
        as,
        color,
        variant,
        content: `<p>This is a <strong><em>${color}</em></strong> box of <strong><em>${variant}</em></strong> variant.</p>`,
      })}
    `;
  },
};

/**
 * All color schemes showcase
 */
export const Gallery: Story = {
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["color", "variant", "content"] },
  },
  render: ({ as }) => {
    return `
      <div class="p-xl grid grid-cols-1 gap-sm">
        ${BOX_COLORS.map(
          (color) => `
            <div class="grid grid-cols-5 items-center gap-sm">
              <span class="font-bold capitalize">${color}</span>
              ${BOX_VARIANTS.map(
                (variant) => `
                  ${Box.component({
                    defaultAttributes: [
                      ...Box.args.defaultAttributes,
                      [
                        "class",
                        [
                          "border-xl",
                          "p-xs",
                          "flex",
                          "justify-center",
                          "items-center",
                        ],
                      ],
                    ],
                    as,
                    color,
                    variant,
                    content: `<span class="justify-self-center p-sm uppercase">${variant}</span>`,
                  })}
                `
              ).join("")}
            </div>
          `
        ).join("")}
      </div>
    `;
  },
};

/**
 * All variations of a color scheme
 */
export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["variant", "content"] },
  },
  render: ({ as, color }) => {
    return `
      <div class="min-h-screen grid grid-cols-1">
        ${BOX_VARIANTS.map(
          (variant) => `
            ${Box.component({
              defaultAttributes: [
                ...Box.args.defaultAttributes,
                ["class", ["p-xs", "grid", "grid-cols-2", "items-center"]],
              ],
              as,
              color,
              variant,
              content: `
                <span class="justify-self-center p-sm uppercase">${color}</span>
                <span class="justify-self-center p-sm uppercase">${variant}</span>
              `,
            })}
          `
        ).join("")}
      </div>
    `;
  },
};

/**
 * Nested boxes
 */
export const Nested: StoryObj<
  Props & {
    outerColor: BoxProps["color"];
    outerVariant: BoxProps["variant"];
    innerColor: BoxProps["color"];
    innerVariant: BoxProps["variant"];
  }
> = {
  argTypes: {
    outerColor: {
      control: "select",
      name: "outer color",
      options: BOX_COLORS,
      description: "Color scheme for the outer box",
    },
    outerVariant: {
      control: "select",
      name: "outer variant",
      options: BOX_VARIANTS,
      description: "Variant for the outer box",
    },
    innerColor: {
      control: "select",
      name: "inner color",
      options: BOX_COLORS,
      description: "Color scheme for the inner box",
    },
    innerVariant: {
      control: "select",
      name: "inner variant",
      options: BOX_VARIANTS,
      description: "Variant for the inner box",
    },
  },
  args: {
    outerColor: "default",
    outerVariant: "moderate",
    innerColor: "secondary",
    innerVariant: "moderate",
  },
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["as", "color", "variant", "content"] },
  },
  render: ({ as, outerColor, outerVariant, innerColor, innerVariant }) => {
    return `
      ${Box.component({
        defaultAttributes: [
          ...Box.args.defaultAttributes,
          ["class", ["min-h-screen", "p-xl", "grid", "gap-md"]],
        ],
        as,
        color: outerColor,
        variant: outerVariant,
        content: `<p>This is a <strong><em>${outerColor}</em></strong> box of <strong><em>${outerVariant}</em></strong> variant.</p>
        ${Box.component({
          defaultAttributes: [
            ...Box.args.defaultAttributes,
            ["class", ["p-md"]],
          ],
          as: "section",
          color: innerColor,
          variant: innerVariant,
          content: `<p>This is a <strong><em>${innerColor}</em></strong> box of <strong><em>${innerVariant}</em></strong> variant.</p>`,
        })}
        `,
      })}
    `;
  },
};

/**
 * Page layout example
 */
export const Page: Story = {
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["as", "variant", "content"] },
  },
  render: ({ color }) => {
    return `
      <section class="min-h-screen flex flex-col">
        ${Box.component({
          defaultAttributes: [
            ...Box.args.defaultAttributes,
            ["class", ["p-md"]],
          ],
          as: "header",
          color,
          variant: "moderate",
          content: `<h1 class="text-3xl font-bold">Page header</h1>`,
        })}
        ${Box.component({
          defaultAttributes: [
            ...Box.args.defaultAttributes,
            ["class", ["flex-1", "p-md"]],
          ],
          as: "main",
          color,
          variant: "subtle",
          content: `<p>This is the main content area.</p>`,
        })}
        ${Box.component({
          defaultAttributes: [
            ...Box.args.defaultAttributes,
            ["class", ["flex-1", "p-md"]],
          ],
          as: "footer",
          color,
          variant: "emphasis",
          content: `<p>Page footer</p>`,
        })}
      </section>
    `;
  },
};
