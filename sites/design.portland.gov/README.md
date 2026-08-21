# design.portland.gov

This is the Astro-powered docs site where the design system is presented:
component previews, usage guidance, and everything else that helps people build
with Portland's design system. It's not published to npm; it's the site that
consumes the published packages.

It pulls together `@cityofportland/design-tokens`,
`@cityofportland/components-css`, and `@cityofportland/components-react` to
render live examples, plus `@cityofportland/types` for prop contracts while
writing docs pages.

## Developing

```bash
turbo dev --filter=@cityofportland/design.portland.gov
turbo build --filter=@cityofportland/design.portland.gov
```

`dev` starts the Astro dev server (with `--host` so it's reachable from outside
the dev container). Turbo builds the packages this site depends on before
building the site itself, so you don't need to build them by hand first.

## License

MIT
