# Portland Design System

A multi-framework design system monorepo providing shared design tokens and
components for React, Web Components (Lit), and Drupal Single Directory
Components (SDC).

## Monorepo architecture

This repository is a `pnpm` workspace, which allows us to manage multiple
packages within a single monorepo. Shared dependencies are hoisted to the root
`node_modules` directory, and packages can depend on each other using the
`workspace:*` protocol.

### Packages

The monorepo is organized into the following key packages:

- **`packages/components-css/`**: Pre-built CSS styles for components.
- **`packages/components-react/`**: React component library.
- **`packages/components-drupal/`**: Drupal Single Directory Components (SDC).
- **`packages/design-tokens/`**: The single source of truth for all design
  tokens (colors, typography, spacing).
- **`packages/types/`**: Shared TypeScript types and interfaces used across
  packages.

## Development guide

Please use the devcontainer included in this repository for your development
environment. You may install a devcontainer extension from the
[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
Please note that running a devcontainer requires a functional docker command
line tool.

Once you have started the devcontainer, run the following commands:

1. `pnpm install` to install all dependencies in all packages.
2. `pnpm -r build` to build all of the projects in this monorepo.

When you are ready to being developing, the development flow typically follows
this pattern:

- Open a terminal in the `components-css` package and run `pnpm dev` to
  continuously build the styesheets for each component.
- Open a terminal in the `types` package and run `pnpm dev` to continuously
  build the javascript types for each component.
- Open a terminal in a component framework package (e.g., `components-react`)
- Start storybook for the component framework: `pnpm storybook`
- Begin developing both the component and the stories for them in the framework
  package.
- Iterate on developing the styling, types, and implementation for your
  components.

### Common package scripts

All packages include similar scripts for developing:

- `pnpm build:upstream` for building all dependencies of an individual package.
- `pnpm dev` for watching files and building continuously.
- `pnpm build` for building a production version of the package.

Implementation framework packages like `components-react` and
`components-drupal` include the following scripts:

- `pnpm storybook` for running Storybook to iteratvbiely test your component in
  isolation and build example uses for you component.
