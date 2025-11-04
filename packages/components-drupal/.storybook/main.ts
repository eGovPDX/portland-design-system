import type { StorybookConfig } from "@storybook/html-vite";
import tailwind from "@tailwindcss/vite";
import { join } from "path";
import { cwd } from "process";

const config: StorybookConfig = {
  stories: ["../components/**/*.component.yml", "../components/**/*.story.yml"], // 2. Set components glob.
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-controls",
    "@storybook/addon-docs",
    {
      name: "storybook-addon-sdc", // 3. Configure addon.
      options: {
        sdcStorybookOptions: {
          namespace: "portland", // Your namespace.
        },
        vitePluginTwigDrupalOptions: {
          // vite-plugin-twig-drupal options.
          namespaces: {
            portland: join(cwd(), "./components"), // Your namespace and path to components.
          },
        },
        jsonSchemaFakerOptions: {}, // json-schema-faker options.
      },
    },
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  async viteFinal(config) {
    // customize the Vite config here
    config.plugins = [...(config.plugins || []), tailwind()];
    return config;
  },
};
export default config;
