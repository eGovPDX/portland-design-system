import base from "@cityofportland/design-tokens/json/base.json";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "react";

import "../src/utilities.css";

const meta: Meta = {
  title: "Utility Classes",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Link: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div className="flex flex-col gap-sm p-xl">
        <div>
          <h2 className="heading-2xl">
            <code>link</code>
          </h2>
          <p className="body-md py-sm">
            The <code>link</code> class inherits the container's font size. It
            is intended for standard <code>&lt;a&gt;</code> links, but can also
            be applied to other elements to make them look like a link.
          </p>
          {Object.entries(base["font-size"].body).map(([key]) => (
            <div key={key}>
              <p className={`body-${key} py-sm`}>
                A standard{" "}
                <a href="#" className={`link`}>
                  web link
                </a>
                .
              </p>
              <p className={`body-${key} link inline-block`} tabIndex={0}>
                A paragraph styled as a web link
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="heading-2xl">
            <code>link-info</code>
          </h2>
          <p className="body-md py-sm">
            The <code>link-info</code> class inherits the container's font size.
            It is intended for tooltips and modal popups, but can also be
            applied to other elements to make them look like an info link.
          </p>
          {Object.entries(base["font-size"].body).map(([key]) => (
            <div key={key}>
              <p className={`body-${key} py-sm`}>
                An{" "}
                <a href="#" className={`link-info`}>
                  info link
                </a>
                .
              </p>
              <p className={`body-${key} link-info inline-block`} tabIndex={0}>
                A paragraph styled as an info link
              </p>
            </div>
          ))}
        </div>
        <hr className="my-2xl" />
        <div className="flex flex-col gap-sm">
          {Object.entries(base["font-size"].body).map(([key]) => (
            <div key={key}>
              <h2 className="heading-2xl">
                <code>link-{key}</code>
              </h2>
              <p className="body-md py-sm">
                The <code>{`link-${key}`}</code> class combines the{" "}
                <code>link</code> and <code>{`body-${key}`}</code> classes.
              </p>
              <p className={`body-md`}>
                A generic paragraph with a{" "}
                <a href="#" className={`link-${key}`}>
                  {`${key}`} web link
                </a>
                .
              </p>
              <p className={`link-${key} inline-block`} tabIndex={0}>
                A paragraph styled as a {`${key}`} web link
              </p>
            </div>
          ))}
        </div>
        <hr className="my-xl" />
        <div className="flex flex-col gap-sm">
          {Object.entries(base["font-size"].body).map(([key]) => (
            <div key={key}>
              <h2 className="heading-2xl">
                <code>link-info-{key}</code>
              </h2>
              <p className="body-md py-sm">
                The <code>{`link-info-${key}`}</code> class combines the{" "}
                <code>link-info</code> and <code>{`body-${key}`}</code> classes.
              </p>
              <p className={`body-md`}>
                A generic paragraph with a{" "}
                <a href="#" className={`link-info-${key}`}>
                  {`${key}`} info link
                </a>
                .
              </p>
              <p className={`link-info-${key} inline-block`} tabIndex={0}>
                A paragraph styled as a {`${key}`} info link
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
