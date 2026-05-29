import base from "@cityofportland/design-tokens/json/base.json";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "react";

import "../src/utilities.css";

const meta: Meta = {
  title: "Utility Classes",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div className="flex flex-col gap-sm p-xl">
        <div className="flex flex-col gap-sm">
          {Object.entries(base["font-size"].body).map(([key]) => (
            <div key={key}>
              <h2 className="heading-2xl">
                <code>body-{key}</code>
              </h2>
              <p className={`body-${key}`}>
                We choose to go to the moon. We choose to go to the moon in this
                decade and do the other things, not because they are easy, but
                because they are hard, because that goal will serve to organize
                and measure the best of our energies and skills, because that
                challenge is one that we are willing to accept, one we are
                unwilling to postpone, and one which we intend to win, and the
                others, too.
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
