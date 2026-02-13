import { BOX_COLORS, BOX_VARIANTS } from "@cityofportland/types/box";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, type ReactBoxProps } from "./box";

const meta: Meta<ReactBoxProps> = {
  title: "Components/Box",
  component: Box,
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
  },
  args: {
    as: "div",
    color: "default",
    variant: "moderate",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: StoryObj<ReactBoxProps & { border: boolean }> = {
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
  render: ({ as, border, color, variant }) => {
    const classes = ["p-xl", border ? "border-xl" : ""]
      .flat()
      .filter(Boolean)
      .join(" ");

    return (
      <Box as={as} color={color} variant={variant} className={classes}>
        <p>
          This is a <em className="font-bold">{color}</em> box of{" "}
          <em className="font-bold">{variant}</em> variant.
        </p>
      </Box>
    );
  },
};

/**
 * All color schemes showcase
 */
export const Gallery: Story = {
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["color", "variant"] },
  },
  render: ({ as }) => (
    <Box
      as="section"
      color="default"
      variant="subtle"
      className="p-xl grid grid-cols-1 gap-sm"
    >
      {BOX_COLORS.map((color) => (
        <div key={color} className="grid grid-cols-5 items-center gap-sm">
          <span className="font-bold capitalize">{color}</span>
          {BOX_VARIANTS.map((variant) => (
            <Box
              as={as}
              key={variant}
              color={color}
              variant={variant}
              className="border-xl p-xs flex justify-center items-center"
            >
              <span className="justify-self-center p-sm uppercase">
                {variant}
              </span>
            </Box>
          ))}
        </div>
      ))}
    </Box>
  ),
};

/**
 * All variations of a color scheme
 */
export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["variant"] },
  },
  render: ({ as, color }) => (
    <div className="min-h-screen grid grid-cols-1">
      {BOX_VARIANTS.map((variant) => (
        <Box
          as={as}
          key={variant}
          color={color}
          variant={variant}
          className="p-xs grid grid-cols-2 items-center"
        >
          <span className="justify-self-center p-sm uppercase">{color}</span>
          <span className="justify-self-center p-sm uppercase">{variant}</span>
        </Box>
      ))}
    </div>
  ),
};

export const Nested: StoryObj<
  ReactBoxProps & {
    outerColor: ReactBoxProps["color"];
    outerVariant: ReactBoxProps["variant"];
    innerColor: ReactBoxProps["color"];
    innerVariant: ReactBoxProps["variant"];
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
    controls: { exclude: ["as", "color", "variant"] },
  },
  render: ({ as, outerColor, outerVariant, innerColor, innerVariant }) => (
    <Box
      as={as}
      color={outerColor}
      variant={outerVariant}
      className="min-h-screen p-xl grid gap-md"
    >
      <p>
        This is an <em className="font-bold">{outerColor}</em> box of{" "}
        <em className="font-bold">{outerVariant}</em> variant.
      </p>
      <Box
        as="section"
        color={innerColor}
        variant={innerVariant}
        className="p-md"
      >
        <p>
          This is an <em className="font-bold">{innerColor}</em> box of{" "}
          <em className="font-bold">{innerVariant}</em> variant.
        </p>
      </Box>
    </Box>
  ),
};

export const Page: Story = {
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["as", "variant"] },
  },
  render: ({ color }) => (
    <section className="min-h-screen flex flex-col">
      <Box as="header" color={color} variant="moderate" className="p-md">
        <h1 className="text-3xl font-bold">Page header</h1>
      </Box>
      <Box as="main" color={color} variant="subtle" className="flex-1 p-md">
        <p>This is the main content area.</p>
      </Box>
      <Box as="footer" color={color} variant="emphasis" className="flex-1 p-md">
        <p>Page footer</p>
      </Box>
    </section>
  ),
};
