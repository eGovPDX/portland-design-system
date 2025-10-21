const config = {
  stories: [
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
    "@storybook/addon-controls",
    "@storybook/addon-designs",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@storybook/addon-themes",
    "@storybook/addon-viewport",
    "@storybook/experimental-addon-test",
    "@whitespace/storybook-addon-html",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
