import { TAG_VARIANTS } from "@cityofportland/types/tag";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag, type ReactTagProps } from "./tag";

export default {
  title: "Components/Tag",
  component: Tag,
  argTypes: {
    variant: {
      control: "select",
      options: TAG_VARIANTS,
      description: "Color variation within the chosen color scheme",
    },
  },
  args: {
    variant: "info",
  },
} satisfies Meta<ReactTagProps>;

type Story = StoryObj<ReactTagProps>;

export const Basic: StoryObj<ReactTagProps & { border: boolean }> = {
  args: {
    children: "Tag content",
  },
  parameters: {
    controls: { exclude: ["className"] },
  },
  // render: ({ variant }) => {
  //   return (
  //     <Tag variant={variant}>
  //       This is a tag of <em className="font-bold">{variant}</em> variant.
  //     </Tag>
  //   );
  // },
};

/**
 * All color schemes showcase
 */
export const Gallery: Story = {
  parameters: {
    controls: { exclude: ["variant", "children", "className"] },
  },
  render: ({}) => (
    <div className="p-xl grid gap-sm justify-items-center">
      {TAG_VARIANTS.map((variant) => (
        <Tag variant={variant}>
          <strong>
            <em>{variant}</em>
          </strong>{" "}
          tag
        </Tag>
      ))}
    </div>
  ),
};

// Page example tag
export const Page_Example: Story = {
  parameters: {
    controls: { exclude: ["variant", "children", "className"] },
    layout: "fullscreen",
  },
  render: ({}) => (
    <>
      <article className="p-xl">
        <h1 className="heading-2xl">Space: the final frontier</h1>
        <div className="my-sm flex flex-wrap gap-xs">
          <Tag variant="info">News article</Tag>
          <Tag variant="danger">Unpublished</Tag>
        </div>
        <img
          className="md:max-w-[40em]"
          src="https://images.unsplash.com/photo-1777195680778-f89d025251ac?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Earth rising over the moon's surface"
        />
        <p className="body-md my-sm max-w-[55em]">
          We choose to go to the moon. We choose to go to the moon in this
          decade and do the other things, not because they are easy, but because
          they are hard.
        </p>
      </article>
    </>
  ),
};
