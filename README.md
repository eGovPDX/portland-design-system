# Portland Design System

This is the monorepo behind the City of Portland's design system: design tokens,
CSS, and components for React, Lit, and Drupal, plus the docs site that presents
them. It's built with pnpm workspaces, and Turbo runs the build pipeline.

## How it fits together

Everything flows from a couple of foundation packages:

- [`design-tokens`](packages/design-tokens/README.md) and
  [`types`](packages/types/README.md) have no internal dependencies. Tokens give
  you colors, spacing, etc. in every format we need; types give every framework
  a shared, consistent set of props and contracts.
- [`components-css`](packages/components-css/README.md) and
  [`components-lit`](packages/components-lit/README.md) build on tokens.
- [`components-react`](packages/components-react/README.md) and
  [`components-drupal`](packages/components-drupal/README.md) build on tokens,
  the CSS package, and the shared types.
- [`design.portland.gov`](sites/design.portland.gov/README.md) is the Astro site
  that pulls the CSS, React components, and tokens together into actual
  documentation.
- [`actions`](packages/actions/README.md) is unrelated to the above — it's
  internal GitHub Actions tooling for this repo.
- `icons` is a work-in-progress area that isn't a real workspace package yet.

Because Turbo knows this dependency graph, building any package automatically
builds whatever it depends on first.

## Getting set up

```bash
pnpm install
```

pnpm handles the workspace linking for you.

## Everyday commands

Run these from the repo root. Turbo will figure out what needs to build first.

```bash
turbo build                                  # build everything
turbo dev                                    # watch mode across the repo
turbo build --filter=@cityofportland/<pkg>   # build just one package (and its deps)
turbo dev --filter=@cityofportland/<pkg>     # watch just one package
```

Most of the component packages also have a Storybook you can run locally:

```bash
turbo storybook --filter=@cityofportland/<pkg>
```

Storybook instances run on port `6006` or `6007` depending on the package —
check that package's README if you're not sure which.

## Where to look next

Each package has its own README with more specifics on developing it. For
deeper, repo-level technical notes (like running GitHub Actions locally), check
the [`docs/`](docs) folder.

## License

MIT
