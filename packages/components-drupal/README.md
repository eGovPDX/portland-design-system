# @cityofportland/components-drupal

This package holds the Drupal side of the design system — components built as
Drupal Single Directory Components (SDC), with Twig templates, schemas, and
styles that follow Drupal's conventions. Storybook (with the SDC addon) is how
you preview and test them without needing a full Drupal site running.

It leans on `@cityofportland/design-tokens` and `@cityofportland/components-css`
for styling and `@cityofportland/types` for shared contracts, so it stays
visually and structurally consistent with the React and Lit versions of the same
components.

This package gets you components you can preview and iterate on; wiring them
into a live Drupal site still requires that site's own component discovery and
asset setup.

## Developing

```bash
turbo build --filter=@cityofportland/components-drupal
turbo dev --filter=@cityofportland/components-drupal
turbo storybook --filter=@cityofportland/components-drupal
```

Turbo takes care of building `design-tokens`, `components-css`, and `types`
first, so build order isn't something you need to manage. Storybook runs on port
`6006` and is the primary way to work with this package day to day.

When you touch a component, keep its Twig template, SDC metadata, styles, and
story all updated together — they're meant to move as a set.

## License

MIT
