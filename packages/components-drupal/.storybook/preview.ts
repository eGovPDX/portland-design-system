import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/html-vite";

import "./preview.css";

Drupal.formatPlural = (
  count: number,
  singular: string,
  plural: string,
  args = {}
) => {
  const message = count === 1 ? singular : plural;
  const replacements = {
    ...args,
    "@count": count,
  };

  return Object.entries(replacements).reduce(
    (output, [placeholder, value]) =>
      output.replaceAll(placeholder, String(value)),
    message
  );
};

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

    options: {
      storySort: {
        method: "alphabetical",
      },
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
    (story) => {
      const rendered = story();

      // Storybook mounts the returned markup after decorators finish. Defer
      // attaching behaviors so `once()` can find and mark the new elements.
      setTimeout(() => Drupal.attachBehaviors(document.body), 0);

      return rendered;
    },
    (story) => {
      const selector = "body";

      const element = document.querySelector(selector);

      if (element) {
        element.classList.add("box", "box--default", "box--subtle");
      }

      return story();
    },
  ],
};

export default preview;
