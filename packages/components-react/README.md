# @cityofportland/components-react

The React implementation of the design system. Vite builds each component as its
own ES module with matching TypeScript declarations and CSS, so you only ship
what you actually import.

Under the hood it's built on `@cityofportland/design-tokens` for values,
`@cityofportland/components-css` for styling, and `@cityofportland/types` for
shared prop contracts — so it stays in sync with the Lit and Drupal versions of
the same components.

## Using it

```bash
pnpm add @cityofportland/components-react
```

React and React DOM are peer dependencies, so make sure your app already has
those installed. Import components one at a time to keep your bundle lean:

```tsx
import { Button } from "@cityofportland/components-react/button";
import "@cityofportland/components-react/button.css";

export function Example() {
  return <Button>Continue</Button>;
}
```

## Developing

```bash
turbo build --filter=@cityofportland/components-react
turbo dev --filter=@cityofportland/components-react
turbo storybook --filter=@cityofportland/components-react
turbo test --filter=@cityofportland/components-react
```

Storybook runs on port `6006`, and stories live right alongside the components
they document. Tests run through Vitest with Playwright for browser-based
checks.

When you add or change a component, keep its behavior, accessibility, styles,
story, and tests moving together as one unit, and reach for the shared types and
CSS packages instead of duplicating values locally.

## License

MIT
