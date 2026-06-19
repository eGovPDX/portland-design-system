# Local testing with act

You can test GitHub Actions locally using `act`. `act` is installed in the Dev
Container for the repo.

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

### Overriding event variables

You can create a JSON event file to simulate certain event/context variables
(e.g. a push to the `main` branch ref). Creating an `event.json` file at the
root of the repo will be ignored by git.

**event.json**

```json
{
  "ref": "refs/heads/main"
}
```

Use an event file like so: `act -e event.json <...>`

### Artifacts

If you are using the `actions/upload-artifact` or `actions/download-artifact`
action(s), artifacts will be saved in the `.artifacts` folder at the top-level
of the repo so you can test the full workflow of your action. This folder is
added to the gitignore and will not be checked in to git.

This is controlled by the option in `.actrc`:
`--artifact-server-path $PWD/.artifacts`
