# Portland Icons

TypeScript icon definitions support tree-shakable client imports. Generated SVGs
support server-rendered consumers such as Drupal.

## Develop

Run from this directory:

```sh
turbo dev
```

Turbo handles dependencies automatically. The dev command watches the source
directory, including added and deleted icons.

The [tsdown configuration](./tsdown.config.ts) compiles individual ESM modules
and declarations, emits matching runtime and type barrels through a plugin, and
generates optimized SVGs in a `build:done` hook. Each build cleans its output.
Watch rebuilds refresh imported definitions and remove stale SVGs. Use a
separate TypeScript check when validating source types.

## Layout and imports

- `src/<category>/<icon>.ts`: icon definitions.
- `dist/js/index.js` and `index.d.ts`: named icon exports.
- `dist/js/<category>/<icon>.js` and `.d.ts`: individual icon modules.
- `dist/svgs/<icon>.svg`: optimized SVGs with flat filenames.

```ts
import { arrowTrendUp } from "@cityofportland/icons";
import arrowTrendUp from "@cityofportland/icons/information/arrow-trend-up";
```

SVGs are available through paths such as
`@cityofportland/icons/arrow-trend-up.svg`. Only `dist/` is published.

When adding an icon, keep the source SVG and TypeScript definition synchronized
path by path. Validate path strings, path attributes, root SVG attributes, and
generated output before using the icon in another package. Duplicate barrel
names or flat SVG filenames fail the build.

## License

MIT
