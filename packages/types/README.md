# @cityofportland/types

This package keeps the other packages consistent with each other. It's a set of
shared TypeScript contracts — prop shapes, literal unions, runtime constant
lists — that React, Lit, and Drupal component packages all build against, so a
button means the same thing no matter which framework is rendering it.

It has no dependencies of its own; it's pure types and small runtime helpers
that other packages pull in.

## Using it

```bash
pnpm add @cityofportland/types
```

```ts
import type { ButtonProps, ButtonSize } from "@cityofportland/types";
import { BUTTON_SIZES } from "@cityofportland/types/button";
```

Use `import type` when you only need the type, and pull runtime constants from
the component-specific entry points.

## Developing

```bash
turbo build --filter=@cityofportland/types
turbo dev --filter=@cityofportland/types
```

`dev` runs the TypeScript compiler in watch mode. There's also a `type-check`
script if you just want to verify types without emitting anything.

When you add a new contract, keep any literal unions and their matching runtime
arrays in sync with each other.

## License

MIT
