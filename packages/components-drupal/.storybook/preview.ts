import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/html-vite";

import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "centered",

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
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (Story) => {
      const story = Story();
      // Re-attach after render so behaviors run on each story load/refresh
      setTimeout(() => Drupal.attachBehaviors(document.body), 0);
      return story;
    },
  ],
};

export default preview;
