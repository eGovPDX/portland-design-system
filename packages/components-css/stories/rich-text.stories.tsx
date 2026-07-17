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

export const Rich_Text: Story = {
  args: { negate: false },
  render: () => {
    return (
      <>
        <h1>
          <code>rich-text</code> utility class
        </h1>
        <p>
          This story documents how the <code>rich-text</code> parent class
          styles native HTML elements. Each section introduces a feature and
          then demonstrates it with unstyled markup.
        </p>
        <p>
          This story is plain HTML elements inside a single wrapper with the
          <code>rich-text</code> class. No extra classes are required unless a
          section explicitly shows overrides.
        </p>

        <h2>Headings and paragraphs</h2>
        <h1>Heading level 1</h1>
        <p>
          <code>&lt;h1&gt;</code> does not have a default top margin like other
          heading levels do because it is intended to be the first element of a
          page.
        </p>
        <h2>Heading level 2</h2>
        <h3>Heading level 3</h3>
        <h4>Heading level 4</h4>
        <h5>Heading level 5</h5>
        <h6>Heading level 6</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h2>Inline text</h2>
        <p>
          Rich text should support <strong>strong emphasis</strong>,
          <em> emphasized text</em>, inline <code>code snippets</code>, and
          plain <a href="#">links</a> in the same paragraph.
        </p>

        <h2>Links and link contexts</h2>
        <ul>
          <li>
            <a href="#">Read the full guidance</a>
          </li>
          <li>
            <a href="#">
              This is a longer link label intended to wrap to a second line in
              narrow layouts for readability checks
            </a>
          </li>
        </ul>
        <h3>
          <a href="#">Linked heading</a>
        </h3>

        <h2>Lists and nesting</h2>
        <ol>
          <li>
            <h3>Ordered lists</h3>
          </li>
          <li>Top-level ordered item</li>
          <li>
            Ordered item with nested bullets
            <ul>
              <li>Nested unordered item</li>
              <li>
                Nested item with <a href="#">a link</a> and inline{" "}
                <code>code</code>
              </li>
            </ul>
          </li>
          <li>
            Deeply nested ordered list
            <ol>
              <li>Level 2</li>
              <li>
                Level 2 with children
                <ol>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
        <ul>
          <li>
            <h3>Unordered lists</h3>
          </li>
          <li>Top-level unordered item</li>
          <li>
            Unordered item with nested list
            <ul>
              <li>Nested bullet A</li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
            </ul>
          </li>
        </ul>

        <h2>Blockquotes</h2>
        <blockquote>
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </blockquote>

        <h2>Code formatting</h2>
        <p>
          Example command:{" "}
          <code>pnpm --filter @cityofportland/components-css storybook</code>
        </p>
        <pre>
          <code>
            {`function formatStatus(message) {
  return \`[\${new Date().toLocaleString()}] Status: \${message}\`;
}`}
          </code>
        </pre>

        <h2>Horizontal rule</h2>
        <p>
          There are several sizes of horizontal rules available. The default
          size for <code>rich-text</code> is <code>hr-md</code>
        </p>
        <hr />

        <h2>Overriding</h2>
        <p className="body-lg">
          This paragraph applies <code>body-lg</code> to demonstrate opt-in
          overrides.
        </p>
        <h4 className="heading-lg">
          <code>h4</code> rendered with <code>heading-lg</code> utility
        </h4>
        <section className="not-rich-text">
          <h3>
            <code>not-rich-text</code>
          </h3>
          <p>
            This section uses the <code>not-rich-text</code> class to opt an
            entire section out of the <code>rich-text</code> defaults
          </p>
          <ul>
            <li>listas are affected</li>
          </ul>
          <a href="#">as are links</a>.
        </section>
      </>
    );
  },
};
