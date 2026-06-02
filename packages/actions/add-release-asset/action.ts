import { getInput, setFailed } from "@actions/core";
import { getOctokit, context } from "@actions/github";

async function run() {
  try {
    const github = getOctokit(getInput("github-token"));

    await github.rest.repos.uploadReleaseAsset({
      repo: getInput("repo") || context.repo.repo,
      owner: getInput("owner") || context.repo.owner,
      release_id: parseInt(getInput("release_id", { required: true })),
      name: getInput("name", { required: true }),
      data: `@${getInput("path", { required: true })}`,
      headers: {
        "content-type": getInput("content_type", { required: true }),
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      setFailed(e.message);
    } else {
      setFailed("An unknown error occurred");
    }
  }
}

run();
