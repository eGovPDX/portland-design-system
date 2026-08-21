# @cityofportland/actions

This is the home for custom GitHub Actions we use for continuous integration and
deployment. It's internal tooling, not a component library, and isn't meant to
be installed in another project.

It doesn't depend on, or get depended on by, any of the design system packages
in this repo — it's just here because it lives in the same monorepo.

## Developing

```bash
turbo build --filter=@cityofportland/actions
turbo dev --filter=@cityofportland/actions
turbo lint --filter=@cityofportland/actions
```

Each action bundles its TypeScript source down to plain JavaScript, since GitHub
Actions runs the compiled output directly rather than building it for you. When
you change an action, make sure its `action.yml`, its source, and the generated
JS all stay in sync, and give it a real run before merging.

To test a workflow locally instead of pushing changes to verify them, see
[`docs/testing-with-act.md`](../../docs/testing-with-act.md) for how to use
`act` to run GitHub Actions in this dev container.

## License

MIT
