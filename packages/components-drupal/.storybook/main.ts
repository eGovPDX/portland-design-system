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
    "storybook-addon-pseudo-states",
    {
      name: "storybook-addon-sdc", // 3. Configure addon.
      options: {
        sdcStorybookOptions: {
          namespace: "portland_components",
          namespaces: {
            portland_assets: join(cwd(), "./dist/assets"),
          },
          resolveIconSource: (source, { packId, namespace }) =>
            namespace === "portland_components" &&
            packId === "portland_icons" &&
            source === "assets/*.svg"
              ? join(cwd(), "dist", source)
              : source,
        },
        jsonSchemaFakerOptions: {}, // json-schema-faker options.
      },
    },
  ],
  features: {
    sidebarOnboardingChecklist: false,
  },
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
