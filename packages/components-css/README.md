# @cityofportland/components-css

This is the plain CSS layer of the design system, with no framework required.
It's built with Tailwind and Vite on top of `@cityofportland/design-tokens`, so
everything here is styled using the same tokens (colors, spacing, etc.) as the
rest of the system rather than hard-coded values.

Use this package for styled markup without React, Lit, or Drupal. It's also what
`components-react` and `components-drupal` use for their own styling, so changes
here affect both.

## Using it

```bash
pnpm add @cityofportland/components-css
```

Import the CSS you need for the piece of UI you're building:

```css
@import "@cityofportland/components-css/button.css";
```

The same import works from a `.ts`/`.js` file too, if your bundler supports CSS
imports.

## Developing

```bash
turbo build --filter=@cityofportland/components-css
turbo dev --filter=@cityofportland/components-css
turbo storybook --filter=@cityofportland/components-css
```

`turbo build` rebuilds `design-tokens` first automatically, so build order isn't
something you need to manage. Storybook runs on port `6007` and is the easiest
way to review your changes.

When adding or editing styles, keep selectors scoped, use token variables
instead of hard-coded values, and check your changes in both Storybook and in a
package that consumes the styles (like `components-react`).

## License

MIT
