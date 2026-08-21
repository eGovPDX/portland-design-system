# Icons Work Area

This directory is reserved for icon work, but it is not currently a pnpm
workspace package because it does not contain a `package.json`. The current
checkout contains generated output only.

## Current Layout

- `dist/js/` contains generated JavaScript when icon sources have been built.
- `dist/svgs/` contains generated SVG output when icon sources have been built.

When source files are restored, the intended layout is `svgs/` for source SVGs,
`src/` for TypeScript definitions, and `vite.config.ts` for the Vite build.

The TypeScript representation is intended to support tree-shakable client
imports while generated SVG files support server-rendered consumers such as
Drupal.

## Develop

There are currently no package-local build commands because this directory has
no `package.json`. Once the source and package metadata are restored, the
intended commands are a Vite production build and watch build.

When adding an icon, keep the source SVG and TypeScript definition synchronized
path by path. Validate path strings, path attributes, root SVG attributes, and
generated output before using the icon in another package.

## Packaging Status

Before this can be installed with `pnpm add` or consumed through a workspace
dependency, add package metadata and include the directory in the workspace's
intended package set. Until then, treat `dist/` as local generated output rather
than a published package contract.

## License

MIT
