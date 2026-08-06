import type { StorybookConfig } from "@storybook/html-vite";
import tailwind from "@tailwindcss/vite";
import { join } from "path";
import { cwd } from "process";

const BASE_URL = process.env.BASE_URL || "/";

const config: StorybookConfig = {
  stories: ["../components/**/*.story.yml", "../components/**/*.stories.[jt]s"], // 2. Set components glob.
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
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
  managerHead(head) {
    return head?.concat(`<base href="${BASE_URL}">`);
  },
  async viteFinal(config) {
    // customize the Vite config here
    config.base = BASE_URL;
    config.plugins = [...(config.plugins || []), tailwind()];
    return config;
  },
};
export default config;
