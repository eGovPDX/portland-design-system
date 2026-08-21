# @cityofportland/components-lit

This is the framework-agnostic version of the design system — Lit-based web
components that work anywhere custom elements are supported, not just in one
framework. Vite builds each component as both an ES module and a CommonJS
module, with TypeScript declarations included.

It only depends on `@cityofportland/design-tokens` for styling, so it's a more
standalone package compared to the React and Drupal component packages.

## Using it

```bash
pnpm add @cityofportland/components-lit
```

```ts
import "@cityofportland/components-lit/button";
```

## Developing

```bash
turbo build --filter=@cityofportland/components-lit
turbo dev --filter=@cityofportland/components-lit
turbo storybook --filter=@cityofportland/components-lit
```

Storybook runs on port `6006`. This package also has browser-based tests through
Vitest and Playwright; run them before opening a PR.

When adding a component, give it a story that covers its states and
accessibility behavior, and double check both the built output and how it
actually renders in a browser.

## License

MIT
