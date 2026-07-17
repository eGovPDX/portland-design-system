import type { Meta, StoryObj } from "@storybook/react-vite";

import "react";

import "../src/utilities.css";

const meta: Meta = {
  title: "Utility Classes",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    negate: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (story, { args }) => {
      console.debug("args: ", args);
      const { negate } = args;

      const classes = ["max-w-dvw", "p-md", "xl:p-xl", "rich-text"];

      if (negate) classes.push("not-rich-text");

      return <div className={classes.join(" ")}>{story()}</div>;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalRule: Story = {
  args: { negate: false },
  render: () => {
    return (
      <>
        <h2>Horizontal rules</h2>
        <h3>
          <code>hr-md</code>
        </h3>
        <hr />
        <h3>
          <code>hr-lg</code>
        </h3>
        <hr className="hr-lg" />
        <h3>
          <code>hr-xl</code>
        </h3>
        <hr className="hr-xl" />
      </>
    );
  },
};
