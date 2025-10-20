import type { StorybookConfig } from "@storybook/web-components-vite";
import UnoCSS from "@unocss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "storybook/actions",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@storybook/addon-docs",
    "@whitespace/storybook-addon-html",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  async viteFinal(config) {
    // customize the Vite config here
    config.plugins = [
      ...(config.plugins || []),
      UnoCSS({
        mode: "shadow-dom",
        configFile: "../uno.config.ts",
      }),
    ];
    return config;
  },
};
export default config;
