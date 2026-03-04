import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";

import "./preview.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (story) => {
      const selector = "body";
      useEffect(() => {
        const element = document.querySelector(selector);

        if (element) {
          element.classList.add("box", "box--default", "box--subtle");
        }
      });
      return story();
    },
  ],
  parameters: {
    layout: "centered",

    parameters: {
      docs: {
        codePanel: true,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    backgrounds: {
      disable: true,
    },

    docs: {
      codePanel: true,
    },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },

  tags: ["autodocs"],
};

export default preview;
