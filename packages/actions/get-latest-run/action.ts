import { getInput, setFailed, setOutput } from "@actions/core";
import { getOctokit, context } from "@actions/github";

async function run() {
  try {
    const e = getOctokit(getInput("github-token"));

    const { data } = await e.rest.actions.listWorkflowRuns({
      owner: getInput("owner") || context.repo.owner,
      repo: getInput("repo") || context.repo.repo,
      workflow_id: getInput("workflow_id", { required: true }),
      conclusion: getInput("conclusion") || undefined,
      event: getInput("event") || undefined,
      branch: getInput("branch") || undefined,
      head_sha: getInput("head_sha") || undefined,
    });

    const run = data.workflow_runs.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

    if (!run) throw new Error("No run found");

    setOutput("run_id", run.id);
    setOutput("run_number", run.run_number);
    setOutput("run_attempt", run.run_attempt);
    setOutput("run_url", run.html_url);
    setOutput("head_sha", run.head_sha);
    setOutput("conclusion", run.conclusion);
  } catch (e) {
    if (e instanceof Error) {
      setFailed(e.message);
    } else {
      setFailed("An unknown error occurred");
    }
  }
}

run();
