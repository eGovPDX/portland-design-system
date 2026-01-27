import { BOX_COLORS, BOX_VARIANTS } from "@cityofportland/types/box";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, type ReactBoxProps } from "./box";

const meta: Meta<ReactBoxProps> = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
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
  parameters: {
    autodocs: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ as, color, variant }) => {
    const classes = ["p-xl"].filter(Boolean).flat().join(" ");

    return (
      <Box as={as} color={color} variant={variant} className={classes}>
        <p>
          This is an <em className="font-bold">{color}</em> box of{" "}
          <em className="font-bold">{variant}</em> variant.
        </p>
      </Box>
    );
  },
};

/**
 * All color schemes showcase
 */
export const AllColors: Story = {
  parameters: {
    controls: { exclude: ["color"] },
  },
  render: ({ variant, as }) => (
    <div className="flex flex-col gap-sm">
      {BOX_COLORS.map((color) => (
        <Box
          key={color}
          as={as}
          color={color}
          variant={variant}
          className="p-xs"
        >
          <span className="p-sm uppercase">{color}</span>
          <span className="p-sm uppercase">{variant}</span>
        </Box>
      ))}
    </div>
  ),
};

/**
 * All variations of a color scheme
 */
export const AllVariants: Story = {
  parameters: {
    controls: { exclude: ["variant"] },
  },
  render: ({ as, color }) => (
    <div className="flex flex-col">
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
    controls: { exclude: ["as", "color", "variant"] },
  },
  render: ({ as, outerColor, outerVariant, innerColor, innerVariant }) => (
    <Box
      as={as}
      color={outerColor}
      variant={outerVariant}
      className="p-xl grid gap-md"
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
