import type { StorybookConfig } from "@storybook/react-vite";
import tailwind from "@tailwindcss/vite";
import type { PluginOption } from "vite";

const BASE_URL = process.env.BASE_URL || "/";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  managerHead(head) {
    return head?.concat(`<base href="${BASE_URL}">`);
  },
  viteFinal: async (config) => ({
    ...config,
    base: BASE_URL,
    plugins: [...(config.plugins || []), tailwind() as PluginOption],
  }),
};
export default config;
