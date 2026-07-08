# Local testing with act

You can test GitHub Actions locally using
[`act`](https://github.com/nektos/act). `act` is installed in the Dev Container
and relies on Docker, which is also installed in the Dev Container. It will
require an active internet connection to download images and repositories for
actions. `act` has many features for testing your actions together before
attempting to develop them through trial and error on GitHub.

## Testing all jobs and events

Simply running `act` with no arguments will run all the jobs, in all workflows,
for all events in the repo.

## Testing individual jobs, or events

Running `act -l` will list all workflows, jobs, and events available in the
repo. Example:

| Stage | Job ID                | Job name              | Workflow name | Workflow file | Events |
| ----- | --------------------- | --------------------- | ------------- | ------------- | ------ |
| 0     | save-storybook-builds | save-storybook-builds | push.yml      | push.yml      | push   |
| 0     | save-dist-folders     | save-dist-folders     | push.yml      | push.yml      | push   |

### Testing a specific event

Run `act <event>` to test all workflows and jobs for a specific event.

For example, `act push` will test all jobs triggered by a push event.

### Testing a specific job

For local development of a specific job, run `act -j <job> <event>`.

For example, `act -j save-dist-folders push` will run the `save-dist-folders`
job triggered with a `push` event.

## Overriding event variables

You can create a JSON event file to simulate certain event/context variables
(e.g. a push to the `main` branch ref). These files should not normally be
checked in as they are only useful for testing. For this purpose, we ignore the
`.act` folder at the root.

To simulate the `github.ref` variable (and any variable build from the like
`github.ref_name`) you could use the following example file:

```json
{
  "ref": "refs/heads/main"
}
```

To use the event file, use the `-e` or `--eventpath` flag:
`act -e event.json <...>`

## Artifacts

In order to use the `actions/upload-artifact` or `actions/download-artifact`
action(s), you will need to fake an artifact server. `act` allows you to create
a server at a default host and port by only specifying the path where you wish
artifacts to be stored.

We have an `.actrc` configuration file that provides as default path in the
`artifacts` folder of the `.act` folder. This is controlled by the option in
`.actrc`: `--artifact-server-path ./.act/.artifacts`
