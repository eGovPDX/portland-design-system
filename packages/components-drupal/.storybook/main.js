import { join } from 'path' // 1. Add dependencies.
import { cwd } from 'process'

const config = {
  stories: ['../components/**/*.component.yml'], // 2. Set components glob.
  addons: [
    {
      name: 'storybook-addon-sdc', // 3. Configure addon.
      options: {
        sdcStorybookOptions: {
          namespace: 'portland', // Your namespace.
        },
        vitePluginTwigDrupalOptions: {
          // vite-plugin-twig-drupal options.
          namespaces: {
            portland: join(cwd(), './components'), // Your namespace and path to components.
          },
        },
        jsonSchemaFakerOptions: {}, // json-schema-faker options.
      },
    },
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
}
export default config