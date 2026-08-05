import type { StorybookConfig } from "@storybook/react-vite";
import tailwind from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: [
    "../(src|stories)/**/*.mdx",
    "../(src|stories)/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-themes"],
  framework: getAbsolutePath("@storybook/react-vite"),

  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      plugins: [react(), tailwind()],
    });
  },
};

export default config;
