import type { StorybookConfig } from "@storybook/react-vite";
import tailwind from "@tailwindcss/vite";
import type { PluginOption } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => ({
    ...config,
    plugins: [...(config.plugins || []), tailwind() as PluginOption],
  }),
};
export default config;
