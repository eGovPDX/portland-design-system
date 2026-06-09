import { TAG_VARIANTS, type TagProps } from "@cityofportland/types/tag";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Tag from "./tag.component.yml";

type Props = TagProps & {
  content: string | object;
  attributes: Record<string, string>;
};

export default {
  title: "Components/Tag",
  render: (args) => {
    return `
      ${Tag.component({ ...args })}
    `;
  },
  argTypes: {
    variant: {
      control: "select",
      options: TAG_VARIANTS,
      description: "Color variation within the chosen color scheme",
    },
    content: {
      control: "object",
      description: "The text content of the tag",
    },
  },
  args: {
    variant: "info",
  },
} satisfies Meta<Props>;

type Story = StoryObj<Props>;

// Basic tag
export const Basic: Story = {
  args: {
    content: "Tag content",
  },
  // render: ({ variant }) => {
  //   return `
  //     ${Tag.component({
  //       defaultAttributes: [...Tag.args.defaultAttributes, ["class", [""]]],
  //       variant,
  //       content: `This is a tag of <strong><em>${variant}</em></strong> variant.`,
  //     })}
  //   `;
  // },
};

/**
 * All color schemes showcase
 */
export const Gallery: Story = {
  parameters: {
    controls: { exclude: ["variant", "content"] },
  },
  render: ({ variant }) => {
    return `
      <div class="p-xl grid gap-sm justify-items-center">
        ${TAG_VARIANTS.map(
          (variant) => `
            ${Tag.component({
              variant,
              content: `<strong><em>${variant}</em></strong> tag`,
            })}
          `
        ).join("")}
      </div>
    `;
  },
};

// Page example tag
export const Page_Example: Story = {
  parameters: {
    controls: { exclude: ["variant", "content"] },
    layout: "fullscreen",
  },
  render: ({ variant }) => {
    return `
      <article class="p-xl">
        <h1 class="heading-2xl">Space: the final frontier</h1>
        <div class="my-sm flex flex-wrap gap-xs">
          ${Tag.component({
            defaultAttributes: [...Tag.args.defaultAttributes, ["class", [""]]],
            variant: "info",
            content: `News article`,
          })}
          ${Tag.component({
            defaultAttributes: [...Tag.args.defaultAttributes, ["class", [""]]],
            variant: "danger",
            content: `Unpublished`,
          })}
        </div>
        <img class="md:max-w-[40em]" src="https://images.unsplash.com/photo-1777195680778-f89d025251ac?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Earth rising over the moon's surface"/>
        <p class="body-md my-sm max-w-[55em]">
          We choose to go to the moon. We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard.
        </p>
      </article>
    `;
  },
};
