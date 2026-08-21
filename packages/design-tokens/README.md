# @cityofportland/design-tokens

This is where the design system starts. It's the source of truth for colors,
spacing, and other design values, managed with Style Dictionary and built into
whatever format you need — JS, TypeScript, JSON, CSS, SCSS, or Tailwind.

Nothing else in this repo works without this package — `components-css`,
`components-lit`, `components-react`, and `components-drupal` all pull their
values from here, so a token change here is felt everywhere.

## Using it

```bash
pnpm add @cityofportland/design-tokens
```

```ts
import tokens from "@cityofportland/design-tokens/js/base";
```

```css
@import "@cityofportland/design-tokens/tailwind/base.css";
```

## Developing

```bash
turbo build --filter=@cityofportland/design-tokens
turbo dev --filter=@cityofportland/design-tokens
turbo storybook --filter=@cityofportland/design-tokens
```

`dev` watches the token and asset sources and rebuilds as you go. Storybook runs
on port `6007` for browsing the tokens visually.

Token values live in source files that Style Dictionary compiles into `dist/` —
don't edit `dist/` directly, since it gets overwritten on the next build.
Incoming token updates from Zeroheight are staged before they're merged into the
real source, so review generated output as part of any token PR.

## License

MIT
