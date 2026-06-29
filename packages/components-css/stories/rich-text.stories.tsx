import base from "@cityofportland/design-tokens/json/base.json";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "react";

import "../src/utilities.css";

const meta: Meta = {
  title: "Utility Classes",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Rich_Text: Story = {
  render: () => {
    return (
      <div className="rich-text">
        <p>
          All elements in this story exist inside a{" "}
          <code>&lt;div class="rich-text"&gt;</code> element and are pure HTML
          elements with no utility classes. All element styling is inherited
          from the <code>rich-text</code> parent class.
        </p>

        <h1>Headings</h1>
        <h1>Heading 1</h1>
        <h2>
          <a href="#">Heading 2 link</a>
        </h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>

        <h1>Paragraphs</h1>
        <p>
          We choose to <a href="#">go to the moon</a>. We choose to go to the
          moon in this decade and do the other things, not because they are
          easy, but because they are hard.
        </p>
        <p>
          That goal will serve to organize and measure the best of our energies
          and skills, because that challenge is one that we are willing to
          accept, one we are unwilling to postpone, and one which we intend to
          win, and the others, too.
        </p>
        <p>To the moon!</p>

        <h1>Lists</h1>
        <ol>
          <li>Item 1</li>
          <li>
            <a href="#">Item 2 link</a>
          </li>
          <li>Item 3</li>
          <li>
            Item 4
            <ol>
              <li>Subitem A</li>
              <li>Subitem B</li>
              <li>
                Subitem C
                <ol>
                  <li>
                    Subsubitem I
                    <ol>
                      <li>
                        Subsubsubitem a
                        <ol>
                          <li>
                            Subsubsubsubitem i
                            <ol>
                              <li>Toomanysubitem 1</li>
                            </ol>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>Item 5</li>
          <li>Item 6</li>
          <li>Item 7</li>
          <li>Item 8</li>
          <li>Item 9</li>
          <li>Item 10</li>
        </ol>
        <ul>
          <li>Item</li>
          <li>
            <a href="#">Item link</a>
          </li>
          <li>
            Item
            <ul>
              <li>Subitem</li>
              <li>Subitem</li>
              <li>
                Subitem
                <ul>
                  <li>Subsubitem</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Item</li>
        </ul>

        <h1>Blockquote</h1>
        <blockquote>
          <p>
            We choose to go to the moon, not because it is easy, but because it
            is hard.
          </p>
        </blockquote>

        <h1>Code</h1>
        <p>
          Use this is JavaScript code{" "}
          <code>
            function() {"{"} alert("Hello, World!"); {"}"}
          </code>
          to display an alert box.
        </p>
        <pre>
          <code>
            function() {"{"}
            <br />
            &nbsp;&nbsp;alert("Hello, World!");
            <br />
            {"}"}
          </code>
        </pre>

        <h1>Horizontal rule</h1>
        <hr />

        <h1>Overriding default styles</h1>
        <p className="body-lg">
          This paragraph has <code>class="body-lg"</code> to demonstrate that
          the default element styles can be overridden by applying utility
          classes.
        </p>
        <h4 className="heading-lg">H4 styled as an H2</h4>
        <p>
          The <code>hr</code> element below is styled with{" "}
          <code>className="hr-xl"</code>.
        </p>
        <hr className="hr-xl" />
      </div>
    );
  },
};
