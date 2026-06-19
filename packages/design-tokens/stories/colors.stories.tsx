import base from "../dist/json/base.json";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "react";

const meta: Meta = {
  title: "Design/Color",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div className="grid grid-cols-[auto_minmax(0,1fr)]  p-xl">
        {Object.entries(base.color).map(([key, value]) => (
          <>
            <span className="font-semibold capitalize sm:pr-2xl">{key}</span>
            <span className="flex flex-col xl:flex-row items-start gap-md">
              {Object.entries(value).map(([subKey, subValue]) => (
                <div className="flex flex-col items-center">
                  <span
                    key={subKey}
                    className="size-4xl flex rounded-md"
                    style={{
                      backgroundColor: subValue,
                    }}
                  ></span>
                  <span className="text-xs text-center">{subKey}</span>
                </div>
              ))}
            </span>
          </>
        ))}
      </div>
    );
  },
};
