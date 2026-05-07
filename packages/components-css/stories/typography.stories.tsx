import base from "../../design-tokens/dist/json/base.json";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "react";
import "@cityofportland/components-css/main.css";

const meta: Meta = {
  title: "Design/Typography",
};

export default meta;
type Story = StoryObj<typeof meta>;

const TEXT = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <p className={className} style={style}>
    Portland, Oregon is a city known for its tree-lined streets, independent
    bookstores, and a strong appreciation for creativity. Nestled between the
    Willamette and Columbia rivers, the city blends urban energy with easy
    access to forests, mountains, and waterways. Many neighborhoods feel like
    small towns of their own, each with distinct cafés, murals, and street
    corners that seem built for wandering. Portland's weather is famously mild,
    with long stretches of soft, gray rain that give way to bright summer
    evenings. Whether you're walking through the Saturday Market, biking across
    one of the city's many bridges, or simply enjoying the view of Mt. Hood on a
    clear day, Portland offers a pace and character that feel welcoming and
    distinctly its own.
  </p>
);

export const Family: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <>
        {Object.entries(base.font.family).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col gap-sm p-xl"
            style={{
              fontFamily: value,
            }}
          >
            <h2 className="font-bold text-heading-xl capitalize">{key}</h2>
            <h3 className="font-bold text-heading-lg">Value</h3>
            <code>{value}</code>
            <h3 className="font-bold text-heading-lg">Usage</h3>
            <TEXT />
          </div>
        ))}
      </>
    );
  },
};

export const Weights: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div className="flex flex-col gap-sm p-xl text-body-lg">
        {Object.entries(base.font.weight).map(([key, value]) => (
          <div key={key}>
            <h2
              style={{
                fontWeight: value,
              }}
            >
              {key} ({value})
            </h2>
            <TEXT style={{ fontWeight: value }} />
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div className="flex flex-col gap-sm p-xl">
        <h2 className="font-bold text-heading-lg">Heading</h2>
        <div className="flex flex-col gap-sm">
          {Object.entries(base["font-size"].heading).map(([key, value]) => (
            <h2 key={key} style={{ fontSize: value }}>
              City of Portland | {key} ({value}) |{" "}
              <code>text-heading-{key}</code>
            </h2>
          ))}
        </div>
        <h2 className="font-bold text-heading-lg">Body</h2>
        <div className="flex flex-col gap-sm">
          {Object.entries(base["font-size"].body).map(([key, value]) => (
            <div key={key}>
              <h2 style={{ fontSize: value }}>
                {key} ({value}) | <code>text-body-{key}</code>
              </h2>
              <TEXT style={{ fontSize: value }} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Utility_Classes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div className="flex flex-col gap-sm p-xl">
        <h2 className="heading-lg">Utility Heading Classes</h2>
        <div className="flex flex-col gap-sm">
          {Object.entries(base["font-size"].heading).map(([key, value]) => (
            <h2 key={key} className={`heading-${key}`}>
              City of Portland | <code>heading-{key}</code>
            </h2>
          ))}
        </div>
      </div>
    );
  },
};
