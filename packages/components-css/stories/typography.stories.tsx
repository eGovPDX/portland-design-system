import base from "@cityofportland/design-tokens/json/base.json";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "react";

import "../src/utilities.css";

const meta: Meta = {
  title: "Components/Typography",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Utility_Classes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div className="flex flex-col gap-sm p-xl">
        <h2 className="heading-lg">Utility Heading Classes</h2>
        <div className="flex flex-col gap-sm">
          {Object.entries(base["font-size"].heading).map(([key]) => (
            <h2 key={key} className={`heading-${key}`}>
              City of Portland | <code>heading-{key}</code>
            </h2>
          ))}
        </div>
      </div>
    );
  },
};
